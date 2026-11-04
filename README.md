# Mahmoud Maher - Front-End Developer

I build fast web apps with Next.js, React and TypeScript, from a client dashboard used daily by a 25+ person team to bilingual Arabic/English websites.

**[Live site](https://mahmoudmaher.site)** · **[Resume (PDF)](https://mahmoudmaher.site/Mahmoud-Maher-Resume.pdf)** · **[LinkedIn](https://www.linkedin.com/in/mahmoudmaherofficial2/)** · **[Email](mailto:mahmoudmaherofficial@gmail.com)**

Menofia, Egypt · Cairo time (EET) · Open to remote & relocation (Gulf)

![Hero section of mahmoudmaher.site](.github/images/hero.png)

## About

I'm a front-end developer focused on Next.js, React and TypeScript. Since 2024 I've delivered 10+ projects for clients: admin dashboards, management systems, company websites and e-commerce stores, mostly replacing paper and Excel workflows with tools teams actually use every day.

I started with a front-end internship at NTG Clarity, building role-based dashboards for a hospital management system. Since then I've owned projects end to end, so I'm comfortable working with the backend and deployment side when a project needs it (NestJS, Express, MongoDB, MySQL, Docker).

What I care about: clean, typed code, interfaces that are fast and easy to use, and shipping on time.

## Selected work

### Sports Performance Analytics Platform

_Client Project · Sole Developer (full-stack)_

Analytics platform for a UAE-based sports club, tracking 100+ athletes across multiple sports. Built the full platform alone: athlete profiles, data entry, KPI dashboards with Recharts, PDF/Excel export, and role-based access so each role sees only its data.

`Next.js` `TypeScript` `Tailwind CSS` `shadcn/ui` `NestJS` `Prisma` `MySQL` `Recharts`

### Activity Watcher

_Client Project · Full-Stack Developer_

Team activity tracker used daily by a team of 25+ members. Built secure auth with JWT access/refresh tokens in HTTP-only cookies and role-based access (Admin/Member), dashboards with charts, and search, filters and pagination. Deployed with Docker on the client's server.

`Next.js` `TypeScript` `TanStack Query` `React Hook Form` `Zod` `Recharts` `Node.js` `Express.js` `MongoDB` `Docker`

### Corporate Website — Metal Construction Company

_Client Project · Front-End Developer_

Bilingual company website presenting the company's services and projects. Built a fully bilingual Arabic/English site with RTL support, SEO setup, and handled deployment and launch.

`Next.js` `Tailwind CSS` `i18n / RTL` `SEO`

### LuxeLane

_Personal Project · Full-Stack Developer · [GitHub](https://github.com/mahmoudmaherofficial/luxelane-frontend)_

Full-stack e-commerce store with a searchable product catalog and user accounts. Built the Next.js front end and a REST API with Express.js and MongoDB, including authentication, role-based authorization, and search, filter, sort and pagination.

`Next.js` `Tailwind CSS` `Node.js` `Express.js` `MongoDB` `Vercel`

## Experience

**Freelance Front-End Developer** · Oct 2024 – Present
10+ client projects: dashboards, management systems, company websites and e-commerce stores.

**Front-End Intern, NTG Clarity** · Jul 2024 – Sep 2024
Built role-based dashboards (admin/doctor/patient), appointment booking, and protected routes for a hospital management system in a team of 4, using React and a REST API.

## Skills

- **Front-End:** React, Next.js (App Router, SSR/SSG), TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Recharts
- **Backend:** Node.js, Express.js, NestJS, MongoDB, MySQL, Prisma, REST APIs, JWT auth
- **Tooling:** Git, GitHub Actions, Docker, Vercel
- **Motion:** Framer Motion (used in this repo)

## Contact

- Email: [mahmoudmaherofficial@gmail.com](mailto:mahmoudmaherofficial@gmail.com)
- [WhatsApp](https://wa.me/201093931501)
- [LinkedIn](https://www.linkedin.com/in/mahmoudmaherofficial2/)
- [GitHub](https://github.com/mahmoudmaherofficial)

## About this repo

This repo is the source code of the site, and a public sample of how I write TypeScript.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui on Base UI, Framer Motion, hosted on Vercel.
- **Static, typed content:** everything on the page comes from typed files in [`src/content/`](src/content) and is prerendered at build time. There is no CMS, no API and no environment variables.
- **Motion with care:** Framer Motion via `LazyMotion` and `m` components, reduced-motion support, no entrance animation on the LCP element, and content that stays readable without JavaScript.
- **Quality:** accessible (keyboard navigation, focus states, contrast in both themes), SEO metadata with a dynamic OG image, and Lighthouse 90+ as the target.

Run it locally (Node.js 20.9+):

```bash
git clone https://github.com/mahmoudmaherofficial/portfolio.git
cd portfolio
npm install
npm run dev
```
