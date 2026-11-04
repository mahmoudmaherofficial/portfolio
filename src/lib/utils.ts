export { cn } from "cn"

/** Two-digit counter, e.g. 3 → "03". */
export const pad = (n: number) => String(n).padStart(2, "0")
