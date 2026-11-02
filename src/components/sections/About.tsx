import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"

const CORNERS = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
]

export function About() {
  const [lead, ...rest] = profile.about

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground"
          >
            01 // about
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            About
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-xs lg:max-w-none">
            <figure className="relative overflow-hidden rounded-xl border border-primary/20 bg-card">
              <div aria-hidden="true" className="absolute inset-0 hero-grid" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-primary/20 to-transparent"
              />
              <Image
                src={profile.photo.src}
                width={profile.photo.width}
                height={profile.photo.height}
                alt={`Portrait of ${profile.name}`}
                sizes="(min-width: 1024px) 22rem, 20rem"
                className="relative h-auto w-full mask-[linear-gradient(to_bottom,black_70%,transparent)]"
              />
              {CORNERS.map((corner) => (
                <span
                  key={corner}
                  aria-hidden="true"
                  className={`absolute size-4 border-primary/60 ${corner}`}
                />
              ))}
            </figure>
          </Reveal>

          <div className="max-w-[65ch]">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                {lead}
              </p>
            </Reveal>
            {rest.map((paragraph, i) => (
              <Reveal key={i} delay={0.15 + i * 0.05}>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="mt-10">
              <a
                href={profile.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Source code
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
