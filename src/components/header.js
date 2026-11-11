import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"

export default function Header() {
  return <header className={styles.header}>
    <Link to="/" className={styles.logo}>Colloid Archive Portal</Link>
    <nav className={styles.nav} aria-label="セクション"><Link to="/#intro">01 Intro</Link><Link to="/#links">02 Links</Link><Link to="/#blog">03 Blog</Link><Link to="/#wavebox">04 WaveBox</Link></nav>
  </header>
}
