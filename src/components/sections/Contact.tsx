import { ArrowUpRight, Mail, MessageCircle } from "lucide-react"

import SpotlightCard from "@/components/SpotlightCard"
import { Reveal } from "@/components/motion/Reveal"
import { contact } from "@/content/contact"
import type { ContactChannel } from "@/lib/types"

/** lucide-react no longer ships brand logos, so LinkedIn and GitHub use small inline marks. */
function ChannelIcon({ kind }: { kind: ContactChannel["kind"] }) {
  if (kind === "email") return <Mail aria-hidden="true" className="size-4" />
  if (kind === "whatsapp")
    return <MessageCircle aria-hidden="true" className="size-4" />
  return (
    <span
      aria-hidden="true"
      className="flex size-4 items-center justify-center font-mono text-[0.625rem] leading-none font-semibold"
    >
      {kind === "linkedin" ? "in" : "gh"}
    </span>
  )
}

const focusRing = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

export function Contact() {
  const email = contact.channels.find((channel) => channel.kind === "email")
  const others = contact.channels.filter((channel) => channel.kind !== "email")

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t py-24 offscreen-section sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <p
            aria-hidden="true"
            className="font-mono text-xs text-muted-foreground"
          >
            05 // contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {contact.intro}
          </p>
        </Reveal>

        {email && (
          <Reveal delay={0.1} className="mt-10 w-full">
            <SpotlightCard intensity={0.08}>
              <a
                href={email.href}
                className={`group/email flex min-h-16 items-center justify-center gap-2 rounded-xl border border-border px-4 py-5 font-mono text-xs transition-colors hover:border-primary/60 min-[400px]:text-sm sm:gap-3 sm:text-xl ${focusRing}`}
              >
                <ChannelIcon kind="email" />
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
            </SpotlightCard>
          </Reveal>
        )}

        <Reveal delay={0.15} className="mt-6">
          <ul className="flex flex-wrap justify-center gap-3">
            {others.map((channel) => (
              <li key={channel.kind}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/link flex min-h-11 items-center gap-2 rounded-full border border-border px-4 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground ${focusRing}`}
                >
                  <ChannelIcon kind={channel.kind} />
                  {channel.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 opacity-60 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
