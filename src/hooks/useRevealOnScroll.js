import * as React from "react"

export default function useRevealOnScroll(inViewClassName) {
  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const elements = document.querySelectorAll("[data-animate]")

    if (prefersReduced.matches) {
      elements.forEach((element) => element.classList.add(inViewClassName))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(inViewClassName)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [inViewClassName])
}
