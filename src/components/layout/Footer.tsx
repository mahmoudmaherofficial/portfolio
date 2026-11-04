import { ArrowUp, ArrowUpRight } from "lucide-react"

import { FileIcon } from "@/components/ide/FileIcon"
import { Logo } from "@/components/layout/Logo"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import type { NavItem } from "@/lib/types"

const FOCUS = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

/** Repo path shown in the source link, e.g. "mahmoudmaherofficial/portfolio". */
const repoPath = profile.repoUrl.replace(
  /^https?:\/\/(www\.)?github\.com\//,
  ""
)

export function Footer({ nav }: { nav: NavItem[] }) {
  // Static page: the year is fixed at build time and refreshes on the next deploy.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container grid gap-8 py-10 sm:py-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
        <div>
          <Logo className="rounded-md text-xl" />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {site.footerTagline}
          </p>
          <p
            aria-hidden="true"
            className="mt-4 hidden font-mono text-xs text-syntax-comment md:block"
          >
            <span className="text-primary">~/portfolio</span>{" "}
            <span className="text-syntax-keyword">$</span> exit
          </p>
        </div>

        <nav aria-label="Footer">
          <p aria-hidden="true" className="font-mono text-xs text-syntax-comment">
            {"// files"}
          </p>
          {/* Phones: two columns of full-size tap targets. Wider: a single Explorer-like list. */}
          <ul className="mt-2 grid grid-cols-2 gap-x-3 md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex min-h-11 items-center gap-2.5 rounded-md font-mono text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground md:min-h-8 ${FOCUS}`}
                >
                  <FileIcon kind={item.kind} className="w-4.5 shrink-0" />
                  {item.file}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p aria-hidden="true" className="font-mono text-xs text-syntax-comment">
            {"// source"}
          </p>
          <a
            href={profile.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2.5 flex min-h-13 items-center justify-between gap-3 rounded-lg border bg-surface-pane px-4 font-mono text-[0.8125rem] text-foreground transition-colors hover:border-primary/50 ${FOCUS}`}
          >
            <span className="min-w-0 truncate">
              <span className="sr-only">Source code: </span>
              <span className="hidden text-syntax-comment sm:inline">
                github.com/
              </span>
              {repoPath}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="mt-3 font-mono text-xs text-syntax-comment">
            <span aria-hidden="true">{"// "}</span>
            {site.footerSourceNote}
          </p>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex items-center justify-between gap-3 py-3.5 font-mono text-[0.6875rem] leading-relaxed text-syntax-comment sm:py-4 sm:text-xs">
          <p>
            <span aria-hidden="true">{"// "}</span>© {year} {profile.name}.{" "}
            {/* Phones: the second sentence drops to its own comment line. */}
            <span className="block sm:inline">
              <span aria-hidden="true" className="sm:hidden">
                {"// "}
              </span>
              All rights reserved.
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <span aria-hidden="true" className="hidden text-gutter sm:inline">
              EOF
            </span>
            <a
              href="#hero"
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border px-3 text-foreground transition-colors hover:border-primary/50 sm:min-h-8 ${FOCUS}`}
            >
              <ArrowUp aria-hidden="true" className="size-3.5 text-primary" />
              <span aria-hidden="true">cd ~</span>
              <span className="sr-only">Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
