import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Loader({ onDone }) {
  const { t } = useLanguage()
  const [p, setP] = useState(0)

  useEffect(() => {
    const t0 = performance.now()
    let raf, to
    const tick = (n) => {
      const x = Math.min((n - t0) / 2800, 1)
      setP(Math.round((1 - Math.pow(1 - x, 2)) * 100))
      if (x < 1) raf = requestAnimationFrame(tick)
      else to = setTimeout(onDone, 400)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(to) }
  }, [])

  const steps = t.loader.steps
  const step = steps[Math.min(steps.length - 1, Math.floor((p / 100) * steps.length))]

  return (
    <motion.div className="loader" role="status" aria-busy="true" exit={{ y: '-100%' }} transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}>
      <h1>{t.loader.hello}</h1>
      <div className="loader-row">
        <span>{step}</span>
        <span>{String(p).padStart(3, '0')}%</span>
      </div>
      <div className="loader-bar"><i style={{ width: `${p}%` }} /></div>
    </motion.div>
  )
}
