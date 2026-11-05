"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

import { FileIcon } from "@/components/ide/FileIcon"
import { useActiveSection } from "@/hooks/useActiveSection"
import type { NavItem } from "@/lib/types"

const ROW =
  "flex min-h-12 items-center gap-3.5 px-4 font-mono text-sm text-foreground/85 outline-none hover:bg-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"

/**
 * Navigation below `lg`: a switcher showing the current file that opens an Explorer panel.
 * Built on <details> so it works without JS; JS adds closing on outside taps, Escape,
 * scrolling and resizing to desktop, plus focus handling.
 */
export function Explorer({
  items,
  resumeHref,
  repoUrl,
}: {
  items: NavItem[]
  resumeHref?: string
  repoUrl: string
}) {
  const ref = useRef<HTMLDetailsElement>(null)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(items.map((item) => item.id))
  const current = items.find((item) => item.id === active)

  const close = (restoreFocus = false) => {
    const details = ref.current
    if (!details?.open) return
    details.open = false
    if (restoreFocus) details.querySelector("summary")?.focus()
  }

  useEffect(() => {
    const details = ref.current
    if (!open || !details) return

    details.querySelector<HTMLAnchorElement>("nav a")?.focus()

    const startY = window.scrollY
    const desktop = window.matchMedia("(min-width: 1024px)")
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true)
    }
    // The dimmed backdrop is inside <details>, so "outside" means outside the summary and panel.
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const summary = details.querySelector("summary")
      const panel = details.querySelector("nav")
      if (!summary?.contains(target) && !panel?.contains(target)) close()
    }
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) close()
    }
    const onDesktop = () => {
      if (desktop.matches) close()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("scroll", onScroll, { passive: true })
    desktop.addEventListener("change", onDesktop)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("scroll", onScroll)
      desktop.removeEventListener("change", onDesktop)
    }
  }, [open])

  if (items.length === 0) return null

  return (
    <details
      ref={ref}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="group flex items-center lg:hidden"
    >
      <summary className="flex h-11 cursor-pointer list-none items-center px-1 outline-none [&::-webkit-details-marker]:hidden [&:focus-visible>span]:ring-3 [&:focus-visible>span]:ring-ring/50">
        <span className="flex h-8 items-center gap-2 rounded-lg border bg-surface-pane px-3 font-mono text-xs group-open:border-primary/50 group-open:ring-3 group-open:ring-primary/20">
          <span className="sr-only">Menu: </span>
          {current ? (
            <>
              <FileIcon kind={current.kind} />
              {current.file}
            </>
          ) : (
            <span>
              <span className="text-primary">~/</span>portfolio
            </span>
          )}
          <ChevronDown
            aria-hidden="true"
            className="size-3.5 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
          />
        </span>
      </summary>

      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-11 bottom-0 bg-black/55"
      />
      <nav
        aria-label="Explorer"
        className="fixed inset-x-0 top-11 max-h-[calc(100dvh-2.75rem)] overflow-y-auto overscroll-contain border-b bg-surface-chrome pb-2 shadow-2xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-2"
      >
        <p className="px-4 pt-3.5 pb-1.5 font-mono text-[0.6875rem] tracking-widest text-syntax-comment">
          EXPLORER
        </p>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => close()}
                aria-current={item.id === active ? "location" : undefined}
                className={`${ROW} aria-[current=location]:bg-primary/8 aria-[current=location]:text-foreground aria-[current=location]:shadow-[inset_2px_0_0_var(--primary)]`}
              >
                <FileIcon kind={item.kind} className="w-6 text-center" />
                {item.file}
                {item.id === active && (
                  <span
                    aria-hidden="true"
                    className="ml-auto text-[0.6875rem] text-primary"
                  >
                    ● here
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-4 my-1.5 border-t" />
        <ul>
          {resumeHref && (
            <li>
              <a
                href={resumeHref}
                download
                onClick={() => close()}
                className={ROW}
              >
                <FileIcon kind="pdf" className="w-6 text-center" />
                resume.pdf
                <span className="ml-auto text-[0.6875rem] text-syntax-comment">
                  download
                </span>
              </a>
            </li>
          )}
          <li>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => close()}
              className={ROW}
            >
              <span
                aria-hidden="true"
                className="w-6 text-center text-syntax-comment"
              >
                ↗
              </span>
              source code
              <span className="ml-auto text-[0.6875rem] text-syntax-comment">
                GitHub
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </details>
  )
}
