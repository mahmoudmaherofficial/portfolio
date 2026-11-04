import { profile } from "@/content/profile"
import type { SkillGroup } from "@/lib/types"

export const skillsIntro =
  "The tools I use to build and ship production web apps."

export const skillGroups: SkillGroup[] = [
  {
    name: "Front-End",
    skills: [
      { name: "React" },
      { name: "Next.js (App Router, SSR/SSG)" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "TanStack Query" },
      { name: "React Hook Form" },
      { name: "Zod" },
      { name: "Recharts" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "NestJS" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Prisma" },
      { name: "REST APIs" },
      { name: "JWT auth" },
    ],
  },
  {
    name: "Tooling",
    skills: [
      { name: "Git" },
      { name: "GitHub Actions" },
      { name: "Docker" },
      { name: "Vercel" },
    ],
  },
  {
    name: "Motion",
    skills: [{ name: "Framer Motion" }],
    proof: {
      label: "proof: this portfolio's public repo",
      href: profile.repoUrl,
    },
  },
]
