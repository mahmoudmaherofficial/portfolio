import type { ExperienceEntry, ImpactStat } from "@/lib/types"

export const experienceIntro =
  "Two years of shipping, from an internship to freelance client work I own end to end."

export const impactStats: ImpactStat[] = [
  {
    key: "clientProjects",
    value: 10,
    plus: true,
    note: "dashboards, management systems, websites, stores",
  },
  {
    key: "athletesTracked",
    value: 100,
    plus: true,
    note: "sports analytics platform, built solo",
  },
  {
    key: "dailyUsers",
    value: 25,
    plus: true,
    note: "Activity Watcher, on the client's own server",
  },
  {
    key: "firstCommit",
    value: "Jul 2024",
    note: "shipping production front ends since",
  },
]

/** Closing line of the log, shown as the message of the next commit. */
export const nextCommitMessage = "next role: your team"

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Front-End Developer",
    period: "Oct 2024 – Present",
    summary:
      "Built and shipped 10+ client projects end to end: dashboards, management systems, company websites and e-commerce stores.",
    shipped: ["sports-analytics", "activity-watcher", "metal-construction"],
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
    badge: "team of 4",
    summary:
      "Joined a team of 4 building a hospital management system with React and a REST API.",
    highlights: [
      "Role-based dashboards for admin, doctor and patient",
      "Appointment booking",
      "Protected routes",
    ],
    tech: ["React", "REST APIs", "Git"],
  },
]
