# CLAUDE.md — Mahmoud Maher Portfolio

## 1. Project Overview

Personal portfolio for Mahmoud Maher, Front-End Developer.

- **Audience:** recruiters hiring Front-End Developers in Egypt and the Gulf (remote or relocation).
- **Goal:** show production client work (dashboards, management systems, bilingual websites) and get recruiters to download the resume or make contact.
- **Language:** English only.
- **Domain:** https://mahmoudmaher.site (hosted on Vercel).
- **Routes:** `/` only, a single scrollable page. Project screenshots open in a lightbox. No `/projects/[slug]` detail pages for now; they will be added later only once each project has detail-page content in the content files.
- **The repo is public.** It is Mahmoud's public TypeScript code sample, so code quality, the README and git history are part of the portfolio.

## 2. Content Rules (most important)

### Source of truth

- **Initial build:** `PORTFOLIO_DATA.md` is the only source of content. Copy it into `src/content/*.ts`.
- **After the initial build:** `src/content/*.ts` is the single source of truth. `PORTFOLIO_DATA.md` is frozen as the original brief and is not kept in sync.
- Never invent skills, metrics, clients, dates, links or features. If something is missing, ask.

### Unconfirmed values

- A value is **unconfirmed** if it is marked `[ ]` or wrapped in square brackets (e.g. `` `[2025]` ``).
- Unconfirmed values are never rendered. Hide the **field**, not the whole item, unless a required field is missing.
- A project card renders only when all of these are confirmed: **title, summary, tech list, and at least one screenshot**. Otherwise the whole card is hidden. Missing optional fields (date, Challenge, What I did, links) just hide that field.
- The "Download Resume" button renders only when the resume PDF exists in `public/`.
- Never ship `[ ]`, TODOs or internal notes to the site. No "coming soon" or "under construction" sections.

### Wording rules

- Every skill on the site must map to a project that uses it. Framer Motion maps to this portfolio's public repo.
- No emojis in headings. Never use the word "junior".
- Client names and logos stay hidden wherever the content says so. Screenshots must have client names/logos removed before they are added to the repo.
- Never display the phone number. WhatsApp is a link only.
- The site links to its own GitHub repo in the footer ("Source code") and in the About section.

## 3. Stack and Conventions

- **Framework:** Next.js (App Router), TypeScript with `strict: true`.
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI, `base-nova` style). Do not switch to Radix.
- **Fonts:** Geist Sans + Geist Mono via `next/font`.
- **Motion:** Framer Motion.
- **Theme:** `next-themes`.
- **Package manager:** npm.
- **Content:** typed data in `src/content/*.ts`, read in Server Components. The page is statically generated. No runtime data fetching for content.

### Contact

- Links only (email, WhatsApp, LinkedIn, GitHub), from `src/content/contact.ts`. No contact form and no API routes.

### Environment variables

- The site needs none. If one is ever added, keep it server-only (never prefix secrets with `NEXT_PUBLIC_`) and list its name in `.env.example`.
- Never commit `.env`, `.env.local` or any `.env*.local` file. They must be in `.gitignore`.

### Folder structure

```
src/
├── app/                  # layout, page, metadata, opengraph-image, sitemap, robots
├── components/
│   ├── sections/         # Hero, About, Skills, Projects, Experience, Contact
│   └── ui/               # shadcn/ui components
├── content/              # typed content: profile.ts, projects.ts, skills.ts, experience.ts
└── lib/                  # utils, types, motion helpers
public/                   # me.webp, favicon.png, resume PDF, projects/<slug>/
```

### Naming

- Components: `PascalCase.tsx`. Hooks: `useThing.ts`. Other files: `kebab-case.ts`.
- Project slugs and image folders: `kebab-case` (e.g. `sports-analytics`).
- Server Components by default. Add `"use client"` only to leaf components that need it.

## 4. Design Rules

- **Direction:** dev / technical. Geist Mono for labels, tags, meta lines and section numbers; grid lines and subtle technical details; one accent color.
- **Dark mode:** follows the system by default, with a manual toggle. Both themes must meet contrast requirements.
- Header and footer use the same nav links.

### Components (ReactBits first)

