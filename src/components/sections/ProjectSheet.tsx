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
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"

import { TechTag } from "@/components/TechTag"
import { ShotCarousel } from "@/components/sections/ShotCarousel"
import { metaOf, type ProjectView } from "@/lib/projects"

// The sheet (and its dialog code) is fetched the first time a project is opened.
const loadSheet = () => import("@/components/sections/ProjectSheetDialog")
const ProjectSheetDialog = dynamic(loadSheet, { ssr: false })

/** Tech tags shown on a compact card before the "+N" overflow count. */
const TAG_LIMIT = 3

type SheetContext = {
  /** Opens the sheet on a project, optionally at one of its screenshots. */
  open: (index: number, shot?: number) => void
  /** Cards register their button so focus can return to it when the sheet closes. */
  register: (index: number, node: HTMLButtonElement | null) => void
  /** Starts fetching the sheet before the tap completes. */
  preload: () => void
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
  // Mounted on first open, then kept so the close animation can play.
  const [mounted, setMounted] = useState(false)
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
      setMounted(true)
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
  const value = useMemo(
    () => ({ open: show, register, preload: () => void loadSheet() }),
    [show, register]
  )

  return (
    <Context.Provider value={value}>
      {children}

      {mounted && (
        <ProjectSheetDialog
          projects={projects}
          index={index}
          shot={shot}
          open={open}
          close={close}
          goTo={goTo}
          returnTo={returnTo}
        />
      )}
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
    <article
      aria-labelledby={`${project.slug}-compact-title`}
      onPointerDown={sheet?.preload}
      className="p-4"
    >
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
