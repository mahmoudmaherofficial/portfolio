import SpotlightCard from "@/components/SpotlightCard"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { experience, experienceIntro } from "@/content/experience"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/ide/SectionHeading"

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container grid gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        {/* Heading stays in view while the timeline scrolls past on wide screens. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <SectionHeading id="experience-heading" command="git log">
              Experience
            </SectionHeading>
            <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
              {experienceIntro}
            </p>
          </Reveal>
        </div>

        <ol>
          {experience.map((entry, i) => {
            const isLast = i === experience.length - 1
            // The current role is the branch tip, like HEAD in `git log`.
            const isHead = entry.period.includes("Present")

            return (
              <li
                key={`${entry.role}-${entry.period}`}
                className="sm:grid sm:grid-cols-[10rem_minmax(0,1fr)]"
              >
                {/* Date column beside the rail, so dates scan top to bottom. */}
                <p className="hidden pt-7 pr-6 text-right font-mono text-xs leading-5 whitespace-nowrap text-primary sm:block">
                  {entry.period}
                </p>

                <div
                  className={cn(
                    "relative border-l-2 pl-6 sm:pl-8",
                    isHead ? "border-primary" : "border-border",
                    !isLast && "pb-8"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-7 left-0 -translate-x-[calc(50%+1px)] translate-y-[3px] rounded-full ring-4 ring-background",
                      isHead
                        ? "size-3.5 bg-primary"
                        : "size-3 border-2 border-primary bg-background"
                    )}
                  />
                  <Reveal delay={i * 0.1}>
                    <SpotlightCard
                      className="bg-surface-pane p-5 sm:p-8"
                      intensity={0.12}
                    >
                      <p
                        className={cn(
                          "mb-2.5 flex-wrap items-center gap-2 font-mono text-xs text-primary",
                          isHead ? "flex" : "flex sm:hidden"
                        )}
                      >
                        {isHead && (
                          <span className="rounded-full border border-primary/35 bg-primary/12 px-2 text-[0.6875rem]">
                            HEAD
                          </span>
                        )}
                        <span className="sm:hidden">{entry.period}</span>
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {entry.role}
                        {entry.company && (
                          <span className="text-muted-foreground">
                            {" "}
                            · {entry.company}
                          </span>
                        )}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {entry.summary}
                      </p>
                      <ul
                        aria-label="Tech used"
                        className="mt-5 flex flex-wrap gap-2"
                      >
                        {entry.tech.map((tech) => (
                          <li key={tech}>
                            <TechTag name={tech} variant="string" />
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </Reveal>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
