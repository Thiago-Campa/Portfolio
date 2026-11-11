import { useLanguage } from '../context/LanguageContext.jsx'
import { useContent, tr } from '../context/ContentContext.jsx'

export default function Skills() {
  const { t, lang } = useLanguage()
  const { content } = useContent()
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head"><h2>{t.skills.heading}</h2></div>
        {content.skills.map((g) => (
          <div className="rack" key={g.id}>
            <div className="rack-name"><i className="led" />{tr(g, lang).name}</div>
            <div className="rack-items">{(g.items || []).map((s, i) => <span key={i} className="chip">{s}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
