"use client"

import { useEffect, useState } from "react"

import {
  STACK_CHANGE,
  STACK_GOTO,
  type StackChangeDetail,
  type StackGotoDetail,
} from "@/components/ScrollStack"
import { cn } from "@/lib/utils"

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Segmented progress for a ScrollStack: shows which card is on top and how many are left,
 * and each segment jumps to its card.
 */
export function StackProgress({
  stackId,
  labels,
  label,
}: {
  stackId: string
  /** One label per card, used for the jump buttons' accessible names. */
  labels: string[]
  /** Accessible name of the whole control. */
  label: string
}) {
  const [active, setActive] = useState(0)
  const total = labels.length

  useEffect(() => {
    const onChange = (event: Event) => {
      const { id, index } = (event as CustomEvent<StackChangeDetail>).detail
      if (id === stackId) setActive(index)
    }
    window.addEventListener(STACK_CHANGE, onChange)
    return () => window.removeEventListener(STACK_CHANGE, onChange)
  }, [stackId])

  const goto = (index: number) =>
    window.dispatchEvent(
      new CustomEvent<StackGotoDetail>(STACK_GOTO, {
        detail: { id: stackId, index },
      })
    )

  return (
    <nav aria-label={label} className="flex items-center gap-3">
      <ol className="flex items-center">
        {labels.map((name, i) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => goto(i)}
              aria-label={`${pad(i + 1)}: ${name}`}
              aria-current={i === active ? "step" : undefined}
              // 24px tall hit area around a thin bar (WCAG 2.2 target size).
              className="group/seg flex h-6 items-center px-0.5 outline-none"
            >
              <span
                className={cn(
                  "block h-1 rounded-full transition-all duration-300 group-focus-visible/seg:ring-3 group-focus-visible/seg:ring-ring/50 motion-reduce:transition-none",
                  i === active
                    ? "w-8 bg-primary"
                    : i < active
                      ? "w-4 bg-primary/40 group-hover/seg:bg-primary/70"
                      : "w-4 bg-muted-foreground/30 group-hover/seg:bg-muted-foreground/60"
                )}
              />
            </button>
          </li>
        ))}
      </ol>
      <p className="font-mono text-xs text-muted-foreground tabular-nums">
        <span className="text-foreground">{pad(active + 1)}</span> /{" "}
        {pad(total)}
      </p>
    </nav>
  )
}
