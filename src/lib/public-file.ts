import fs from "node:fs"
import path from "node:path"

/** Checks at build time whether a file exists under `public/`. Server Components only. */
export function publicFileExists(urlPath: string): boolean {
  // Build-time only (the page is static): skip output file tracing.
  return fs.existsSync(
    /*turbopackIgnore: true*/ path.join(process.cwd(), "public", urlPath)
  )
}
