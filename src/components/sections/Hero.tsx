import { ArrowRight } from "lucide-react"

import { HeroGrid } from "@/components/HeroGrid"
import { FadeIn } from "@/components/motion/FadeIn"
import { HeroCodeCard } from "@/components/sections/HeroCodeCard"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"
import { getVisibleProjects } from "@/lib/projects"
import { publicFileExists } from "@/lib/public-file"

export function Hero() {
  const metaLine = [profile.location, profile.timezone].join(" · ")
  const hasResume = publicFileExists(profile.resumePath)
  const hasProjects = getVisibleProjects().length > 0

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid" />
      <HeroGrid />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <FadeIn>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </p>
          </FadeIn>

          {/* LCP: name, title and bio render without an entrance animation. */}
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-5xl xl:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-primary sm:text-xl">
            {profile.title}
          </p>

          {/* Not animated: on mobile the bio is the largest paint (LCP candidate). */}
          <p className="mt-6 max-w-[60ch] text-base text-muted-foreground sm:text-lg">
            {profile.bio}
          </p>

          <FadeIn delay={0.1}>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              {metaLine}
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-10 flex flex-wrap gap-3">
            {hasProjects && (
              <a
                href="#projects"
                className={cn(buttonVariants({ size: "lg" }), "group/cta")}
              >
                View Projects
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                />
              </a>
            )}
            {hasResume && (
              <a
                href={profile.resumePath}
                download
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Download Resume
              </a>
            )}
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-110 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15"
          />
          <HeroCodeCard />
        </FadeIn>
      </div>
    </section>
  )
}
