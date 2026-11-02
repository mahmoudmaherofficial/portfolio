import { test } from "node:test"
import assert from "node:assert/strict"

import { profile } from "../content/profile.ts"
import { profileCodeLines } from "./profile-code.ts"

const text = (line: { text: string }[]) => line.map((t) => t.text).join("")

test("renders the profile as the real profile.ts source", () => {
  assert.deepEqual(profileCodeLines(profile).map(text), [
    "export const profile: Profile = {",
    '  name: "Mahmoud Maher",',
    '  title: "Front-End Developer",',
    '  location: "Menofia, Egypt",',
    '  timezone: "Cairo time (EET)",',
    '  availability: "Open to remote & relocation (Gulf)",',
    "}",
  ])
})

test("takes values from the profile it is given", () => {
  const lines = profileCodeLines({ ...profile, title: "X" }).map(text)
  assert.equal(lines[2], '  title: "X",')
})

test("tags keywords, type, keys and strings for highlighting", () => {
  const [first, second] = profileCodeLines(profile)
  assert.deepEqual(
    first.filter((t) => t.kind !== "plain").map((t) => [t.kind, t.text]),
    [
      ["keyword", "export"],
      ["keyword", "const"],
      ["type", "Profile"],
    ]
  )
  assert.deepEqual(
    second
      .filter((t) => t.kind === "key" || t.kind === "string")
      .map((t) => [t.kind, t.text]),
    [
      ["key", "name"],
      ["string", '"Mahmoud Maher"'],
    ]
  )
})
