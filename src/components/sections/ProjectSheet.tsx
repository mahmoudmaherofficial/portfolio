"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import { TechTag } from "@/components/TechTag"
import { ShotCarousel } from "@/components/sections/ProjectGallery"
import { buttonVariants } from "@/components/ui/button"
import type { ProjectView } from "@/lib/projects"

const pad = (n: number) => String(n).padStart(2, "0")

/** Tech tags shown on a compact card before the "+N" overflow count. */
const TAG_LIMIT = 3

const metaOf = (project: ProjectView) =>
  [project.type, project.role, project.date].filter(Boolean).join(" · ")

type SheetContext = {
  /** Opens the sheet on a project, optionally at one of its screenshots. */
  open: (index: number, shot?: number) => void
  /** Cards register their button so focus can return to it when the sheet closes. */
  register: (index: number, node: HTMLButtonElement | null) => void
}

const Context = createContext<SheetContext | null>(null)

/**
 * Phones and tablets: project cards open a full-screen sheet with the full project.
 * One sheet is shared by all cards so it can step to the previous/next project.
 * The browser back button closes the sheet instead of leaving the page.
 */
export function ProjectSheetProvider({
  projects,
  children,
}: {
  projects: ProjectView[]
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  // Screenshot the sheet's gallery starts on; reset when stepping to another project.
  const [shot, setShot] = useState(0)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  // Where focus goes when the sheet closes: the card of the project last shown.
  const returnTo = useRef<HTMLButtonElement | null>(null)

  // Look the card up when it is needed, so a re-rendered card's new button is used.
  const goTo = useCallback((next: number, startShot = 0) => {
    setIndex(next)
    setShot(startShot)
    returnTo.current = triggers.current[next] ?? null
  }, [])

  const show = useCallback(
    (next: number, startShot = 0) => {
      goTo(next, startShot)
      setOpen(true)
      // An entry for the sheet, so the back button/gesture closes it.
      window.history.pushState({ projectSheet: true }, "")
    },
    [goTo]
  )

  const close = useCallback(() => {
    setOpen(false)
    if (window.history.state?.projectSheet) window.history.back()
  }, [])

  useEffect(() => {
    if (!open) return
    const onPop = () => setOpen(false)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [open])

  const register = useCallback((at: number, node: HTMLButtonElement | null) => {
    triggers.current[at] = node
  }, [])
  const value = useMemo(() => ({ open: show, register }), [show, register])
  const project = projects[index]
  const total = projects.length

  return (
    <Context.Provider value={value}>
      {children}

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
    </Context.Provider>
  )
}

/**
 * Project card for phones and tablets: the same large swipeable gallery as desktop, then the
 * essentials. "View project" (or tapping a screenshot) opens the full project in the sheet.
 */
export function ProjectCompactCard({
  project,
  index,
}: {
  project: ProjectView
  index: number
}) {
  const sheet = useContext(Context)
  const shown = project.tech.slice(0, TAG_LIMIT)
  const more = project.tech.length - shown.length

  return (
    <article aria-labelledby={`${project.slug}-compact-title`} className="p-4">
      <ShotCarousel
        title={project.title}
        shots={project.shots}
        onOpen={(shot) => sheet?.open(index, shot)}
        sizes="100vw"
        fit="cover"
        viewportClassName="aspect-16/10"
        autoplay
      />

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
        {metaOf(project)}
        {project.badge && (
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
            {project.badge}
          </span>
        )}
      </p>
      <h3
        id={`${project.slug}-compact-title`}
        className="mt-2 text-xl font-semibold tracking-tight"
      >
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <div className="mt-4">
        <ul
          aria-label="Tech used"
          className="flex flex-wrap items-center gap-2"
        >
          {shown.map((tech) => (
            <li key={tech}>
              <TechTag name={tech} />
            </li>
          ))}
          {more > 0 && (
            <li className="font-mono text-xs text-muted-foreground">
              +{more}
              <span className="sr-only"> more</span>
            </li>
          )}
        </ul>
        <button
          type="button"
          ref={(node) => sheet?.register(index, node)}
          onClick={() => sheet?.open(index)}
          className="group/cta mt-1 ml-auto flex min-h-11 items-center gap-1 rounded-md font-mono text-xs text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          View project
          <span className="sr-only">: {project.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
          />
        </button>
      </div>
    </article>
  )
}
