"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

import CursorGrid from "@/components/CursorGrid"

type GridColors = { primary: string; foreground: string }

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** True when the visitor asks for reduced motion. Assumed true on the server so nothing animates before hydration. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true
  )
}

/** Resolves any CSS color (including oklch) to #rrggbb, which CursorGrid's WebGL shader needs. */
function cssColorToHex(value: string): string {
  const ctx = document.createElement("canvas").getContext("2d")
  if (!ctx) return "#000000"
  ctx.fillStyle = value
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")
}

function readThemeColors(): GridColors {
  const styles = getComputedStyle(document.documentElement)
  return {
    primary: cssColorToHex(styles.getPropertyValue("--primary").trim()),
    foreground: cssColorToHex(styles.getPropertyValue("--foreground").trim()),
  }
}

/** Emerald cell highlights that follow the cursor, layered over the hero's static CSS grid. */
export function HeroGrid() {
  const { resolvedTheme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const [colors, setColors] = useState<GridColors | null>(null)

  useEffect(() => {
    if (!resolvedTheme) return
    // Wait a frame so the theme class is applied before reading the tokens.
    const frame = requestAnimationFrame(() => setColors(readThemeColors()))
    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])

  // Reduced motion: keep only the hero's static CSS grid.
  if (reducedMotion || !colors) return null

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <CursorGrid
        className="absolute inset-0"
        cellSize={60}
        color={colors.primary}
        gridColor={colors.foreground}
        gridOpacity={0}
        lightMode={resolvedTheme === "light"}
      />
    </div>
  )
}
