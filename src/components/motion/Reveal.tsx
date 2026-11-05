"use client"

import { m } from "framer-motion"

/** Fades and lifts its children in once they scroll into view. For below-the-fold content. */
export function Reveal({
  children,
  delay = 0,
  amount = 0.3,
  className,
}: {
  children: React.ReactNode
  delay?: number
  /**
   * How much of the element must be visible to reveal it. Use "some" for blocks that can be
   * taller than the viewport, or they may never reach the threshold and stay hidden.
   */
  amount?: number | "some" | "all"
  className?: string
}) {
  return (
    <m.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  )
}
