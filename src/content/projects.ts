import type { Project } from "@/lib/types"

export const projectsIntro =
  "Selected client and personal work: dashboards, management systems and bilingual websites."

/**
 * A card renders only when it has a title, summary, tech list and at least one screenshot.
 * Fields still unconfirmed in the brief are left out until confirmed.
 */
export const projects: Project[] = [
  {
    slug: "sports-analytics",
    title: "Sports Performance Analytics Platform",
    type: "Client Project",
    role: "Sole Developer (full-stack)",
    summary:
      "Analytics platform for a UAE-based sports club, tracking 100+ athletes across multiple sports.",
    whatIDid:
      "Built the full platform alone: athlete profiles, data entry, KPI dashboards with Recharts, PDF/Excel export, and role-based access so each role sees only its data.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "NestJS",
      "Prisma",
      "MySQL",
      "Recharts",
    ],
    links: [],
    screenshots: [],
  },
  {
    slug: "metal-construction",
    title: "Corporate Website — Metal Construction Company",
    type: "Client Project",
    role: "Front-End Developer",
    summary:
      "Bilingual company website presenting the company's services and projects.",
    whatIDid:
      "Built a fully bilingual Arabic/English site with RTL support, SEO setup, and handled deployment and launch.",
    tech: ["Next.js", "Tailwind CSS", "i18n / RTL", "SEO"],
    links: [],
    screenshots: [],
  },
  {
    slug: "activity-watcher",
    title: "Activity Watcher",
    type: "Client Project",
    role: "Full-Stack Developer",
    summary: "Team activity tracker used daily by a team of 25+ members.",
    challenge:
      "The team needed one place to log tasks and activity and give managers a clear view, running on their own server.",
    whatIDid:
      "Built secure auth with JWT access/refresh tokens in HTTP-only cookies and role-based access (Admin/Member), dashboards with charts, and search, filters and pagination. Deployed with Docker on the client's server.",
    tech: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Recharts",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
    ],
    links: [],
    screenshots: [],
  },
  {
    slug: "alarab-erp",
    title: "Alarab ERP",
    type: "Client Project (freelance)",
    badge: "In development",
    summary: "ERP system for Alarab, currently in development.",
    tech: ["GitHub Actions"],
    links: [],
    screenshots: [],
  },
  {
    slug: "luxelane",
    title: "LuxeLane",
    type: "Personal Project",
    role: "Full-Stack Developer",
    summary:
      "Full-stack e-commerce store with a searchable product catalog and user accounts.",
    whatIDid:
      "Built the Next.js front end and a REST API with Express.js and MongoDB, including authentication, role-based authorization, and search, filter, sort and pagination.",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Vercel",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mahmoudmaherofficial/luxelane-frontend",
      },
    ],
    screenshots: [],
  },
]
