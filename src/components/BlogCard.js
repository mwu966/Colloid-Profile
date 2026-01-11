import * as React from "react"
import * as styles from "./BlogCard.module.css"

const formatDate = (isoDate, pubDate) => {
  const raw = isoDate || pubDate
  if (!raw) return ""
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return ""
  const yyyy = String(date.getFullYear())
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

export default function BlogCard({ posts, className, style, ...rest }) {
  return (
    <section
      className={`${styles.card} ${className || ""}`}
      style={style}
      {...rest}
    >
      <div className={styles.header}>
        <div className={styles.headingBlock}>
          <h2 className={styles.title}>Blog</h2>
          <div className={styles.caption}>ミルク蒼屋のチラシ</div>
        </div>
        <a
          href="https://colloidgel.hatenablog.com/"
          className={styles.blogLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          ブログへ →
        </a>
      </div>
      <div className={styles.rule} />
      <div className={styles.list}>
        {posts.length === 0 ? (
          <div className={styles.empty}>まだ投稿がありません</div>
        ) : (
          posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className={styles.row}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.date}>
                {formatDate(post.isoDate, post.pubDate)}
              </span>
              <span className={styles.titleText}>{post.title}</span>
              <span className={styles.arrow}>→</span>
            </a>
          ))
        )}
      </div>
    </section>
  )
}
