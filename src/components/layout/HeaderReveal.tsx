"use client"

import { useEffect, useState } from "react"

/** How far down the page, as a share of the viewport height, before the header slides in. */
const REVEAL_AT = 0.5

/**
 * Keeps the header hidden over the hero and slides it in once the page is scrolled.
 * It also shows whenever keyboard focus moves into it, so it is never focusable while out of sight.
 */
export function HeaderReveal({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setVisible(window.scrollY > window.innerHeight * REVEAL_AT)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <header
      // data-motion: the <noscript> rule resets the transform, so the header shows without JS.
      data-motion
      data-visible={visible || undefined}
      className="fixed inset-x-0 top-0 z-50 -translate-y-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-out focus-within:translate-y-0 data-visible:translate-y-0 motion-reduce:transition-none"
    >
      {children}
    </header>
  )
}
