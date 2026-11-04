import { cn } from "@/lib/utils"

export function Gutter({
  lines,
  className,
}: {
  lines: number
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-r pr-3 text-right font-mono text-xs leading-7 text-gutter select-none",
        className
      )}
    >
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="block">
          {i + 1}
        </span>
      ))}
    </div>
  )
}
