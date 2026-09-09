import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import './Skills.css'

export default function Skills() {
  const { t } = useLanguage()
  const { skills } = t
  const groupEntries = Object.entries(skills.groups)

  return (
    <section id="skills">
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-head">
          <span className="section-num">03</span>
          <h2>{skills.heading}</h2>
        </div>

        <div className="skill-groups">
          {groupEntries.map(([groupName, items], gi) => (
            <div className="skill-group" key={groupName}>
              <h3>{groupName}</h3>
              <div className="tag-list">
                {items.map((item) => (
                  <span key={item} className={`tag tag--accent-${gi % 4}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
