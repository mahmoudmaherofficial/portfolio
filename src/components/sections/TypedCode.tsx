"use client"

import { memo, useEffect, useState } from "react"

import { Tok, type TokKind } from "@/components/ide/Tok"
import type { CodeLine, CodeTokenKind } from "@/lib/profile-code"
import { cn } from "@/lib/utils"

const TOKEN_KIND: Record<CodeTokenKind, TokKind> = {
  keyword: "keyword",
  type: "type",
  key: "plain",
  string: "string",
  plain: "plain",
}

/** Wait before typing (the card fades in first), and typing speed. */
const START_MS = 550
const CHARS_PER_SECOND = 90

/** Untyped text: present for layout, invisible. Shown without JS (noscript `[data-motion]` rule) and under reduced motion. */
const HIDDEN = "motion-reduce:opacity-100!"

const lineLength = (line: CodeLine) =>
  line.reduce((sum, token) => sum + token.text.length, 0)

/** How many characters are typed so far. Starts at 0 on the server and the first client render. */
function useTypedCount(total: number): { count: number; done: boolean } {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Reduced motion: no typing, the whole card appears on the first frame.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let start = 0
    const step = (now: number) => {
      if (!start) start = now
      const next = reduce
        ? total
        : Math.min(total, Math.floor(((now - start) / 1000) * CHARS_PER_SECOND))
      setCount(next)
      if (next < total) frame = requestAnimationFrame(step)
    }
    const timer = window.setTimeout(
      () => {
        frame = requestAnimationFrame(step)
      },
      reduce ? 0 : START_MS
    )
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [total])

  return { count, done: count >= total }
}

/** One token split at the typed position: the typed part, then the invisible rest. */
function TokenSlice({
  kind,
  text,
  part,
}: {
  kind: TokKind
  text: string
  part: "typed" | "rest"
}) {
  if (!text) return null
  if (part === "typed") return <Tok kind={kind}>{text}</Tok>
  return (
    <Tok kind={kind}>
      <span data-motion style={{ opacity: 0 }} className={HIDDEN}>
        {text}
      </span>
    </Tok>
  )
}

/** Zero-width cursor, so it never pushes text or changes where lines wrap. */
function Cursor({ blink }: { blink: boolean }) {
  return (
    <span className="relative">
      <span
        className={cn(
          "absolute top-0 left-0.5 text-primary",
          blink && "motion-safe:animate-pulse"
        )}
      >
        ▍
      </span>
    </span>
  )
}

/**
 * Code lines that type in letter by letter, with the cursor following the last typed letter
 * and blinking at the end. The full text is always in the markup (untyped letters are
 * transparent), so the layout never shifts while typing.
 */
export function TypedCode({
  lines,
  highlight,
}: {
  lines: CodeLine[]
  /** Index of the line to highlight like an editor's current line. */
  highlight: number
}) {
  const lengths = lines.map(lineLength)
  const total = lengths.reduce((sum, length) => sum + length, 0)
  // Character offset where each line starts.
  const starts = lengths.map((_, i) =>
    lengths.slice(0, i).reduce((sum, length) => sum + length, 0)
  )
  const { count, done } = useTypedCount(total)

  // The line the cursor is on: the first line not fully typed, or the last line when done.
  const firstUnfinished = starts.findIndex((at, i) => count < at + lengths[i])
  const cursorLine = firstUnfinished === -1 ? lines.length - 1 : firstUnfinished

  return (
    <pre
      aria-hidden="true"
      className="py-3 font-mono text-xs leading-[1.375rem] sm:overflow-x-auto sm:py-3.5 sm:text-[13px] sm:leading-[1.625rem]"
    >
      <code>
        {lines.map((line, i) => (
          <CodeRow
            key={i}
            line={line}
            number={i + 1}
            typed={Math.max(0, Math.min(lengths[i], count - starts[i]))}
            started={count > starts[i] || i === 0}
            highlighted={i === highlight}
            cursor={i === cursorLine ? (done ? "blink" : "solid") : "none"}
          />
        ))}
      </code>
    </pre>
  )
}

/**
 * One line of code. Memoized so that each typing frame re-renders only the line under the
 * cursor; finished and not-yet-started lines keep the same props and are skipped.
 */
const CodeRow = memo(function CodeRow({
  line,
  number,
  typed: typedInLine,
  started,
  highlighted,
  cursor,
}: {
  line: CodeLine
  number: number
  /** Characters typed so far in this line. */
  typed: number
  started: boolean
  highlighted: boolean
  cursor: "none" | "solid" | "blink"
}) {
  const slices = line.map((token, j) => {
    const offset = line
      .slice(0, j)
      .reduce((sum, previous) => sum + previous.text.length, 0)
    const typed = Math.max(0, Math.min(token.text.length, typedInLine - offset))
    return {
      kind: TOKEN_KIND[token.kind],
      typed: token.text.slice(0, typed),
      rest: token.text.slice(typed),
    }
  })

  return (
    <span
      className={cn(
        "grid grid-cols-[1.875rem_minmax(0,1fr)] pr-3 sm:grid-cols-[2.75rem_auto] sm:pr-4",
        highlighted && "bg-primary/8 shadow-[inset_2px_0_0_var(--primary)]"
      )}
    >
      <span
        data-motion
        style={started ? undefined : { opacity: 0 }}
        className={cn(
          "pr-2.5 text-right select-none sm:pr-4",
          HIDDEN,
          highlighted ? "text-primary" : "text-gutter"
        )}
      >
        {number}
      </span>
      {/* Phones: long lines wrap, with continuation lines indented past the key. */}
      <span className="pl-[4ch] -indent-[4ch] break-words whitespace-pre-wrap sm:pl-0 sm:indent-0 sm:whitespace-pre">
        {slices.map((slice, j) => (
          <TokenSlice
            key={j}
            kind={slice.kind}
            text={slice.typed}
            part="typed"
          />
        ))}
        {cursor !== "none" && <Cursor blink={cursor === "blink"} />}
        {slices.map((slice, j) => (
          <TokenSlice key={j} kind={slice.kind} text={slice.rest} part="rest" />
        ))}
      </span>
    </span>
  )
})
