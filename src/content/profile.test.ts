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

test("about copy matches the brief verbatim", () => {
  assert.deepEqual(profile.about, [
    "I'm a front-end developer focused on Next.js, React and TypeScript. Since 2024 I've delivered 10+ projects for clients: admin dashboards, management systems, company websites and e-commerce stores, mostly replacing paper and Excel workflows with tools teams actually use every day.",
    "I started with a front-end internship at NTG Clarity, building role-based dashboards for a hospital management system. Since then I've owned projects end to end, so I'm comfortable working with the backend and deployment side when a project needs it (NestJS, Express, MongoDB, MySQL, Docker).",
    "What I care about: clean, typed code, interfaces that are fast and easy to use, and shipping on time.",
  ])
})

test("links to the portfolio's public repo", () => {
  assert.equal(
    profile.repoUrl,
    "https://github.com/mahmoudmaherofficial/portfolio"
  )
})

test("profile photo points at public/me.webp", () => {
  assert.equal(profile.photo.src, "/me.webp")
  assert.equal(profile.photo.width, 720)
  assert.equal(profile.photo.height, 960)
})
