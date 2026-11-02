import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { MotionProvider } from "@/components/motion/MotionProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

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
