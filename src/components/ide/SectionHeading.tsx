import { cn } from "@/lib/utils"

/**
 * Section heading styled as a shell prompt (`~/portfolio $ cat about.md`) above the real `<h2>`.
 * The prompt and the `#` are decorative; the heading reads as plain text.
 */
export function SectionHeading({
  id,
  command,
  children,
  aside,
  className,
  headingClassName,
}: {
  /** Id of the `<h2>`, referenced by the section's `aria-labelledby`. */
  id: string
  /** Command after the prompt, e.g. "cat about.md". */
  command: string
  children: React.ReactNode
  /** Shown at the right end of the heading row, e.g. a progress indicator. */
  aside?: React.ReactNode
  className?: string
  headingClassName?: string
}) {
  return (
    <div className={className}>
      <p
        aria-hidden="true"
        className="font-mono text-xs text-syntax-comment sm:text-[0.8125rem]"
      >
        <span className="text-primary">~/portfolio</span>{" "}
        <span className="text-syntax-keyword">$</span> {command}
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 lg:mt-2.5">
        <h2
          id={id}
          className={cn(
            "text-3xl font-semibold tracking-tight sm:text-4xl",
            headingClassName
          )}
        >
          <span
            aria-hidden="true"
            className="mr-2 font-mono font-normal text-gutter"
          >
            #
          </span>
          {children}
        </h2>
        {aside}
      </div>
    </div>
  )
}
