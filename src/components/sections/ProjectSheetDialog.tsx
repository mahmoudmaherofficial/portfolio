"use client"

import type { RefObject } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"

import { TechTag } from "@/components/TechTag"
import { ShotCarousel } from "@/components/sections/ShotCarousel"
import { buttonVariants } from "@/components/ui/button"
import { metaOf, type ProjectView } from "@/lib/projects"

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Full-screen sheet with the whole project, for phones and tablets. Loaded on first open
 * (see ProjectSheetProvider), so the dialog code stays out of the initial bundle.
 */
export default function ProjectSheetDialog({
  projects,
  index,
  shot,
  open,
  close,
  goTo,
  returnTo,
}: {
  projects: ProjectView[]
  index: number
  /** Screenshot the gallery starts on. */
  shot: number
  open: boolean
  close: () => void
  goTo: (index: number) => void
  /** Where focus goes when the sheet closes. */
  returnTo: RefObject<HTMLButtonElement | null>
}) {
  const project = projects[index]
  const total = projects.length

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) close()
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Popup
          // Focus returns to the card of the project last shown.
          finalFocus={returnTo}
          className="fixed inset-0 z-50 flex h-dvh flex-col bg-background text-foreground outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-8 motion-reduce:data-open:slide-in-from-bottom-0 data-closed:animate-out data-closed:fade-out-0"
        >
          {project && (
            <>
              <header className="flex items-center justify-between gap-4 border-b px-4 py-2">
                <DialogPrimitive.Close
                  aria-label="Close"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon-lg",
                  })}
                >
                  <X aria-hidden="true" />
                </DialogPrimitive.Close>
                <p className="font-mono text-xs text-muted-foreground tabular-nums">
                  <span className="text-foreground">{pad(index + 1)}</span> /{" "}
                  {pad(total)}
                </p>
              </header>

              <div
                // Re-mount per project so the gallery and scroll start at the top.
                key={project.slug}
                className="flex-1 overflow-y-auto overscroll-contain px-4 py-6"
              >
                <ShotCarousel
                  title={project.title}
                  shots={project.shots}
                  startIndex={shot}
                  sizes="100vw"
                  fit="contain"
                  viewportClassName="aspect-16/10"
                />

                <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                  {metaOf(project)}
                  {project.badge && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
                      {project.badge}
                    </span>
                  )}
                </p>
                <DialogPrimitive.Title className="mt-2 text-2xl font-semibold tracking-tight">
                  {project.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-3 leading-relaxed text-foreground/90">
                  {project.summary}
                </DialogPrimitive.Description>

                {(project.challenge || project.whatIDid) && (
                  <dl className="mt-6 space-y-4 text-sm leading-relaxed">
                    {project.challenge && (
                      <div>
                        <dt className="font-mono text-xs text-primary">
                          Challenge
                        </dt>
                        <dd className="mt-1 text-muted-foreground">
                          {project.challenge}
                        </dd>
                      </div>
                    )}
                    {project.whatIDid && (
                      <div>
                        <dt className="font-mono text-xs text-primary">
                          What I did
                        </dt>
                        <dd className="mt-1 text-muted-foreground">
                          {project.whatIDid}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                <ul
                  aria-label="Tech used"
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <TechTag name={tech} />
                    </li>
                  ))}
                </ul>

                {project.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          variant: "outline",
                          size: "lg",
                        })}
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {total > 1 && (
                <nav
                  aria-label="Other projects"
                  className="flex items-center justify-between gap-3 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                >
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => goTo(index - 1)}
                    aria-label={
                      index > 0
                        ? `Previous: ${projects[index - 1]?.title}`
                        : "Previous"
                    }
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                    })}
                  >
                    <ChevronLeft aria-hidden="true" />
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={index === total - 1}
                    onClick={() => goTo(index + 1)}
                    aria-label={
                      index < total - 1
                        ? `Next: ${projects[index + 1]?.title}`
                        : "Next"
                    }
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                    })}
                  >
                    Next
                    <ChevronRight aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
