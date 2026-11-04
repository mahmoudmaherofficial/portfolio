import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { MotionProvider } from "@/components/motion/MotionProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/profile"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

const title = `${profile.name} - ${profile.title}`

// The OG image comes from opengraph-image.tsx, which Next adds to these tags automatically.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: profile.bio,
  authors: [{ name: profile.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.bio,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.bio },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased motion-safe:scroll-smooth",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <head>
        {/* Without JS, Framer Motion's server-rendered initial styles would hide content. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-motion]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
