import { ArrowRight } from "lucide-react"

import { EditorWindow } from "@/components/ide/EditorWindow"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { ProjectJumpLink } from "@/components/sections/ProjectJumpLink"
import { TechTag } from "@/components/TechTag"
import { buttonVariants } from "@/components/ui/button"
import {
  experience,
  experienceIntro,
  impactStats,
  nextCommitMessage,
} from "@/content/experience"
import { profile } from "@/content/profile"
import { getVisibleProjects, type ProjectView } from "@/lib/projects"
import { getResumeHref } from "@/lib/public-file"
import type { ExperienceEntry, ImpactStat } from "@/lib/types"
import { cn, FOCUS_RING } from "@/lib/utils"

export function Experience() {
  const resumeHref = getResumeHref()
  const visibleProjects = getVisibleProjects()

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading id="experience-heading" command="git log --graph">
            Experience
          </SectionHeading>
          <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
            {experienceIntro}
          </p>
          <p className="mt-3 flex items-center gap-2.5 font-mono text-xs text-syntax-comment">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/15"
            />
            <span>
              <span aria-hidden="true">{"// "}</span>
              {profile.availability}
            </span>
          </p>
        </Reveal>

        <Reveal amount="some" className="mt-8 sm:mt-10">
          <ImpactWindow stats={impactStats} />
        </Reveal>

        <Reveal amount="some" className="mt-4 sm:mt-6">
          <EditorWindow
            tab={{ name: "experience.log", kind: "log" }}
            meta={`${experience.length} ${experience.length === 1 ? "role" : "roles"} · main`}
          >
            <ol className="px-3 pt-6 sm:px-6 sm:pt-8 lg:px-8">
              {experience.map((entry, i) => (
                <Commit
                  key={`${entry.role}-${entry.period}`}
                  entry={entry}
                  visibleProjects={visibleProjects}
                  isLast={i === experience.length - 1}
                  delay={i * 0.1}
                />
              ))}
            </ol>

            <div className="flex flex-col gap-4 border-t bg-surface-chrome px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p className="font-mono text-[0.8125rem] text-syntax-comment">
                <span aria-hidden="true">
                  <span className="text-syntax-keyword">$</span> git commit
                  -m{" "}
                </span>
                <span className="whitespace-nowrap text-syntax-string">
                  <span aria-hidden="true">&quot;</span>
                  {nextCommitMessage}
                  <span aria-hidden="true">&quot;</span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-primary"
                />
              </p>
              <div
                className={cn(
                  "grid gap-2 sm:flex",
                  resumeHref ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {resumeHref && (
                  <a
                    href={resumeHref}
                    download
                    className={cn(buttonVariants({ size: "lg" }), "h-11 px-4")}
                  >
                    Download Resume
                  </a>
                )}
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "h-11 px-4"
                  )}
                >
                  Get in touch
                </a>
              </div>
            </div>
          </EditorWindow>
        </Reveal>
      </div>
    </section>
  )
}

/** Headline numbers as a JSON object: 2×2 on phones, one row on wide screens. */
function ImpactWindow({ stats }: { stats: ImpactStat[] }) {
  return (
    <EditorWindow
      tab={{ name: "impact.json", kind: "json" }}
      meta={`${stats.length} keys`}
      bodyClassName="py-3 sm:py-4"
    >
      <p
        aria-hidden="true"
        className="px-4 font-mono text-sm text-syntax-comment sm:px-6"
      >
        {"{"}
      </p>
      {/* The 1px gaps over a border-colored grid draw the dividers in both layouts. */}
      <dl className="my-1 grid grid-cols-2 gap-px bg-border sm:mx-6 sm:ml-11 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.key}
            className="flex min-w-0 flex-col gap-1.5 bg-surface-pane px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <dt className="truncate font-mono text-xs text-syntax-string sm:text-[0.8125rem]">
              <span aria-hidden="true">&quot;</span>
              {stat.key}
              <span aria-hidden="true">
                &quot;<span className="text-syntax-comment">:</span>
              </span>
            </dt>
            <dd className="flex h-9 items-end font-mono font-medium tracking-tight tabular-nums sm:h-11">
              {typeof stat.value === "number" ? (
                <span className="text-3xl leading-none sm:text-4xl">
                  {stat.value}
                  {stat.plus && <span className="text-primary">+</span>}
                </span>
              ) : (
                <span className="text-xl leading-none text-syntax-string sm:text-3xl">
                  <span aria-hidden="true">&quot;</span>
                  {stat.value}
                  <span aria-hidden="true">&quot;</span>
                </span>
              )}
              {i < stats.length - 1 && (
                <span
                  aria-hidden="true"
                  className="text-sm font-normal text-syntax-comment"
                >
                  ,
                </span>
              )}
            </dd>
            <dd className="font-mono text-xs leading-relaxed text-syntax-comment">
              <span aria-hidden="true">{"// "}</span>
              {stat.note}
            </dd>
          </div>
        ))}
      </dl>
      <p
        aria-hidden="true"
        className="px-4 font-mono text-sm text-syntax-comment sm:px-6"
      >
        {"}"}
      </p>
    </EditorWindow>
  )
}

