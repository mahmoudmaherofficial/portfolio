import { HeroGrid } from "@/components/HeroGrid"
import { HeroCodeCard } from "@/components/sections/HeroCodeCard"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { publicFileExists } from "@/lib/public-file"

export function Hero() {
  const metaLine = [
    profile.location,
    profile.timezone,
    profile.availability,
  ].join(" · ")
  const hasCv = publicFileExists(profile.cvPath)

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hero-grid" />
      <HeroGrid />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]">
        <div>
          <p
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground"
          >
            01 // hero
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-5xl xl:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-lg text-primary sm:text-xl">
            {profile.title}
          </p>

          <p className="mt-6 max-w-[60ch] text-base text-muted-foreground sm:text-lg">
            {profile.bio}
          </p>

          <p className="mt-6 font-mono text-xs text-muted-foreground">
            {metaLine}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className={buttonVariants({ size: "lg" })}>
              View Projects
            </a>
            {hasCv && (
              <a
                href={profile.cvPath}
                download
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Download CV
              </a>
            )}
          </div>
        </div>

        <HeroCodeCard className="hidden lg:block" />
      </div>
    </section>
  )
}
