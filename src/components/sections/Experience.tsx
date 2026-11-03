import SpotlightCard from "@/components/SpotlightCard"
import { TechTag } from "@/components/TechTag"
import { Reveal } from "@/components/motion/Reveal"
import { experience, experienceIntro } from "@/content/experience"
import { cn } from "@/lib/utils"

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-t py-24 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        {/* Heading stays in view while the timeline scrolls past on wide screens. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <p
              aria-hidden="true"
              className="font-mono text-xs text-muted-foreground"
            >
              04 // experience
            </p>
            <h2
              id="experience-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Experience
            </h2>
            <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
              {experienceIntro}
            </p>
          </Reveal>
        </div>

        <ol>
          {experience.map((entry, i) => {
            const isLast = i === experience.length - 1

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
                    "relative border-l border-border pl-6 sm:pl-8",
                    !isLast && "pb-8"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-7 left-0 size-2.5 -translate-x-[calc(50%+0.5px)] translate-y-[5px] rounded-full border border-primary bg-background ring-4 ring-background"
                  />
                  <Reveal delay={i * 0.1}>
                    <SpotlightCard className="p-6 sm:p-8" intensity={0.12}>
                      <p className="mb-2 font-mono text-xs text-primary sm:hidden">
                        {entry.period}
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
                            <TechTag name={tech} />
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
