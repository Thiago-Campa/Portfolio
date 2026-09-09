import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'
import './Hero.css'

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="hero" style={{ borderTop: 'none' }}>
      <div className="mesh" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {hero.titlePre}
            <span className="gradient-text">{hero.titleHighlight}</span>
            {hero.titlePost}
          </motion.h1>

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {hero.lead}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <a className="btn btn-primary" href="#projects">
              {hero.ctaProjects}
            </a>
            <a className="btn btn-ghost" href="#contact">
              {hero.ctaContact}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="terminal"
          aria-hidden="true"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="terminal-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-body">
            {hero.terminal.map((line, i) => (
              <motion.div
                key={i}
                className="term-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.4, duration: 0.4 }}
              >
                {line.prompt && <span className="prompt">{line.prompt} </span>}
                <span className="val">{line.value ?? line.text}</span>
                {line.cursor && <span className="cursor" />}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
