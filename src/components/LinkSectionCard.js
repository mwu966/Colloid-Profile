import * as React from "react"
import { Icon } from "./Icon"
import * as styles from "./LinkSectionCard.module.css"

export default function LinkSectionCard({
  title,
  links,
  tone = "cool",
  className,
  style,
  ...rest
}) {
  return (
    <section
      className={`${styles.card} ${styles[tone]} ${className || ""}`}
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
              <span className={styles.iconWrap}>
                <Icon name={link.icon} size={18} />
              </span>
              <span className={styles.linkLabel}>{link.label}</span>
            </span>
            <span className={styles.linkId}>{link.id}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
