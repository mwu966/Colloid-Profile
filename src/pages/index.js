import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import HeroCard from "../components/HeroCard"
import LinkSectionCard from "../components/LinkSectionCard"
import BlogCard from "../components/BlogCard"
import Modal from "../components/Modal"
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
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const linkCards = [
    {
      title: "SNS",
      links: [
        { label: "X(Twitter)", url: "https://twitter.com/ColloidGel" },
        {
          label: "BlueSky",
          url: "https://bsky.app/profile/colloidgel.bsky.social",
        },
        { label: "mixi2", url: "https://mixi.social/@ColloidGel" },
      ],
    },
    {
      title: "お絵かき系",
      links: [
        { label: "pixiv", url: "https://www.pixiv.net/users/1965562" },
        {
          label: "Xfolio(クロスフォリオ)",
          url: "https://xfolio.jp/portfolio/ColloidGel",
        },
      ],
    },
    {
      title: "同人誌の通販",
      links: [
        { label: "BOOTH", url: "https://blueparticles.booth.pm/" },
        {
          label: "メロンブックス",
          url: "https://www.melonbooks.co.jp/circle/index.php?circle_id=100689",
        },
      ],
    },
    {
      title: "技術系",
      links: [
        { label: "Qiita", url: "https://qiita.com/ColloidGel" },
        { label: "Zenn", url: "https://zenn.dev/colloidgel" },
        { label: "GitHub", url: "https://github.com/mwu966" },
      ],
    },
  ]

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <HeroCard onOpenAbout={() => setIsModalOpen(true)} />
        <section className={styles.portalSection}>
          <div className={styles.portalHeader}>PORTAL CONTENTS</div>
          <div id="links" className={styles.subSection}>
            <div className={styles.sectionTitle}>LINKS</div>
            <div className={styles.linksGrid}>
              {linkCards.map((card) => (
                <LinkSectionCard
                  key={card.title}
                  title={card.title}
                  links={card.links}
                />
              ))}
            </div>
          </div>
          <div id="blog" className={styles.subSection}>
            <div className={styles.sectionTitle}>BLOG</div>
            <BlogCard posts={latestPosts} />
          </div>
        </section>
        <footer className={styles.footer}>
          <span>© {year} Colloid</span>
        </footer>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="自己紹介"
      >
        <p>
          好きな色は深い海のブルー、モチーフは航海と機械仕掛け。日々の制作と学びをまとめた、
          小さな港のようなポータルを運営しています。
        </p>
        <p>
          絵と技術の両方に興味があり、描くこと・つくること・試すことを大切にしています。
          ここでは活動の入口をまとめています。
        </p>
        <p>
          まだ工事中の場所も多いですが、少しずつ整備していく予定です。どうぞゆっくり見ていってください。
        </p>
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
