import { site } from "@/content/site"
import { cn } from "@/lib/utils"

/** The `MM.` monogram, linking back to the hero. Used by the header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#hero"
      className={cn(
        "font-mono font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      {site.logo}
      <span className="sr-only"> Back to top</span>
    </a>
  )
}
