import { EditorWindow } from "@/components/ide/EditorWindow"
import { Tok, type TokKind } from "@/components/ide/Tok"
import { profile } from "@/content/profile"
import { profileCodeLines, type CodeTokenKind } from "@/lib/profile-code"
import { cn } from "@/lib/utils"

const TOKEN_KIND: Record<CodeTokenKind, TokKind> = {
  keyword: "keyword",
  type: "type",
  key: "plain",
  string: "string",
  plain: "plain",
}

/**
 * Decorative code view of the profile in an editor window. The code is hidden from assistive
 * tech because every value is already in the hero as real text; the resume tab is a real link.
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
      <pre
        aria-hidden="true"
        className="overflow-x-auto py-3 font-mono text-xs leading-[1.375rem] sm:py-3.5 sm:text-[13px] sm:leading-[1.625rem]"
      >
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={cn(
                "block pr-4",
                i === highlight &&
                  "bg-primary/8 shadow-[inset_2px_0_0_var(--primary)]"
              )}
            >
              <span
                className={cn(
                  "inline-block w-[1.875rem] pr-2.5 text-right select-none sm:w-11 sm:pr-4",
                  i === highlight ? "text-primary" : "text-gutter"
                )}
              >
                {i + 1}
              </span>
              {line.map((token, j) => (
                <Tok key={j} kind={TOKEN_KIND[token.kind]}>
                  {token.text}
                </Tok>
              ))}
              {i === lines.length - 1 && (
                <span className="ml-1 text-primary motion-safe:animate-pulse">
                  ▍
                </span>
              )}
            </span>
          ))}
        </code>
      </pre>
    </EditorWindow>
  )
}
