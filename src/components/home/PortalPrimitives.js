import * as React from "react"

export function GlyphIcon({ name, size = 22, ...props }) {
  const paths = {
    "arrow-up-right": <><path d="M7 17 17 7M7 7h10v10" /></>,
    "arrow-down": <path d="M12 4v16m-7-7 7 7 7-7" />,
    "arrow-up": <path d="M12 20V4m-7 7 7-7 7 7" />,
    "arrow-left": <path d="M20 12H4m7-7-7 7 7 7" />,
    "chevron-left": <path d="m15 6-6 6 6 6" />,
    "chevron-right": <path d="m9 6 6 6-6 6" />,
    "message-circle": <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

export function DataBlock({ className = "" }) {
  const block = React.useRef(null)
  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const tiles = [...block.current.children]
    const resets = new Set()
    let timer
    function clear() {
      clearTimeout(timer)
      resets.forEach(clearTimeout)
      resets.clear()
      tiles.forEach(tile => tile.classList.remove("is-glinting"))
    }
    function pulse() {
      const available = tiles.filter(tile => !tile.classList.contains("is-glinting"))
      if (available.length) {
        const tile = available[Math.floor(Math.random() * available.length)]
        tile.classList.add("is-glinting")
        const reset = setTimeout(() => { tile.classList.remove("is-glinting"); resets.delete(reset) }, 900)
        resets.add(reset)
      }
      timer = setTimeout(pulse, 700 + Math.random() * 1500)
    }
    function start() {
      clear()
      if (!media.matches) timer = setTimeout(pulse, 300 + Math.random() * 1200)
    }
    media.addEventListener("change", start)
    start()
    return () => { clear(); media.removeEventListener("change", start) }
  }, [])
  return <span ref={block} className={`data-block ${className}`} aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</span>
}

export function ExternalLink({ children, className = "", ...props }) {
  return <a {...props} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
}

export function OutlineAction({ children, href, onClick, className = "", ...props }) {
  const contents = <>{children}<GlyphIcon name="arrow-up-right" size={20} /></>
  return href
    ? <ExternalLink href={href} className={`outline-action ${className}`} {...props}>{contents}</ExternalLink>
    : <button type="button" onClick={onClick} className={`outline-action ${className}`} {...props}>{contents}</button>
}

export function NextSection({ href, children, up = false }) {
  return <a className="next-section" href={href}><GlyphIcon name={up ? "arrow-up" : "arrow-down"} />{children}</a>
}

export const SECTIONS = [
  { id: "intro", label: "01 Intro" },
  { id: "links", label: "02 Links" },
  { id: "blog", label: "03 Blog" },
  { id: "wavebox", label: "04 WaveBox" },
]

export function SiteHeader({ active, dark = false, onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [menuClosing, setMenuClosing] = React.useState(false)
  const menuTimer = React.useRef(null)
  const menu = React.useRef(null)
  const trigger = React.useRef(null)
  React.useEffect(() => {
    if (menuOpen && !menu.current.open) menu.current.showModal()
  }, [menuOpen])
  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    function onDesktop() {
      if (!desktop.matches || !menu.current?.open) return
      clearTimeout(menuTimer.current)
      menu.current.close()
      setMenuOpen(false)
      setMenuClosing(false)
      trigger.current.closest("header").querySelector('.desktop-nav a[aria-current]')?.focus({ preventScroll: true })
    }
    desktop.addEventListener("change", onDesktop)
    return () => { clearTimeout(menuTimer.current); desktop.removeEventListener("change", onDesktop) }
  }, [])
  function closeMenu(after) {
    if (menuClosing) return
    setMenuClosing(true)
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280
    menuTimer.current = setTimeout(() => {
      menu.current?.close()
      setMenuOpen(false)
      setMenuClosing(false)
      trigger.current?.focus({ preventScroll: true })
      if (after) after()
    }, duration)
  }
  function navigate(event, id) {
    if (menuOpen) {
      event.preventDefault()
      closeMenu(() => {
        if (onNavigate) onNavigate(id)
        else window.dispatchEvent(new CustomEvent("portal:navigate", { detail: id }))
      })
      return
    }
    if (onNavigate) {
      event.preventDefault()
      onNavigate(id)
    }
  }
  const links = SECTIONS.map(({ id, label }, i) => <a key={id} style={{ "--menu-index": i }} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={event => navigate(event, id)}>{label}</a>)
  return <>
    <header className={`site-header ${dark ? "site-header-dark" : ""}`}>
      <a href="#top" className="site-brand" onClick={event => navigate(event, "top")}>Colloid Archive Portal</a>
      <nav className="desktop-nav" aria-label="セクション">{links}</nav>
      <button type="button" className="menu-trigger icon-button" aria-label="メニューを開く" aria-expanded={menuOpen} ref={trigger} onClick={() => setMenuOpen(true)}><GlyphIcon name="menu" size={24} /></button>
    </header>
    <dialog ref={menu} className={`mobile-menu ${menuClosing ? "menu-closing" : ""}`} aria-label="サイトメニュー" onCancel={event => { event.preventDefault(); closeMenu() }} onClose={() => setMenuOpen(false)}>
      <div className="menu-heading"><a href="#top" className="site-brand" onClick={event => navigate(event, "top")}>Colloid Archive Portal</a><button type="button" className="icon-button" aria-label="メニューを閉じる" onClick={() => closeMenu()}><GlyphIcon name="close" size={24} /></button></div>
      <nav aria-label="モバイルセクション">{links}</nav>
    </dialog>
  </>
}

export function SectionPanel({ number, title, children }) {
  return <div className="section-left"><div className="section-label"><span className="section-number" aria-hidden="true">{number}</span><h2 id={`${title.toLowerCase()}-heading`} className={`section-title ${title === "WaveBox" ? "section-title-wave" : ""}`}>{title}</h2><span className="section-divider" aria-hidden="true" /><p className="section-description">{children}</p></div></div>
}
