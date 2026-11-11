import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ContentProvider } from './context/ContentContext.jsx'
import './styles/index.css'
import './styles/site.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
