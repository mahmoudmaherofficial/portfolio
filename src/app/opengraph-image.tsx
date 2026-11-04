import { ImageResponse } from "next/og"

import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { loadGoogleFont } from "@/lib/google-font"

export const alt = `${profile.name} - ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Dark-theme colors from globals.css. Satori (next/og) can't read CSS variables
 * or oklch(), so they are written out as hex here.
 */
const colors = {
  background: "#0a0a0a",
  foreground: "#fafafa",
  muted: "#a1a1a1",
  accent: "#00d492",
  grid: "rgba(255, 255, 255, 0.06)",
}

export default async function OpengraphImage() {
  const host = new URL(site.url).host
  const sansText = `${profile.name}${profile.title}`
  const monoText = `${site.logo}${profile.availability}${host}`

  const [sans, mono] = await Promise.all([
    loadGoogleFont("Geist", 600, sansText),
    loadGoogleFont("Geist+Mono", 400, monoText),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: colors.background,
        backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        color: colors.foreground,
        fontFamily: "Geist Mono",
      }}
    >
      <div style={{ display: "flex", fontSize: 36 }}>{site.logo}</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, letterSpacing: -3 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            letterSpacing: -1,
            color: colors.accent,
          }}
        >
          {profile.title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: colors.muted,
        }}
      >
        <span>{profile.availability}</span>
        <span>{host}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  )
}
