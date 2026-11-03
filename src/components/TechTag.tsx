import { ArrowUpRight } from "lucide-react"

const TAG =
  "inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"

/** Mono tag for a technology. With `href` it becomes an external link. */
export function TechTag({ name, href }: { name: string; href?: string }) {
  if (!href) return <span className={TAG}>{name}</span>

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${TAG} transition-colors outline-none hover:border-primary/60 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50`}
    >
      {name}
      <ArrowUpRight aria-hidden="true" className="size-3" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
