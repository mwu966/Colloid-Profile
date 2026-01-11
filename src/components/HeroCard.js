import * as React from "react"
import * as styles from "./HeroCard.module.css"

export default function HeroCard() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.logo}>Colloid</h1>
      <p className={styles.note}>
        Colloid（コロイド）のプロフィールサイトです。
      </p>
    </section>
  )
}
