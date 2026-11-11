import { Code2, Flame, ExternalLink, Terminal, Siren } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useContent, tr } from '../context/ContentContext.jsx'
import './Projects.css'

const ICONS = { Code2, Flame }
const host = (u) => { try { return new URL(u).host } catch { return 'localhost' } }

export default function Projects() {
  const { t, lang } = useLanguage()
  const { content } = useContent()

  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head"><h2>{t.projects.heading}</h2></div>
        <div className="projects">
          {content.projects.map((m) => {
            const p = tr(m, lang)
            const Icon = ICONS[m.icon] || Code2
            const fire = m.theme === 'fire'
            return (
              <div key={m.id} className={`project project--${fire ? 'fire' : 'web'}`}>
                {!fire && (
                  <div className="browser-chrome" aria-hidden="true">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                    <div className="browser-url"><Terminal size={11} /><span>{m.url ? host(m.url) : 'localhost'}</span></div>
                  </div>
                )}
                {fire && <div className="hazard-stripe" aria-hidden="true" />}
                <div className="project-top">
                  <div className="project-title-row">
                    <span className="project-icon"><Icon size={18} /></span>
                    <h3>{p.title}</h3>
                  </div>
                  <span className={`project-status project-status--${fire ? 'fire' : 'web'}`}>{p.status}</span>
                </div>
                <p>{p.description}</p>
                <div className="project-tags">{(p.tags || []).map((tag, i) => <span key={i}>{tag}</span>)}</div>
                {m.url ? (
                  <a className="project-link" href={m.url} target="_blank" rel="noopener noreferrer">{p.linkLabel}<ExternalLink size={14} /></a>
                ) : fire ? (
                  <span className="project-pending"><Siren size={14} /></span>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
