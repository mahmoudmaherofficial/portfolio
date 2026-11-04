import { ArrowUpRight } from "lucide-react"

import SpotlightCard from "@/components/SpotlightCard"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { skillGroups, skillsIntro } from "@/content/skills"
import { cn, pad } from "@/lib/utils"

/** Bento spans by group order. Groups past the fourth take a single cell. */
const SPANS = ["md:col-span-2", "", "", "md:col-span-2 lg:col-span-2"]

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t py-24 offscreen-section sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground"
          >
            03 // skills
          </p>
          <h2
            id="skills-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Skills
          </h2>
          <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
            {skillsIntro}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <li key={group.name} className={cn("flex", SPANS[i])}>
              <Reveal delay={i * 0.08} className="flex w-full">
                <SpotlightCard
                  intensity={0.1}
                  proximity={120}
                  className="flex w-full flex-col p-6 sm:p-8"
                >
                  {/* Large faded index as a technical detail; the heading carries the meaning. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 -bottom-4 -z-[5] font-mono text-7xl font-semibold text-foreground/4 select-none"
                  >
                    {pad(i + 1)}
                  </span>

                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-mono text-sm font-medium text-foreground">
                      {group.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      {pad(group.skills.length)}
                      <span className="sr-only"> skills</span>
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <TechTag name={skill.name} href={skill.href} />
                      </li>
                    ))}
                  </ul>

                  {group.proof && (
                    <a
                      href={group.proof.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 self-start rounded-md pt-6 font-mono text-xs text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {group.proof.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
