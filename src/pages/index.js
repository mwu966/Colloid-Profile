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
      title: "Profile",
      body: "イラスト制作とフロントエンド実装を横断して活動。",
    },
    {
      title: "Creative",
      body: "同人誌・告知・ビジュアルの設計から制作まで担当。",
    },
    {
      title: "Engineering",
      body: "保守性を重視したUI設計と実装を継続的に改善。",
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
      title: "同人通販",
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
      <main className={styles.container}>
        <Header />
        <section className={styles.reveal} data-animate style={{ transitionDelay: "0ms" }}>
          <HeroCard introBlocks={introBlocks} />
        </section>
        <section id="links" className={styles.linksSection}>
          <h2 className={styles.sectionTitle}>
            Links（SNS / お絵かき系 / 同人通販 / 技術系）
          </h2>
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
        </section>
        <section id="blog" className={styles.reveal} data-animate style={{ transitionDelay: "40ms" }}>
          <BlogCard posts={latestPosts} />
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
