import * as React from "react"

const clamp = value => Math.min(1, Math.max(0, value))

// Keep one background and header in place. Only content layers change after TOP.
export default function useOpeningScroll(rootRef, onSectionChange) {
  React.useEffect(() => {
    const root = rootRef.current
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobile = window.matchMedia("(max-width: 767px)")
    const hero = root.querySelector(".top-screen")
    const layers = [...root.querySelectorAll(".scene-layer")]
    const header = root.querySelector(".site-header")
    const ids = ["intro", "links", "blog", "wavebox"]
    let pending = 0
    let previousSection = -1
    function update() {
      pending = 0
      const stageHeight = root.querySelector(".opening-stage").offsetHeight
      const position = Math.max(0, Math.min(4, -root.getBoundingClientRect().top / stageHeight))
      const progress = clamp(position)
      const reduced = media.matches
      const letters = clamp(progress / .45)
      const panel = clamp((progress - .45) / .55)
      const eased = 1 - Math.pow(1 - panel, 2)
      root.style.setProperty("--glyph-travel", `${reduced ? 0 : letters * (mobile.matches ? 230 : 760)}px`)
      root.style.setProperty("--hero-opacity", reduced ? (progress < .5 ? 1 : 0) : 1 - clamp((progress - .3) / .15))
      root.style.setProperty("--copy-opacity", reduced ? (progress < .5 ? 1 : 0) : 1 - clamp(progress / .27))
      root.style.setProperty("--panel-shift", `${reduced ? 0 : -100 * (1 - eased)}%`)
      root.style.setProperty("--intro-opacity", reduced ? (progress >= .5 ? 1 : 0) : clamp((progress - .6) / .4))
      root.style.setProperty("--panel-opacity", reduced ? (progress >= .5 ? 1 : 0) : (progress >= .45 ? 1 : 0))
      const sectionPosition = Math.max(0, position - 1)
      const active = Math.round(sectionPosition)
      layers.forEach((layer, i) => {
        const distance = Math.abs(sectionPosition - i)
        const opacity = reduced ? (active === i ? 1 : 0) : clamp(1 - distance * 2)
        const openingOpacity = i === 0 && position < 1 ? clamp((progress - .6) / .4) : 1
        layer.style.opacity = opacity * openingOpacity
        layer.style.visibility = opacity === 0 ? "hidden" : "visible"
        layer.style.transform = reduced ? "none" : `translateY(${Math.max(-1, Math.min(1, i - sectionPosition)) * (1 - opacity) * 36}px)`
        layer.inert = active !== i || progress < .9
        layer.setAttribute("aria-hidden", active !== i || progress < .9 ? "true" : "false")
      })
      if (active !== previousSection) { previousSection = active; onSectionChange(ids[active]) }
      header.inert = progress < .9
      hero.inert = progress >= .45
      hero.style.visibility = progress >= .45 ? "hidden" : "visible"
    }
    function schedule() { if (!pending) pending = requestAnimationFrame(update) }
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    media.addEventListener("change", schedule)
    mobile.addEventListener("change", schedule)
    update()
    return () => {
      cancelAnimationFrame(pending)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      media.removeEventListener("change", schedule)
      mobile.removeEventListener("change", schedule)
    }
  }, [rootRef, onSectionChange])
}
