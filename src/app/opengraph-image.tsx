import { ImageResponse } from "next/og"

import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { loadGoogleFont } from "@/lib/google-font"
import { profileCodeLines, type CodeTokenKind } from "@/lib/profile-code"

export const alt = `${profile.name} - ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Dark-theme colors from globals.css. Satori (next/og) can't read CSS variables
 * or oklch(), so they are written out as hex here.
 */
const colors = {
  background: "#0a0a0a",
  pane: "#121212",
  chrome: "#0f0f0f",
  foreground: "#fafafa",
  muted: "#a1a1a1",
  gutter: "#4a4f59",
  accent: "#00d492",
  accentForeground: "#002c22",
  keyword: "#b9a7f0",
  string: "#f1c98a",
  comment: "#8f95a3",
  line: "rgba(255, 255, 255, 0.1)",
  grid: "rgba(255, 255, 255, 0.055)",
  highlight: "rgba(0, 212, 146, 0.1)",
}

const tokenColor: Record<CodeTokenKind, string> = {
  keyword: colors.keyword,
  type: colors.accent,
  key: colors.foreground,
  string: colors.string,
  plain: colors.foreground,
}

const STATUS_HEIGHT = 48

/** lucide's git-branch icon, drawn as SVG because Geist has no ⎇ glyph. */
function BranchIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  )
}

/**
 * The share preview, in the site's editor style: the name and role on the left, the
 * profile.ts card from the hero on the right, and the status bar along the bottom.
 */
export default async function OpengraphImage() {
  const host = new URL(site.url).host
  const lines = profileCodeLines(profile)
  const highlight = lines.findIndex((line) =>
    line.some((token) => token.kind === "key" && token.text === "availability")
  )
  const [firstName, ...lastNames] = profile.name.split(" ")
  const statusLeft = ["open-to-work", profile.timezone, "TypeScript"]

  const codeText = lines.flat().map((token) => token.text).join("")
  const monoText = `${site.logo}const role = "${profile.title}"profile.tsresume.pdfTSPDF${statusLeft.join("")}${host}${codeText}0123456789`

  const [sans, mono, monoBold] = await Promise.all([
    loadGoogleFont("Geist", 600, profile.name),
    loadGoogleFont("Geist+Mono", 400, monoText),
    loadGoogleFont("Geist+Mono", 700, "open-to-workTSPDF"),
  ])

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: colors.background,
        backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        color: colors.foreground,
        fontFamily: "Geist Mono",
      }}
    >
      {/* Soft accent glow behind the code card. */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -160,
          width: 700,
          height: 700,
          display: "flex",
          backgroundImage:
            "radial-gradient(circle at center, rgba(0, 212, 146, 0.16) 0%, rgba(0, 212, 146, 0) 50%)",
        }}
      />

      {/* Left: logo, badge, name and role. */}
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 64,
          bottom: STATUS_HEIGHT + 48,
          width: 430,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 30 }}>
          {site.logo.replace(/\.$/, "")}
          <span style={{ color: colors.accent }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 44,
              padding: "0 16px",
              borderRadius: 8,
              backgroundColor: colors.accent,
              color: colors.accentForeground,
              fontWeight: 700,
              fontSize: 22,
              alignSelf: "flex-start",
            }}
          >
            <BranchIcon size={22} color={colors.accentForeground} />
            open-to-work
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontFamily: "Geist",
              fontSize: 92,
              lineHeight: 0.98,
              letterSpacing: -3,
            }}
          >
            <span>{firstName}</span>
            <span>{lastNames.join(" ")}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.6em",
              marginTop: 24,
              fontSize: 21,
              color: colors.muted,
            }}
          >
            {/* Satori drops spaces at span edges, so the gap stands in for them. */}
            <span style={{ color: colors.keyword }}>const</span>
            <span>role =</span>
            <span style={{ color: colors.string }}>
              &quot;{profile.title}&quot;
            </span>
          </div>
        </div>
      </div>

      {/* Right: the hero's profile.ts card. */}
      <div
        style={{
          position: "absolute",
          right: 56,
          top: 80,
          width: 624,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(0, 212, 146, 0.3)",
          borderRadius: 12,
          backgroundColor: colors.pane,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0, 212, 146, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 46,
            backgroundColor: colors.chrome,
            borderBottom: `1px solid ${colors.line}`,
          }}
        >
          <div style={{ display: "flex", gap: 8, padding: "0 18px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#333",
                }}
              />
            ))}
          </div>
          <Tab label="profile.ts" icon="TS" iconColor="#4b8fd8" active />
          <Tab label="resume.pdf" icon="PDF" iconColor="#e5534b" />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px 0 20px",
            fontSize: 17,
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                height: 36,
                alignItems: "center",
                backgroundColor:
                  i === highlight ? colors.highlight : "transparent",
                borderLeft: `3px solid ${i === highlight ? colors.accent : "transparent"}`,
              }}
            >
              <span
                style={{
                  width: 40,
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 16,
                  color: i === highlight ? colors.accent : colors.gutter,
                }}
              >
                {i + 1}
              </span>
              <span style={{ display: "flex", whiteSpace: "pre" }}>
                {line.map((token, j) => (
                  <span key={j} style={{ color: tokenColor[token.kind] }}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar, like the one fixed to the bottom of the site. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: STATUS_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          backgroundColor: colors.accent,
          color: colors.accentForeground,
          fontSize: 19,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {statusLeft.map((item, i) => (
            <div
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {i === 0 && (
                <BranchIcon size={18} color={colors.accentForeground} />
              )}
              {item}
            </div>
          ))}
        </div>
        <span>{host}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Geist Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    }
  )
}

function Tab({
  label,
  icon,
  iconColor,
  active = false,
}: {
  label: string
  icon: string
  iconColor: string
  active?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: "100%",
        padding: "0 18px",
        fontSize: 17,
        borderRight: `1px solid ${colors.line}`,
        backgroundColor: active ? colors.pane : "transparent",
        borderBottom: `2px solid ${active ? colors.accent : "transparent"}`,
        color: active ? colors.foreground : colors.muted,
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: iconColor }}>
        {icon}
      </span>
      {label}
    </div>
  )
}
