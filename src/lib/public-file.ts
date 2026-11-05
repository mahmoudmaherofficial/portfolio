import fs from "node:fs"
import path from "node:path"

import { profile } from "@/content/profile"

/** Checks at build time whether a file exists under `public/`. Server Components only. */
export function publicFileExists(urlPath: string): boolean {
  // Build-time only (the page is static): skip output file tracing.
  return fs.existsSync(
    /*turbopackIgnore: true*/ path.join(process.cwd(), "public", urlPath)
  )
}

/** The resume's URL, or undefined when the PDF is not in `public/`. */
export function getResumeHref(): string | undefined {
  return publicFileExists(profile.resumePath) ? profile.resumePath : undefined
}
