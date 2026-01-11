import * as React from "react"
import * as styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Colloid プロフィール</div>
      </div>
    </header>
  )
}
