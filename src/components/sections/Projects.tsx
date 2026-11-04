import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"
import { EditorWindow } from "@/components/ide/EditorWindow"
import { Gutter } from "@/components/ide/Gutter"
import { SectionHeading } from "@/components/ide/SectionHeading"
import SpotlightCard from "@/components/SpotlightCard"
import { StackProgress } from "@/components/StackProgress"
import { Reveal } from "@/components/motion/Reveal"
import { ProjectGallery } from "@/components/sections/ProjectGallery"
import {
  ProjectDetails,
  ProjectLinks,
  ProjectMeta,
  ProjectTech,
} from "@/components/sections/ProjectInfo"
import {
  ProjectCompactCard,
  ProjectSheetProvider,
} from "@/components/sections/ProjectSheet"
import { projectsIntro } from "@/content/projects"
import { getVisibleProjects } from "@/lib/projects"

export function Projects() {
  const projects = getVisibleProjects()
  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-t py-16 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/*
          Phones and tablets: the label, title and progress stay pinned under the site header
          (h-11) while the cards stack below. Desktop: scrolls away normally.
        */}
        <div
          id="projects-head"
          className="sticky top-11 z-20 -mx-4 bg-background px-4 py-3 sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:p-0"
        >
          <Reveal>
            <SectionHeading
              id="projects-heading"
              command="ls projects/"
              aside={
                <StackProgress
                  label="Jump to a project"
                  labels={projects.map((project) => project.title)}
                />
              }
            >
              Projects
            </SectionHeading>
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
            // Below the fixed site header (h-11), and below the section header while it is pinned.
            stackPosition={44}
            headerId="projects-head"
          >
            {projects.map((project, index) => (
              <ScrollStackItem
                key={project.slug}
                className="shadow-[0_-16px_40px_-24px_rgb(0_0_0/0.5)]"
              >
                <div className="lg:hidden">
                  <SpotlightCard intensity={0.08} className="bg-surface-pane">
                    <EditorWindow
                      tab={{ name: `${project.slug}.tsx`, kind: "tsx" }}
                      className="rounded-none border-0 bg-transparent"
                    >
                      <ProjectCompactCard project={project} index={index} />
                    </EditorWindow>
                  </SpotlightCard>
                </div>

                <SpotlightCard
                  intensity={0.08}
                  className="hidden bg-surface-pane lg:block"
                >
                  <EditorWindow
                    tab={{ name: `${project.slug}.tsx`, kind: "tsx" }}
                    className="rounded-none border-0 bg-transparent"
                    bodyClassName="grid grid-cols-[2.75rem_minmax(0,1fr)_minmax(0,30rem)]"
                  >
                    <Gutter lines={15} className="pt-8" />
                    <article
                      aria-labelledby={`${project.slug}-title`}
                      className="flex flex-col px-9 py-8"
                    >
                      <ProjectMeta project={project} />
                      <h3
                        id={`${project.slug}-title`}
                        className="mt-3 text-2xl font-semibold tracking-tight"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-foreground/90">
                        {project.summary}
                      </p>
                      <ProjectDetails project={project} className="mt-6" />
                      <ProjectTech project={project} />
                      <ProjectLinks
                        project={project}
                        className="mt-auto pt-6"
                      />
                    </article>

                    <div className="py-8 pr-8">
                      <ProjectGallery
                        title={project.title}
                        shots={project.shots}
                      />
                    </div>
                  </EditorWindow>
                </SpotlightCard>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </ProjectSheetProvider>
      </div>
    </section>
  )
}
