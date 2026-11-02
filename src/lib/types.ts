export type Profile = {
  name: string
  title: string
  bio: string
  location: string
  timezone: string
  availability: string
  /** URL path of the resume PDF under `public/`, starting with "/". */
  resumePath: string
}
