import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import './About.css'

export default function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section id="about">
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-head">
          <span className="section-num">01</span>
          <h2>{about.heading}</h2>
        </div>
        <div className="about-body">
          <p>{about.p1}</p>
          <p>{about.p2}</p>
          <div className="badge-row">
            {about.badges.map((badge, i) => (
              <span key={i} className={`badge${i === about.badges.length - 1 ? ' badge--fire' : ''}`}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
