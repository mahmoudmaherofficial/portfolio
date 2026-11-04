import { ArrowRight } from "lucide-react"

import { HeroGrid } from "@/components/HeroGrid"
import { FadeIn } from "@/components/motion/FadeIn"
import { Tok } from "@/components/ide/Tok"
import { HeroCodeCard } from "@/components/sections/HeroCodeCard"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"
import { getVisibleProjects } from "@/lib/projects"
import { publicFileExists } from "@/lib/public-file"

export function Hero() {
  const metaLine = [profile.location, profile.timezone].join(" · ")
  const resumeHref = publicFileExists(profile.resumePath)
    ? profile.resumePath
    : undefined
  const hasProjects = getVisibleProjects().length > 0

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[calc(100svh-2.75rem)] items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid" />
      <HeroGrid />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <FadeIn>
            {/* Availability as a git-branch badge, like the editor's status bar. */}
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.71875rem] sm:text-xs">
              <span className="inline-flex h-6 items-center gap-1.5 rounded-md bg-primary px-2.5 font-semibold text-primary-foreground">
                <span aria-hidden="true">⎇</span>
                open-to-work
              </span>
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <span aria-hidden="true" className="relative flex size-[7px]">
                  <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-[7px] rounded-full bg-primary ring-3 ring-primary/20" />
                </span>
                {profile.availability}
              </span>
            </p>
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
              <Tok kind="comment">{`// ${metaLine}`}</Tok>
            </p>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="mt-8 flex flex-wrap gap-3 max-[399px]:flex-col sm:mt-10"
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
        </FadeIn>
      </div>
    </section>
  )
}
