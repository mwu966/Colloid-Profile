import * as React from "react"
import { INTRO_OVERLAY_CONTENT } from "./IntroOverlayContent"
import { INTRO_SLIDES } from "./IntroSection"
import { DataBlock, GlyphIcon, SiteHeader } from "./PortalPrimitives"

export default function IntroDetail({ initialKey, onClose }) {
  const [activeKey, setActiveKey] = React.useState(initialKey)
  const [closing, setClosing] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const dialog = React.useRef(null)
  const heading = React.useRef(null)
  const timer = React.useRef(null)
  const target = React.useRef(null)
  const closingRef = React.useRef(false)
  const historyNavigation = React.useRef(false)
  const closeHandler = React.useRef(null)
  const content = INTRO_OVERLAY_CONTENT[activeKey]
  const Content = content.Content

  React.useEffect(() => {
    const node = dialog.current
    const mobile = window.matchMedia("(max-width: 767px)")
    const updateMobile = () => setIsMobile(mobile.matches)
    updateMobile()
    mobile.addEventListener("change", updateMobile)
    const opener = document.activeElement
    const scrollY = window.scrollY
    const originalStageHeight = document.querySelector(".opening-stage").offsetHeight
    const onHistory = event => { target.current = event.detail; historyNavigation.current = true; closeHandler.current(event.detail) }
    window.addEventListener("portal:history", onHistory)
    node.showModal()
    heading.current.focus({ preventScroll: true })
    return () => {
      window.removeEventListener("portal:history", onHistory)
      mobile.removeEventListener("change", updateMobile)
      clearTimeout(timer.current)
      node.close()
      const stageChanged = document.querySelector(".opening-stage").offsetHeight !== originalStageHeight
      const returnY = stageChanged ? document.getElementById("intro").getBoundingClientRect().top + window.scrollY : scrollY
      window.scrollTo({ top: returnY, behavior: "instant" })
      opener?.focus({ preventScroll: true })
    }
  }, [])

  function close(id) {
    if (closingRef.current) return
    closingRef.current = true
    target.current = id || null
    setClosing(true)
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520
    timer.current = setTimeout(() => {
      const destination = target.current
      onClose()
      if (destination) requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("portal:navigate", { detail: { id: destination, history: !historyNavigation.current } }))
      })
    }, duration)
  }
  closeHandler.current = close

  function select(key) {
    setActiveKey(key)
    dialog.current.querySelector(".detail-scroll").scrollTop = 0
    heading.current.focus({ preventScroll: true })
  }
  const categoryMenu = (<nav className="detail-category-nav" aria-label="詳細カテゴリ" style={{ "--detail-index": INTRO_SLIDES.findIndex(item => item.key === activeKey) }}>
        <span className="detail-menu-highlight" aria-hidden="true" />{INTRO_SLIDES.map(item => <button type="button" key={item.key} aria-current={activeKey === item.key ? "page" : undefined} onClick={() => select(item.key)}>{item.title}{activeKey === item.key ? <GlyphIcon name="chevron-right" size={20} /> : null}</button>)}</nav>)
  return <dialog ref={dialog} className={`intro-detail ${closing ? "detail-closing" : ""}`} aria-labelledby="detail-title" onCancel={event => { event.preventDefault(); close() }}>
    <div className="detail-morph" aria-hidden="true" />
    <div className="detail-surface">
      <div className="detail-sticky-heading">
      <SiteHeader active="intro" dark onNavigate={close} />
      <DataBlock className="detail-data-block" />
      {isMobile ? <nav className="detail-return-nav" aria-label="詳細画面のナビゲーション"><a href="#intro" className="detail-return-mobile-link" onClick={event => { event.preventDefault(); close() }}><GlyphIcon name="arrow-left" size={18} />Intro に戻る</a></nav> : null}
      <div className="detail-heading"><div className="detail-section-marker"><span>01</span><span>Intro</span></div><div className="detail-title-group"><h2 id="detail-title" className={activeKey === "engineering" ? "engineering-title" : ""} ref={heading} tabIndex={-1}>{content.title}</h2><p>{content.lead}</p></div></div>
      {isMobile ? <div className="detail-header-tabs">{categoryMenu}</div> : null}
      </div>
      <div className="detail-scroll"><div className="detail-layout"><aside className="detail-rail">{!isMobile ? categoryMenu : null}</aside>
        <div className="detail-reading" key={activeKey}><Content /></div>
      </div></div>
      {!isMobile ? <button type="button" className="detail-return-fixed outline-action" onClick={() => close()}><GlyphIcon name="arrow-left" size={18} />Intro に戻る</button> : null}
    </div>
  </dialog>
}
