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

export default function BlogCard({ posts }) {
  return (
    <section className={styles.card} id="blog">
      <div className={styles.header}>
        <h2 className={styles.title}>Blog</h2>
        <a
          href="https://colloidgel.hatenablog.com/"
          className={styles.blogLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          ブログへ →
        </a>
      </div>
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
