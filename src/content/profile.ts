import type { Profile } from "@/lib/types"

export const profile: Profile = {
  name: "Mahmoud Maher",
  title: "Front-End Developer",
  bio: "I build fast web apps with Next.js, React and TypeScript, from a client dashboard used daily by a 25+ person team to bilingual Arabic/English websites.",
  location: "Menofia, Egypt",
  timezone: "Cairo time (EET)",
  availability: "Open to remote & relocation (Gulf)",
  resumePath: "/Mahmoud-Maher-Resume.pdf",
  about: [
    "I'm a front-end developer focused on Next.js, React and TypeScript. Since 2024 I've delivered 10+ projects for clients: admin dashboards, management systems, company websites and e-commerce stores, mostly replacing paper and Excel workflows with tools teams actually use every day.",
    "I started with a front-end internship at NTG Clarity, building role-based dashboards for a hospital management system. Since then I've owned projects end to end, so I'm comfortable working with the backend and deployment side when a project needs it (NestJS, Express, MongoDB, MySQL, Docker).",
    "What I care about: clean, typed code, interfaces that are fast and easy to use, and shipping on time.",
  ],
  repoUrl: "https://github.com/mahmoudmaherofficial/portfolio",
  photo: { src: "/me.png", width: 635, height: 843 },
}
