"use client"

import { m } from "framer-motion"

/** Fades and lifts its children in once they scroll into view. For below-the-fold content. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <m.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  )
}
