"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Switches between light and dark. The icon is picked by CSS, so it never flashes the wrong one. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-lg" }),
        "size-11"
      )}
      aria-label="Toggle dark mode"
      title="Toggle dark mode (D)"
    >
      <Sun aria-hidden="true" className="hidden dark:block" />
      <Moon aria-hidden="true" className="dark:hidden" />
    </button>
  )
}
