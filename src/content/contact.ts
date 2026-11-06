import type { ContactContent } from "@/lib/types"

export const contact: ContactContent = {
  heading: "Let's work together",
  intro:
    "I'm looking for a full-time front-end role: remote, on-site in Egypt, or with relocation to the Gulf. I'm also open to freelance and contract work. Email is the fastest way to reach me, and I reply within 24 hours.",
  replyTime: "within 24h",
  channels: [
    {
      kind: "email",
      label: "mahmoudmaherofficial@gmail.com",
      href: "mailto:mahmoudmaherofficial@gmail.com",
    },
    // Links by username, so no phone number is exposed.
    {
      kind: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/mahmoudmaher_official",
      handle: "@mahmoudmaher_official",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mahmoudmaherofficial2/",
      handle: "in/mahmoudmaherofficial2",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/mahmoudmaherofficial",
      handle: "@mahmoudmaherofficial",
    },
  ],
}
