import { test } from "node:test"
import assert from "node:assert/strict"

import { profile } from "./profile.ts"

test("profile matches the brief verbatim", () => {
  assert.equal(profile.name, "Mahmoud Maher")
  assert.equal(profile.title, "Front-End Developer")
  assert.equal(
    profile.bio,
    "I build fast web apps with Next.js, React and TypeScript, from a client dashboard used daily by a 25+ person team to bilingual Arabic/English websites."
  )
  assert.equal(profile.resumePath, "/Mahmoud-Maher-Resume.pdf")
})

test("meta line parts join to the brief's meta line", () => {
  assert.equal(
    [profile.location, profile.timezone, profile.availability].join(" · "),
    "Menofia, Egypt · Cairo time (EET) · Open to remote & relocation (Gulf)"
  )
})
