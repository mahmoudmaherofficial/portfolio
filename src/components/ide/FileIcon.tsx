import type { FileKind } from "@/lib/types"
import { cn } from "@/lib/utils"

const ICONS: Record<FileKind, { glyph: string; className: string }> = {
  md: { glyph: "#", className: "text-syntax-string" },
  dir: { glyph: "◆", className: "text-primary" },
  json: { glyph: "{}", className: "text-syntax-keyword" },
  log: { glyph: "≡", className: "text-syntax-comment" },
  sh: { glyph: "$", className: "text-primary" },
  tsx: { glyph: "⚛", className: "text-syntax-keyword" },
  ts: { glyph: "TS", className: "text-syntax-keyword" },
  pdf: { glyph: "↓", className: "text-primary" },
}

export function FileIcon({
  kind,
  className,
}: {
  kind: FileKind
  className?: string
}) {
  const icon = ICONS[kind]
  return (
    <span
      aria-hidden="true"
      className={cn("font-mono select-none", icon.className, className)}
    >
      {icon.glyph}
    </span>
  )
}
