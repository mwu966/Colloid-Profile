import * as React from "react"
import { ENGINEERING_SKILL_ITEMS, SKILL_AXIS_LEVELS, SKILL_SPECIALTY_LEVELS } from "../../data/homeContent"

export default function EngineeringSkillMatrix() {
  return <>
    <div className="desktop-skill-map" aria-hidden="true">
      <p className="skill-experience">実務経験　少ない → 多い</p>
      <div className="skill-map-layout"><span className="skill-specialty">得意分野<br />高い<br />↑<br />↓<br />低い</span><div className="skill-map-board"><div className="skill-map-labels">{SKILL_AXIS_LEVELS.map(level => <span key={level}>{level}</span>)}</div><div className="skill-map-grid">{SKILL_SPECIALTY_LEVELS.flatMap(specialty => SKILL_AXIS_LEVELS.map(experience => <div className="skill-map-cell" key={`${specialty}-${experience}`}>{ENGINEERING_SKILL_ITEMS.filter(skill => skill.specialty === specialty && skill.experience === experience).map(skill => <span key={skill.title}>{skill.title}</span>)}</div>))}</div></div></div>
    </div>
    <div className="skill-rating-wrap"><ul className="skill-rating-list">{ENGINEERING_SKILL_ITEMS.map(skill => <li key={skill.title} className="skill-rating-item">
      <h4>{skill.title}</h4>
      <div className="skill-ratings">{[["実務経験", skill.experience], ["得意分野", skill.specialty]].map(([label, value]) => <div className="skill-rating" key={label}>
        <span className="skill-rating-label">{label}</span>
        <div className="skill-rating-value"><span className="skill-segments" role="meter" aria-label={`${skill.title} ${label}`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={value} aria-valuetext={`5段階中${value}`}>{SKILL_AXIS_LEVELS.map(level => <i key={level} className={level <= value ? "is-active" : ""} aria-hidden="true" />)}</span><span className="skill-rating-number" aria-hidden="true">{value}/5</span></div>
      </div>)}</div>
    </li>)}</ul></div>
  </>
}
