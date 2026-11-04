"use client"

import { FileIcon } from "@/components/ide/FileIcon"
import { useActiveSection } from "@/hooks/useActiveSection"
import type { NavItem } from "@/lib/types"

/** Desktop navigation: one editor tab per section, the current one marked active. */
export function SiteNav({ items }: { items: NavItem[] }) {
  const active = useActiveSection(items.map((item) => item.id))

  if (items.length === 0) return null

  return (
    <nav aria-label="Main" className="hidden lg:flex">
      <ul className="flex items-stretch">
        {items.map((item) => (
          <li key={item.id} className="flex">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="flex items-center gap-2 border-r px-4 font-mono text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-[current=location]:bg-surface-pane aria-[current=location]:text-foreground aria-[current=location]:shadow-[inset_0_2px_0_var(--primary)] xl:px-[1.125rem]"
            >
              <FileIcon kind={item.kind} />
              {item.file}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
