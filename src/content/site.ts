import type { Site } from "@/lib/types"

export const site: Site = {
  url: "https://mahmoudmaher.site",
  logo: "MM.",
  nav: [
    { id: "about", label: "About", file: "about.md", kind: "md" },
    { id: "projects", label: "Projects", file: "projects/", kind: "dir" },
    { id: "skills", label: "Skills", file: "skills.json", kind: "json" },
    {
      id: "experience",
      label: "Experience",
      file: "experience.log",
      kind: "log",
    },
    { id: "contact", label: "Contact", file: "contact.sh", kind: "sh" },
  ],
  metaDescription:
    "Front-end developer building dashboards and bilingual web apps with Next.js, React and TypeScript. Open to full-time roles: remote, in Egypt or in the Gulf.",
  footerTagline: "Front-End Developer · Next.js, React, TypeScript",
  footerSourceNote: "read the code behind this page",
}
