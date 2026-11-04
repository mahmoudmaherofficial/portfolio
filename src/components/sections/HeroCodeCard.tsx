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
 * Decorative code view of the profile. Hidden from assistive tech because
 * every value is already in the hero as real text.
 */
export function HeroCodeCard({ className }: { className?: string }) {
  const lines = profileCodeLines(profile)

  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-xl border border-primary/20 bg-card text-card-foreground shadow-2xl shadow-primary/10 dark:shadow-primary/10",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          profile.ts
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block">
              <span className="mr-4 inline-block w-4 text-right text-muted-foreground/50 select-none">
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
    </div>
  )
}
