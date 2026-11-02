export type Profile = {
  name: string
  title: string
  bio: string
  location: string
  timezone: string
  availability: string
  /** URL path of the resume PDF under `public/`, starting with "/". */
  resumePath: string
  /** Paragraphs of the About section. */
  about: string[]
  /** URL of this portfolio's public GitHub repo. */
  repoUrl: string
  /** Profile photo under `public/`, with its intrinsic size. */
  photo: { src: string; width: number; height: number }
}
