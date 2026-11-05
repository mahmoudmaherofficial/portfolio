"use client"

import { useEffect, useState } from "react"

const cairoTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Cairo",
  hour: "2-digit",
  minute: "2-digit",
})

/** Cairo time, refreshed on each minute. Null until mounted, so server and client markup match. */
export function useCairoTime(): string | null {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    let interval = 0
    const tick = () => setTime(cairoTime.format(new Date()))
    tick()
    const timeout = window.setTimeout(
      () => {
        tick()
        interval = window.setInterval(tick, 60_000)
      },
      60_000 - (Date.now() % 60_000)
    )
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return time
}
