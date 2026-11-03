import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Hero } from "@/components/sections/Hero"
import { Skills } from "@/components/sections/Skills"
import { site } from "@/content/site"

/** Sections below the hero, in page order. The nav only links to sections listed here. */
const SECTIONS = [
  { id: "about", Component: About },
  { id: "skills", Component: Skills },
  { id: "experience", Component: Experience },
]

const nav = site.nav.filter((item) =>
  SECTIONS.some((section) => section.id === item.id)
)

export default function Page() {
  return (
    <>
      <Header nav={nav} />
      <main>
        <Hero />
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
      <Footer nav={nav} />
    </>
  )
}
