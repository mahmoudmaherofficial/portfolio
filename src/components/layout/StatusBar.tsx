"use client"

import { useEffect, useState } from "react"

import { FileIcon } from "@/components/ide/FileIcon"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useCairoTime } from "@/hooks/useCairoTime"
import type { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"

/** Scroll position as an editor line number (1–999). Null until mounted. */
function useScrollLine(): number | null {
  const [line, setLine] = useState<number | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setLine(
        Math.max(1, Math.round((window.scrollY / Math.max(1, max)) * 999))
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return line
}

/**
 * A live value with its label. Keeps its width and stays invisible until the value exists
 * (never, without JS), so nothing shifts when it appears.
 */
function Live({
  value,
  width,
  before,
  after,
  className,
}: {
  value: string | null
  width: string
  before?: React.ReactNode
  after?: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn(!value && "invisible", className)}>
      {before}
      <span className={cn("inline-block text-right tabular-nums", width)}>
        {value ?? " "}
      </span>
      {after}
    </span>
  )
}

/** Decorative editor status bar. Everything in it is also elsewhere on the page. */
export function StatusBar({
  availability,
  availabilityShort,
  items,
}: {
  availability: string
  availabilityShort: string
  items: NavItem[]
}) {
  const active = useActiveSection(items.map((item) => item.id))
  const current = items.find((item) => item.id === active)
  const time = useCairoTime()
  const line = useScrollLine()

  const file = current ? (
    <span className="flex items-center gap-1.5">
      <FileIcon kind={current.kind} className="text-current" />
      {current.file}
    </span>
  ) : (
    <span>~/portfolio</span>
  )

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 z-30 bg-statusbar pb-[env(safe-area-inset-bottom)] font-mono text-[0.6875rem] text-statusbar-foreground select-none lg:text-xs"
    >
      <div className="flex h-6 items-center justify-between gap-4 px-3 lg:h-7">
        <div className="flex min-w-0 items-center gap-2 whitespace-nowrap lg:gap-4.5">
          <span className="hidden lg:inline">⎇ develop</span>
          <span className="truncate">
            ● <span className="lg:hidden">{availabilityShort}</span>
            <span className="hidden lg:inline">{availability}</span>
          </span>
          <span className="lg:hidden">·</span>
          {file}
        </div>
        <div className="flex shrink-0 items-center gap-4.5 whitespace-nowrap">
          <Live
            value={time}
            width="w-[5ch]"
            before={<span className="hidden lg:inline">Cairo </span>}
            after=" EET"
          />
          <Live
            value={line === null ? null : String(line)}
            width="w-[3ch]"
            before="Ln "
            className="hidden lg:inline"
          />
          <span className="hidden lg:inline">UTF-8</span>
          <span className="hidden lg:inline">TypeScript</span>
        </div>
      </div>
    </div>
  )
}
