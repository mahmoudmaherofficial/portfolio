import type { ExperienceEntry } from "@/lib/types"

export const experienceIntro = "Where I've worked and what I shipped."

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Front-End Developer",
    period: "Oct 2024 – Present",
    summary:
      "10+ client projects: dashboards, management systems, company websites and e-commerce stores. Selected work in Projects above.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Node.js",
      "Express.js",
      "NestJS",
      "Prisma",
      "MongoDB",
      "MySQL",
      "Docker",
    ],
  },
  {
    role: "Front-End Intern",
    company: "NTG Clarity",
    period: "Jul 2024 – Sep 2024",
    summary:
      "Built role-based dashboards (admin/doctor/patient), appointment booking, and protected routes for a hospital management system in a team of 4, using React and a REST API.",
    tech: ["React", "REST APIs", "Git"],
  },
]
