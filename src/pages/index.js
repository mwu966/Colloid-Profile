import * as React from "react"
import { graphql } from "gatsby"
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
  const [activeIntroKey, setActiveIntroKey] = React.useState(null)
  const introBlocks = [
    {
      key: "profile",
      title: "Profile",
      body: "人物紹介、履歴、好きなゲームへつながる入口。",
    },
    {
      key: "creative",
      title: "Creative",
      body: "同人誌、告知、SNS 用ビジュアルまで一貫して制作。",
    },
    {
      key: "engineering",
      title: "Engineering",
      body: "資格、スキル、経歴へつながる入口。",
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
      tone: "cool",
      links: [
        {
          label: "X",
          id: "@colloidgel",
          icon: "x",
          url: "https://twitter.com/ColloidGel",
        },
        {
          label: "Bluesky",
          id: "@colloidgel",
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
      tone: "warm",
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
      tone: "cool",
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
      tone: "warm",
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

  const introOverlayContent = {
    profile: {
      title: "Profile",
      lead: "カードから開いたときに、その人となりがすぐ掴める構成です。",
      tone: "cool",
      render: () => (
        <div className={styles.overlayGrid}>
          <div className={styles.overlayMain}>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>Colloid / コロイド</h3>
              <p className={styles.overlayBody}>
                イラスト制作とフロントエンド開発を横断しながら活動する個人クリエイター。作品紹介だけでなく、
                活動の履歴や嗜好まで含めて人物像が伝わる構成を想定しています。
              </p>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>簡単な履歴</h3>
              <p className={styles.overlayBody}>
                学生時代から絵を描き続けながら、個人サイトや創作告知ページを触る中で Web に興味を持つ。
              </p>
              <p className={styles.overlayBody}>
                社会人以降は UI 実装や情報設計の比重が上がり、創作活動と技術活動が並走するスタイルに定着。
              </p>
              <p className={styles.overlayBody}>
                現在はポートフォリオ、同人誌、技術発信を横断しつつ、更新し続けられる個人サイトの形を模索中。
              </p>
            </section>
          </div>
          <aside className={styles.overlaySide}>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>好きなゲーム</h3>
              <div className={styles.overlayList}>
                <div className={styles.overlayListItem}>キングダム ハーツ</div>
                <div className={styles.overlayListItem}>スプラトゥーン</div>
                <div className={styles.overlayListItem}>ゼルダの伝説</div>
              </div>
            </section>
          </aside>
        </div>
      ),
    },
    creative: {
      title: "Creative",
      lead: "同人誌の表紙・タイトル・イベント頒布情報を一覧で辿れる構成です。",
      tone: "warm",
      render: () => (
        <div className={styles.overlayGrid}>
          <div className={styles.overlayMain}>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>同人誌アーカイブ</h3>
              <div className={styles.overlayList}>
                <div className={styles.overlayListItem}>未来遊歩 / 2024秋 / COMITIA</div>
                <div className={styles.overlayListItem}>潮騒インターフェース / 2023夏 / C102</div>
                <div className={styles.overlayListItem}>Orbital Sketchbook / 2022冬 / C101</div>
                <div className={styles.overlayListItem}>海底都市データログ / 2021春 / COMITIA</div>
              </div>
            </section>
          </div>
          <aside className={styles.overlaySide}>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>Archive Note</h3>
              <p className={styles.overlayBody}>
                表紙サムネイル、本文サンプル、頒布ページリンクへの導線をこの右カラムで切り替える想定です。
              </p>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>想定フィルタ</h3>
              <div className={styles.overlayChips}>
                <span className={styles.overlayChip}>漫画</span>
                <span className={styles.overlayChip}>イラスト本</span>
                <span className={styles.overlayChip}>設定資料集</span>
                <span className={styles.overlayChip}>イベント別</span>
              </div>
            </section>
          </aside>
        </div>
      ),
    },
    engineering: {
      title: "Engineering",
      lead: "資格、スキル、経歴を一覧で把握できる、実務寄りの構成です。",
      tone: "cool",
      render: () => (
        <div className={styles.overlayGrid}>
          <div className={styles.overlayMain}>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>資格</h3>
              <div className={styles.overlayList}>
                <div className={styles.overlayListItem}>基本情報技術者</div>
                <div className={styles.overlayListItem}>色彩検定 2級</div>
                <div className={styles.overlayListItem}>Webデザイン技能検定 など</div>
              </div>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>簡単な経歴</h3>
              <p className={styles.overlayBody}>
                制作系の個人活動と並行して、Web サイトや UI 実装の改善に携わる。
              </p>
              <p className={styles.overlayBody}>
                React / CSS / コンポーネント設計を中心に、運用しやすい画面設計と実装を担当。
              </p>
              <p className={styles.overlayBody}>
                近年はポートフォリオ改善、情報設計、アクセシビリティも含めて継続的に改善中。
              </p>
            </section>
          </div>
          <aside className={styles.overlaySide}>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>スキル</h3>
              <div className={styles.overlayChips}>
                <span className={styles.overlayChip}>React</span>
                <span className={styles.overlayChip}>TypeScript</span>
                <span className={styles.overlayChip}>HTML / CSS</span>
                <span className={styles.overlayChip}>Gatsby</span>
                <span className={styles.overlayChip}>Git</span>
                <span className={styles.overlayChip}>UI設計</span>
                <span className={styles.overlayChip}>アクセシビリティ</span>
              </div>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>想定導線</h3>
              <p className={styles.overlayBody}>
                職務経歴書、GitHub、制作事例、保有資格の証明ページへこのモーダルから分岐。
              </p>
            </section>
          </aside>
        </div>
      ),
    },
  }

  const activeIntro = activeIntroKey ? introOverlayContent[activeIntroKey] : null

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.reveal} data-animate style={{ transitionDelay: "0ms" }}>
          <HeroCard introBlocks={introBlocks} onIntroSelect={setActiveIntroKey} />
        </section>
        <section id="links" className={styles.linksSection}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionBadge}>02</span>
            <h2 className={styles.sectionTitle}>Links</h2>
          </div>
          <p className={styles.sectionLead}>
            カテゴリ単位で探しやすく、リンク自体はボタンとして押しやすい構成です。
          </p>
          <div className={styles.linksGrid}>
            {linkCards.map((card, index) => (
              <LinkSectionCard
                key={card.title}
                title={card.title}
                links={card.links}
                tone={card.tone}
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
          <span>Creative Archive Portal</span>
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
            {activeIntro.render()}
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
