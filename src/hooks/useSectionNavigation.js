import * as React from "react"

// Treat a wheel gesture or a navigation key as one section transition.
// Long foreground panels and detail dialogs retain their own native scrolling.
export default function useSectionNavigation(rootRef) {
  React.useEffect(() => {
    const root = rootRef.current
    const stage = root.querySelector(".opening-stage")
    const ids = ["top", "intro", "links", "blog", "wavebox"]
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let moving = false
    let lastWheel = -Infinity
    let wheelDelta = 0
    let touch = null
    let stageHeight = stage.offsetHeight
    let viewportWidth = window.innerWidth
    let targetIndex = null
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    function position() {
      return Math.max(0, Math.min(4, -root.getBoundingClientRect().top / stage.offsetHeight))
    }
    function blocked(event) {
      return document.querySelector("dialog[open]") || event.target.closest?.("input, textarea, select, [contenteditable=true], [role=slider]")
    }
    function canScrollForeground(target, direction) {
      const layer = target.closest?.(".scene-layer")
      return layer && (direction > 0 ? layer.scrollTop + layer.clientHeight < layer.scrollHeight - 2 : layer.scrollTop > 2)
    }
    function go(index, { focus = false, history = false, animate = true } = {}) {
      cancelAnimationFrame(frame)
      frame = 0
      moving = false
      const target = Math.max(0, Math.min(4, index))
      const start = window.scrollY
      const destination = root.getBoundingClientRect().top + start + target * stage.offsetHeight
      const distance = destination - start
      function complete() {
        if (history && window.location.hash !== `#${ids[target]}`) window.history.pushState(window.history.state, "", `#${ids[target]}`)
        if (focus) frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            frame = 0
            document.getElementById(target === 0 ? "top-title" : `${ids[target]}-heading`)?.focus({ preventScroll: true })
          })
        })
      }
      if (Math.abs(distance) < 1) { targetIndex = null; complete(); return }
      targetIndex = target
      const duration = reduced.matches || !animate ? 0 : 720
      const started = performance.now()
      moving = true
      function tick(now) {
        const progress = duration ? Math.min(1, (now - started) / duration) : 1
        const ease = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
        window.scrollTo({ top: start + distance * ease, behavior: "instant" })
        if (progress < 1) frame = requestAnimationFrame(tick)
        else { moving = false; frame = 0; targetIndex = null; complete() }
      }
      frame = requestAnimationFrame(tick)
    }
    function step(direction, options) {
      const current = position()
      go(direction > 0 ? Math.floor(current + .05) + 1 : Math.ceil(current - .05) - 1, options)
    }
    function onKey(event) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || blocked(event)) return
      const direction = ["ArrowDown", "PageDown"].includes(event.key) ? 1 : ["ArrowUp", "PageUp"].includes(event.key) ? -1 : 0
      if (!direction) return
      if (event.target.closest?.('a, button, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=combobox], [role=listbox], [role=spinbutton]')) return
      if (canScrollForeground(event.target, direction)) return
      event.preventDefault()
      if (!moving && !event.repeat) step(direction, { focus: true })
    }
    function onWheel(event) {
      if (event.ctrlKey || blocked(event) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const direction = Math.sign(event.deltaY)
      if (!direction) return
      const now = performance.now()
      const gap = now - lastWheel
      lastWheel = now
      if (!moving && canScrollForeground(event.target, direction)) return
      event.preventDefault()
      if (moving || (gap < 180 && wheelDelta === 0)) return
      if (gap > 180 || Math.sign(wheelDelta) !== direction) wheelDelta = 0
      wheelDelta += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.offsetHeight : 1)
      if (Math.abs(wheelDelta) >= 16) { wheelDelta = 0; step(direction) }
    }
    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute("href").slice(1)
      const index = ids.indexOf(id)
      if (index < 0) return
      event.preventDefault()
      go(index, { focus: true, history: true })
    }
    function onNavigate(event) {
      const id = typeof event.detail === "string" ? event.detail : event.detail.id
      const index = ids.indexOf(id)
      if (index >= 0) go(index, { focus: true, history: typeof event.detail === "string" || event.detail.history !== false })
    }
    function onTouchStart(event) {
      if (!blocked(event) && event.touches.length === 1) touch = { x: event.touches[0].clientX, y: event.touches[0].clientY, target: event.target }
    }
    function onTouchMove(event) {
      if (blocked(event) || event.touches.length !== 1) return
      if (moving) { event.preventDefault(); return }
      if (!touch) return
      const dy = touch.y - event.touches[0].clientY
      const dx = touch.x - event.touches[0].clientX
      if (Math.abs(dy) <= Math.abs(dx) || canScrollForeground(touch.target, Math.sign(dy))) return
      event.preventDefault()
      if (!moving && Math.abs(dy) > 45) { step(Math.sign(dy)); touch = null }
    }
    function onTouchEnd() { touch = null }
    function onHistory() {
      const index = ids.indexOf(window.location.hash.slice(1) || "top")
      if (index >= 0) {
        window.dispatchEvent(new CustomEvent("portal:history", { detail: ids[index] }))
        go(index, { focus: true, animate: false })
      }
    }
    function onResize() {
      const nextHeight = stage.offsetHeight
      if (stageHeight === nextHeight && viewportWidth === window.innerWidth) return
      viewportWidth = window.innerWidth
      const oldPosition = Math.max(0, Math.min(4, -root.getBoundingClientRect().top / stageHeight))
      const anchor = targetIndex ?? (oldPosition < .45 ? oldPosition : Math.max(1, Math.round(oldPosition)))
      cancelAnimationFrame(frame)
      frame = 0
      moving = false
      targetIndex = null
      touch = null
      wheelDelta = 0
      lastWheel = -Infinity
      stageHeight = nextHeight
      root.querySelectorAll(".scene-layer").forEach(layer => { layer.scrollTop = 0; layer.scrollLeft = 0 })
      window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY + anchor * stageHeight, behavior: "instant" })
    }
    window.addEventListener("popstate", onHistory)
    window.addEventListener("hashchange", onHistory)
    const initialIndex = ids.indexOf(window.location.hash.slice(1))
    if (initialIndex >= 0) go(initialIndex, { animate: false })
    window.addEventListener("resize", onResize)
    window.addEventListener("portal:navigate", onNavigate)
    window.addEventListener("keydown", onKey)
    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("click", onClick)
    root.addEventListener("touchstart", onTouchStart, { passive: true })
    root.addEventListener("touchmove", onTouchMove, { passive: false })
    root.addEventListener("touchend", onTouchEnd)
    return () => {
      cancelAnimationFrame(frame)
      window.history.scrollRestoration = previousRestoration
      window.removeEventListener("popstate", onHistory)
      window.removeEventListener("hashchange", onHistory)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("portal:navigate", onNavigate)
      window.removeEventListener("keydown", onKey)
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("click", onClick)
      root.removeEventListener("touchstart", onTouchStart)
      root.removeEventListener("touchmove", onTouchMove)
      root.removeEventListener("touchend", onTouchEnd)
    }
  }, [rootRef])
}
