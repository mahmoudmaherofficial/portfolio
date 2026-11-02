import type { Profile } from "@/lib/types"

export type CodeTokenKind = "keyword" | "type" | "key" | "string" | "plain"
export type CodeToken = { kind: CodeTokenKind; text: string }
export type CodeLine = CodeToken[]

/** Fields shown in the hero's code card, in source order. */
const FIELDS = [
  "name",
  "title",
  "location",
  "timezone",
  "availability",
] as const

/**
 * Renders the profile as syntax-tagged lines that mirror `src/content/profile.ts`,
 * so the hero's code card always shows the real values.
 */
export function profileCodeLines(profile: Profile): CodeLine[] {
  const open: CodeLine = [
    { kind: "keyword", text: "export" },
    { kind: "plain", text: " " },
    { kind: "keyword", text: "const" },
    { kind: "plain", text: " profile: " },
    { kind: "type", text: "Profile" },
    { kind: "plain", text: " = {" },
  ]
  const fields = FIELDS.map((key): CodeLine => [
    { kind: "plain", text: "  " },
    { kind: "key", text: key },
    { kind: "plain", text: ": " },
    { kind: "string", text: JSON.stringify(profile[key]) },
    { kind: "plain", text: "," },
  ])
  return [open, ...fields, [{ kind: "plain", text: "}" }]]
}
