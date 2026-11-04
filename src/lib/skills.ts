import { skillGroups } from "@/content/skills"
import { getVisibleProjects, type ProjectView } from "@/lib/projects"
import type { Skill, SkillGroup } from "@/lib/types"

export type SkillView = Skill & {
  /** How many rendered projects list this skill in their tech. */
  count: number
}

export type SkillGroupView = Omit<SkillGroup, "skills"> & {
  skills: SkillView[]
  /** Rendered projects that use any skill in the group, with their place in the Projects stack. */
  usedIn: { project: ProjectView; index: number }[]
}

/**
 * Skill groups with proof from the projects that render: a project count per skill and the
 * projects behind each group. Computed from the tech lists, so it stays in sync with the content.
 */
export function getSkillGroups(): SkillGroupView[] {
  const projects = getVisibleProjects()
  const uses = (project: ProjectView, skill: Skill) =>
    project.tech.includes(skill.match ?? skill.name)

  return skillGroups.map((group) => ({
    ...group,
    skills: group.skills.map((skill) => ({
      ...skill,
      count: projects.filter((project) => uses(project, skill)).length,
    })),
    usedIn: projects.flatMap((project, index) =>
      group.skills.some((skill) => uses(project, skill))
        ? [{ project, index }]
        : []
    ),
  }))
}
