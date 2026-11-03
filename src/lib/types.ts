export type Profile = {
  name: string
  title: string
  bio: string
  location: string
  timezone: string
  availability: string
  /** URL path of the resume PDF under `public/`, starting with "/". */
  resumePath: string
  /** Paragraphs of the About section. */
  about: string[]
  /** URL of this portfolio's public GitHub repo. */
  repoUrl: string
  /** Profile photo under `public/`, with its intrinsic size. */
  photo: { src: string; width: number; height: number }
}

export type ExperienceEntry = {
  role: string
  /** Omitted for freelance work. */
  company?: string
  /** Display period, e.g. "Oct 2024 – Present". */
  period: string
  summary: string
  tech: string[]
}

export type NavItem = {
  /** Id of the page section this link scrolls to. */
  id: string
  label: string
}

export type Site = {
  /** Monogram shown in the header and footer; links to the hero. */
  logo: string
  /** Every nav link, in page order. Only links to rendered sections are shown. */
  nav: NavItem[]
  footerTagline: string
}

export type Skill = {
  name: string
  /** Where the skill can be seen in use, e.g. a repo. Omit when there is nothing to link. */
  href?: string
}

export type SkillGroup = {
  name: string
  skills: Skill[]
  /** A link that shows the group's skills in use. */
  proof?: { label: string; href: string }
}

export type Screenshot = {
  /** Path under `public/projects/<slug>/`, starting with "/". */
  src: string
  width: number
  height: number
  alt: string
}

export type Project = {
  slug: string
  title: string
  /** e.g. "Client Project" or "Personal Project". */
  type: string
  role?: string
  date?: string
  /** Shown in place of the date, e.g. "In development". */
  badge?: string
  summary: string
  challenge?: string
  whatIDid?: string
  tech: string[]
  links: { label: string; href: string }[]
  screenshots: Screenshot[]
}
