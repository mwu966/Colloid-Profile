import * as React from "react"
import * as styles from "./LinkSectionCard.module.css"

export default function LinkSectionCard({ title, links }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className={styles.linkRow}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.linkLabel}>{link.label}</span>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