/** One role, drawn as a commit on the `git log --graph` lane. */
function Commit({
  entry,
  visibleProjects,
  isLast,
  delay,
}: {
  entry: ExperienceEntry
  visibleProjects: ProjectView[]
  isLast: boolean
  delay: number
}) {
  const isHead = entry.period.includes("Present")
  const headingId = `${slugify(entry.role)}-role`
  const shipped = (entry.shipped ?? []).flatMap((slug) => {
    const index = visibleProjects.findIndex((project) => project.slug === slug)
    return index === -1 ? [] : [{ project: visibleProjects[index], index }]
  })

  return (
    <li className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-x-4">
      <div aria-hidden="true" className="relative">
        <span
          className={cn(
            "absolute left-1/2 w-0.5 -translate-x-1/2",
            isHead ? "top-2.5 bg-primary" : "top-0 bg-border",
            isLast ? "h-2.5" : "bottom-0"
          )}
        />
        <span
          className={cn(
            "absolute top-[3px] left-1/2 -translate-x-1/2 rounded-full ring-4 ring-surface-pane",
            isHead
              ? "size-3.5 bg-primary"
              : "size-3 border-2 border-primary bg-surface-pane"
          )}
        />
      </div>

      <Reveal delay={delay} amount={0.15}>
        <article
          aria-labelledby={headingId}
          className={cn("pb-10 sm:pb-12", isLast && "pb-8 sm:pb-10")}
        >
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs leading-5">
            <span aria-hidden="true" className="text-syntax-keyword">
              commit
            </span>
            {isHead && (
              <span className="rounded-full border border-primary/35 bg-primary/12 px-2 text-[0.6875rem] text-primary">
                <span aria-hidden="true">HEAD -&gt; main</span>
                <span className="sr-only">Current role</span>
              </span>
            )}
            <span className="text-syntax-comment">{entry.period}</span>
            {entry.badge && (
              <span className="rounded-full border px-2 text-[0.6875rem] text-muted-foreground">
                {entry.badge}
              </span>
            )}
          </p>

          <h3
            id={headingId}
            className="mt-2.5 text-lg font-semibold tracking-tight sm:text-xl"
          >
            {entry.role}
            {entry.company && (
              <span className="font-medium text-muted-foreground">
                {" "}
                · {entry.company}
              </span>
            )}
          </h3>
          <p className="mt-2.5 max-w-[70ch] leading-relaxed text-muted-foreground">
            {entry.summary}
          </p>

          {shipped.length > 0 && (
            <>
              <p
                aria-hidden="true"
                className="mt-5 font-mono text-xs text-syntax-comment"
              >
                {"// shipped"}
              </p>
              <ul aria-label="Projects shipped" className="mt-2 grid gap-2">
                {shipped.map(({ project, index }) => (
                  <li key={project.slug}>
                    <ProjectJumpLink
                      index={index}
                      className={`grid min-h-11 gap-x-4 gap-y-1.5 rounded-lg border bg-surface-chrome px-3.5 py-3 transition-colors hover:border-primary/50 sm:grid-cols-[minmax(0,12.5rem)_minmax(0,1fr)_auto] sm:items-center sm:px-4 ${FOCUS_RING}`}
                    >
                      <span className="flex items-center justify-between gap-3 font-mono text-xs">
                        <span aria-hidden="true" className="truncate">
                          <span className="text-syntax-keyword">merge </span>
                          <span className="text-syntax-string">
                            &quot;{project.slug}&quot;
                          </span>
                        </span>
                        <span className="sr-only">{project.title}: </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-primary sm:hidden"
                        />
                      </span>
                      <span className="text-sm leading-snug text-foreground/85">
                        {project.summary}
                      </span>
                      {project.role && (
                        <span className="flex items-center gap-1.5 font-mono text-xs text-syntax-comment sm:justify-end sm:whitespace-nowrap">
                          <span className="sr-only">. </span>
                          {project.role}
                          <ArrowRight
                            aria-hidden="true"
                            className="hidden size-3.5 text-primary sm:block"
                          />
                        </span>
                      )}
                    </ProjectJumpLink>
                  </li>
                ))}
              </ul>
            </>
          )}

          {entry.highlights && entry.highlights.length > 0 && (
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-foreground/85">
              {entry.highlights.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-primary select-none"
                  >
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ul aria-label="Tech used" className="mt-5 flex flex-wrap gap-2">
            {entry.tech.map((tech) => (
              <li key={tech}>
                <TechTag name={tech} variant="string" />
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  )
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
