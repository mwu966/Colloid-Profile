import * as React from "react"
import { DataBlock, GlyphIcon, NextSection, OutlineAction, SectionPanel, SiteHeader } from "./PortalPrimitives"
import { BlogSection, LinksSection, WaveBoxSection } from "./PortalSections"
import SlidingContent from "./SlidingContent"
import useSectionNavigation from "../../hooks/useSectionNavigation"
import useOpeningScroll from "../../hooks/useOpeningScroll"
import { INTRO_BLOCKS } from "../../data/homeContent"

export const INTRO_SLIDES = INTRO_BLOCKS.map((block, i) => ({
  ...block,
  subtitle: ["自己紹介", "創作活動", "技術・仕事"][i],
  description: [
    "本職はバックエンド寄りのシステムエンジニア。趣味で二次創作のイラストや漫画を描く。",
    "同人サークル｢ミルク蒼屋｣にて、主に東方Project、DDR(BEMANIシリーズ)二次創作同人誌を発行しています。",
    "エンジニアとしてのスキルセットや経験についての雑な紹介です。",
  ][i],
}))

export function ProfileName() {
  return <span className="profile-name"><span className="name-latin">Colloid</span><span className="name-slash">/</span><span className="name-japanese" lang="ja">コロイド</span></span>
}

function IntroSection({ index, setIndex, onDetails }) {
  const slide = INTRO_SLIDES[index]
  const [direction, setDirection] = React.useState(1)
  function select(next, sign = next > index ? 1 : -1) { setDirection(sign); setIndex(next) }
  const change = delta => select((index + delta + INTRO_SLIDES.length) % INTRO_SLIDES.length, delta)
  function onArrowKey(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); change(event.key === "ArrowLeft" ? -1 : 1) }
  }
  return <section id="intro-screen" className="portal-section intro-section" aria-labelledby="intro-heading">
    <SectionPanel number="01" title="Intro">Colloidの人物像・創作活動・<br className="desktop-break" />エンジニアとしての仕事を紹介。</SectionPanel>
    <div className="section-right intro-right" role="region" aria-roledescription="カルーセル" aria-label="Colloidの紹介">
      <div className="intro-slide" role="tabpanel" id="intro-slide-panel" aria-labelledby={`intro-tab-${index}`} aria-live="polite" aria-atomic="true">
        <SlidingContent index={index} direction={direction}>
        <h3 className={`intro-category ${slide.key === "engineering" ? "engineering-title" : ""}`}>{slide.title}</h3>
        <p className="intro-subtitle">{slide.subtitle}</p>
        <p className={`intro-name ${slide.key === "creative" ? "creative-name" : ""}`}>{index === 0 ? <ProfileName /> : index === 1 ? '個人同人サークル「ミルク蒼屋」' : 'C# / Java / AWS'}</p>
        <p className="intro-description">{slide.description}</p>
        <OutlineAction className="intro-details" onClick={() => onDetails(slide.key)} aria-haspopup="dialog">詳しく見る</OutlineAction>
        </SlidingContent>
      </div>
      <button type="button" onKeyDown={onArrowKey} className="carousel-arrow carousel-prev icon-button" aria-label="前の紹介" onClick={() => change(-1)}><GlyphIcon name="chevron-left" size={32} /></button>
      <button type="button" onKeyDown={onArrowKey} className="carousel-arrow carousel-next icon-button" aria-label="次の紹介" onClick={() => change(1)}><GlyphIcon name="chevron-right" size={32} /></button>
      <div className="slide-choices" role="tablist" aria-label="紹介を選ぶ">{INTRO_SLIDES.map((item, i) => <button key={item.key} type="button" role="tab" id={`intro-tab-${i}`} aria-controls="intro-slide-panel" tabIndex={i === index ? 0 : -1} onKeyDown={event => { onArrowKey(event); if (event.key === "ArrowLeft" || event.key === "ArrowRight") document.getElementById(`intro-tab-${(index + (event.key === "ArrowLeft" ? 2 : 1)) % 3}`)?.focus() }} aria-label={`${String(i + 1).padStart(2, "0")} ${item.title}／${item.subtitle}`} aria-selected={i === index} onClick={() => select(i)}><span>{String(i + 1).padStart(2, "0")} {item.title}</span><span>{item.subtitle}</span></button>)}</div>
    </div>
    <NextSection href="#links">次へ　02 Links</NextSection>
  </section>
}

export default function ScrollOpening({ posts, ...props }) {
  const root = React.useRef(null)
  const [active, setActive] = React.useState("intro")
  useOpeningScroll(root, setActive)
  useSectionNavigation(root)
  return <div className="opening-scroll" ref={root} id="top">
    {["intro", "links", "blog", "wavebox"].map((id, i) => <span key={id} id={id} className="scene-anchor" style={{ top: `calc(var(--stage-height) * ${i + 1})` }} tabIndex={-1} aria-label={id} />)}
    <div className="opening-stage">
      <div className="scene-ivory" aria-hidden="true" />
      <DataBlock className="scene-data-block" />
      <SiteHeader active={active} />
      <div className="scene-layer" data-scene="intro"><IntroSection {...props} /></div>
      <div className="scene-layer" data-scene="links"><LinksSection /></div>
      <div className="scene-layer" data-scene="blog"><BlogSection posts={posts} /></div>
      <div className="scene-layer" data-scene="wavebox"><WaveBoxSection /></div>
      <section className="top-screen" aria-labelledby="top-title">
        <div className="top-meta"><span>COLLOID ARCHIVE PORTAL</span><span>CREATIVE &amp; ENGINEERING</span></div>
        <h1 className="colloid-logo" id="top-title" aria-label="Colloid">{Array.from("Colloid", (letter, i) => <span className={`logo-glyph ${i % 2 ? "glyph-down" : "glyph-up"}`} aria-hidden="true" key={i}><span className="glyph-fill">{letter}</span></span>)}</h1>
        <p className="portal-strapline">ARCHIVE PORTAL</p>
        <p className="portal-introduction">Colloidの創作と技術のアーカイブポータルサイトです。</p>
        <a href="#intro" className="top-scroll"><span><GlyphIcon name="arrow-down" /></span><small>SCROLL TO EXPLORE</small></a>
      </section>
    </div>
  </div>
}
