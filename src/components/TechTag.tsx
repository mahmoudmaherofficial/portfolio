import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const TAG =
  "inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-xs whitespace-nowrap"

/**
 * Mono tag for a technology. `variant="string"` renders it as a code string ("Next.js").
 * With `href` it becomes an external link. A `count` marks it as proven by that many projects.
 */
export function TechTag({
  name,
  href,
  variant = "default",
  count,
}: {
  name: string
  href?: string
  variant?: "default" | "string"
  /** Number of projects that use it, shown as "×n". Zero or unset shows nothing. */
  count?: number
}) {
  const isString = variant === "string"
  const className = cn(
    TAG,
    isString ? "text-syntax-string" : "text-muted-foreground",
    count ? "border-primary/35" : undefined
  )
  const label = (
    <>
      {isString ? (
        <>
          <span aria-hidden="true">&quot;</span>
          {name}
          <span aria-hidden="true">&quot;</span>
        </>
      ) : (
        name
      )}
      {count ? (
        <>
          <span aria-hidden="true" className="ml-0.5 text-primary">
            ×{count}
          </span>
          <span className="sr-only">
            , used in {count} {count === 1 ? "project" : "projects"}
          </span>
        </>
      ) : null}
    </>
  )

  if (!href) return <span className={className}>{label}</span>

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        className,
        "transition-colors outline-none hover:border-primary/60 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="size-3" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
