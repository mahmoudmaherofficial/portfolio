"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import dynamic from "next/dynamic"
import { useTheme } from "next-themes"

// Only fetched when the highlight layer renders, so touch devices never download it.
const CursorGrid = dynamic(() => import("@/components/CursorGrid"), {
  ssr: false,
})

type GridColors = { primary: string; foreground: string }

/** Only mouse/trackpad users without a reduced-motion preference get the highlight layer. */
const SHOW_HIGHLIGHTS =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"

function subscribeShowHighlights(onChange: () => void) {
  const query = window.matchMedia(SHOW_HIGHLIGHTS)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** False on the server so nothing extra renders before hydration. */
function useShowHighlights(): boolean {
  return useSyncExternalStore(
    subscribeShowHighlights,
    () => window.matchMedia(SHOW_HIGHLIGHTS).matches,
    () => false
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
  const showHighlights = useShowHighlights()
  const [colors, setColors] = useState<GridColors | null>(null)

  useEffect(() => {
    if (!resolvedTheme) return
    // Wait a frame so the theme class is applied before reading the tokens.
    const frame = requestAnimationFrame(() => setColors(readThemeColors()))
    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])

  // Touch devices and reduced motion keep only the hero's static CSS grid.
  if (!showHighlights || !colors) return null

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <CursorGrid
        className="absolute inset-0"
        cellSize={60}
        color={colors.primary}
        gridColor={colors.foreground}
        gridOpacity={0}
        fillOpacity={0.03}
        maxOpacity={0.2}
        spotlight={0.4}
        intro={true}
        radius={90}
        lightMode={resolvedTheme === "light"}
      />
    </div>
  )
}
