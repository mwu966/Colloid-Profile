import * as React from "react"
import * as styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>
        Colloid Profile - Colloid（コロイド）のプロフィールサイト
      </p>
      <nav className={styles.nav}>
        <a href="#intro">About me</a>
        <a href="#links">Links</a>
        <a href="#blog">Blog</a>
      </nav>
    </header>
  )
}
