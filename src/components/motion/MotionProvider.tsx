"use client"

import { LazyMotion, MotionConfig } from "framer-motion"

/** Animation features load in their own chunk after the page is interactive. */
const loadFeatures = () => import("./features").then((mod) => mod.default)

/** Loads Framer Motion's DOM features on demand and honors the visitor's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
