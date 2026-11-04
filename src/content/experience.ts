import type { ExperienceEntry, ImpactStat } from "@/lib/types"

export const experienceIntro = "Where I've worked and what I shipped."

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
      "10+ client projects: dashboards, management systems, company websites and e-commerce stores. Selected work in Projects above.",
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
      "Hospital management system built in a team of 4, using React and a REST API.",
    highlights: [
      "Role-based dashboards for admin, doctor and patient",
      "Appointment booking",
      "Protected routes",
    ],
    tech: ["React", "REST APIs", "Git"],
  },
]
