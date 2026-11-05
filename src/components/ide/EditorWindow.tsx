import { FileIcon } from "@/components/ide/FileIcon"
import type { FileKind } from "@/lib/types"
import { cn } from "@/lib/utils"

type Tab = { name: string; kind: FileKind }

/**
 * An editor window: chrome with the active file tab, an optional second tab that is a
 * real link, an optional breadcrumb path, and the body. Tabs that do nothing are never rendered.
 */
export function EditorWindow({
  tab,
  extraTab,
  meta,
  path,
  dots = false,
  compactOnPhones = false,
  className,
  bodyClassName,
  children,
}: {
  tab: Tab
  extraTab?: Tab & { href: string; download?: boolean }
  /** Shown at the right end of the chrome. */
  meta?: React.ReactNode
  /** Breadcrumb segments, e.g. ["src", "content", "profile.ts"]. */
  path?: string[]
  /** macOS-style window dots before the tabs. */
  dots?: boolean
  /** Hides the window dots and the breadcrumb below `sm`, where space is tight. */
  compactOnPhones?: boolean
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-surface-pane text-card-foreground",
        className
      )}
    >
      <div className="flex h-9 items-stretch justify-between border-b bg-surface-chrome font-mono text-xs sm:h-[2.375rem]">
        <div className="flex min-w-0 items-stretch">
          {dots && (
            <div
              aria-hidden="true"
              className={cn(
                "flex items-center gap-1.5 px-3.5",
                compactOnPhones && "max-sm:hidden"
              )}
            >
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
          )}
          <div className="flex min-w-0 items-center gap-2 bg-surface-pane px-3.5 text-foreground shadow-[inset_0_2px_0_var(--primary)] sm:px-4">
            <FileIcon kind={tab.kind} />
            <span className="truncate">{tab.name}</span>
          </div>
          {extraTab && (
            <a
              href={extraTab.href}
              download={extraTab.download || undefined}
              className="flex shrink-0 items-center gap-2 border-l px-3.5 text-muted-foreground transition-[color,box-shadow] outline-none hover:text-foreground hover:shadow-[inset_0_-2px_0_var(--primary)] focus-visible:text-foreground focus-visible:shadow-[inset_0_-2px_0_var(--primary)] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset sm:px-4"
            >
              <FileIcon kind={extraTab.kind} />
              {extraTab.name}
            </a>
          )}
        </div>
        {meta && (
          <div className="hidden items-center px-4 text-muted-foreground sm:flex">
            {meta}
          </div>
        )}
      </div>
      {path && (
        <p
          aria-hidden="true"
          className={cn(
            "border-b border-border/50 px-4 py-2 font-mono text-[0.6875rem] text-syntax-comment",
            compactOnPhones && "max-sm:hidden"
          )}
        >
          {path.join(" › ")}
        </p>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
