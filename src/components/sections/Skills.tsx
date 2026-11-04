import { ArrowUpRight } from "lucide-react"

import SpotlightCard from "@/components/SpotlightCard"
import { EditorWindow } from "@/components/ide/EditorWindow"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { skillGroups, skillsIntro } from "@/content/skills"
import { cn } from "@/lib/utils"

/** Bento spans by group order. Groups past the fourth take a single cell. */
const SPANS = ["md:col-span-2", "", "", "md:col-span-2 lg:col-span-2"]

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t py-24 offscreen-section sm:py-32"
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
            bodyClassName="p-3 sm:p-6"
          >
            <p
              aria-hidden="true"
              className="font-mono text-sm text-syntax-comment"
            >
              {"{"}
            </p>
            <ul className="my-3 grid gap-3 sm:ml-5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group, i) => (
                <li key={group.name} className={cn("flex", SPANS[i])}>
                  <Reveal delay={i * 0.08} className="flex w-full">
                    <SpotlightCard
                      intensity={0.1}
                      proximity={120}
                      className="flex w-full flex-col bg-surface-chrome p-4 sm:p-6"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-mono text-sm font-medium text-syntax-string">
                          <span aria-hidden="true">&quot;</span>
                          {group.name}
                          <span aria-hidden="true">
                            &quot;
                            <span className="text-syntax-comment">: [</span>
                          </span>
                        </h3>
                        <p className="font-mono text-xs text-syntax-comment">
                          {`// ${group.skills.length} ${group.skills.length === 1 ? "skill" : "skills"}`}
                        </p>
                      </div>

                      <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                        {group.skills.map((skill) => (
                          <li key={skill.name}>
                            <TechTag
                              name={skill.name}
                              href={skill.href}
                              variant="string"
                            />
                          </li>
                        ))}
                      </ul>

                      {group.proof && (
                        <a
                          href={group.proof.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex min-h-11 items-end gap-1 self-start rounded-md pt-4 font-mono text-xs text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          <span aria-hidden="true">{"// "}</span>
                          {group.proof.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3.5"
                          />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      )}
                    </SpotlightCard>
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
