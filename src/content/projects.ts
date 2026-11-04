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
    screenshots: [
      {
        src: "/projects/sports-analytics/01-dashboard.webp",
        width: 1920,
        height: 1080,
        alt: "Dashboard with this month's performance KPIs, a six-month average KPI chart, top performers and players to watch",
      },
      {
        src: "/projects/sports-analytics/02-login.webp",
        width: 1920,
        height: 1080,
        alt: "Sign-in page with a fencer photo and the platform's Achieve, Develop, Analyze tagline",
      },
      {
        src: "/projects/sports-analytics/03-reports.webp",
        width: 1920,
        height: 1080,
        alt: "Monthly reports ranking players by final KPI, with training attendance and physical test scores",
      },
      {
        src: "/projects/sports-analytics/04-championships.webp",
        width: 1920,
        height: 1080,
        alt: "Championships list with each event's level, dates, medal result and delegation size",
      },
    ],
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
    links: [{ label: "Live site", href: "https://alarab-construction.com/" }],
    screenshots: [
      {
        src: "/projects/metal-construction/01-hero.webp",
        width: 1920,
        height: 908,
        alt: "English homepage hero with a construction site photo and a Request a Quote button",
      },
      {
        src: "/projects/metal-construction/02-home-arabic.webp",
        width: 1920,
        height: 1080,
        alt: "Arabic homepage in a right-to-left layout, with workers on site in the hero photo",
      },
      {
        src: "/projects/metal-construction/03-production-line.webp",
        width: 1920,
        height: 1080,
        alt: "Production line section listing the company's fabrication lines next to factory photos",
      },
      {
        src: "/projects/metal-construction/04-projects.webp",
        width: 1920,
        height: 1080,
        alt: "Projects section with category filters and cards for completed projects",
      },
    ],
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
    screenshots: [
      {
        src: "/projects/activity-watcher/01-activity-overview.webp",
        width: 1919,
        height: 1079,
        alt: "Activity page for one user: date filters, weekly totals and a chart of active hours per day",
      },
      {
        src: "/projects/activity-watcher/02-application-usage-dark.webp",
        width: 1919,
        height: 1079,
        alt: "Dark mode view of daily work versus idle time and the top applications by active time",
      },
      {
        src: "/projects/activity-watcher/03-top-users.webp",
        width: 1919,
        height: 1079,
        alt: "Overview dashboard ranking users by working and idle hours, with names blurred",
      },
      {
        src: "/projects/activity-watcher/04-departments.webp",
        width: 1919,
        height: 1079,
        alt: "Departments page with user counts per department and a distribution pie chart",
      },
    ],
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
      { label: "Live site", href: "https://luxelanestore.vercel.app/" },
      {
        label: "GitHub",
        href: "https://github.com/mahmoudmaherofficial/luxelane-frontend",
      },
    ],
    screenshots: [
      {
        src: "/projects/luxelane/01-storefront-hero.webp",
        width: 1919,
        height: 1076,
        alt: "Storefront hero with a clothing store photo and a Discover Now button",
      },
      {
        src: "/projects/luxelane/02-favorites.webp",
        width: 1919,
        height: 1079,
        alt: "Our Favorites product carousel with prices, discounts and color options",
      },
      {
        src: "/projects/luxelane/03-admin-dashboard.webp",
        width: 1915,
        height: 1077,
        alt: "Admin dashboard home with cards for products, orders, customers, analytics, payments and settings",
      },
      {
        src: "/projects/luxelane/04-products.webp",
        width: 1919,
        height: 1079,
        alt: "Admin products table with category, price, discount, stock, sizes and colors",
      },
    ],
  },
]
