import { site } from "@/content/site"
import { cn, FOCUS_RING } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#hero"
      className={cn(
        "font-mono font-semibold tracking-tight",
        FOCUS_RING,
        className
      )}
    >
      {site.logo}
      <span className="sr-only"> Back to top</span>
    </a>
  )
}
