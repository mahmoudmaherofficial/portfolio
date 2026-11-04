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
  footerTagline: "Front-End Developer · Next.js, React, TypeScript",
}
