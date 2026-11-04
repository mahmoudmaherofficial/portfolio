"use client"

// Adapted from ReactBits ScrollStack (TS + Tailwind). Cards pin below a sticky header and each
// next card stacks over the previous one, which shrinks and dims toward the theme background.
// Uses window scroll only (no scroll hijacking), keeps keyboard focus visible, and reports the
// card on top to StackProgress through window events.

import {
  Children,
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

/** Fired on `window` with the index of the card on top of the stack. */
export const STACK_CHANGE = "scrollstack:change"
/** Dispatch on `window` with a card index to scroll that card to the top of the stack. */
export const STACK_GOTO = "scrollstack:goto"

/** Space between the header and the first pinned card. */
const HEADER_GAP = 16
/** Scroll distance between cards before the next one starts covering. */
const ITEM_DISTANCE = 100
/** Vertical offset between pinned cards, so the edge of each one stays visible. */
const ITEM_OFFSET = 16
/** How much a card shrinks per card stacked on top of it, and the smallest it gets. */
const ITEM_SCALE = 0.03
const MIN_SCALE = 0.9
/** How much each covering card dims the ones below. */
const DIM = 0.35
/** Extra scroll after the last card pins, before the section moves on. */
const HOLD_DISTANCE = 120
/** Gap kept between a tall card's bottom edge and the bottom of the viewport. */
const BOTTOM_GAP = 16

export const ScrollStackItem = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => (
  <div
    className={cn(
      "relative origin-top rounded-xl will-change-transform",
      className
    )}
  >
    {children}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-background opacity-(--scroll-stack-dim,0)"
    />
  </div>
)

export default function ScrollStack({
  children,
  className,
  headerId,
  stackPosition,
}: {
  children?: ReactNode
  className?: string
  /** Id of a sticky element above the stack; while it is sticky, cards pin below it. */
  headerId: string
  /** Highest a card may pin, in px from the top of the viewport (e.g. below a fixed site header). */
  stackPosition: number
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)

  useLayoutEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    const header = document.getElementById(headerId)
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const cache = new Map<string, string>()
    let frame = 0
    // Where each card pins (its sticky `top`), kept for the focus and jump handlers.
    let pins: number[] = []
    let active = -1

    const slotsOf = () =>
      (Array.from(inner.children) as HTMLElement[]).filter((child) =>
        child.hasAttribute("data-stack-slot")
      )

    const write = (key: string, value: string, apply: (v: string) => void) => {
      if (cache.get(key) === value) return
      cache.set(key, value)
      apply(value)
    }

    /** Top of the space cards can pin in: below the header while it is sticky (phones only). */
    const stackTop = () => {
      if (!header) return stackPosition + HEADER_GAP
      const style = getComputedStyle(header)
      if (style.position !== "sticky") return stackPosition + HEADER_GAP
      return (parseFloat(style.top) || 0) + header.offsetHeight + HEADER_GAP
    }

    const update = () => {
      frame = 0
      const slots = slotsOf()
      if (!slots.length) return

      const viewHeight = window.innerHeight
      const base = stackTop()
      const heights = slots.map((slot) => slot.offsetHeight)

      // Cards share one band centered on the tallest card that fits, each pinning one step
      // lower than the last so earlier cards peek out above it. A card too tall for the
      // viewport pins by its bottom edge instead, so it scrolls fully into view first.
      const room = viewHeight - base - BOTTOM_GAP
      const band = Math.max(0, ...heights.filter((h) => h <= room))
      const centered =
        base + (viewHeight - base - band - (slots.length - 1) * ITEM_OFFSET) / 2
      const start = Math.max(centered, base)
      pins = heights.map((height, i) =>
        Math.min(start + i * ITEM_OFFSET, viewHeight - height - BOTTOM_GAP)
      )
      slots.forEach((slot, i) => {
        write(`top${i}`, `${Math.round(pins[i])}px`, (value) => {
          slot.style.top = value
        })
      })

      const tops = slots.map((slot) => slot.getBoundingClientRect().top)
      const depths = slots.map(() => 0)
      // The card on top: the last one that covers at least half of the card before it.
      let top = 0
      for (let j = 1; j < slots.length; j++) {
        const bottom = pins[j - 1] + heights[j - 1]
        const span = Math.max(1, bottom - pins[j])
        const cover = Math.min(1, Math.max(0, (bottom - tops[j]) / span))
        for (let i = 0; i < j; i++) depths[i] += cover
        if (cover >= 0.5) top = j
      }
      if (top !== active) {
        active = top
        window.dispatchEvent(
          new CustomEvent<number>(STACK_CHANGE, { detail: top })
        )
      }

      slots.forEach((slot, i) => {
        const card = slot.firstElementChild as HTMLElement | null
        if (!card) return
        const depth = depths[i]
        const scale = Math.max(MIN_SCALE, 1 - depth * ITEM_SCALE)
        const transform =
          depth < 0.0005 || motion.matches ? "" : `scale(${scale.toFixed(4)})`
        write(`transform${i}`, transform, (value) => {
          card.style.transform = value
        })
        write(`dim${i}`, (1 - Math.pow(1 - DIM, depth)).toFixed(3), (value) => {
          card.style.setProperty("--scroll-stack-dim", value)
        })
      })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    /** Where a slot's top sits in normal flow (viewport coordinates), ignoring sticky. */
    const flowTop = (slot: HTMLElement) => {
      // The spacer before a card is not sticky; the first card starts at the top of the list.
      const spacer = slot.previousElementSibling
      return spacer
        ? spacer.getBoundingClientRect().bottom
        : inner.getBoundingClientRect().top
    }

    // Keyboard focus must never sit behind the pinned header, under the next card or off-screen.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      const slots = slotsOf()
      const index = slots.findIndex((slot) => slot.contains(target))
      if (index < 0) return
      const slot = slots[index]
      const clear = stackTop()

      const box = target.getBoundingClientRect()
      const next = slots[index + 1]
      const covered = next
        ? next.getBoundingClientRect().top < box.bottom
        : false
      if (box.top >= clear && box.bottom <= window.innerHeight && !covered)
        return

      // Bring the card to where it has just pinned. If the control sits in the part of a tall
      // card hidden under the header, go further so it lands just below the header.
      const offset = box.top - slot.getBoundingClientRect().top
      const landing = Math.max(pins[index] ?? clear, clear + 8 - offset)
      window.scrollTo({
        top: window.scrollY + flowTop(slot) - landing,
        behavior: "instant",
      })
    }

    const onGoto = (event: Event) => {
      const index = (event as CustomEvent<number>).detail
      const slot = slotsOf()[index]
      if (!slot) return
      const landing = Math.max(pins[index] ?? 0, stackTop())
      window.scrollTo({
        top: window.scrollY + flowTop(slot) - landing + 1,
        behavior: motion.matches ? "instant" : "smooth",
      })
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(inner)
    if (header) observer.observe(header)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    inner.addEventListener("focusin", onFocusIn)
    window.addEventListener(STACK_GOTO, onGoto)
    update()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
      inner.removeEventListener("focusin", onFocusIn)
      window.removeEventListener(STACK_GOTO, onGoto)
    }
  }, [headerId, stackPosition])

  return (
    <div className={cn("relative w-full", className)}>
      <div ref={innerRef} className="relative">
        {items.map((child, index) => {
          const gap = ITEM_DISTANCE - (items.length - index) * ITEM_OFFSET
          return (
            <Fragment
              key={isValidElement(child) ? (child.key ?? index) : index}
            >
              {index > 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    height: Math.max(0, gap),
                    marginTop: Math.min(0, gap),
                  }}
                />
              )}
              <div
                data-stack-slot=""
                className="sticky"
                style={{
                  // Replaced after mount with the measured pin point.
                  top: stackPosition + index * ITEM_OFFSET,
                  marginBottom: (items.length - 1 - index) * ITEM_OFFSET,
                  zIndex: index + 1,
                }}
              >
                {child}
              </div>
            </Fragment>
          )
        })}
        <div aria-hidden="true" style={{ height: HOLD_DISTANCE }} />
      </div>
    </div>
  )
}
