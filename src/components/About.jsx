import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useContent, tr } from '../context/ContentContext.jsx'

export default function About() {
  const { t, lang } = useLanguage()
  const { content } = useContent()
  const a = tr(content.about, lang)
  const card = useRef(null)

  const tilt = (e) => {
    const r = card.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    const s = card.current.style
    s.setProperty('--rx', `${-y * 12}deg`); s.setProperty('--ry', `${x * 14}deg`)
    s.setProperty('--mx', `${(x + 0.5) * 100}%`); s.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const flat = () => ['--rx', '--ry'].forEach((v) => card.current.style.setProperty(v, '0deg'))
  const badges = a.badges || []

  return (
    <section id="about">
      <div className="wrap about-grid">
        <div>
          <div className="section-head"><h2>{t.about.heading}</h2></div>
          <p>{a.p1}</p>
          <p>{a.p2}</p>
        </div>
        <div className="idcard" ref={card} onMouseMove={tilt} onMouseLeave={flat}>
          <div className="idcard-stripe" />
          <strong>{content.profile.name}</strong>
          <ul>
            {badges.map((b, i) => <li key={i} className={i === badges.length - 1 ? 'fire' : ''}>{b}</li>)}
          </ul>
          <div className="idcard-sheen" />
        </div>
      </div>
    </section>
  )
}
