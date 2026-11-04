import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const TAG =
  "inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 font-mono text-xs whitespace-nowrap"

/**
 * Mono tag for a technology. `variant="string"` renders it as a code string ("Next.js").
 * With `href` it becomes an external link.
 */
export function TechTag({
  name,
  href,
  variant = "default",
}: {
  name: string
  href?: string
  variant?: "default" | "string"
}) {
  const isString = variant === "string"
  const className = cn(
    TAG,
    isString ? "text-syntax-string" : "text-muted-foreground"
  )
  const label = isString ? (
    <>
      <span aria-hidden="true">&quot;</span>
      {name}
      <span aria-hidden="true">&quot;</span>
    </>
  ) : (
    name
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
