import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useContent, tr } from '../context/ContentContext.jsx'

export default function Experience() {
  const { t, lang } = useLanguage()
  const { content } = useContent()
  const [open, setOpen] = useState(() => content.experience.find((j) => j.current)?.id ?? null)

  return (
    <section id="experience">
      <div className="wrap">
        <div className="section-head"><h2>{t.experience.heading}</h2></div>
        {content.experience.map((job) => {
          const j = tr(job, lang)
          const isOpen = open === job.id
          return (
            <div key={job.id} className={`xp${isOpen ? ' open' : ''}`}>
              <button type="button" className="xp-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : job.id)}>
                <span className="xp-org">{job.org}{job.current && <em className="now-tag">{t.experience.currentTag}</em>}</span>
                <span className="xp-role">{j.role}</span>
                <span className="xp-time">{job.time}</span>
                <Plus className="xp-plus" size={22} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div className="xp-body" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}>
                    <div className="xp-inner">
                      <p className="xp-place">{job.place}</p>
                      <ul>{(j.tasks || []).map((k, n) => <li key={n} style={{ '--d': `${n * 90 + 150}ms` }}><Check size={16} />{k}</li>)}</ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
