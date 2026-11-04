# Mahmoud Maher - Portfolio

Source code for [mahmoudmaher.site](https://mahmoudmaher.site), my portfolio as a Front-End Developer. It is a single, statically generated page: hero, about, projects, skills, experience and contact.

![Hero section of mahmoudmaher.site in dark mode](.github/images/hero.png)

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript (`strict: true`)
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com)
- [Framer Motion](https://motion.dev) for animation
- [Embla Carousel](https://www.embla-carousel.com) for the project screenshot galleries
- `next-themes` for light/dark mode, Geist Sans and Geist Mono via `next/font`
- Hosted on Vercel

## Key decisions

### Static, typed content

All content lives in typed TypeScript files in [`src/content/`](src/content) (`profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`, `contact.ts`, `site.ts`) and is read in Server Components. There is no CMS and no runtime data fetching, so the whole page is prerendered at build time.

The content files also decide what renders:

- A project card only renders once it has at least one real screenshot. Dev and Vercel preview builds show labelled placeholders instead, so the layout can be reviewed; production never does.
- The "Download Resume" button only renders when the PDF exists in `public/`, checked at build time.

### Motion

- Framer Motion is loaded through `LazyMotion` with `domAnimation` and the lighter `m` components, and `MotionConfig reducedMotion="user"` respects the visitor's reduced-motion setting.
- Sections stay Server Components. Animation lives in small client components ([`src/components/motion/`](src/components/motion)).
- The hero name and title, the LCP element, render without an entrance animation. Below-the-fold content fades in on scroll with `whileInView`.
- Content stays readable without JavaScript: every animated wrapper has a `data-motion` attribute, and a `<noscript>` style in the root layout resets the server-rendered `opacity: 0`.

### Components

UI pieces start from the [ReactBits](https://reactbits.dev) registry where something fits, then get adapted to the theme tokens, motion rules and accessibility requirements:

- `SpotlightCard`: the cards in Experience, Skills, Projects and Contact
- `CursorGrid`: the interactive grid behind the hero, rendered only for fine pointers without reduced motion
- `ScrollStack`: the stacked project cards, rewritten to use normal window scroll (no scroll hijacking)

### Contact

Contact is links only (email, WhatsApp, LinkedIn, GitHub). There is no form or API route, so the site has no server code and needs no environment variables.

### SEO

Page metadata, a dynamic Open Graph image generated with `next/og` ([`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx)), `sitemap.ts` and `robots.ts`.

## Running locally

Requires Node.js 20.9 or later.

```bash
git clone https://github.com/mahmoudmaherofficial/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). No environment variables are needed.

## Scripts

| Script              | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Production build                  |
| `npm run start`     | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run format`    | Prettier                          |

## Project structure

```
src/
├── app/            # layout, page, OG image, sitemap, robots
├── components/
│   ├── sections/   # Hero, About, Projects, Skills, Experience, Contact
│   ├── layout/     # Header, Footer
│   ├── motion/     # Framer Motion client components
│   └── ui/         # shadcn/ui components
├── content/        # typed site content
└── lib/            # types and helpers
public/             # photo and resume PDF
```
