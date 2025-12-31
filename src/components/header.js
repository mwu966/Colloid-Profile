import * as React from "react"
import * as styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>Colloid Profile ポータル</div>
        <nav className={styles.nav}>
          <a href="#links" className={styles.navLink}>
            Links
          </a>
          <a href="#blog" className={styles.navLink}>
            Blog
          </a>
        </nav>
      </div>
    </header>
  )
}
