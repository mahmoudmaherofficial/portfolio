import { monogramIcon } from "@/lib/monogram-icon"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// iOS rounds the corners itself, so the icon stays square.
export default function AppleIcon() {
  return monogramIcon(size.width, 0)
}
