import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useContent, tr } from '../context/ContentContext.jsx'
import './Contact.css'

const ICONS = { Github, Linkedin, Instagram, Mail }

export default function Contact() {
  const { t, lang } = useLanguage()
  const { content } = useContent()
  const c = tr(content.contact, lang)
  return (
    <section id="contact">
      <div className="wrap">
        <div className="section-head"><h2>{t.contact.heading}</h2></div>
        <div className="contact-grid">
          <div className="contact-main">
            <p>{c.p}</p>
            <a className="contact-email" href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
          </div>
          <ul className="social-list">
            {content.socials.map((s) => {
              const Icon = ICONS[s.icon] || Mail
              return (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <span className="social-label"><Icon size={17} />{s.label}</span>
                    <span className="handle">{s.handle}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
