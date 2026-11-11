import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase.js'
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
  const [content, setContent] = useState(() => (supabase ? base : load()))
  const [dirty, setDirty] = useState(() => !supabase && !!window.localStorage.getItem(KEY))

  // Con Supabase, el contenido publicado viene de la tabla site_content
  useEffect(() => {
    if (!supabase) return
    supabase.from('site_content').select('data').eq('id', 1).maybeSingle().then(({ data }) => {
      if (data?.data) setContent(data.data)
    })
  }, [])

  const save = useCallback(async (next) => {
    if (supabase) {
      const { error } = await supabase.from('site_content').upsert({ id: 1, data: next, updated_at: new Date().toISOString() })
      if (error) return { ok: false, error: error.message }
      setContent(next)
      return { ok: true }
    }
    setContent(next)
    try { window.localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
    setDirty(true)
    return { ok: true }
  }, [])

  const reset = useCallback(async () => {
    if (supabase) return save(base)
    try { window.localStorage.removeItem(KEY) } catch {}
    setContent(base)
    setDirty(false)
    return { ok: true }
  }, [save])

  return <Ctx.Provider value={{ content, save, reset, dirty }}>{children}</Ctx.Provider>
}

export const useContent = () => useContext(Ctx)
