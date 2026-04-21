import * as React from "react"
import { graphql } from "gatsby"
import HeroCard from "../components/HeroCard"
import LinkSectionCard from "../components/LinkSectionCard"
import BlogCard from "../components/BlogCard"
import Modal from "../components/Modal"
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
  const posts = data?.allHatenaPost?.nodes ?? []
  const latestPosts = posts.slice(0, 4)
  const year = new Date().getFullYear()
  const [activeIntroKey, setActiveIntroKey] = React.useState(null)
  const engineeringSkillItems = [
    { title: "C#", experience: 5, specialty: 4 },
    { title: "Java", experience: 5, specialty: 4 },
    { title: "VB.NET", experience: 2, specialty: 2 },
    { title: "WebForms", experience: 1, specialty: 2 },
    { title: "HTML/CSS/JS", experience: 1, specialty: 2 },
    { title: "自動テスト", experience: 1, specialty: 2 },
    { title: "Web API", experience: 5, specialty: 3 },
    { title: "WPF", experience: 3, specialty: 2 },
    { title: "Blazor", experience: 3, specialty: 2 },
    { title: "Spring Boot", experience: 2, specialty: 2 },
    { title: "Git", experience: 5, specialty: 3 },
    { title: "AWS", experience: 3, specialty: 3 },
    { title: "Oracle DB", experience: 2, specialty: 1 },
    { title: "PostgreSQL", experience: 4, specialty: 2 },
    { title: "ETL", experience: 3, specialty: 3 },
  ]
  const skillAxisLevels = [1, 2, 3, 4, 5]
  const skillSpecialtyLevels = [5, 4, 3, 2, 1]

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
      tone: "base",
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
      tone: "orange",
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
      title: "技術系",
      tone: "green",
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
    {
      title: "同人通販",
      tone: "blue",
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
  ]

  const linkColumns = [
    [linkCards[0], linkCards[1]],
    [linkCards[2], linkCards[3]],
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
                本職はバックエンド寄りのシステムエンジニア。趣味で二次創作のイラストや漫画を描く。
              </p>
            </section>
            <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
              <h3 className={styles.overlayCardTitle}>ざっくりとした経歴</h3>
              <div className={styles.overlayTimeline}>
                <p className={styles.overlayBody}>
                  平成一桁台に誕生。
                  <br />
                  幼少期に Windows95 に触れたのをきっかけに PC に興味を持ち、以降そこから IT に関わる道を歩む。
                </p>
                <p className={styles.overlayBody}>
                  学生時代は趣味で二次創作のイラストを描いたりする。
                  <br />
                  大学はコンピューター・サイエンスを専攻。
                </p>
                <p className={styles.overlayBody}>
                  社会人になってからは、システムエンジニアとして主にバックエンド開発に携わる。
                  <br />
                  片手間に二次創作で同人誌を作ったり、イラストを描いたりしている。
                </p>
              </div>
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
      lead: "エンジニアとしてのスキルセットや経験についての雑な紹介です。",
      tone: "green",
      render: () => (
        <div className={styles.overlayMain}>
          <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
            <h3 className={styles.overlayCardTitle}>資格</h3>
            <div className={styles.overlayList}>
              <div className={styles.overlayListItem}>
                2026年 Microsoft認定資格 AI-900 取得
              </div>
              <div className={styles.overlayListItem}>
                2024年 AWS Certified Cloud Practitioner 取得
              </div>
              <div className={styles.overlayListItem}>
                2023年 Microsoft認定資格 AZ-104 取得
              </div>
              <div className={styles.overlayListItem}>
                2021年 Microsoft認定資格 AZ-900 取得
              </div>
            </div>
          </section>
          <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
            <h3 className={styles.overlayCardTitle}>スキルマップ</h3>
            <p className={styles.skillMapNote}>主にバックエンド寄りの人です</p>
            <div className={styles.skillMatrixWrap}>
              <div className={styles.matrixHeader}>
                <span className={styles.matrixAxisTitle}>実務経験</span>
                <span className={styles.matrixAxisHint}>少ない → 多い</span>
              </div>
              <div className={styles.matrixScroller}>
                <div className={styles.matrixFrame}>
                  <div className={styles.matrixSideLabel}>得意分野</div>
                  <div className={styles.matrixBoard}>
                    <div className={styles.matrixTopLabels} aria-hidden="true">
                      {skillAxisLevels.map((level) => (
                        <span key={`x-${level}`} className={styles.matrixAxisValue}>
                          {level}
                        </span>
                      ))}
                    </div>
                    <div className={styles.matrixRows}>
                      {skillSpecialtyLevels.map((specialty) => (
                        <div key={`row-${specialty}`} className={styles.matrixGridRow}>
                          <span className={styles.matrixRowLabel}>{specialty}</span>
                          {skillAxisLevels.map((experience) => {
                            const cellSkills = engineeringSkillItems.filter(
                              (skill) =>
                                skill.experience === experience && skill.specialty === specialty
                            )

                            return (
                              <div
                                key={`cell-${specialty}-${experience}`}
                                className={styles.matrixCell}
                              >
                                {cellSkills.map((skill) => (
                                  <div key={skill.title} className={styles.matrixSkill}>
                                    <span className={styles.matrixSkillTitle}>{skill.title}</span>
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
            <h3 className={styles.overlayCardTitle}>ざっくりとした経歴</h3>
            <p className={styles.overlayBody}>
              人生初の仕事は保守とかでVB.NETとかWebFormsとか触っていた。<br />
              その後自社製品を扱う会社に転職したら即吸収合併になり消滅。<br />
              入りたかった会社が消滅したので落ち込む中、合併先で新規サービスを立ち上げることになり、そこでC#とかAWSを触る。また仕事のやり取りで英語の洗礼を受けてなんとか生き延びる。<br />
              新規サービス立ち上げ後に職場を変え、今はJavaやC#を使ったWeb系の開発をしたり、AWSをいじったり、時には指導したり色々やってる。<br />
              今後のAIの発展に怯えながらなんとか生きている。<br />
            </p>
          </section>
          <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
            <h3 className={styles.overlayCardTitle}>登壇履歴</h3>
            <div className={styles.overlayList}>
              <div className={styles.overlayListItem}>
                2020/11/21
                {" "}
                <a
                  href="https://vscode.connpass.com/event/184441/"
                  target="_blank"
                  rel="noreferrer"
                >
                  VS Code Conference Japan 2020
                </a>
                {" "}
                LT枠
              </div>
              <div className={styles.overlayListItem}>
                2017/01/28
                {" "}
                <a
                  href="https://jxug.connpass.com/event/47941/"
                  target="_blank"
                  rel="noreferrer"
                >
                  JXUGC #22 最新事例＆お前のアプリを説明してもらおうの会
                </a>
                {" "}
                LT枠
              </div>
            </div>
          </section>
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
            <p className={styles.sectionLead}>
              各種SNSや同人通販サイトなどへのリンクをまとめています。
            </p>
          </div>
          <div className={styles.linksGrid}>
            {linkColumns.map((column, columnIndex) => (
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
              href="https://colloidgel.hatenablog.com/"
              className={styles.sectionLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ブログ｢ミルク蒼屋のチラシ｣へ
            </a>
          </div>
          <BlogCard posts={latestPosts} />
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
            <p className={styles.sectionLead}>
              ひとこと感想や、軽いリアクション用の拍手置き場です。
            </p>
          </div>
          <section className={styles.waveboxCard}>
            <div className={styles.waveboxCopy}>
              <p className={styles.waveboxBody}>
                読んだよ、見たよ、くらいの軽いリアクションから、同人誌の感想等、短いメッセージまでどうぞ。
              </p>
            </div>
            <a
              href="https://wavebox.me/wave/axm2c8waalgd8m70/"
              className={styles.waveboxButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.waveboxButtonLead}>👋 Wave を送る</span>
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
