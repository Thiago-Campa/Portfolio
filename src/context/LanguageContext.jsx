import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../i18n.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'es'
    return window.localStorage.getItem('lang') || 'es'
  })

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    window.localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))
  const t = translations[lang]

  return <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return ctx
}
