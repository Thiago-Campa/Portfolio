import { motion } from 'framer-motion'
import { Code2, Flame, ExternalLink, Terminal, Siren } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { projectsMeta } from '../data.js'
import './Projects.css'

const ICONS = { Code2, Flame }

export default function Projects() {
  const { t } = useLanguage()
  const { projects } = t

  return (
    <section id="projects">
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-head">
          <span className="section-num">04</span>
          <h2>{projects.heading}</h2>
        </div>

        <div className="projects">
          {projects.items.map((project, i) => {
            const meta = projectsMeta[i]
            const Icon = ICONS[meta.icon]

            return (
              <div key={meta.key} className={`project project--${meta.theme}`}>
                {meta.theme === 'web' && (
                  <div className="browser-chrome" aria-hidden="true">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <div className="browser-url">
                      <Terminal size={11} />
                      <span>cic-db.web.app</span>
                    </div>
                  </div>
                )}

                {meta.theme === 'fire' && (
                  <div className="hazard-stripe" aria-hidden="true" />
                )}

                <div className="project-top">
                  <div className="project-title-row">
                    <span className="project-icon">
                      <Icon size={18} />
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                  <span className={`project-status project-status--${meta.theme}`}>{project.status}</span>
                </div>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                {meta.url && (
                  <a className="project-link" href={meta.url} target="_blank" rel="noopener noreferrer">
                    {project.linkLabel}
                    <ExternalLink size={14} />
                  </a>
                )}

                {!meta.url && meta.theme === 'fire' && (
                  <span className="project-pending">
                    <Siren size={14} />
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
