import * as React from "react"
import * as styles from "./HeroCard.module.css"

export default function HeroCard({ onOpenAbout }) {
  return (
    <section className={styles.card}>
      <h1 className={styles.logo}>Colloid</h1>
      <p className={styles.note}>
        Colloid（コロイド）のプロフィールサイトです。
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={onOpenAbout}>
          自己紹介を見る
        </button>
        <a href="/about" className={styles.secondary}>
          別ページで開く
        </a>
      </div>
    </section>
  )
}
