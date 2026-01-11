import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import HeroCard from "../components/HeroCard"
import LinkSectionCard from "../components/LinkSectionCard"
import BlogCard from "../components/BlogCard"
import * as styles from "./index.module.css"

export const Head = () => (
  <>
    <title>Colloid's Profile Portal Site - CollidのPortalサイト</title>
    <meta name="description" content="Hello World" />
  </>
)

export default function IndexPage({ data }) {
  const posts = data?.allHatenaPost?.nodes ?? []
  const latestPosts = posts.slice(0, 4)
  const year = new Date().getFullYear()
  const introBlocks = [
    {
      title: "自分自身のこと",
      body: "静かな制作環境と観察を大切にしています。日々のアウトプットを少しずつ積み上げるタイプです。",
      bullets: ["記録と整理", "長期で整える", "好きな質感は金属と紙"],
    },
    {
      title: "趣味の同人のこと",
      body: "創作はイベント参加とオンライン頒布の両方で展開しています。",
      bullets: ["小冊子中心", "デザインと構成にこだわる"],
    },
    {
      title: "職業エンジニアのこと",
      body: "設計と実装のバランスを意識し、長く使える仕組みづくりを心がけています。",
      bullets: ["UI/UX", "自動化", "保守性重視"],
    },
  ]

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const elements = document.querySelectorAll("[data-animate]")

    if (prefersReduced.matches) {
      elements.forEach((element) => element.classList.add(styles.inView))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const linkCards = [
    {
      title: "SNS",
      links: [
        {
          label: "X(Twitter)",
          id: "@ColloidGel",
          icon: "x",
          url: "https://twitter.com/ColloidGel",
        },
        {
          label: "BlueSky",
          id: "@ColloidGel",
          icon: "bluesky",
          url: "https://bsky.app/profile/colloidgel.bsky.social",
        },
        {
          label: "mixi2",
          id: "@ColloidGel",
          icon: "mixi2",
          url: "https://mixi.social/@ColloidGel",
        },
      ],
    },
    {
      title: "お絵かき系",
      links: [
        {
          label: "pixiv",
          id: "colloidgel",
          icon: "pixiv",
          url: "https://www.pixiv.net/users/1965562",
        },
        {
          label: "Xfolio(クロスフォリオ)",
          id: "ColloidGel",
          icon: "xfolio",
          url: "https://xfolio.jp/portfolio/ColloidGel",
        },
      ],
    },
    {
      title: "同人誌の通販",
      links: [
        {
          label: "BOOTH",
          id: "ミルク蒼屋.com",
          icon: "booth",
          url: "https://blueparticles.booth.pm/",
        },
        {
          label: "メロンブックス",
          id: "ミルク蒼屋の同人誌",
          icon: "melon",
          url: "https://www.melonbooks.co.jp/circle/index.php?circle_id=100689",
        },
      ],
    },
    {
      title: "技術系",
      links: [
        {
          label: "Qiita",
          id: "ColloidGel",
          icon: "qiita",
          url: "https://qiita.com/ColloidGel",
        },
        {
          label: "Zenn",
          id: "Colloid",
          icon: "zenn",
          url: "https://zenn.dev/colloidgel",
        },
        {
          label: "GitHub",
          id: "mwu966",
          icon: "github",
          url: "https://github.com/mwu966",
        },
      ],
    },
  ]

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <HeroCard />
        <section
          id="intro"
          className={`${styles.introSection} ${styles.reveal}`}
          data-animate
          style={{ transitionDelay: "0ms" }}
        >
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeading}>
              <div className={styles.sectionTitle}>Self Introduction</div>
              <div className={styles.sectionCaption}>自己紹介の概要</div>
            </div>
            <div className={styles.sectionRule} />
          </div>
          <div className={styles.introGrid}>
            {introBlocks.map((block, index) => (
              <article
                key={block.title}
                className={`${styles.introCard} ${styles.reveal}`}
                data-animate
                style={{ transitionDelay: `${80 * index}ms` }}
              >
                <h3 className={styles.introTitle}>{block.title}</h3>
                <p className={styles.introBody}>{block.body}</p>
                <ul className={styles.introList}>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.contentSection}>
          <div id="links" className={styles.subSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeading}>
                <div className={styles.sectionTitle}>Links</div>
                <div className={styles.sectionCaption}>カテゴリ一覧</div>
              </div>
              <div className={styles.sectionRule} />
            </div>
            <div className={styles.linksGrid}>
              {linkCards.map((card, index) => (
                <LinkSectionCard
                  key={card.title}
                  title={card.title}
                  links={card.links}
                  className={styles.reveal}
                  data-animate
                  style={{ transitionDelay: `${80 * index}ms` }}
                />
              ))}
            </div>
          </div>
          <div id="blog" className={styles.subSection}>
            <BlogCard
              posts={latestPosts}
              className={styles.reveal}
              data-animate
              style={{ transitionDelay: "0ms" }}
            />
          </div>
        </section>
        <footer className={styles.footer}>
          <span>© {year} Colloid</span>
        </footer>
      </main>
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
