import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { EditorWindow } from "@/components/ide/EditorWindow"
import { Gutter } from "@/components/ide/Gutter"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

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
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading id="about-heading" command="cat about.md">
            About
          </SectionHeading>
        </Reveal>

        <Reveal amount="some" className="mt-6 sm:mt-8">
          <EditorWindow
            tab={{ name: "about.md", kind: "md" }}
            bodyClassName="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,20rem)_2.75rem_minmax(0,1fr)] lg:gap-0 lg:p-0"
          >
            <figure className="relative mx-auto w-full max-w-60 overflow-hidden rounded-lg border border-primary/20 bg-surface-chrome sm:max-w-xs lg:m-8 lg:max-w-none">
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
                sizes="(min-width: 1024px) 20rem, 15rem"
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

            <Gutter lines={16} className="hidden pt-8 lg:block" />

            <div className="max-w-[65ch] lg:py-8 lg:pr-12 lg:pl-7">
              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                {lead}
              </p>
              {rest.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
              <a
                href={profile.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "mt-8 h-11 w-full px-4 sm:w-auto"
                )}
              >
                Source code
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </EditorWindow>
        </Reveal>
      </div>
    </section>
  )
}
