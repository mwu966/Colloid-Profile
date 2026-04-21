import * as React from "react"
import * as styles from "./HeroCard.module.css"

export default function HeroCard({ introBlocks = [], onIntroSelect }) {
  return (
    <div className={styles.stack}>
      <section className={styles.heroPanel}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>PROFILES ARCHIVE PORTAL</p>
          <h1 className={styles.title}>Colloid Profile</h1>
          <p className={styles.mastheadCopy}>
            本業システムエンジニアでたまに同人活動するColloid(コロイド)の創作と技術のアーカイブサイトです。
          </p>
        </div>
        <div className={styles.heroTags} aria-label="Site categories">
          <span className={`${styles.heroTag} ${styles.heroTagBase}`}>Profile</span>
          <span className={`${styles.heroTag} ${styles.heroTagOrange}`}>Creative</span>
          <span className={`${styles.heroTag} ${styles.heroTagGreen}`}>Engineering</span>
        </div>
      </section>

      <section id="intro" className={styles.introSection}>
        <span className={styles.sectionMark}>01</span>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWrap}>
            <span className={styles.sectionNumber}>01</span>
            <h2 className={styles.sectionTitle}>Intro</h2>
          </div>
          <p className={styles.note}>
            簡単な自己紹介と同人活動と職業エンジニアとしての活動内容をまとめています。
          </p>
        </div>
        <div className={styles.introCards}>
          {introBlocks.map((block, index) => (
            <button
              key={block.title}
              type="button"
              className={`${styles.introCard} ${
                index === 1
                  ? styles.orangeCard
                  : index === 2
                    ? styles.greenCard
                    : styles.baseCard
              } ${index === 1 ? styles.middleCard : ""} ${index === 2 ? styles.lastCard : ""}`}
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
