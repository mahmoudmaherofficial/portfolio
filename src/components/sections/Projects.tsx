import { ArrowUpRight } from "lucide-react"

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import SpotlightCard from "@/components/SpotlightCard"
import { StackProgress } from "@/components/StackProgress"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { ProjectGallery } from "@/components/sections/ProjectGallery"
import {
  ProjectCompactCard,
  ProjectSheetProvider,
} from "@/components/sections/ProjectSheet"
import { buttonVariants } from "@/components/ui/button"
import { projectsIntro } from "@/content/projects"
import { getVisibleProjects } from "@/lib/projects"

export function Projects() {
  const projects = getVisibleProjects()
  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-t py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/*
          Phones and tablets: the label, title and progress stay pinned under the site header
          (h-14) while the cards stack below. Desktop: scrolls away normally.
        */}
        <div
          id="projects-head"
          className="sticky top-14 z-20 -mx-4 bg-background px-4 py-3 sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:p-0"
        >
          <Reveal>
            <p
              aria-hidden="true"
              className="font-mono text-xs text-muted-foreground"
            >
              02 // projects
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 lg:mt-3">
              <h2
                id="projects-heading"
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Projects
              </h2>
              <StackProgress
                stackId="projects"
                label="Jump to a project"
                labels={projects.map((project) => project.title)}
              />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-2 max-w-[65ch] text-base text-muted-foreground sm:text-lg lg:mt-4">
            {projectsIntro}
          </p>
        </Reveal>

        {/*
          Each card pins centered in the viewport and the next one stacks over it.
          Desktop shows the full card; phones and tablets show a compact card that opens
          the project in a full-screen sheet.
        */}
        <ProjectSheetProvider projects={projects}>
          <ScrollStack
            className="mt-12"
            id="projects"
            // Never pin under the fixed site header (h-14), nor under the
            // section header while it is pinned (phones and tablets).
            stackPosition={56}
            headerId="projects-head"
          >
            {projects.map((project, index) => {
              const meta = [project.type, project.role, project.date].filter(
                Boolean
              )
              const details = (project.challenge || project.whatIDid) && (
                <dl className="space-y-4 text-sm leading-relaxed">
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
              )

              return (
                <ScrollStackItem
                  key={project.slug}
                  className="shadow-[0_-16px_40px_-24px_rgb(0_0_0/0.5)]"
                >
                  <div className="lg:hidden">
                    <SpotlightCard intensity={0.08}>
                      <ProjectCompactCard project={project} index={index} />
                    </SpotlightCard>
                  </div>

                  <SpotlightCard
                    intensity={0.08}
                    className="hidden grid-cols-[minmax(0,1fr)_minmax(0,30rem)] gap-10 p-8 lg:grid"
                  >
                    <article
                      aria-labelledby={`${project.slug}-title`}
                      className="flex flex-col"
                    >
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                        {meta.join(" · ")}
                        {project.badge && (
                          <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-primary">
                            {project.badge}
                          </span>
                        )}
                      </p>
                      <h3
                        id={`${project.slug}-title`}
                        className="mt-3 text-2xl font-semibold tracking-tight"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-foreground/90">
                        {project.summary}
                      </p>

                      {details && <div className="mt-6">{details}</div>}

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
                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
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
                              <span className="sr-only">
                                (opens in a new tab)
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </article>

                    <div>
                      <ProjectGallery
                        title={project.title}
                        shots={project.shots}
                      />
                    </div>
                  </SpotlightCard>
                </ScrollStackItem>
              )
            })}
          </ScrollStack>
        </ProjectSheetProvider>
      </div>
    </section>
  )
}
