import { ArrowDown, ArrowUpRight } from "lucide-react"

import { CopyButton } from "@/components/CopyButton"
import { EditorWindow } from "@/components/ide/EditorWindow"
import { Gutter } from "@/components/ide/Gutter"
import { SectionHeading } from "@/components/ide/SectionHeading"
import { Reveal } from "@/components/motion/Reveal"
import { CairoClock } from "@/components/sections/CairoClock"
import { contact } from "@/content/contact"
import { profile } from "@/content/profile"
import { publicFileExists } from "@/lib/public-file"

/** One line of the contact object: `key: value,` that is also a link. */
type ObjectLine = {
  key: string
  href: string
  /** Screen-reader name of the link; the visible code is decorative. */
  label: string
  value: React.ReactNode
  external?: boolean
  download?: boolean
  copy?: string
}

export function Contact() {
  const resumeHref = publicFileExists(profile.resumePath)
    ? profile.resumePath
    : undefined

  const output = [
    { key: "name", value: profile.name },
    { key: "role", value: profile.title },
    { key: "location", value: profile.location },
    {
      key: "timezone",
      value: (
        <>
          {profile.timezone} <CairoClock />
        </>
      ),
    },
    { key: "status", value: profile.availability },
    { key: "reply", value: contact.replyTime },
  ]

  const lines: ObjectLine[] = contact.channels.map((channel) => {
    const isEmail = channel.kind === "email"
    const text = isEmail ? channel.label : channel.handle
    return {
      key: channel.kind,
      href: channel.href,
      label: text ? `${channel.label}: ${text}` : channel.label,
      external: !isEmail,
      copy: isEmail ? channel.label : undefined,
      value: text ? (
        <CodeString>{text}</CodeString>
      ) : (
        <CodeCall name="message" />
      ),
    }
  })
  if (resumeHref) {
    lines.push({
      key: "resume",
      href: resumeHref,
      label: "Download Resume (PDF)",
      download: true,
      value: <CodeCall name="download" arg="resume.pdf" />,
    })
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t py-16 offscreen-section sm:py-28"
    >
      <div className="container">
        <Reveal>
          <SectionHeading id="contact-heading" command="./contact.sh">
            {contact.heading}
          </SectionHeading>
          <p className="mt-4 max-w-[65ch] text-base text-muted-foreground sm:text-lg">
            {contact.intro}
          </p>
        </Reveal>

        <Reveal amount="some" className="mt-6 sm:mt-8">
          <EditorWindow
            tab={{ name: "contact.sh", kind: "sh" }}
            extraTab={
              resumeHref
                ? {
                    name: "resume.pdf",
                    kind: "pdf",
                    href: resumeHref,
                    download: true,
                  }
                : undefined
            }
            meta="bash · exit 0"
            bodyClassName="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            {/* Script output: who, where and when. */}
            <div className="grid border-b lg:grid-cols-[2.75rem_minmax(0,1fr)] lg:border-r lg:border-b-0">
              <Gutter lines={9} className="hidden pt-6 lg:block" />
              <div className="px-4 py-5 font-mono text-[0.8125rem] sm:px-6 sm:py-6">
                <p aria-hidden="true" className="text-syntax-comment">
                  {"// output"}
                </p>
                <dl className="mt-2 grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[5.5rem_minmax(0,1fr)] gap-y-1.5 leading-6">
                  {output.map(({ key, value }) => (
                    <div key={key} className="contents">
                      <dt className="text-syntax-keyword">{key}</dt>
                      <dd className="min-w-0 text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p aria-hidden="true" className="mt-2 leading-6">
                  <span className="text-syntax-keyword">$</span>{" "}
                  <span className="inline-block h-3.5 w-2 translate-y-0.5 bg-primary" />
                </p>
              </div>
            </div>

            {/* The ways to reach me, written as a typed object. Every line is a link. */}
            <div className="py-4 font-mono text-[0.8125rem] sm:py-6 sm:text-sm">
              <p
                aria-hidden="true"
                className="px-4 leading-8 sm:px-6"
              >
                <span className="text-syntax-keyword">export const</span>{" "}
                contact <span className="text-syntax-comment">= {"{"}</span>
              </p>
              <ul aria-label="Ways to contact me">
                {lines.map((line) => (
                  <li
                    key={line.key}
                    // Phones: the copy button wraps under the email so the address stays on one line.
                    className="flex flex-wrap items-center transition-colors sm:flex-nowrap hover:bg-primary/7 hover:shadow-[inset_2px_0_0_var(--primary)] has-[a:focus-visible]:bg-primary/7 has-[a:focus-visible]:shadow-[inset_2px_0_0_var(--primary)]"
                  >
                    <a
                      href={line.href}
                      download={line.download || undefined}
                      {...(line.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="grid min-h-14 min-w-0 flex-1 basis-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 py-2 pr-4 pl-8 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset sm:min-h-11 sm:basis-0 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:py-1.5 sm:pr-6 sm:pl-12"
                    >
                      <span aria-hidden="true" className="col-start-1">
                        {line.key}
                        <span className="text-syntax-comment">:</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="col-start-1 min-w-0 break-all sm:col-start-2 sm:row-start-1"
                      >
                        {line.value}
                        <span className="text-syntax-comment">,</span>
                      </span>
                      <span className="sr-only">
                        {line.label}
                        {line.external && " (opens in a new tab)"}
                      </span>
                      {!line.copy &&
                        (line.download ? (
                          <ArrowDown
                            aria-hidden="true"
                            className="col-start-2 row-span-2 row-start-1 size-4 text-primary sm:col-start-3 sm:row-span-1"
                          />
                        ) : (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="col-start-2 row-span-2 row-start-1 size-4 text-primary sm:col-start-3 sm:row-span-1"
                          />
                        ))}
                    </a>
                    {line.copy && (
                      <CopyButton
                        value={line.copy}
                        className="mb-2.5 ml-8 min-h-11 shrink-0 px-3 text-xs sm:mr-5 sm:mb-0 sm:ml-0 sm:min-h-9"
                      />
                    )}
                  </li>
                ))}
              </ul>
              <p
                aria-hidden="true"
                className="px-4 leading-8 text-syntax-comment sm:px-6"
              >
                {"}"}
              </p>
            </div>
          </EditorWindow>
        </Reveal>
      </div>
    </section>
  )
}

function CodeString({ children }: { children: React.ReactNode }) {
  return <span className="text-syntax-string">&quot;{children}&quot;</span>
}

function CodeCall({ name, arg }: { name: string; arg?: string }) {
  return (
    <>
      <span className="text-primary">{name}</span>
      <span className="text-syntax-comment">(</span>
      {arg && <CodeString>{arg}</CodeString>}
      <span className="text-syntax-comment">)</span>
    </>
  )
}
