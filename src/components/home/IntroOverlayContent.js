import * as React from "react"
import EngineeringSkillMatrix from "./EngineeringSkillMatrix"
import {
  CREATIVE_WORKS_BY_YEAR,
  ENGINEERING_CAREER_SUMMARY,
  ENGINEERING_CERTIFICATIONS,
  ENGINEERING_TALKS,
  PROFILE_HOBBIES,
  PROFILE_TIMELINE,
} from "../../data/homeContent"
import * as styles from "../../pages/index.module.css"

function renderWithLineBreaks(text) {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={`${line}-${index}`}>
      {index > 0 ? <br /> : null}
      {line}
    </React.Fragment>
  ))
}

function ProfileOverlayContent() {
  return (
    <div className={styles.overlayGrid}>
      <div className={styles.overlayMain}>
        <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
          <h3 className={styles.overlayCardTitle}>Colloid / コロイド</h3>
          <p className={styles.overlayBody}>
            本職はバックエンド寄りのシステムエンジニア。趣味で二次創作のイラストや漫画を描く。
          </p>
        </section>
        <section className={`${styles.overlayCard} ${styles.overlayCool}`}>
          <h3 className={styles.overlayCardTitle}>ざっくりとした経歴</h3>
          <div className={styles.overlayTimeline}>
            {PROFILE_TIMELINE.map((entry) => (
              <p key={entry} className={styles.overlayBody}>
                {renderWithLineBreaks(entry)}
              </p>
            ))}
          </div>
        </section>
      </div>
      <aside className={styles.overlaySide}>
        <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
          <h3 className={styles.overlayCardTitle}>趣味</h3>
          <div className={styles.overlayList}>
            {PROFILE_HOBBIES.map((hobby) => (
              <div key={hobby} className={styles.overlayListItem}>
                {hobby}
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

function CreativeOverlayContent() {
  return (
    <section className={`${styles.overlayCard} ${styles.overlayWarm}`}>
      <h3 className={styles.overlayCardTitle}>同人活動履歴</h3>
      <p className={styles.overlayBody}>
        各タイトルのリンク先は、BOOTH の販売ページまたは pixiv のサンプルページです。
      </p>
      <div className={styles.overlayList}>
        {CREATIVE_WORKS_BY_YEAR.map((yearGroup) => (
          <React.Fragment key={yearGroup.year}>
            <h4 className={styles.overlayYear}>{yearGroup.year}</h4>
            {yearGroup.items.map((item) => (
              <div key={`${yearGroup.year}-${item.label}`} className={styles.overlayListItem}>
                {item.label}:
                {" "}
                {item.links.map((link, index) => (
                  <React.Fragment key={link.url}>
                    {index > 0 ? " / " : null}
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </React.Fragment>
                ))}
                {item.tail ? ` ${item.tail}` : null}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

function EngineeringOverlayContent() {
  return (
    <div className={styles.overlayMain}>
      <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
        <h3 className={styles.overlayCardTitle}>資格</h3>
        <div className={styles.overlayList}>
          {ENGINEERING_CERTIFICATIONS.map((certification) => (
            <div key={certification} className={styles.overlayListItem}>
              {certification}
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
        <h3 className={styles.overlayCardTitle}>スキルマップ</h3>
        <p className={styles.skillMapNote}>主にバックエンド寄りの人です</p>
        <EngineeringSkillMatrix />
      </section>
      <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
        <h3 className={styles.overlayCardTitle}>ざっくりとした経歴</h3>
        <p className={styles.overlayBody}>
          {ENGINEERING_CAREER_SUMMARY.map((entry, index) => (
            <React.Fragment key={entry}>
              {index > 0 ? <><br /></> : null}
              {entry}
            </React.Fragment>
          ))}
        </p>
      </section>
      <section className={`${styles.overlayCard} ${styles.overlayGreen}`}>
        <h3 className={styles.overlayCardTitle}>登壇履歴</h3>
        <div className={styles.overlayList}>
          {ENGINEERING_TALKS.map((talk) => (
            <div key={talk.url} className={styles.overlayListItem}>
              {talk.date}
              {" "}
              <a href={talk.url} target="_blank" rel="noreferrer">
                {talk.label}
              </a>
              {" "}
              {talk.note}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export const INTRO_OVERLAY_CONTENT = {
  profile: {
    title: "Profile",
    lead: "自己紹介",
    Content: ProfileOverlayContent,
  },
  creative: {
    title: "Creative",
    lead: "同人サークル｢ミルク蒼屋｣にて、主に東方Project、DDR(BEMANIシリーズ)二次創作同人誌を発行しています。",
    Content: CreativeOverlayContent,
  },
  engineering: {
    title: "Engineering",
    lead: "エンジニアとしてのスキルセットや経験についての雑な紹介です。",
    Content: EngineeringOverlayContent,
  },
}
