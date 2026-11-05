import { ImageResponse } from "next/og"

import { loadGoogleFont } from "@/lib/google-font"

const LETTER = "M"
const BACKGROUND = "#0a0a0a"
const ACCENT = "#00d492"

/**
 * An "M" followed by a terminal cursor, in the accent color on the dark theme background,
 * as a square PNG. One letter stays legible at 16px, where "MM" blurred together.
 */
export async function monogramIcon(size: number, radius: number) {
  const font = await loadGoogleFont("Geist+Mono", 700, LETTER)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BACKGROUND,
        borderRadius: radius,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: size * 0.03,
          // The cursor sits on the baseline; nudge the pair down so it looks centered.
          marginTop: size * 0.06,
        }}
      >
        <span
          style={{
            color: ACCENT,
            fontFamily: "Geist Mono",
            fontSize: size * 0.62,
            lineHeight: 1,
          }}
        >
          {LETTER}
        </span>
        <span
          style={{
            width: size * 0.2,
            height: Math.max(2, Math.round(size * 0.09)),
            marginBottom: size * 0.1,
            backgroundColor: ACCENT,
          }}
        />
      </div>
    </div>,
    {
      width: size,
      height: size,
      fonts: [{ name: "Geist Mono", data: font, weight: 700, style: "normal" }],
    }
  )
}
