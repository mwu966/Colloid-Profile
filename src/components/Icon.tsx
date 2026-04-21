import * as React from "react"

export type IconName =
  | "x"
  | "bluesky"
  | "mixi2"
  | "pixiv"
  | "xfolio"
  | "booth"
  | "melon"
  | "qiita"
  | "zenn"
  | "github"

type Props = {
  name: IconName
  size?: number
  className?: string
  title?: string
}

const iconClassMap: Record<IconName, string> = {
  x: "fa-brands fa-x-twitter",
  bluesky: "fa-brands fa-bluesky",
  mixi2: "fa-solid fa-m",
  pixiv: "fa-brands fa-pixiv",
  xfolio: "fa-regular fa-images",
  booth: "fa-solid fa-store",
  melon: "fa-solid fa-book",
  qiita: "fa-solid fa-q",
  zenn: "fa-solid fa-z",
  github: "fa-brands fa-github",
}

export function Icon({ name, size = 18, className, title }: Props) {
  return (
    <i
      className={`${iconClassMap[name]}${className ? ` ${className}` : ""}`}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : "presentation"}
    />
  )
}
