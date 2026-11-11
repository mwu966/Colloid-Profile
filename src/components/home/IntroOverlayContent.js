import * as React from "react"
import EngineeringSkillMatrix from "./EngineeringSkillMatrix"
import { ProfileName } from "./IntroSection"
import { ExternalLink, GlyphIcon } from "./PortalPrimitives"
import {
  CREATIVE_WORKS_BY_YEAR,
  ENGINEERING_CAREER_SUMMARY,
  ENGINEERING_CERTIFICATIONS,
  ENGINEERING_TALKS,
  PROFILE_HOBBIES,
  PROFILE_TIMELINE,
} from "../../data/homeContent"

function ContentSection({ title, children }) {
  return <section className="detail-content-section"><h3>{title}</h3>{children}</section>
}

function ProfileOverlayContent() {
  return <>
    <ContentSection title={<ProfileName />}><p>本職はバックエンド寄りのシステムエンジニア。趣味で二次創作のイラストや漫画を描く。</p></ContentSection>
    <ContentSection title="ざっくりとした経歴"><div className="profile-timeline">{PROFILE_TIMELINE.map(entry => <p key={entry}>{entry}</p>)}</div></ContentSection>
    <ContentSection title="趣味"><ul className="hobby-list">{PROFILE_HOBBIES.map(hobby => <li key={hobby}>{hobby}</li>)}</ul></ContentSection>
  </>
}

const creativeYears = CREATIVE_WORKS_BY_YEAR.flatMap(group => group.year === "2016 / 2014"
  ? [{ year: "2016", items: group.items.slice(0, 1) }, { year: "2014", items: group.items.slice(1) }]
  : [group])

function CreativeOverlayContent() {
  return <>
    <p>同人サークル｢ミルク蒼屋｣にて、主に東方Project、DDR(BEMANIシリーズ)二次創作同人誌を発行しています。</p>
    <ContentSection title="同人活動履歴"><p>各タイトルのリンク先は、BOOTH の販売ページまたは pixiv のサンプルページです。</p>
      <div className="creative-history">{creativeYears.map(group => <section className="history-year" key={group.year} aria-labelledby={`year-${group.year.replace(/\D/g, "")}`}><h4 id={`year-${group.year.replace(/\D/g, "")}`}>{group.year}</h4><ul>{group.items.map(item => <li key={item.label}><span>{item.label}　/　</span>{item.links.map((link, i) => <React.Fragment key={link.url}>{i ? " / " : null}<ExternalLink href={link.url}>{link.label}<GlyphIcon name="arrow-up-right" size={16} /></ExternalLink></React.Fragment>)}{item.tail ? <span> {item.tail}</span> : null}</li>)}</ul></section>)}</div>
    </ContentSection>
  </>
}

function EngineeringOverlayContent() {
  return <>
    <p>エンジニアとしてのスキルセットや経験についての雑な紹介です。</p>
    <ContentSection title="ざっくりとした経歴">{ENGINEERING_CAREER_SUMMARY.map(entry => <p key={entry}>{entry}</p>)}</ContentSection>
    <ContentSection title="資格"><ul className="plain-list">{ENGINEERING_CERTIFICATIONS.map(cert => <li key={cert}>{cert}</li>)}</ul></ContentSection>
    <ContentSection title="スキルマップ"><p>主にバックエンド寄りの人です</p><EngineeringSkillMatrix /></ContentSection>
    <ContentSection title="登壇履歴"><ul className="talk-list">{ENGINEERING_TALKS.map(talk => <li key={talk.url}><time>{talk.date}</time><ExternalLink href={talk.url}>{talk.label}<GlyphIcon name="arrow-up-right" size={16} /></ExternalLink><span>{talk.note}</span></li>)}</ul></ContentSection>
  </>
}

export const INTRO_OVERLAY_CONTENT = {
  profile: { title: "Profile", lead: "自己紹介", Content: ProfileOverlayContent },
  creative: { title: "Creative", lead: "個人同人サークル「ミルク蒼屋」", Content: CreativeOverlayContent },
  engineering: { title: "Engineering", lead: "技術・仕事", Content: EngineeringOverlayContent },
}
