import { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import Admin from './Admin.jsx'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const taps = useRef([])

  // Acceso oculto: tocar tres veces seguidas el "©"
  const tap = () => {
    const now = Date.now()
    taps.current = [...taps.current.filter((x) => now - x < 1500), now]
    if (taps.current.length >= 3) { taps.current = []; setOpen(true) }
  }

  return (
    <footer>
      <div className="wrap">
        <button type="button" className="secret" onClick={tap}>©</button>
        {t.footer.text.replace(/^©/, '')}
      </div>
      {open && <Admin onClose={() => setOpen(false)} />}
    </footer>
  )
}
