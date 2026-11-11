import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext.jsx'

// Panel de LEDs: se encienden por donde pasa el mouse y titilan solos como un rack de red
function LedField() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const x = c.getContext('2d')
    const S = 22
    let w, h, cols, rows, lv, raf, px = -999, py = -999, col = '#000', frame = 0
    const size = () => {
      const r = c.parentElement.getBoundingClientRect()
      const d = window.devicePixelRatio || 1
      w = r.width; h = r.height
      c.width = w * d; c.height = h * d
      x.setTransform(d, 0, 0, d, 0, 0)
      cols = Math.ceil(w / S); rows = Math.ceil(h / S)
      lv = new Float32Array(cols * rows)
    }
    size()
    const mv = (e) => { const r = c.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top }
    window.addEventListener('resize', size)
    window.addEventListener('mousemove', mv)
    const loop = () => {
      if (frame++ % 120 === 0) col = getComputedStyle(c).color
      x.clearRect(0, 0, w, h)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const k = j * cols + i, cx = i * S + S / 2, cy = j * S + S / 2
          const d = Math.hypot(cx - px, cy - py)
          if (d < 120) lv[k] = Math.max(lv[k], 1 - d / 120)
          if (Math.random() < 0.0005) lv[k] = 0.9
          lv[k] *= 0.95
          x.globalAlpha = 0.12; x.fillStyle = col
          x.fillRect(cx - 1.5, cy - 1.5, 3, 3)
          if (lv[k] > 0.03) {
            x.globalAlpha = Math.min(1, lv[k] * 1.2)
            x.fillStyle = lv[k] > 0.72 ? '#f0cf1c' : '#14b8a2'
            x.fillRect(cx - 2.5, cy - 2.5, 5, 5)
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); window.removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="led-field" aria-hidden="true" />
}

export default function Hero({ ready }) {
  const { t } = useLanguage()
  const h = t.hero
  const [alarm, setAlarm] = useState(false)
  const [itOn, setItOn] = useState(true)
  const ring = () => {
    if (alarm) return
    setAlarm(true)
    setTimeout(() => setAlarm(false), 2600)
  }
  const show = (delay) => ({ initial: { opacity: 0, y: 28 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] } })

  return (
    <section className={`hero${alarm ? ' hero--alarm' : ''}`} style={{ borderTop: 'none' }}>
      <LedField />
      <div className="lightbar" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <motion.h1 {...show(0)}>{h.titlePre + h.titleHighlight + h.titlePost}</motion.h1>
          <motion.p className="hero-lead" {...show(0.12)}>{h.lead}</motion.p>
          <motion.div className="hero-cta" {...show(0.24)}>
            <a className="btn btn-primary" href="#projects">{h.ctaProjects}</a>
            <a className="btn btn-ghost" href="#contact">{h.ctaContact}</a>
          </motion.div>
        </div>
        <motion.aside className="board" {...show(0.36)}>
          <button type="button" className={`board-row${itOn ? ' on' : ''}`} onClick={() => setItOn((v) => !v)}>
            <i className="led led--teal" /><b>{h.board.it}</b><span>{itOn ? h.board.itOn : h.board.itOff}</span>
          </button>
          <button type="button" className="board-row on" onClick={ring}>
            <i className="led led--red" /><b>{h.board.fire}</b><span>{alarm ? h.board.alarm : h.board.fireOn}</span>
          </button>
          <p className="board-hint">{h.board.hint}</p>
        </motion.aside>
      </div>
    </section>
  )
}
