import { projects } from "@/content/projects"
import type { Project, Screenshot } from "@/lib/types"

export type Shot = Screenshot | { placeholder: true; index: number }

export type ProjectView = Omit<Project, "screenshots"> & { shots: Shot[] }

/**
 * Dev and Vercel preview builds fill missing screenshots with labelled placeholders
 * so the layout can be reviewed. Production never renders a placeholder.
 */
const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

const PLACEHOLDER_COUNT = 4

export function isPlaceholder(
  shot: Shot
): shot is { placeholder: true; index: number } {
  return "placeholder" in shot
}

/** Projects that may render: those with at least one real screenshot (or a placeholder in preview). */
export function getVisibleProjects(): ProjectView[] {
  return projects.flatMap(({ screenshots, ...project }): ProjectView[] => {
    if (screenshots.length > 0) return [{ ...project, shots: screenshots }]
    if (!SHOW_PLACEHOLDERS) return []
    const shots = Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => ({
      placeholder: true as const,
      index,
    }))
    return [{ ...project, shots }]
  })
}

/** Meta line for a project: type, role and date, whichever are set. */
export const metaOf = (project: ProjectView) =>
  [project.type, project.role, project.date].filter(Boolean).join(" · ")
