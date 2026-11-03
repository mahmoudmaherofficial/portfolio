import { HeaderReveal } from "@/components/layout/HeaderReveal"
import { SiteNav } from "@/components/layout/SiteNav"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { site } from "@/content/site"
import type { NavItem } from "@/lib/types"

export function Header({ nav }: { nav: NavItem[] }) {
  return (
    <HeaderReveal>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#hero"
          className="rounded-md font-mono text-xl font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {site.logo}
          <span className="sr-only"> Back to top</span>
        </a>

        <div className="flex items-center gap-1">
          <SiteNav items={nav} />
          <ThemeToggle />
        </div>
      </div>
    </HeaderReveal>
  )
}
