import { ArrowUpRight } from "lucide-react"

import { TechTag } from "@/components/TechTag"
import { buttonVariants } from "@/components/ui/button"
import { metaOf, type ProjectView } from "@/lib/projects"
import { cn } from "@/lib/utils"

// Project parts shared by the desktop card and the phone/tablet sheet.

export function ProjectMeta({
  project,
  className,
}: {
  project: ProjectView
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {metaOf(project)}
      {project.badge && (
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
          {project.badge}
        </span>
      )}
    </p>
  )
}

export function ProjectDetails({
  project,
  className,
}: {
  project: ProjectView
  className?: string
}) {
  const details = [
    { term: "Challenge", text: project.challenge },
    { term: "What I did", text: project.whatIDid },
  ].filter((detail) => detail.text)
  if (details.length === 0) return null

  return (
    <dl className={cn("space-y-4 text-sm leading-relaxed", className)}>
      {details.map(({ term, text }) => (
        <div key={term}>
          <dt className="font-mono text-xs text-primary">{term}</dt>
          <dd className="mt-1 text-muted-foreground">{text}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ProjectTech({ project }: { project: ProjectView }) {
  return (
    <ul aria-label="Tech used" className="mt-6 flex flex-wrap gap-2">
      {project.tech.map((tech) => (
        <li key={tech}>
          <TechTag name={tech} />
        </li>
      ))}
    </ul>
  )
}

export function ProjectLinks({
  project,
  className,
}: {
  project: ProjectView
  className?: string
}) {
  if (project.links.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          {link.label}
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  )
}
