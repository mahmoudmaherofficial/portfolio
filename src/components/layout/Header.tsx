import { Kbd } from "@/components/ide/Kbd"
import { Explorer } from "@/components/layout/Explorer"
import { Logo } from "@/components/layout/Logo"
import { SiteNav } from "@/components/layout/SiteNav"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { profile } from "@/content/profile"
import type { NavItem } from "@/lib/types"
import { getResumeHref } from "@/lib/public-file"

export function Header({ nav }: { nav: NavItem[] }) {
  const resumeHref = getResumeHref()

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-11 items-stretch justify-between border-b bg-surface-chrome">
      <div className="flex min-w-0 items-stretch">
        <Logo className="flex items-center px-4 text-[0.9375rem] lg:border-r lg:px-5" />
        <SiteNav items={nav} />
      </div>

      <Explorer items={nav} resumeHref={resumeHref} repoUrl={profile.repoUrl} />

      <div className="flex items-center gap-3 pr-1 lg:pr-3">
        <span className="hidden font-mono text-xs text-syntax-comment lg:pointer-fine:inline">
          press <Kbd>D</Kbd> theme
        </span>
        <ThemeToggle />
      </div>
    </header>
  )
}
