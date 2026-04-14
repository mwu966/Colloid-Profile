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
      body: "Colloidの自己紹介。",
    },
    {
      key: "creative",
      title: "Creative",
      body: "Colloidの個人同人活動のサークル｢ミルク蒼屋｣の活動履歴。",
    },
    {
      key: "engineering",
      title: "Engineering",
      body: "エンジニアColloidの技術スキルの紹介。",
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
      lead: "自己紹介",
      tone: "cool",
      render: () => (
        <div className={styles.overlayGrid}>
          <div className={styles.overlayMain}>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>Colloid / コロイド</h3>
              <p className={styles.overlayBody}>
                本職はシステムエンジニア。趣味で二次創作のイラストや漫画を描くオタク。
              </p>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>簡単な履歴</h3>
              <p className={styles.overlayBody}>
                平成一桁台に誕生。幼少期にWindows95に触れたのをきっかけにPCに興味を持ち、以降そこからITに関わる道を歩む。
              </p>
              <p className={styles.overlayBody}>
                学生時代は趣味で二次創作のイラストを描いたりする。大学はコンピューター・サイエンスを専攻。
              </p>
              <p className={styles.overlayBody}>
                社会人になってからは、システムエンジニアとして主にバックエンドの開発の携わる。片手間に二次創作で同人誌を作ったり、イラストを描いたりしている。
              </p>
            </section>
          </div>
          <aside className={styles.overlaySide}>
            <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
              <h3 className={styles.overlayCardTitle}>趣味</h3>
              <div className={styles.overlayList}>
                <div className={styles.overlayListItem}>
                  ゲーム
                  <br />
                  （東方Project / アークナイツ / DDR）
                </div>
                <div className={styles.overlayListItem}>読書（ジャンル雑多）</div>
                <div className={styles.overlayListItem}>旅行(国内メイン)</div>
                <div className={styles.overlayListItem}>お絵かき</div>
              </div>
            </section>
          </aside>
        </div>
      ),
    },
    creative: {
      title: "Creative",
      lead: "同人サークル｢ミルク蒼屋｣にて、主に東方Project、DDR(BEMANIシリーズ)二次創作同人誌を発行しています。",
      tone: "warm",
      render: () => (
        <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
          <h3 className={styles.overlayCardTitle}>同人活動履歴</h3>
          <p className={styles.overlayBody}>
            各タイトルのリンク先は、BOOTH の販売ページまたは pixiv のサンプルページです。
          </p>
          <div className={styles.overlayList}>
            <h4 className={styles.overlayYear}>2025</h4>
            <div className={styles.overlayListItem}>
              コミックマーケット107:
              <a href="https://blueparticles.booth.pm/items/7780048" target="_blank" rel="noreferrer">
                ナイトメア・ループ・ダイアリー
              </a>
            </div>
            <div className={styles.overlayListItem}>
              第22回博麗神社例大祭:
              <a href="https://blueparticles.booth.pm/items/6847801" target="_blank" rel="noreferrer">
                タイムカプセルを探して
              </a>
            </div>
            <h4 className={styles.overlayYear}>2024</h4>
            <div className={styles.overlayListItem}>
              第21回博麗神社例大祭:
              <a href="https://blueparticles.booth.pm/items/5695006" target="_blank" rel="noreferrer">
                魔理沙が菫子になる話
              </a>
            </div>
            <h4 className={styles.overlayYear}>2023</h4>
            <div className={styles.overlayListItem}>
              第12回科学世紀のカフェテラス:
              <a href="https://blueparticles.booth.pm/items/5066472" target="_blank" rel="noreferrer">
                ウェディングショー
              </a>
            </div>
            <div className={styles.overlayListItem}>
              東方名華祭17:
              <a href="https://blueparticles.booth.pm/items/4895427" target="_blank" rel="noreferrer">
                積石とジェンガ
              </a>
            </div>
            <h4 className={styles.overlayYear}>2022</h4>
            <div className={styles.overlayListItem}>
              東方紅楼夢18:
              <a href="https://www.pixiv.net/artworks/101755741" target="_blank" rel="noreferrer">
                秘封挙式写真倶楽部
              </a>
              （コピー本）
            </div>
            <div className={styles.overlayListItem}>
              コミックマーケット100:
              <a href="https://blueparticles.booth.pm/items/4066207" target="_blank" rel="noreferrer">
                お酒を嗜むさとり様
              </a>
              /
              <a href="https://blueparticles.booth.pm/items/4064406" target="_blank" rel="noreferrer">
                東方ワンドロアーカイブ
              </a>
            </div>
            <h4 className={styles.overlayYear}>2021</h4>
            <div className={styles.overlayListItem}>
              第8回博麗神社秋季例大祭:
              <a href="https://blueparticles.booth.pm/items/3469169" target="_blank" rel="noreferrer">
                Moment2
              </a>
            </div>
            <div className={styles.overlayListItem}>
              東方名華祭15:
              <a href="https://www.pixiv.net/artworks/137278898" target="_blank" rel="noreferrer">
                東風谷早苗と不思議なポスト
              </a>
            </div>
            <h4 className={styles.overlayYear}>2020</h4>
            <div className={styles.overlayListItem}>
              東方紅楼夢16:
              <a href="https://blueparticles.booth.pm/items/2459535" target="_blank" rel="noreferrer">
                ご近所さんとのつきあい方
              </a>
            </div>
            <div className={styles.overlayListItem}>
              秋葉原超同人祭:
              <a href="https://blueparticles.booth.pm/items/2247547" target="_blank" rel="noreferrer">
                もしも幻想郷がコンテナだったら
              </a>
            </div>
            <h4 className={styles.overlayYear}>2019</h4>
            <div className={styles.overlayListItem}>
              コミックマーケット97:
              <a href="https://blueparticles.booth.pm/items/1727666" target="_blank" rel="noreferrer">
                Chasing the Arrow -Dance Dance Revolution譜面紹介合同 3rdMix-
              </a>
            </div>
            <div className={styles.overlayListItem}>
              東方紅楼夢15:
              <a href="https://blueparticles.booth.pm/items/2031767" target="_blank" rel="noreferrer">
                Moment
              </a>
              （イラスト合同本）
            </div>
            <h4 className={styles.overlayYear}>2018</h4>
            <div className={styles.overlayListItem}>
              コミックマーケット95:
              <a href="https://blueparticles.booth.pm/items/1137222" target="_blank" rel="noreferrer">
                Chasing the Arrow -Dance Dance Revolution譜面紹介合同 2ndMix-
              </a>
            </div>
            <div className={styles.overlayListItem}>
              コミックマーケット94:
              <a href="https://www.pixiv.net/artworks/69938999" target="_blank" rel="noreferrer">
                香霖堂.comへようこそ! #1 夢のネットワーク
              </a>
            </div>
            <div className={styles.overlayListItem}>
              東方名華祭12:
              <a href="https://www.pixiv.net/artworks/67978062" target="_blank" rel="noreferrer">
                香霖堂.comへようこそ！ #0
              </a>
              （コピー本）
            </div>
            <h4 className={styles.overlayYear}>2017</h4>
            <div className={styles.overlayListItem}>
              コミックマーケット93:
              <a href="https://blueparticles.booth.pm/items/736255" target="_blank" rel="noreferrer">
                Chasing the Arrow -Dance Dance Revolution譜面紹介合同-
              </a>
              を委託頒布
            </div>
            <div className={styles.overlayListItem}>
              コミックマーケット92:
              <a href="https://www.pixiv.net/artworks/64208152" target="_blank" rel="noreferrer">
                ようこそAndroidの世界へ
              </a>
            </div>
            <h4 className={styles.overlayYear}>2016 / 2014</h4>
            <div className={styles.overlayListItem}>
              コミックマーケット90:
              <a href="https://www.pixiv.net/artworks/58218808" target="_blank" rel="noreferrer">
                BLUE×ORANGE Feat.→↓
              </a>
              （合同イラスト本）
            </div>
            <div className={styles.overlayListItem}>
              コミックマーケット87:
              <a href="https://blueparticles.booth.pm/items/66561" target="_blank" rel="noreferrer">
                Colorful Times
              </a>
              （合同イラスト本）
            </div>
          </div>
        </section>
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
