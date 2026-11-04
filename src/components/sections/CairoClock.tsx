"use client"

import { useCairoTime } from "@/hooks/useCairoTime"
import { cn } from "@/lib/utils"

/** Current Cairo time as a code comment. Keeps its width and stays hidden until mounted (never, without JS). */
export function CairoClock({ className }: { className?: string }) {
  const time = useCairoTime()

  return (
    <span
      className={cn(
        "whitespace-nowrap text-syntax-comment",
        !time && "invisible",
        className
      )}
    >
      <span aria-hidden="true">· </span>
      <span className="inline-block w-[5ch] tabular-nums">{time ?? " "}</span>
      <span className="sr-only"> local time</span>
      <span aria-hidden="true" className="hidden sm:inline">
        {" now"}
      </span>
    </span>
  )
}
