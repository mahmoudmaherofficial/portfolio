import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { EditorWindow } from "@/components/ide/EditorWindow"
import { Gutter } from "@/components/ide/Gutter"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { buttonVariants } from "@/components/ui/button"
import { profile } from "@/content/profile"
import { cn } from "@/lib/utils"

export function About() {
  const [lead, ...rest] = profile.about
  const photoName = profile.photo.src.split("/").pop()

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading id="about-heading" command="cat about.md">
            About
          </SectionHeading>
        </Reveal>

        <Reveal amount="some" className="mt-6 sm:mt-8">
          <EditorWindow
            tab={{ name: "about.md", kind: "md" }}
            bodyClassName="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,22rem)_2.75rem_minmax(0,1fr)] lg:gap-0 lg:p-0"
          >
            {/* The photo "opened" in a terminal box: name set into the top edge, size into the bottom. */}
            <div className="mx-auto w-full max-w-60 self-start sm:max-w-xs lg:m-8 lg:w-auto lg:max-w-none">
              <p
                aria-hidden="true"
                className="mb-3.5 font-mono text-xs text-syntax-comment"
              >
                <span className="text-syntax-keyword">$</span> open {photoName}
              </p>
              <figure className="relative rounded-xs border border-primary/45 bg-background/60 p-3.5">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-3 bg-surface-pane px-1.5 font-mono text-[0.6875rem] leading-3.5 text-primary"
                >
                  ┤ {photoName} ├
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-3 -bottom-2 bg-surface-pane px-1.5 font-mono text-[0.6875rem] leading-3.5 text-syntax-comment"
                >
                  {profile.photo.width}×{profile.photo.height}
                </span>
                <Image
                  src={profile.photo.src}
                  width={profile.photo.width}
                  height={profile.photo.height}
                  alt={`Portrait of ${profile.name}`}
                  sizes="(min-width: 1024px) 18rem, 20rem"
                  className="aspect-3/4 w-full object-cover object-top saturate-90"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3.5 bg-[repeating-linear-gradient(to_bottom,rgb(0_0_0/0.18)_0_1px,transparent_1px_3px)]"
                />
              </figure>
            </div>

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
