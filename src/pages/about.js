import * as React from "react"
import Header from "../components/header"
import * as styles from "./about.module.css"

export const Head = () => (
  <>
    <title>自己紹介 | Colloid</title>
    <meta name="description" content="Colloidの自己紹介ページ" />
  </>
)

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.container}>
        <section className={styles.card}>
          <h1 className={styles.title}>自己紹介</h1>
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
          <a href="/" className={styles.back}>
            戻る
          </a>
        </section>
      </main>
    </div>
  )
}
