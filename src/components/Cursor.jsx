import { useEffect, useRef } from 'react'
import { Hand } from 'lucide-react'

export default function Cursor() {
  const hand = useRef(null)
  const cv = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.body.classList.add('has-cursor')
    const c = cv.current
    const x = c.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let w, h, mx = -200, my = -200, gx = -200, gy = -200, raf
    const size = () => {
      w = window.innerWidth; h = window.innerHeight
      c.width = w * dpr; c.height = h * dpr
      x.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const move = (e) => {
      mx = e.clientX; my = e.clientY
      hand.current.style.transform = `translate(${mx}px, ${my}px)`
      hand.current.classList.remove('off')
      const el = e.target.closest ? e.target : e.target.parentElement
      document.body.classList.toggle('over-admin', !!el?.closest('.admin, .confirm'))
      hand.current.classList.toggle('press', !!el?.closest('a, button, input, textarea, select, label'))
    }
    const leave = () => hand.current?.classList.add('off')
    const loop = () => {
      gx += (mx - gx) * 0.25; gy += (my - gy) * 0.25
      x.globalCompositeOperation = 'destination-out'
      x.fillStyle = 'rgba(0,0,0,0.08)'
      x.fillRect(0, 0, w, h)
      x.globalCompositeOperation = 'source-over'
      const g = x.createRadialGradient(gx, gy, 0, gx, gy, 80)
      g.addColorStop(0, 'rgba(255,200,40,0.32)')
      g.addColorStop(0.5, 'rgba(255,90,40,0.12)')
      g.addColorStop(1, 'rgba(255,90,40,0)')
      x.fillStyle = g
      x.fillRect(gx - 80, gy - 80, 160, 160)
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('resize', size)
    document.addEventListener('mouseleave', leave)
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('resize', size)
      document.removeEventListener('mouseleave', leave)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <canvas ref={cv} className="glow-canvas" aria-hidden="true" />
      <div ref={hand} className="hand off" aria-hidden="true"><Hand size={28} strokeWidth={1.8} /></div>
    </>
  )
}
