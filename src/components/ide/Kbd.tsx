/** A keyboard key, e.g. for shortcut hints. */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block rounded border border-b-2 border-foreground/20 bg-background px-1.5 font-mono text-[0.7rem] leading-4 text-foreground">
      {children}
    </kbd>
  )
}
