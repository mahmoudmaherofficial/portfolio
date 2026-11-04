import { ArrowUpRight } from "lucide-react"

import { CopyButton } from "@/components/CopyButton"
import SpotlightCard from "@/components/SpotlightCard"
import { EditorWindow } from "@/components/ide/EditorWindow"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { contact } from "@/content/contact"

const focusRing = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

export function Contact() {
  const email = contact.channels.find((channel) => channel.kind === "email")
  const others = contact.channels.filter((channel) => channel.kind !== "email")

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container flex max-w-3xl flex-col sm:items-center sm:text-center">
        <Reveal>
          <SectionHeading
            id="contact-heading"
            command="./contact.sh"
            className="sm:[&>div]:justify-center"
            headingClassName="sm:text-5xl"
          >
            {contact.heading}
          </SectionHeading>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {contact.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 w-full text-left sm:mt-10">
          <SpotlightCard intensity={0.08} className="bg-surface-pane">
            <EditorWindow
              tab={{ name: "contact.sh", kind: "sh" }}
              className="rounded-none border-0 bg-transparent"
              bodyClassName="bg-background/60 p-4 font-mono sm:p-8"
            >
              <p aria-hidden="true" className="text-xs text-syntax-comment">
                <span className="text-syntax-keyword">$</span> ./contact.sh
              </p>

              {email && (
                <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:items-stretch">
                  <a
                    href={email.href}
                    className={`group/email flex min-h-16 flex-1 items-center justify-between gap-3 rounded-lg border border-primary/35 bg-primary/6 px-4 py-4 text-base transition-colors hover:border-primary/70 sm:px-5 sm:text-xl ${focusRing}`}
                  >
                    {/* <wbr> lets very narrow screens wrap at the "@" instead of mid-word. */}
                    <span className="min-w-0 break-words">
                      {email.label.split("@")[0]}
                      <wbr />@{email.label.split("@")[1]}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary transition-transform group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  </a>
                  <CopyButton value={email.label} className="sm:min-h-16" />
                </div>
              )}

              <ul className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:gap-2.5">
                {others.map((channel, i) => (
                  <li
                    key={channel.kind}
                    className={
                      i === others.length - 1 && others.length % 2 === 1
                        ? "col-span-2"
                        : undefined
                    }
                  >
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 text-[0.8125rem] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:px-4 ${focusRing}`}
                    >
                      <span aria-hidden="true" className="text-primary">
                        →
                      </span>
                      open {channel.kind}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </EditorWindow>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
