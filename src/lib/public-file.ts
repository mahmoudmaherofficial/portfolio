import fs from "node:fs"
import path from "node:path"

/**
 * Checks at build time whether a file exists under `public/`.
 * Accepts a URL path ("/file.pdf") or a relative one ("file.pdf").
 * Paths that resolve outside `publicDir` return false.
 * Import only from Server Components.
 */
export function publicFileExists(
  urlPath: string,
  publicDir: string = path.join(process.cwd(), "public")
): boolean {
  // Build-time only (the page is static): skip output file tracing.
  const base = path.resolve(/*turbopackIgnore: true*/ publicDir)
  const target = path.resolve(base, urlPath.replace(/^\/+/, ""))
  if (!target.startsWith(base + path.sep)) return false
  return fs.existsSync(/*turbopackIgnore: true*/ target)
}
