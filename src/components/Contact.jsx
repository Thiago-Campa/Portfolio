import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { profile, socials } from '../data.js'
import './Contact.css'

const ICONS = { Github, Linkedin, Instagram }

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t

  return (
    <section id="contact">
      <motion.div
        className="wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-head">
          <span className="section-num">05</span>
          <h2>{contact.heading}</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-main">
            <p>{contact.p}</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>

          <ul className="social-list">
            {socials.map((social) => {
              const Icon = ICONS[social.icon]
              return (
                <li key={social.key}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <span className="social-label">
                      <Icon size={17} />
                      {contact.socialLabels[social.key]}
                    </span>
                    <span className="handle">{social.handle}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
