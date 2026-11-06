export type Profile = {
  name: string
  title: string
  /** Core stack, shown in the hero's code card. */
  stack: string[]
  /** Headline delivery count, shown in the hero's code card, e.g. "10+ client projects". */
  shipped: string
  bio: string
  location: string
  timezone: string
  availability: string
  /** Short availability for tight spaces, e.g. the mobile status bar. */
  availabilityShort: string
  /** URL path of the resume PDF under `public/`, starting with "/". */
  resumePath: string
  about: string[]
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
  /** Short scope label shown in the meta line, e.g. "team of 4". */
  badge?: string
  summary: string
  highlights?: string[]
  /** Slugs of projects shipped in this role. Only projects that render are listed. */
  shipped?: string[]
  tech: string[]
}

/** One headline number in the Experience section, shown as a JSON key and value. */
export type ImpactStat = {
  /** JSON-style key, e.g. "clientProjects". */
  key: string
  /** A number renders as a figure; a string renders as a quoted code string. */
  value: number | string
  /** Adds an accent "+" after a number, for "10+" style counts. */
  plus?: boolean
  /** Shown as a code comment under the value. */
  note: string
}

/** File types used by the editor chrome (tabs, Explorer, status bar). */
export type FileKind =
  "md" | "dir" | "json" | "log" | "sh" | "tsx" | "ts" | "pdf"

export type NavItem = {
  /** Id of the page section this link scrolls to. */
  id: string
  label: string
  /** File name shown in the editor chrome, e.g. "about.md". */
  file: string
  kind: FileKind
}

export type Site = {
  /** Production origin, used for canonical URLs, the sitemap and OG metadata. */
  url: string
  /** Monogram shown in the header and footer; links to the hero. */
  logo: string
  /** Every nav link, in page order. Only links to rendered sections are shown. */
  nav: NavItem[]
  metaDescription: string
  footerTagline: string
  /** Comment under the footer's repo link. */
  footerSourceNote: string
}

export type Skill = {
  name: string
  /** Name to look for in project tech lists when it differs from `name`, e.g. "Next.js". */
  match?: string
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

export type ContactChannel = {
  /** Shown as the link text (e.g. the email address, or "WhatsApp"). */
  label: string
  /** Name of the channel, shown as the key in the contact object. */
  kind: "email" | "whatsapp" | "linkedin" | "github"
  href: string
  /** Public handle shown as the value, e.g. "in/name". Omit to hide it. */
  handle?: string
}

export type ContactContent = {
  heading: string
  intro: string
  /** How fast messages get a reply, e.g. "within 24h". */
  replyTime: string
  channels: ContactChannel[]
}
