import { ArrowRight, ArrowUpRight } from "lucide-react"

import { EditorWindow } from "@/components/ide/EditorWindow"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { ProjectJumpLink } from "@/components/sections/ProjectJumpLink"
import { skillsIntro } from "@/content/skills"
import { getSkillGroups, type SkillGroupView } from "@/lib/skills"
import { cn, FOCUS_RING } from "@/lib/utils"

/** Bento spans by group order. Groups past the fourth take a single cell. */
const SPANS = ["md:col-span-2", "", "", "md:col-span-2 lg:col-span-2"]

const LEGEND = "// ×n = projects using it"

export function Skills() {
  const groups = getSkillGroups()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading id="skills-heading" command="cat skills.json">
            Skills
          </SectionHeading>
          <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
            {skillsIntro}
          </p>
        </Reveal>

        <Reveal amount="some" className="mt-6 sm:mt-8">
          <EditorWindow
            tab={{ name: "skills.json", kind: "json" }}
            meta={LEGEND}
            bodyClassName="p-3 sm:p-6"
          >
            <p
              aria-hidden="true"
              className="font-mono text-sm text-syntax-comment"
            >
              {"{"}
              <span className="ml-3 text-[0.6875rem] sm:hidden">{LEGEND}</span>
            </p>
            <ul className="my-3 grid gap-3 sm:ml-5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group, i) => (
                <li key={group.name} className={cn("flex", SPANS[i])}>
                  <Reveal delay={i * 0.08} className="flex w-full">
                    <SkillGroupPanel
                      group={group}
                      isLast={i === groups.length - 1}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
            <p
              aria-hidden="true"
              className="font-mono text-sm text-syntax-comment"
            >
              {"}"}
            </p>
          </EditorWindow>
        </Reveal>
      </div>
    </section>
  )
}

function SkillGroupPanel({
  group,
  isLast,
}: {
  group: SkillGroupView
  isLast: boolean
}) {
  const hasProof = group.usedIn.length > 0 || group.proof

  return (
    <div className="flex w-full flex-col rounded-lg border bg-surface-chrome p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-sm font-medium text-syntax-string">
          <span aria-hidden="true">&quot;</span>
          {group.name}
          <span aria-hidden="true">
            &quot;<span className="text-syntax-comment">: [</span>
          </span>
        </h3>
        <p className="font-mono text-xs text-syntax-comment">
          {`// ${group.skills.length} ${group.skills.length === 1 ? "skill" : "skills"}`}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <TechTag
              name={skill.name}
              href={skill.href}
              count={skill.count}
              variant="string"
            />
          </li>
        ))}
      </ul>

      {hasProof && (
        <div className="mt-auto pt-4">
          <div className="border-t border-dashed pt-3.5 font-mono text-xs sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            <p className="text-syntax-comment">{"// used in"}</p>

            {group.usedIn.length > 0 && (
              <ul
                aria-label={`Projects using ${group.name} skills`}
                className="mt-2 grid gap-1.5 min-[420px]:grid-cols-2 sm:mt-0 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-1"
              >
                {group.usedIn.map(({ project, index }) => (
                  <li key={project.slug} className="min-w-0">
                    <ProjectJumpLink
                      index={index}
                      className={`flex min-h-11 items-center justify-between gap-2 rounded-md border px-2.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:min-h-8 sm:justify-start sm:border-0 sm:px-0 ${FOCUS_RING}`}
                    >
                      <span aria-hidden="true" className="truncate">
                        {project.slug}
                      </span>
                      <span className="sr-only">{project.title}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-primary"
                      />
                    </ProjectJumpLink>
                  </li>
                ))}
              </ul>
            )}

            {group.proof && (
              <a
                href={group.proof.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 flex min-h-11 items-center justify-between gap-2 rounded-md border border-primary/35 px-2.5 text-primary transition-colors hover:border-primary/70 sm:mt-0 sm:inline-flex sm:min-h-8 sm:border-0 sm:px-0 sm:hover:underline ${FOCUS_RING}`}
              >
                {group.proof.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      )}

      <p
        aria-hidden="true"
        className="mt-3 font-mono text-sm text-syntax-comment"
      >
        {isLast ? "]" : "],"}
      </p>
    </div>
  )
}
