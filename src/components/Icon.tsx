import * as React from "react"
import icons from "./fontawesome-icons.json"

// Font Awesome Free 6.7.2 © Fonticons, Inc. Icons licensed CC BY 4.0.
// https://fontawesome.com/license/free — same icons as the original site's kit.
export type IconName = keyof typeof icons

type Props = { name: IconName; size?: number; className?: string; title?: string }

export function Icon({ name, size = 18, className, title }: Props) {
  const icon = icons[name]
  return <svg viewBox={icon.viewBox} width={size} height={size} className={className} fill="currentColor" aria-hidden={title ? undefined : true} aria-label={title} role={title ? "img" : undefined} focusable="false">
    {icon.paths.map((path, index) => <path key={index} d={path} />)}
  </svg>
}
