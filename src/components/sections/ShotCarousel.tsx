"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { Expand, Pause, Play } from "lucide-react"

import { isPlaceholder, type Shot } from "@/lib/projects"
import { cn } from "@/lib/utils"

const pad = (n: number) => String(n).padStart(2, "0")

function shotLabel(shot: Shot, index: number, total: number) {
  const position = `Screenshot ${index + 1} of ${total}`
  return isPlaceholder(shot)
    ? `${position} (placeholder)`
    : `${position}: ${shot.alt}`
}

/** Grid-lined stand-in shown only in dev and preview builds until real screenshots exist. */
export function Placeholder({ index }: { index: number }) {
  return (
    <div className="relative flex size-full items-center justify-center bg-muted/40">
      <div aria-hidden="true" className="absolute inset-0 hero-grid" />
      <div className="relative text-center font-mono text-muted-foreground">
        <p className="text-sm">screenshot {pad(index + 1)}</p>
        <p className="mt-1 text-xs opacity-70">preview only</p>
      </div>
    </div>
  )
}

export function ShotView({
  shot,
  sizes,
  fit,
}: {
  shot: Shot
  sizes: string
  fit: "cover" | "contain"
}) {
  if (isPlaceholder(shot)) return <Placeholder index={shot.index} />

  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      fill
      sizes={sizes}
      draggable={false}
      className={fit === "cover" ? "object-cover object-top" : "object-contain"}
    />
  )
}

/** Time each screenshot stays up while the gallery plays on its own. */
const AUTOPLAY_DELAY = 3000

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReduce(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** True on the server, so nothing auto-plays (or shows its pause button) before hydration. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => true
  )
}

/** True once the element comes within a screen of the viewport. Stays true after that. */
function useNearViewport(ref: RefObject<HTMLElement | null>): boolean {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || near) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true)
      },
      { rootMargin: "100% 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, near])

  return near
}

/**
 * Swipe (touch) or drag (mouse) between screenshots. Arrow keys work once the carousel has focus,
 * and the dots jump straight to a screenshot.
 *
 * Always loops. With `autoplay`, it also advances every few seconds. It holds while the pointer is over it,
 * while focus is inside it, while it is off-screen or the tab is hidden, and for a full cycle after
 * any manual move. It never plays under reduced motion, and a pause button stops it (WCAG 2.2.2).
 */
export function ShotCarousel({
  title,
  shots,
  startIndex = 0,
  syncTo,
  onIndexChange,
  onOpen,
  sizes,
  fit,
  viewportClassName,
  regionRef,
  autoplay = false,
}: {
  title: string
  shots: Shot[]
  startIndex?: number
  /** Jump to this index without animating, e.g. after the lightbox closes. */
  syncTo?: number
  onIndexChange?: (index: number) => void
  /** When set, each screenshot is a button that opens it (in the lightbox). */
  onOpen?: (index: number) => void
  sizes: string
  fit: "cover" | "contain"
  viewportClassName?: string
  /** Ref to the focusable carousel region, e.g. to return focus to it. */
  regionRef?: RefObject<HTMLDivElement | null>
  /** Advance on its own (card galleries only, not the lightbox or sheet). */
  autoplay?: boolean
}) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const near = useNearViewport(rootRef)
  // Always loop 1 → 2 → 3 → 4 → 1, whether swiped, dragged or playing on its own.
  // Embla stays inactive (no measuring) until the carousel is near the viewport; carousels hidden
  // by a breakpoint never get there, so they never initialise.
  const [viewportRef, api] = useEmblaCarousel({
    startIndex,
    loop: true,
    active: near,
  })
  const [selected, setSelected] = useState(startIndex)
  const total = shots.length

  const reduce = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(true)
  const canPlay = autoplay && !reduce && total > 1
  const active = canPlay && playing
  // `skip`: a manual move happened, so the next automatic step waits one more cycle.
  const hold = useRef({
    hover: false,
    focus: false,
    visible: true,
    skip: false,
  })
  const nudge = () => {
    hold.current.skip = true
  }

  useEffect(() => {
    if (!api || !active) return
    const root = rootRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        hold.current.visible = entry?.isIntersecting ?? true
      },
      { threshold: 0.5 }
    )
    if (root) observer.observe(root)
    const onPointerDown = () => {
      hold.current.skip = true
    }
    api.on("pointerDown", onPointerDown)
    const timer = window.setInterval(() => {
      const state = hold.current
      if (state.hover || state.focus || !state.visible || document.hidden)
        return
      if (state.skip) {
        state.skip = false
        return
      }
      api.scrollNext()
    }, AUTOPLAY_DELAY)
    return () => {
      window.clearInterval(timer)
      observer.disconnect()
      api.off("pointerDown", onPointerDown)
    }
  }, [api, active])

  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const index = api.selectedScrollSnap()
      setSelected(index)
      onIndexChange?.(index)
    }
    api.on("select", onSelect).on("reInit", onSelect)
    return () => {
      api.off("select", onSelect).off("reInit", onSelect)
    }
  }, [api, onIndexChange])

  useEffect(() => {
    if (api && syncTo !== undefined) api.scrollTo(syncTo, true)
  }, [api, syncTo])

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (regionRef) regionRef.current = node
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hold.current.hover = true
      }}
      onPointerLeave={() => {
        hold.current.hover = false
      }}
      onFocus={() => {
        hold.current.focus = true
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          hold.current.focus = false
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault()
          nudge()
          api?.scrollNext()
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          nudge()
          api?.scrollPrev()
        }
      }}
      className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {/* One shared "open" hint per carousel instead of one per slide keeps the DOM small. */}
      <div className="group/viewport relative">
        <div
          ref={viewportRef}
          className={cn(
            "cursor-grab overflow-hidden rounded-lg border border-border bg-muted/40 active:cursor-grabbing",
            viewportClassName
          )}
        >
          <div className="flex h-full touch-pan-y">
            {shots.map((shot, i) => {
              const label = shotLabel(shot, i, total)
              return (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={label}
                  className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                >
                  {onOpen ? (
                    <button
                      type="button"
                      onClick={() => onOpen(i)}
                      aria-label={`Open ${label}`}
                      tabIndex={i === selected ? 0 : -1}
                      className="relative block size-full cursor-[inherit] outline-none"
                    >
                      <ShotView shot={shot} sizes={sizes} fit={fit} />
                    </button>
                  ) : (
                    <ShotView shot={shot} sizes={sizes} fit={fit} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {onOpen && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover/viewport:opacity-100 group-has-[button:focus-visible]/viewport:opacity-100"
          >
            <Expand className="size-4" />
          </span>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {shots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  nudge()
                  api?.scrollTo(i)
                }}
                aria-label={`Show screenshot ${i + 1} of ${total}`}
                aria-current={i === selected ? "true" : undefined}
                tabIndex={-1}
                className="group/dot flex size-6 items-center justify-center rounded-full outline-none"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                    i === selected
                      ? "w-5 bg-primary"
                      : "w-1.5 bg-muted-foreground/40 group-hover/dot:bg-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {canPlay && (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pause screenshots" : "Play screenshots"}
                className="flex size-6 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {playing ? (
                  <Pause aria-hidden="true" className="size-3.5" />
                ) : (
                  <Play aria-hidden="true" className="size-3.5" />
                )}
              </button>
            )}
            {/* Not announced while playing on its own, so screen readers are not interrupted. */}
            <p
              aria-live={active ? "off" : "polite"}
              className="font-mono text-xs text-muted-foreground tabular-nums"
            >
              {pad(selected + 1)} / {pad(total)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
