import * as React from "react"
import SlidingContent from "./SlidingContent"
import { Icon } from "../Icon"
import { BLOG_LINK_LABEL, BLOG_URL, LINK_CARD_COLUMNS, LINKS_SECTION_LEAD, WAVEBOX_BODY, WAVEBOX_SECTION_LEAD, WAVEBOX_URL } from "../../data/homeContent"
import { ExternalLink, GlyphIcon, NextSection, OutlineAction, SectionPanel } from "./PortalPrimitives"

const cards = LINK_CARD_COLUMNS.flat()
const categories = ["SNS", "お絵かき系", "同人通販", "技術系"].map(title => cards.find(card => card.title === title))

export function LinksSection() {
  const [index, setIndex] = React.useState(0)
  const selected = categories[index]
  const [direction, setDirection] = React.useState(1)
  function select(next, sign = next > index ? 1 : -1) { setDirection(sign); setIndex(next) }
  function change(delta) { select((index + delta + categories.length) % categories.length, delta) }
  function onTabKey(event) {
    let next
    if (event.key === "ArrowRight") next = (index + 1) % categories.length
    if (event.key === "ArrowLeft") next = (index + categories.length - 1) % categories.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = categories.length - 1
    if (next !== undefined) { event.preventDefault(); select(next); document.getElementById(`link-tab-${next}`)?.focus() }
  }
  return <section className="portal-section links-section" data-section="links" aria-labelledby="links-heading">
    <SectionPanel number="02" title="Links">{LINKS_SECTION_LEAD}</SectionPanel>
    <div className="section-right links-right"><h3 className="link-category-title">{selected.title}</h3>
      <div className="link-tabs" role="tablist" aria-label="リンクカテゴリ">{categories.map((category, i) => <button type="button" key={category.title} id={`link-tab-${i}`} role="tab" onKeyDown={onTabKey} aria-selected={i === index} aria-controls="link-panel" tabIndex={i === index ? 0 : -1} onClick={() => select(i)}>{category.title}</button>)}</div>
      <div role="tabpanel" id="link-panel" aria-labelledby={`link-tab-${index}`} className="link-list"><SlidingContent index={index} direction={direction}>{selected.links.map(link => <ExternalLink href={link.url} className="portal-link-row" key={link.url}><span className="link-site-icon"><Icon name={link.icon} size={26} /></span><span className="link-row-text"><span className="link-site-name">{link.label}</span><span className="link-account">{link.id}</span></span><GlyphIcon name="arrow-up-right" size={23} /></ExternalLink>)}</SlidingContent></div>
      <button type="button" className="carousel-arrow carousel-prev icon-button" aria-label="前のリンクカテゴリ" onClick={() => change(-1)}><GlyphIcon name="chevron-left" size={32} /></button><button type="button" className="carousel-arrow carousel-next icon-button" aria-label="次のリンクカテゴリ" onClick={() => change(1)}><GlyphIcon name="chevron-right" size={32} /></button>
    </div><NextSection href="#blog">次へ　03 Blog</NextSection>
  </section>
}

function postDate(post) {
  const date = new Date(post.isoDate || post.pubDate)
  if (Number.isNaN(date.getTime())) return post.pubDate
  return new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date).replace(/\//g, ".")
}

export function BlogSection({ posts }) {
  return <section className="portal-section blog-section" data-section="blog" aria-labelledby="blog-heading">
    <SectionPanel number="03" title="Blog">{BLOG_LINK_LABEL}</SectionPanel>
    <div className="section-right blog-right"><h3>ミルク蒼屋のチラシ</h3><ol className="blog-posts">{posts.slice(0, 4).map(post => <li key={post.id || post.link}><ExternalLink href={post.link}><span><time dateTime={post.isoDate || undefined}>{postDate(post)}</time><span className="post-title">{post.title}</span></span><GlyphIcon name="arrow-up-right" size={23} /></ExternalLink></li>)}</ol>
      <OutlineAction href={BLOG_URL} className="blog-archive">{BLOG_LINK_LABEL}</OutlineAction>
    </div><NextSection href="#wavebox">次へ　04 WaveBox</NextSection>
  </section>
}

export function WaveBoxSection() {
  return <section className="portal-section wavebox-section" data-section="wavebox" aria-labelledby="wavebox-heading">
    <SectionPanel number="04" title="WaveBox">{WAVEBOX_SECTION_LEAD}</SectionPanel>
    <div className="section-right wavebox-right"><h3>WaveBox</h3><p>{WAVEBOX_BODY}</p><ExternalLink href={WAVEBOX_URL} className="wavebox-cta"><span className="wavebox-cta-hand" aria-hidden="true">👋</span><span>Waveを送る</span><GlyphIcon name="arrow-up-right" size={22} /></ExternalLink></div>
    <NextSection href="#top" up>TOPへ</NextSection>
  </section>
}