- Before building any UI piece (cards, backgrounds, text effects, animated or interactive components, etc.), search the `@react-bits` registry with the shadcn MCP (`search_items_in_registries`) for components that fit. Fall back to `@shadcn`, then custom code, only when nothing suitable exists.
- Pick only components that match the design direction above (dev / technical, one accent color). Don't add effects for their own sake.
- Always use the `-TS-TW` variant (TypeScript + Tailwind), e.g. `npx shadcn@latest add @react-bits/SpotlightCard-TS-TW`.
- Finish every added component so it fully fits the project:
  - Theme tokens and the accent color instead of hardcoded colors, in both light and dark mode.
  - The Motion rules below (`LazyMotion` + `m`, `data-motion`, reduced motion, nothing animated on the LCP element).
  - A `"use client"` leaf only, typed under `strict`, accessible (keyboard, focus, alt text), and passing typecheck, lint and build.
- If a component needs a new dependency (e.g. `gsap`, `three`, `ogl`), ask before installing it.
- Canvas / WebGL backgrounds must keep Lighthouse at 90+: load lazily, pause when off-screen, and show a static fallback under `prefers-reduced-motion`.
- Name the ReactBits component(s) used in the PR description.

### Motion

Rich, using Framer Motion, with these constraints:

- Use `LazyMotion` with `domAnimation` and `m` components, not `motion`.
- Motion lives in client leaf components only. Sections stay Server Components.
- The LCP element (hero name + title) renders without an entrance animation.
- Always respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`).
- Entrance animations use `whileInView` and are applied to below-the-fold elements only.
  - **Exception — Hero:** everything in the Hero except the name, title and bio (the bio is the mobile LCP) may use a short mount-time entrance (`animate`, not `whileInView`), via `src/components/motion/FadeIn.tsx`.
- **Content must be readable without JS.** Framer Motion server-renders `initial` states as inline styles (e.g. `opacity: 0`), so every animated wrapper gets a `data-motion` attribute, and the root layout includes:

  ```html
  <noscript>
    <style>[data-motion]{opacity:1!important;transform:none!important}</style>
  </noscript>
  ```

## 5. Quality Bar

- **Lighthouse:** 90+ in Performance, Accessibility, Best Practices and SEO, on mobile.
- **Accessibility (WCAG AA basics):** color contrast, full keyboard navigation (including the lightbox), visible focus states, alt text on every image, semantic headings, labelled form fields.
- **Images:** `next/image` with explicit sizes. 3–4 screenshots per project.
- **SEO:** page metadata, dynamic OG image via `next/og` (`src/app/opengraph-image.tsx`, no hand-made static OG file), `sitemap.ts`, `robots.ts`.
  - Title: `Mahmoud Maher - Front-End Developer`.

### Public repo rules

- No secrets, API keys or `.env*.local` files in the repo or its history.
- No client screenshots that still show client names or logos.
- A proper `README.md`: what the site is, stack, key decisions (static content, motion approach), and how to run it locally.
- Clean, meaningful commit history (see Git below).

## 6. Workflow

### Scripts

`package.json` must have:

```json
"dev": "next dev",
"build": "next build",
"start": "next start",
"lint": "eslint .",
"typecheck": "tsc --noEmit"
```

Use `eslint .` directly (`next lint` was removed in Next.js 16). Run `npm run typecheck`, `npm run lint` and `npm run build` before saying any task is done.

### No tests

- Do not write automated tests (unit, integration or e2e), add `*.test.ts` / `*.spec.ts` files, a `test` script or a test framework.
- Verify changes with `typecheck`, `lint`, `build` and a check in the browser instead.

### Git

- `main` is production (deployed to the domain). `develop` is the integration branch.
- Every change, however small, follows this flow:
  1. Create a new branch from the latest `develop`.
  2. Commit the change on that branch and push it.
  3. Open a PR into `develop`.
  4. Merge the PR, then delete the branch.
- Never commit directly to `develop` or `main`. Release by opening a PR from `develop` into `main`.
- Branch names: `feat/...`, `fix/...`, `content/...`, `chore/...`.
- No AI attribution anywhere: no `Co-Authored-By: Claude` trailers in commits and no "Generated with Claude Code" lines in PR titles, descriptions or comments.
- Commits follow Conventional Commits: `feat:`, `fix:`, `content:`, `style:`, `refactor:`, `chore:`.
- Vercel preview deployments are used to review PRs.

### Claude must ask before

- **Rewording or adding content.** Copying text verbatim from `PORTFOLIO_DATA.md` (initial build) or moving existing content between files is allowed without asking. Any rewording, new copy, or new facts needs approval.
- Installing any new dependency.
- Committing or pushing.
- Changing design tokens (colors, fonts, spacing) or the layout/section order.
