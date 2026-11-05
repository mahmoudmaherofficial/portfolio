"use client"

import type { RefObject } from "react"

import { ShotCarousel } from "@/components/sections/ShotCarousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Shot } from "@/lib/projects"

/**
 * Full-size screenshot viewer for a project card. Loaded on first open (see ProjectGallery),
 * so the dialog code stays out of the initial bundle.
 */
export default function ProjectLightbox({
  title,
  shots,
  open,
  startIndex,
  onIndexChange,
  onOpenChange,
  returnFocusTo,
}: {
  title: string
  shots: Shot[]
  open: boolean
  startIndex: number
  onIndexChange: (index: number) => void
  onOpenChange: (open: boolean) => void
  /** The card carousel, which now shows the last screenshot viewed. */
  returnFocusTo: RefObject<HTMLDivElement | null>
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        finalFocus={returnFocusTo}
        className="max-w-[calc(100%-2rem)] gap-3 p-3 sm:max-w-5xl sm:p-4"
      >
        <div className="pr-10">
          <DialogTitle className="text-sm font-semibold">{title}</DialogTitle>
        </div>
        <DialogDescription className="sr-only">
          Swipe or use the left and right arrow keys to browse the screenshots.
        </DialogDescription>

        <ShotCarousel
          title={title}
          shots={shots}
          startIndex={startIndex}
          onIndexChange={onIndexChange}
          sizes="(min-width: 1024px) 64rem, 100vw"
          fit="contain"
          viewportClassName="aspect-16/10 max-h-[calc(100svh-10rem)] w-full"
        />
      </DialogContent>
    </Dialog>
  )
}
