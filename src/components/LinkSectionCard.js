import * as React from "react"
import { Icon } from "./Icon"
import * as styles from "./LinkSectionCard.module.css"

export default function LinkSectionCard({
  title,
  links,
  className,
  style,
  ...rest
}) {
  return (
    <section
      className={`${styles.card} ${className || ""}`}
      style={style}
      {...rest}
    >
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
            <span className={styles.linkMain}>
              <Icon name={link.icon} className={styles.icon} />
              <span className={styles.linkText}>
                <span className={styles.linkLabel}>{link.label}</span>
                <span className={styles.linkId}>{link.id}</span>
              </span>
            </span>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </section>
  )
}
