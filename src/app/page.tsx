import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { StatusBar } from "@/components/layout/StatusBar"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Experience } from "@/components/sections/Experience"
import { Hero } from "@/components/sections/Hero"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { getVisibleProjects } from "@/lib/projects"

const hasProjects = getVisibleProjects().length > 0

/** Sections below the hero, in page order. The nav only links to sections listed here. */
const SECTIONS = [
  { id: "about", Component: About },
  ...(hasProjects ? [{ id: "projects", Component: Projects }] : []),
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
  { id: "contact", Component: Contact },
]

const nav = site.nav.filter((item) =>
  SECTIONS.some((section) => section.id === item.id)
)

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-3 py-2 font-mono text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Skip to content
      </a>
      <Header nav={nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
      <Footer nav={nav} />
      <StatusBar
        availability={profile.availability}
        availabilityShort={profile.availabilityShort}
        items={nav}
      />
    </>
  )
}
