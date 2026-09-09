import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import { experienceMeta } from '../data.js'
import './Experience.css'

export default function Experience() {
  const { t } = useLanguage()
  const { experience } = t

  return (
    <section id="experience">
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-head">
          <span className="section-num">02</span>
          <h2>{experience.heading}</h2>
        </div>

        <div className="timeline">
          {experience.jobs.map((job, i) => {
            const meta = experienceMeta[i]
            return (
              <div key={i} className={`job${meta.current ? ' job--current' : ''}`}>
                <div className="job-meta">
                  <span className="job-role">{job.role}</span>
                  <span className="job-org">{meta.org}</span>
                  {meta.current && <span className="now-tag">{experience.currentTag}</span>}
                </div>
                <div className="job-time">{meta.time}</div>
                <div className="job-place">{meta.place}</div>
                <ul>
                  {job.tasks.map((task, j) => (
                    <li key={j}>{task}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
