import { EditorWindow } from "@/components/ide/EditorWindow"
import { TypedCode } from "@/components/sections/TypedCode"
import { profile } from "@/content/profile"
import { profileCodeLines } from "@/lib/profile-code"
import { cn } from "@/lib/utils"

/**
 * Decorative code view of the profile in an editor window. The code is hidden from assistive
 * tech because its values are in the hero as real text (the badge carries the availability);
 * the resume tab is a real link.
 */
export function HeroCodeCard({
  resumeHref,
  className,
}: {
  resumeHref?: string
  className?: string
}) {
  const lines = profileCodeLines(profile)
  const highlight = lines.findIndex((line) =>
    line.some((token) => token.kind === "key" && token.text === "availability")
  )

  return (
    <EditorWindow
      dots
      compactOnPhones
      tab={{ name: "profile.ts", kind: "ts" }}
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
      path={["src", "content", "profile.ts"]}
      className={cn(
        "border-primary/25 shadow-2xl shadow-primary/15",
        className
      )}
    >
      <TypedCode lines={lines} highlight={highlight} />
    </EditorWindow>
  )
}
