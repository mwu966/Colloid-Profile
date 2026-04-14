import * as React from "react"
import * as styles from "./HeroCard.module.css"

export default function HeroCard({ introBlocks = [], onIntroSelect }) {
  return (
    <div className={styles.stack}>
      <section className={styles.masthead}>
        <div className={styles.brandLockup}>
          <p className={styles.brand}>Colloid Profile</p>
          <p className={styles.brandSub}>CREATIVE ARCHIVE PORTAL</p>
        </div>
        <p className={styles.mastheadCopy}>
          本業システムエンジニアでたまに同人活動するColloidの創作と技術のアーカイブサイトです。
        </p>
      </section>

      <section id="intro" className={styles.introSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>01</span>
          <h1 className={styles.title}>Intro</h1>
        </div>
        <p className={styles.note}>
          自己紹介と同人活動と職業エンジニアとしての活動内容をまとめています。
        </p>
        <div className={styles.introCards}>
          {introBlocks.map((block, index) => (
            <button
              key={block.title}
              type="button"
              className={`${styles.introCard} ${index === 1 ? styles.warmCard : styles.coolCard}`}
              onClick={() => onIntroSelect?.(block.key)}
            >
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
