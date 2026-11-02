"use client"

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/** Loads Framer Motion's DOM features once and honors the visitor's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
