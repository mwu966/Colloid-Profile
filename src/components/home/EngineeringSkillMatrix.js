import * as React from "react"
import {
  ENGINEERING_SKILL_ITEMS,
  SKILL_AXIS_LEVELS,
  SKILL_SPECIALTY_LEVELS,
} from "../../data/homeContent"
import * as styles from "../../pages/index.module.css"

const skillsByPosition = ENGINEERING_SKILL_ITEMS.reduce((map, skill) => {
  const key = `${skill.specialty}-${skill.experience}`
  const positionedSkills = map.get(key) || []

  positionedSkills.push(skill)
  map.set(key, positionedSkills)

  return map
}, new Map())

function getCellSkills(experience, specialty) {
  return skillsByPosition.get(`${specialty}-${experience}`) || []
}

export default function EngineeringSkillMatrix() {
  return (
    <div className={styles.skillMatrixWrap}>
      <div className={styles.matrixHeader}>
        <span className={styles.matrixAxisTitle}>実務経験</span>
        <span className={styles.matrixAxisHint}>少ない → 多い</span>
      </div>
      <div className={styles.matrixScroller}>
        <div className={styles.matrixFrame}>
          <div className={styles.matrixSideLabel}>得意分野</div>
          <div className={styles.matrixBoard}>
            <div className={styles.matrixTopLabels} aria-hidden="true">
              {SKILL_AXIS_LEVELS.map((level) => (
                <span key={`x-${level}`} className={styles.matrixAxisValue}>
                  {level}
                </span>
              ))}
            </div>
            <div className={styles.matrixRows}>
              {SKILL_SPECIALTY_LEVELS.map((specialty) => (
                <div key={`row-${specialty}`} className={styles.matrixGridRow}>
                  <span className={styles.matrixRowLabel}>{specialty}</span>
                  {SKILL_AXIS_LEVELS.map((experience) => (
                    <div key={`cell-${specialty}-${experience}`} className={styles.matrixCell}>
                      {getCellSkills(experience, specialty).map((skill) => (
                        <div key={skill.title} className={styles.matrixSkill}>
                          <span className={styles.matrixSkillTitle}>{skill.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
