import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <>
      <Cursor />
      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setReady(true)} />}</AnimatePresence>
      <Header />
      <Hero ready={ready} />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
