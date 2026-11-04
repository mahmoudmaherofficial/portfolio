import type { ContactContent } from "@/lib/types"

export const contact: ContactContent = {
  heading: "Let's work together",
  intro: "Open to front-end roles, remote or on-site in the Gulf.",
  channels: [
    {
      kind: "email",
      label: "mahmoudmaherofficial@gmail.com",
      href: "mailto:mahmoudmaherofficial@gmail.com",
    },
    // Link only: the number is never displayed.
    { kind: "whatsapp", label: "WhatsApp", href: "https://wa.me/201093931501" },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mahmoudmaherofficial2/",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/mahmoudmaherofficial",
    },
  ],
}
