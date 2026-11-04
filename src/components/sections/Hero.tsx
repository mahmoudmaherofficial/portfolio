import { ArrowDown, ArrowRight } from "lucide-react"

import { HeroGrid } from "@/components/HeroGrid"
import { FadeIn } from "@/components/motion/FadeIn"
import { Tok } from "@/components/ide/Tok"
import { CairoClock } from "@/components/sections/CairoClock"
import { HeroCodeCard } from "@/components/sections/HeroCodeCard"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"
import { getVisibleProjects } from "@/lib/projects"
import { publicFileExists } from "@/lib/public-file"

const FOCUS = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

export function Hero() {
  const metaLine = [profile.location, profile.timezone].join(" · ")
  const resumeHref = publicFileExists(profile.resumePath)
    ? profile.resumePath
    : undefined
  const hasProjects = getVisibleProjects().length > 0
  const buttonCount = Number(hasProjects) + Number(Boolean(resumeHref))

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-2.75rem)] items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid" />
      <HeroGrid />

      <div className="container grid items-center gap-12 py-14 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <FadeIn>
            {/* Availability as a git-branch badge, like the editor's status bar. It leads to Contact. */}
            <a
              href="#contact"
              className={`group/badge inline-flex h-7 items-center gap-1.5 rounded-md bg-primary px-2.5 font-mono text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/85 sm:h-6.5 ${FOCUS}`}
            >
              <span aria-hidden="true">⎇</span>
              open-to-work
              <span className="sr-only">: {profile.availability}. Contact me</span>
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover/badge:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </FadeIn>

          {/* LCP: name, title and bio render without an entrance animation. */}
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-5xl xl:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-base text-muted-foreground sm:text-xl">
            <span aria-hidden="true">
              <Tok kind="keyword">const</Tok> role ={" "}
              <Tok kind="string">&quot;</Tok>
            </span>
            <Tok kind="string">{profile.title}</Tok>
            <span aria-hidden="true">
              <Tok kind="string">&quot;</Tok>
            </span>
          </p>

          {/* Not animated: on mobile the bio is the largest paint (LCP candidate). */}
          <p className="mt-6 max-w-[60ch] text-base text-muted-foreground sm:text-lg">
            {profile.bio}
          </p>

          <FadeIn delay={0.1}>
            <p className="mt-6 font-mono text-xs">
              <Tok kind="comment">{`// ${metaLine} `}</Tok>
              <CairoClock />
            </p>
          </FadeIn>

          {/* Phones: the buttons share one row at equal width. */}
          <FadeIn
            delay={0.2}
            className={cn(
              "mt-8 grid gap-3 sm:mt-10 sm:flex sm:flex-wrap",
              buttonCount > 1 && "grid-cols-2"
            )}
          >
            {hasProjects && (
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group/cta h-11 px-4"
                )}
              >
                View Projects
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </a>
            )}
            {resumeHref && (
              <a
                href={resumeHref}
                download
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 px-4"
                )}
              >
                Download Resume
              </a>
            )}
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden scale-110 rounded-full bg-primary/10 blur-3xl lg:block dark:bg-primary/15"
          />
          <HeroCodeCard resumeHref={resumeHref} />
          <ScrollHint className="mx-auto mt-5 flex w-fit lg:hidden" />
        </FadeIn>
      </div>

      <FadeIn
        delay={0.6}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ScrollHint className="flex" />
      </FadeIn>
    </section>
  )
}

/** Prompt-style hint that more of the page follows. */
function ScrollHint({ className }: { className?: string }) {
  return (
    <a
      href="#about"
      className={cn(
        "min-h-11 items-center gap-2 rounded-md px-3 font-mono text-xs text-syntax-comment transition-colors hover:text-foreground",
        FOCUS,
        className
      )}
    >
      <ArrowDown aria-hidden="true" className="size-3.5 text-primary" />
      <span aria-hidden="true">
        <span className="text-syntax-keyword">$</span> cat about.md
      </span>
      <span className="sr-only">Scroll to About</span>
    </a>
  )
}
