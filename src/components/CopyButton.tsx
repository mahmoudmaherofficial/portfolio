"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { Check, Copy } from "lucide-react"

import { cn, FOCUS_RING } from "@/lib/utils"

const noop = () => () => {}

/** False on the server and without the Clipboard API, so the button never renders dead. */
function useCanCopy(): boolean {
  return useSyncExternalStore(
    noop,
    () => typeof navigator.clipboard?.writeText === "function",
    () => false
  )
}

/** Copies the email address and confirms it visibly and to screen readers. */
export function CopyButton({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const canCopy = useCanCopy()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (!canCopy) return null

  return (
    <>
      <button
        type="button"
        aria-label="Copy email address"
        onClick={() => {
          navigator.clipboard.writeText(value).then(
            () => setCopied(true),
            () => setCopied(false)
          )
        }}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 font-mono text-sm transition-colors hover:border-primary/50",
          FOCUS_RING,
          copied && "border-primary/50 text-primary",
          className
        )}
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </>
  )
}
