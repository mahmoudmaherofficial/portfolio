import type { Profile } from "@/lib/types"

export const profile: Profile = {
  name: "Mahmoud Maher",
  title: "Front-End Developer",
  stack: ["Next.js", "React", "TypeScript"],
  shipped: "10+ client projects",
  bio: "I build dashboards and bilingual web apps with Next.js, React and TypeScript. My work includes an analytics platform for a UAE sports club and a tracker a 25+ person team uses every day.",
  location: "Menofia, Egypt",
  timezone: "Cairo time (EET)",
  availability: "Open to remote & relocation (Gulf)",
  availabilityShort: "Open to work",
  resumePath: "/Mahmoud-Maher-Resume.pdf",
  about: [
    "Hi, I'm Mahmoud. I'm a front-end developer in Egypt, and I build the tools teams run their work on: admin dashboards, management systems, company websites and e-commerce stores.",
    "I started in July 2024 with an internship at NTG Clarity, building role-based dashboards for a hospital management system. Since then I've shipped 10+ projects for clients as a freelancer, often replacing paper and Excel with tools people open every day. I owned most of them end to end, so I'm comfortable with the backend and deployment too (NestJS, Express, MongoDB, MySQL, Docker).",
    "I care about typed, readable code, interfaces that feel fast, and shipping when I said I would.",
  ],
  repoUrl: "https://github.com/mahmoudmaherofficial/portfolio",
  photo: { src: "/avatar.webp", width: 720, height: 960 },
}
