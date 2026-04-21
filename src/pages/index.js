import * as React from "react"
import { graphql } from "gatsby"
import HeroCard from "../components/HeroCard"
import LinkSectionCard from "../components/LinkSectionCard"
import BlogCard from "../components/BlogCard"
import Modal from "../components/Modal"
import { INTRO_OVERLAY_CONTENT } from "../components/home/IntroOverlayContent"
import {
  BLOG_LINK_LABEL,
  BLOG_URL,
  INTRO_BLOCKS,
  LINK_CARD_COLUMNS,
  LINKS_SECTION_LEAD,
  WAVEBOX_BODY,
  WAVEBOX_BUTTON_LABEL,
  WAVEBOX_SECTION_LEAD,
  WAVEBOX_URL,
} from "../data/homeContent"
import useRevealOnScroll from "../hooks/useRevealOnScroll"
import * as styles from "./index.module.css"

export const Head = () => (
  <>
    <title>Colloid Profile Site</title>
    <meta
      name="description"
      content="Colloid の創作活動と技術活動をまとめたポートフォリオサイト。"
    />
  </>
)

export default function IndexPage({ data }) {
  useRevealOnScroll(styles.inView)

  const posts = data?.allHatenaPost?.nodes ?? []
  const latestPosts = posts.slice(0, 4)
  const year = new Date().getFullYear()
  const [activeIntroKey, setActiveIntroKey] = React.useState(null)
  const activeIntro = activeIntroKey ? INTRO_OVERLAY_CONTENT[activeIntroKey] : null
  const ActiveIntroContent = activeIntro?.Content

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.reveal} data-animate style={{ transitionDelay: "0ms" }}>
          <HeroCard introBlocks={INTRO_BLOCKS} onIntroSelect={setActiveIntroKey} />
        </section>
        <section
          id="links"
          className={`${styles.sectionShell} ${styles.reveal}`}
          data-animate
          style={{ transitionDelay: "40ms" }}
        >
          <span className={`${styles.sectionMark} ${styles.sectionMarkRight}`}>02</span>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <span className={styles.sectionNumber}>02</span>
              <h2 className={styles.sectionTitle}>Links</h2>
            </div>
            <p className={styles.sectionLead}>{LINKS_SECTION_LEAD}</p>
          </div>
          <div className={styles.linksGrid}>
            {LINK_CARD_COLUMNS.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className={`${styles.linksColumn} ${columnIndex === 1 ? styles.linksColumnOffset : ""}`}
              >
                {column.map((card, cardIndex) => (
                  <LinkSectionCard
                    key={card.title}
                    title={card.title}
                    links={card.links}
                    tone={card.tone}
                    className={styles.reveal}
                    data-animate
                    style={{ transitionDelay: `${80 * (columnIndex * 2 + cardIndex + 1)}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
        <section
          id="blog"
          className={`${styles.sectionShell} ${styles.blogShell} ${styles.reveal}`}
          data-animate
          style={{ transitionDelay: "80ms" }}
        >
          <span className={`${styles.sectionMark} ${styles.sectionMarkLeft}`}>03</span>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <span className={styles.sectionNumber}>03</span>
              <h2 className={styles.sectionTitle}>Blog</h2>
            </div>
            <a
              href={BLOG_URL}
              className={styles.sectionLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {BLOG_LINK_LABEL}
            </a>
          </div>
          {latestPosts.length > 0 ? <BlogCard posts={latestPosts} /> : null}
        </section>
        <section
          id="wavebox"
          className={`${styles.sectionShell} ${styles.reveal}`}
          data-animate
          style={{ transitionDelay: "120ms" }}
        >
          <span className={`${styles.sectionMark} ${styles.sectionMarkRight}`}>04</span>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <span className={styles.sectionNumber}>04</span>
              <h2 className={styles.sectionTitle}>Wavebox</h2>
            </div>
            <p className={styles.sectionLead}>{WAVEBOX_SECTION_LEAD}</p>
          </div>
          <section className={styles.waveboxCard}>
            <div className={styles.waveboxCopy}>
              <p className={styles.waveboxBody}>{WAVEBOX_BODY}</p>
            </div>
            <a
              href={WAVEBOX_URL}
              className={styles.waveboxButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.waveboxButtonLead}>{WAVEBOX_BUTTON_LABEL}</span>
            </a>
          </section>
        </section>
        <footer className={styles.footer}>
          <span>© {year} Colloid</span>
        </footer>
      </main>
      <Modal
        isOpen={Boolean(activeIntro)}
        onClose={() => setActiveIntroKey(null)}
        title={activeIntro?.title || ""}
      >
        {activeIntro ? (
          <>
            <p className={styles.overlayLead}>{activeIntro.lead}</p>
            {ActiveIntroContent ? <ActiveIntroContent /> : null}
          </>
        ) : null}
      </Modal>
    </div>
  )
}

export const query = graphql`
  {
    allHatenaPost(sort: { isoDate: DESC }) {
      nodes {
        id
        title
        link
        pubDate
        isoDate
      }
    }
  }
`
