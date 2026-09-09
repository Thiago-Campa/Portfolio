import { useLanguage } from '../context/LanguageContext.jsx'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer>
      <div className="wrap">{t.footer.text}</div>
    </footer>
  )
}
