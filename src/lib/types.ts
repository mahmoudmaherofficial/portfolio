export type Profile = {
  name: string
  title: string
  bio: string
  location: string
  timezone: string
  availability: string
  /** URL path of the CV under `public/`, starting with "/". */
  cvPath: string
}
