import { ArrowUpRight } from "lucide-react"

import { Logo } from "@/components/layout/Logo"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import type { NavItem } from "@/lib/types"

const LINK =
  "flex min-h-10 items-center rounded-md font-mono text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-0"

export function Footer({ nav }: { nav: NavItem[] }) {
  // Static page: the year is fixed at build time and refreshes on the next deploy.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo className="rounded-md text-xl" />
          <p className="mt-3 text-sm text-muted-foreground">
            {site.footerTagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 sm:flex sm:flex-wrap sm:gap-y-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={LINK}>
                  {item.file}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK} gap-1`}
              >
                Source code
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t">
        <p className="mx-auto w-full max-w-6xl px-4 py-6 font-mono text-xs text-muted-foreground sm:px-6">
          © {year} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
