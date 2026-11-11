import { createContext, useCallback, useContext, useState } from 'react'
import base from '../content.json'

const KEY = 'portfolio-content-v1'
const Ctx = createContext(null)

const load = () => {
  try {
    const s = window.localStorage.getItem(KEY)
    return s ? JSON.parse(s) : base
  } catch {
    return base
  }
}

// Devuelve los campos del idioma pedido, con el español como respaldo si falta alguno
export const tr = (obj, lang) => {
  const own = obj?.[lang] || {}
  const out = { ...(obj?.es || {}) }
  for (const [k, v] of Object.entries(own)) if (v && (!Array.isArray(v) || v.length)) out[k] = v
  return out
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(load)
  const [dirty, setDirty] = useState(() => !!window.localStorage.getItem(KEY))
  const save = useCallback((next) => {
    setContent(next)
    try { window.localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
    setDirty(true)
  }, [])
  const reset = useCallback(() => {
    try { window.localStorage.removeItem(KEY) } catch {}
    setContent(base)
    setDirty(false)
  }, [])
  return <Ctx.Provider value={{ content, save, reset, dirty }}>{children}</Ctx.Provider>
}

export const useContent = () => useContext(Ctx)
