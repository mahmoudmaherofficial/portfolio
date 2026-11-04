"use client"

import { useCallback, useRef, useState } from "react"
import dynamic from "next/dynamic"

import { ShotCarousel } from "@/components/sections/ShotCarousel"
import type { Shot } from "@/lib/projects"

// The lightbox (and its dialog code) is fetched the first time a screenshot is opened.
const loadLightbox = () => import("@/components/sections/ProjectLightbox")
const ProjectLightbox = dynamic(loadLightbox, { ssr: false })

export function ProjectGallery({
  title,
  shots,
}: {
  title: string
  shots: Shot[]
}) {
  const [open, setOpen] = useState(false)
  // Mounted on first open, then kept so the close animation can play.
  const [mounted, setMounted] = useState(false)
  const [current, setCurrent] = useState(0)
  // Bumped on close so the card's carousel lands on the last screenshot viewed in the lightbox.
  const [syncTo, setSyncTo] = useState<number | undefined>(undefined)
  const cardRegion = useRef<HTMLDivElement>(null)
  const onIndex = useCallback((index: number) => setCurrent(index), [])

  if (shots.length === 0) return null

  return (
    <div onPointerDown={() => void loadLightbox()}>
      <ShotCarousel
        title={title}
        shots={shots}
        regionRef={cardRegion}
        syncTo={syncTo}
        onIndexChange={onIndex}
        onOpen={(index) => {
          setCurrent(index)
          setMounted(true)
          setOpen(true)
        }}
        sizes="(min-width: 1024px) 30rem, 100vw"
        fit="cover"
        viewportClassName="aspect-16/10"
        autoplay
      />

      {mounted && (
        <ProjectLightbox
          title={title}
          shots={shots}
          open={open}
          startIndex={current}
          onIndexChange={onIndex}
          onOpenChange={(next) => {
            setOpen(next)
            if (!next) setSyncTo(current)
          }}
          returnFocusTo={cardRegion}
        />
      )}
    </div>
  )
}
