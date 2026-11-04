"use client"

import { STACK_GOTO } from "@/components/ScrollStack"

/**
 * Link to one project card in the Projects stack. Without JS it falls back to the
 * section anchor; with JS it asks the ScrollStack to bring that exact card to the top.
 */
export function ProjectJumpLink({
  index,
  className,
  children,
}: {
  /** Position of the card among the rendered projects. */
  index: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href="#projects"
      className={className}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return
        event.preventDefault()
        window.dispatchEvent(
          new CustomEvent<number>(STACK_GOTO, { detail: index })
        )
      }}
    >
      {children}
    </a>
  )
}
