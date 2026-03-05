import * as React from "react"
import * as styles from "./HeroCard.module.css"

export default function HeroCard({ introBlocks = [] }) {
  return (
    <section id="intro" className={styles.hero}>
      <h1 className={styles.title}>About me</h1>
      <p className={styles.note}>
        イラスト制作とフロントエンド開発を軸に活動しています。創作活動、SNS、同人通販、技術発信の情報をこのページに集約し、更新を追いやすい自己紹介ポータルとして運用しています。
      </p>
      <div className={styles.introCards}>
        {introBlocks.map((block) => (
          <article key={block.title} className={styles.introCard}>
            <h2 className={styles.cardTitle}>{block.title}</h2>
            <p className={styles.cardBody}>{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
