/**
 * Fetches a Google Font for next/og, subset to `text`. next/og only bundles Geist Regular.
 * The images that use it are static, so this runs once at build time.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
) {
  const query = `family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?${query}`)
  ).text()
  const url = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
  )?.[1]
  if (!url) throw new Error(`Could not load font: ${family} ${weight}`)
  return (await fetch(url)).arrayBuffer()
}
