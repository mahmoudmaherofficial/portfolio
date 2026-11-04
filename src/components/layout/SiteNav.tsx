"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { useActiveSection } from "@/hooks/useActiveSection"
import type { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"

const LINK =
  "rounded-md px-3 py-2 font-mono text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=location]:text-primary"

export function SiteNav({ items }: { items: NavItem[] }) {
  const active = useActiveSection(items.map((item) => item.id))
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  if (items.length === 0) return null

  const links = (onClick?: () => void) =>
    items.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={onClick}
          aria-current={active === item.id ? "location" : undefined}
          className={LINK}
        >
          {item.label}
        </a>
      </li>
    ))

  return (
    <>
      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-1">{links()}</ul>
      </nav>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "md:hidden"
        )}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b bg-background md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-2 py-2 sm:px-4 [&_a]:block [&_a]:py-3 [&_a]:text-sm">
          {links(() => setOpen(false))}
        </ul>
      </nav>
    </>
  )
}
