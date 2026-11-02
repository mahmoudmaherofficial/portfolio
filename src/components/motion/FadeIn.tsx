"use client"

import { m } from "framer-motion"

/**
 * Fades and lifts its children in on mount. For above-the-fold hero content only;
 * below-the-fold content uses `whileInView` instead. Never wrap the LCP element.
 */
export function FadeIn({
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  )
}
