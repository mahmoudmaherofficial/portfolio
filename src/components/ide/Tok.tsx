import { cn } from "@/lib/utils"

export type TokKind = "keyword" | "string" | "comment" | "type" | "plain"

const TOK_CLASS: Record<TokKind, string> = {
  keyword: "text-syntax-keyword",
  string: "text-syntax-string",
  comment: "text-syntax-comment",
  type: "text-primary",
  plain: "text-muted-foreground",
}

export function Tok({
  kind,
  className,
  children,
}: {
  kind: TokKind
  className?: string
  children: React.ReactNode
}) {
  return <span className={cn(TOK_CLASS[kind], className)}>{children}</span>
}
