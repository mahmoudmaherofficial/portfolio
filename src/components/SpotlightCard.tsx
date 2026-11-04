"use client"

// Adapted from ReactBits SpotlightCard (TS + Tailwind): a soft accent glow that follows the
// pointer (or keyboard focus) across the card and its border, and flares briefly on press.

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const SIZE = 240
const BORDER_GLOW = 0.6
const SMOOTHING = 0.3

/** Gradient stops for a soft-edged glow in the accent color. */
function falloff(softness: number) {
  const core = (1 - softness) ** 1.5 * 0.85
  const stop = (alpha: number, at: number) =>
    `color-mix(in srgb, var(--primary) ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`
  const stops = [stop(1, 0)]
  for (let i = 0; i <= 14; i++) {
    const t = core + ((1 - core) * i) / 14
    const g = (t - core) / (1 - core)
    const smooth = 1 - g * g * (3 - 2 * g)
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6)
    stops.push(stop(smooth + (glow - smooth) * softness, t))
  }
  return stops.join(", ")
}

const FILL_STOPS = falloff(0.7)
const EDGE_STOPS = falloff(1)

const circle = (size: number, x: number, y: number, stops: string) =>
  `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`

const BORDER_MASK =
  "pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"

export default function SpotlightCard({
  children,
  className,
  intensity = 0.15,
  proximity = 80,
}: {
  children: React.ReactNode
  className?: string
  /** Peak opacity of the glow inside the card (0–1). */
  intensity?: number
  /** Distance in px outside the card at which the glow starts to appear. */
  proximity?: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLSpanElement>(null)
  const edgeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const light = lightRef.current
    const edge = edgeRef.current
    if (!root || !light || !edge) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const state = { x: 0, y: 0, presence: 0, flare: 0, pressed: false }
    const pointer = { x: 0, y: 0, active: false }
    let focus: Element | null = null
    let raf = 0
    let last = 0

    // Skip style writes that would not change anything; every card ticks on pointer moves.
    // Compared against what was last written, since the browser reformats style values.
    const written = new Map<string, string>()
    const set = (
      el: HTMLElement,
      prop: "background" | "opacity",
      value: string
    ) => {
      const key = `${el === light ? "light" : "edge"}.${prop}`
      if (written.get(key) === value) return
      written.set(key, value)
      el.style[prop] = value
    }

    const paint = () => {
      const size = SIZE * (1 + 0.2 * state.flare)
      const boost = 1 + 0.7 * state.flare
      set(light, "background", circle(size, state.x, state.y, FILL_STOPS))
      set(edge, "background", circle(size * 0.6, state.x, state.y, EDGE_STOPS))
      set(
        light,
        "opacity",
        String(Math.min(1, state.presence * intensity * boost))
      )
      set(
        edge,
        "opacity",
        String(Math.min(1, state.presence * BORDER_GLOW * boost))
      )
    }

    const tick = (now: number) => {
      raf = 0
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000))
      last = now
      const rect = root.getBoundingClientRect()
      let tx = state.x
      let ty = state.y
      let target = 0
      if (focus && root.contains(focus)) {
        const box = focus.getBoundingClientRect()
        tx = box.left + box.width / 2 - rect.left
        ty = box.top + box.height / 2 - rect.top
        target = 1
      } else if (pointer.active) {
        tx = pointer.x - rect.left
        ty = pointer.y - rect.top
        const gap = Math.hypot(
          Math.max(0, -tx, tx - rect.width),
          Math.max(0, -ty, ty - rect.height)
        )
        target = gap === 0 ? 1 : Math.max(0, 1 - gap / proximity) ** 2
      }
      // Appear where the pointer is instead of sliding in from the last position.
      if (state.presence < 0.02 && target > 0) {
        state.x = tx
        state.y = ty
      }
      const follow = reduce ? 1 : 1 - Math.exp(-dt / (0.015 + SMOOTHING * 0.22))
      state.x += (tx - state.x) * follow
      state.y += (ty - state.y) * follow
      const fade = reduce
        ? 1
        : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32))
      state.presence += (target - state.presence) * fade
      if (Math.abs(target - state.presence) < 0.002) state.presence = target
      const press = state.pressed && !reduce ? 1 : 0
      state.flare +=
        (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)))
      if (Math.abs(press - state.flare) < 0.002) state.flare = press
      paint()
      const moving =
        Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1
      if (moving || state.presence !== target || state.flare !== press)
        raf = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      wake()
    }
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget) return
      pointer.active = false
      wake()
    }
    const onDown = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      state.pressed = true
      wake()
    }
    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") pointer.active = false
      if (!state.pressed && event.pointerType === "mouse") return
      state.pressed = false
      wake()
    }
    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return
      if (!event.target.matches(":focus-visible")) return
      focus = event.target
      wake()
    }
    const onFocusOut = (event: FocusEvent) => {
      if (root.contains(event.relatedTarget as Node | null)) return
      focus = null
      wake()
    }
    const onScroll = () => {
      if (pointer.active || state.presence > 0) wake()
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    window.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    })
    document.addEventListener("pointerout", onOut)
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("focusout", onFocusOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
      window.removeEventListener("scroll", onScroll, { capture: true })
      document.removeEventListener("pointerout", onOut)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("focusout", onFocusOut)
    }
  }, [intensity, proximity])

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-card text-card-foreground",
        className
      )}
    >
      <span
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0"
      />
      {children}
      <span aria-hidden="true" className={cn(BORDER_MASK, "bg-border")} />
      <span
        ref={edgeRef}
        aria-hidden="true"
        className={cn(BORDER_MASK, "opacity-0")}
      />
    </div>
  )
}
