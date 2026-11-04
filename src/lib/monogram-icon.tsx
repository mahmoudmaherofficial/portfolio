import { ImageResponse } from "next/og"

import { loadGoogleFont } from "@/lib/google-font"

const TEXT = "MM"

/** The "MM" monogram in the accent color on the dark theme background, as a square PNG. */
export async function monogramIcon(size: number, radius: number) {
  const font = await loadGoogleFont("Geist+Mono", 700, TEXT)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        borderRadius: radius,
        color: "#00d492",
        fontFamily: "Geist Mono",
        fontSize: size * 0.44,
      }}
    >
      {TEXT}
    </div>,
    {
      width: size,
      height: size,
      fonts: [{ name: "Geist Mono", data: font, weight: 700, style: "normal" }],
    }
  )
}
