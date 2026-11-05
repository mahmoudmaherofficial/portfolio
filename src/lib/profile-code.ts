import type { Profile } from "@/lib/types"

export type CodeTokenKind = "keyword" | "type" | "key" | "string" | "plain"
export type CodeToken = { kind: CodeTokenKind; text: string }
export type CodeLine = CodeToken[]

/** Fields shown in the hero's code card, in source order. */
const FIELDS = ["name", "title", "stack", "shipped", "availability"] as const

/** A string value as a string token; an array as `["a", "b"]` with each item tinted. */
function valueTokens(value: string | string[]): CodeToken[] {
  if (!Array.isArray(value))
    return [{ kind: "string", text: JSON.stringify(value) }]
  const items = value.flatMap((item, i): CodeToken[] => [
    ...(i > 0 ? [{ kind: "plain" as const, text: ", " }] : []),
    { kind: "string", text: JSON.stringify(item) },
  ])
  return [{ kind: "plain", text: "[" }, ...items, { kind: "plain", text: "]" }]
}

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
    ...valueTokens(profile[key]),
    { kind: "plain", text: "," },
  ])
  return [open, ...fields, [{ kind: "plain", text: "}" }]]
}
