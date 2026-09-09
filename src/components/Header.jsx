import { Moon, Sun, Languages } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { profile } from '../data.js'
import './Header.css'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { t, toggleLang } = useLanguage()

  return (
    <header className="header">
      <div className="wrap header-inner">
        <div className="header-name">{profile.name}</div>

        <nav className="header-nav">
          <a href="#about">{t.nav.about}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>

        <div className="header-toggles">
          <button
            type="button"
            className="toggle-btn"
            onClick={toggleLang}
            aria-label="Switch language"
            title={t.langToggle.label === 'EN' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Languages size={16} />
            <span>{t.langToggle.label}</span>
          </button>

          <button
            type="button"
            className="toggle-btn toggle-btn--icon"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? t.themeToggle.toDark : t.themeToggle.toLight}
            title={theme === 'light' ? t.themeToggle.toDark : t.themeToggle.toLight}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}
