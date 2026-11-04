"use client"

// Adapted from ReactBits ScrollStack (TS + Tailwind):
// - window scroll only; the wheel-hijacking smooth scroll and snap are removed
// - cards pin centered in the space below `stackPosition`, or below an optional header while it is sticky
// - a card taller than the space left scrolls fully into view first, then pins by its bottom edge
// - cards dim toward the theme background instead of black; no hardcoded colors or card size
// - under reduced motion cards still stack but do not scale
// - keyboard focus is never left behind the header, under the next card or off-screen
// - reports the active card and accepts jump requests via window events (see StackProgress)

import {
  Children,
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"

/** Fired on `window` when the card on top of the stack changes. */
export const STACK_CHANGE = "scrollstack:change"
/** Dispatch on `window` to scroll a card to the top of the stack. */
export const STACK_GOTO = "scrollstack:goto"
export type StackChangeDetail = { id: string; index: number; total: number }
export type StackGotoDetail = { id: string; index: number }

export interface ScrollStackProps {
  children?: ReactNode
  className?: string
  /** Names this stack in the change/goto events. */
  id?: string
  /** Id of a sticky element above the stack; cards pin just below its bottom edge. */
  headerId?: string
  /** Highest a card may pin, in px from the top of the viewport (e.g. below a fixed site header). */
  stackPosition?: number
  /** Space between the header (or `stackPosition`) and the first pinned card, in px. */
  headerGap?: number
  /** Scroll distance between cards before the next one starts covering. */
  itemDistance?: number
  /** Vertical offset between pinned cards, so the edge of each one stays visible. */
  itemStackDistance?: number
  /** How much each card shrinks per card stacked on top of it. */
  itemScale?: number
  /** Smallest scale a covered card can reach. */
  baseScale?: number
  /** How much each covering card dims the ones below (0–1). */
  dimAmount?: number
  /** Extra scroll after the last card pins, before the section moves on. */
  holdDistance?: number
}

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

const ScrollStack = ({
  children,
  className,
  id,
  headerId,
  stackPosition = 72,
  headerGap = 16,
  itemDistance = 100,
  itemStackDistance = 16,
  itemScale = 0.03,
  baseScale = 0.9,
  dimAmount = 0.35,
  holdDistance = 120,
}: ScrollStackProps) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef({
    id,
    headerId,
    stackPosition,
    headerGap,
    itemStackDistance,
    itemScale,
    baseScale,
    dimAmount,
  })
  const scheduleRef = useRef<(() => void) | null>(null)
  const items = Children.toArray(children)

  useLayoutEffect(() => {
    settingsRef.current = {
      id,
      headerId,
      stackPosition,
      headerGap,
      itemStackDistance,
      itemScale,
      baseScale,
      dimAmount,
    }
    scheduleRef.current?.()
  })

  useLayoutEffect(() => {
    const inner = innerRef.current
    if (!inner) return undefined

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

    /** Bottom edge of the pinned header: its sticky `top` plus its height. */
    const stackTop = () => {
      const settings = settingsRef.current
      const header = settings.headerId
        ? document.getElementById(settings.headerId)
        : null
      // The header only counts while it is actually sticky (e.g. pinned on phones only).
      if (!header || getComputedStyle(header).position !== "sticky")
        return settings.stackPosition + settings.headerGap
      const top = parseFloat(getComputedStyle(header).top) || 0
      return top + header.offsetHeight + settings.headerGap
    }

    const update = () => {
      frame = 0
      const settings = settingsRef.current
      const slots = slotsOf()
      if (!slots.length) return

      const viewHeight = window.innerHeight
      const base = stackTop()
      const heights = slots.map((slot) => slot.offsetHeight)

      // Cards share one band centered on the tallest card that fits, each pinning one step
      // lower than the last so earlier cards peek out above it. A card too tall for the
      // viewport pins by its bottom edge instead, so it scrolls fully into view first.
      const offset = settings.itemStackDistance
      const room = viewHeight - base - BOTTOM_GAP
      const band = Math.max(0, ...heights.filter((h) => h <= room))
      // Center within the space below the header (or `stackPosition`).
      const first =
        base + (viewHeight - base - band - (slots.length - 1) * offset) / 2
      // Clamp the band as a whole, so the steps between cards survive near the header.
      const start = Math.max(first, base)
      pins = heights.map((height, i) =>
        Math.min(start + i * offset, viewHeight - height - BOTTOM_GAP)
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
        const start = pins[j - 1] + heights[j - 1]
        const span = Math.max(1, start - pins[j])
        const cover = Math.min(1, Math.max(0, (start - tops[j]) / span))
        for (let i = 0; i < j; i++) depths[i] += cover
        if (cover >= 0.5) top = j
      }
      if (top !== active && settings.id) {
        active = top
        window.dispatchEvent(
          new CustomEvent<StackChangeDetail>(STACK_CHANGE, {
            detail: { id: settings.id, index: top, total: slots.length },
          })
        )
      }

      const dimStep = Math.min(Math.max(settings.dimAmount, 0), 1)
      slots.forEach((slot, i) => {
        const card = slot.firstElementChild as HTMLElement | null
        if (!card) return
        const depth = depths[i]
        const scale = Math.max(
          Math.min(settings.baseScale, 1),
          1 - depth * settings.itemScale
        )
        const transform =
          depth < 0.0005 || motion.matches ? "" : `scale(${scale.toFixed(4)})`
        write(`transform${i}`, transform, (value) => {
          card.style.transform = value
        })
        write(
          `dim${i}`,
          (1 - Math.pow(1 - dimStep, depth)).toFixed(3),
          (value) => {
            card.style.setProperty("--scroll-stack-dim", value)
          }
        )
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

    const smooth = (): ScrollBehavior => (motion.matches ? "instant" : "smooth")

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

      // Bring the card to where it has just pinned: fully in view, next card not yet over it.
      // If the control sits in the part of a tall card hidden under the header, go further
      // so the control lands just below the header.
      const offset = box.top - slot.getBoundingClientRect().top
      const landing = Math.max(pins[index] ?? clear, clear + 8 - offset)
      window.scrollTo({
        top: window.scrollY + flowTop(slot) - landing,
        behavior: "instant",
      })
    }

    // Jump requests, e.g. from the progress indicator: bring a card to the top of the stack.
    const onGoto = (event: Event) => {
      const { id: target, index } = (event as CustomEvent<StackGotoDetail>)
        .detail
      const slot = slotsOf()[index]
      if (!slot || target !== settingsRef.current.id) return
      const base = stackTop()
      // A card that fits lands at its pin point; a tall one (pinned higher) lands with its top
      // just below the header so it can be read from the start.
      const landing = Math.max(pins[index] ?? base, base)
      window.scrollTo({
        top: window.scrollY + flowTop(slot) - landing + 1,
        behavior: smooth(),
      })
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(inner)
    const header = settingsRef.current.headerId
      ? document.getElementById(settingsRef.current.headerId)
      : null
    if (header) observer.observe(header)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    inner.addEventListener("focusin", onFocusIn)
    window.addEventListener(STACK_GOTO, onGoto)
    scheduleRef.current = schedule
    update()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
      inner.removeEventListener("focusin", onFocusIn)
      window.removeEventListener(STACK_GOTO, onGoto)
      scheduleRef.current = null
    }
  }, [])

  return (
    <div className={cn("relative w-full", className)}>
      <div ref={innerRef} className="relative">
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance
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
                  top: stackPosition + index * itemStackDistance,
                  marginBottom: (items.length - 1 - index) * itemStackDistance,
                  zIndex: index + 1,
                }}
              >
                {child}
              </div>
            </Fragment>
          )
        })}
        <div aria-hidden="true" style={{ height: holdDistance }} />
      </div>
    </div>
  )
}

export default ScrollStack
