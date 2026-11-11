import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Plus, Trash2, Download, Upload, RotateCcw, LogOut, Save } from 'lucide-react'
import { useContent } from '../context/ContentContext.jsx'
import base from '../content.json'

const HK = 'portfolio-admin-hash'
const SK = 'portfolio-admin-session'
const uid = () => Math.random().toString(36).slice(2, 9)

async function sha(s) {
  try {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('pf::' + s))
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('')
  } catch {
    let h = 5381
    for (const c of 'pf::' + s) h = (h * 33) ^ c.charCodeAt(0)
    return 'f' + (h >>> 0)
  }
}

// Saca espacios sobrantes y líneas vacías antes de guardar
const clean = (o) =>
  Array.isArray(o) ? o.map(clean).filter((v) => v !== '')
  : o && typeof o === 'object' ? Object.fromEntries(Object.entries(o).map(([k, v]) => [k, clean(v)]))
  : typeof o === 'string' ? o.trim() : o

function F({ label, value, onChange, area, rows = 3, ph }) {
  return (
    <label className="f">
      <span>{label}</span>
      {area ? <textarea rows={rows} value={value ?? ''} placeholder={ph} onChange={(e) => onChange(e.target.value)} />
        : <input value={value ?? ''} placeholder={ph} onChange={(e) => onChange(e.target.value)} />}
    </label>
  )
}

function Gate({ onOk }) {
  const stored = localStorage.getItem(HK)
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [err, setErr] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    if (!stored) {
      if (a.length < 6) return setErr('Usá al menos 6 caracteres.')
      if (a !== b) return setErr('Las contraseñas no coinciden.')
      localStorage.setItem(HK, await sha(a))
      return onOk()
    }
    if ((await sha(a)) === stored) return onOk()
    setErr('Contraseña incorrecta.')
  }
  return (
    <form className="gate" onSubmit={submit}>
      <h3>{stored ? 'Panel privado' : 'Creá tu contraseña'}</h3>
      {!stored && <p className="note">Es la primera vez en este navegador. Elegí una contraseña para entrar al panel.</p>}
      <F label="Contraseña" value={a} onChange={setA} />
      {!stored && <F label="Repetir contraseña" value={b} onChange={setB} />}
      {err && <p className="err">{err}</p>}
      <button className="btn-a primary" type="submit">{stored ? 'Entrar' : 'Guardar y entrar'}</button>
    </form>
  )
}

function Panel({ onClose }) {
  const { content, save, reset } = useContent()
  const [d, setD] = useState(() => structuredClone(content))
  const [L, setL] = useState('es')
  const [tab, setTab] = useState('about')
  const [ask, setAsk] = useState(null)
  const [msg, setMsg] = useState('')
  const file = useRef(null)
  const changed = JSON.stringify(d) !== JSON.stringify(content)

  const mut = (fn) => setD((p) => { const n = structuredClone(p); fn(n); return n })
  const get = (p) => p.reduce((o, k) => o?.[k], d)
  const set = (path, val) => mut((n) => { let o = n; for (const k of path.slice(0, -1)) o = o[k] ??= {}; o[path.at(-1)] = val })
  const fl = (path, label, { area, arr, rows } = {}) => {
    let v = get(path)
    if (arr) v = (v || []).join('\n')
    let ph = ''
    if (L === 'en' && path.includes('en')) {
      const q = get(path.map((p) => (p === 'en' ? 'es' : p)))
      ph = Array.isArray(q) ? q.join('\n') : q || ''
    }
    return <F key={path.join('.')} label={label} value={v} ph={ph} area={area || arr} rows={rows || (arr ? 4 : 3)} onChange={(val) => set(path, arr ? val.split('\n') : val)} />
  }
  const del = (label, fn) => setAsk({ title: '¿Eliminar?', text: `Vas a eliminar «${label || 'este elemento'}». Si salís sin guardar todavía podés descartarlo; una vez guardado no se puede deshacer.`, okLabel: 'Sí, eliminar', danger: true, yes: fn })
  const Card = ({ title, onDelete, children }) => (
    <div className="acard">
      <div className="acard-head"><span>{title}</span><button type="button" className="btn-a danger" onClick={onDelete}><Trash2 size={15} />Eliminar</button></div>
      {children}
    </div>
  )
  const Add = ({ label, fn }) => <button type="button" className="btn-a" onClick={() => mut(fn)}><Plus size={15} />{label}</button>

  const doSave = () => setAsk({ title: '¿Guardar los cambios?', text: 'Se van a actualizar las secciones de tu portfolio en este navegador.', okLabel: 'Sí, guardar', yes: () => { save(clean(d)); setMsg('Cambios guardados.') } })
  const doClose = () => (changed ? setAsk({ title: '¿Salir sin guardar?', text: 'Tenés cambios sin guardar y se van a perder.', okLabel: 'Salir igual', danger: true, yes: onClose }) : onClose())
  const doReset = () => setAsk({ title: '¿Restaurar el contenido original?', text: 'Vuelve todo a la versión que viene en el código y descarta lo que editaste en este navegador.', okLabel: 'Sí, restaurar', danger: true, yes: () => { reset(); setD(structuredClone(base)); setMsg('Contenido original restaurado.') } })
  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(clean(d), null, 2)], { type: 'application/json' }))
    a.download = 'content.json'
    a.click()
  }
  const upload = async (e) => {
    try {
      const j = JSON.parse(await e.target.files[0].text())
      if (!j.profile || !Array.isArray(j.projects) || !Array.isArray(j.experience)) throw new Error()
      setD(j); setMsg('Archivo cargado. Revisalo y tocá «Guardar cambios».')
    } catch { setMsg('El archivo no tiene el formato de content.json.') }
    e.target.value = ''
  }

  const TABS = { about: 'Sobre mí', experience: 'Experiencia', skills: 'Skills', projects: 'Proyectos', contact: 'Contacto' }

  return (
    <>
      <div className="admin-bar">
        <h3>Panel privado</h3>
        <div className="seg" role="group" aria-label="Idioma que estás editando">
          {['es', 'en'].map((l) => <button key={l} type="button" className={L === l ? 'on' : ''} onClick={() => setL(l)}>{l.toUpperCase()}</button>)}
        </div>
        <button type="button" className="btn-a primary" disabled={!changed} onClick={doSave}><Save size={15} />Guardar cambios</button>
        <button type="button" className="btn-a" onClick={download}><Download size={15} />content.json</button>
        <button type="button" className="btn-a" onClick={() => file.current.click()}><Upload size={15} />Importar</button>
        <button type="button" className="btn-a" onClick={doReset}><RotateCcw size={15} />Restaurar</button>
        <button type="button" className="btn-a" onClick={() => { sessionStorage.removeItem(SK); doClose() }}><LogOut size={15} />Salir</button>
        <input ref={file} type="file" accept="application/json" hidden onChange={upload} />
      </div>
      <div className="admin-tabs">
        {Object.entries(TABS).map(([k, v]) => <button key={k} type="button" className={`tab${tab === k ? ' on' : ''}`} onClick={() => setTab(k)}>{v}</button>)}
      </div>
      <div className="admin-body">
        {msg && <p className="msg">{msg}</p>}
        <p className="note">Editando textos en <b>{L === 'es' ? 'español' : 'inglés'}</b>. Si dejás un campo vacío en inglés, el sitio muestra el español. Los cambios se guardan en este navegador; para publicarlos para todos, descargá content.json y reemplazá <code>src/content.json</code>.</p>

        {tab === 'about' && <>
          {fl(['profile', 'name'], 'Nombre')}
          {fl(['about', L, 'p1'], 'Párrafo 1', { area: 1 })}
          {fl(['about', L, 'p2'], 'Párrafo 2', { area: 1 })}
          {fl(['about', L, 'badges'], 'Datos de la credencial (uno por línea; el último sale en rojo)', { arr: 1 })}
        </>}

        {tab === 'experience' && <>
          <Add label="Agregar experiencia" fn={(n) => n.experience.unshift({ id: uid(), org: '', time: '', place: '', current: false, es: { role: '', tasks: [] }, en: { role: '', tasks: [] } })} />
          {d.experience.map((e, i) => (
            <Card key={e.id} title={e.org || 'Nueva experiencia'} onDelete={() => del(e.org, () => mut((n) => n.experience.splice(i, 1)))}>
              <div className="grid2">{fl(['experience', i, 'org'], 'Empresa / institución')}{fl(['experience', i, L, 'role'], 'Puesto')}</div>
              <div className="grid2">{fl(['experience', i, 'time'], 'Período')}{fl(['experience', i, 'place'], 'Lugar')}</div>
              <label className="chk"><input type="checkbox" checked={!!e.current} onChange={(ev) => set(['experience', i, 'current'], ev.target.checked)} />Es mi trabajo actual</label>
              {fl(['experience', i, L, 'tasks'], 'Tareas (una por línea)', { arr: 1, rows: 5 })}
            </Card>
          ))}
        </>}

        {tab === 'skills' && <>
          <Add label="Agregar grupo de skills" fn={(n) => n.skills.push({ id: uid(), items: [], es: { name: '' }, en: { name: '' } })} />
          {d.skills.map((g, i) => (
            <Card key={g.id} title={g.es?.name || 'Nuevo grupo'} onDelete={() => del(g.es?.name, () => mut((n) => n.skills.splice(i, 1)))}>
              {fl(['skills', i, L, 'name'], 'Nombre del grupo')}
              {fl(['skills', i, 'items'], 'Skills (una por línea, iguales en ambos idiomas)', { arr: 1, rows: 5 })}
            </Card>
          ))}
        </>}

        {tab === 'projects' && <>
          <Add label="Agregar proyecto" fn={(n) => n.projects.unshift({ id: uid(), theme: 'web', icon: 'Code2', url: '', es: { title: '', status: '', description: '', tags: [], linkLabel: 'Ver proyecto' }, en: { title: '', status: '', description: '', tags: [], linkLabel: '' } })} />
          {d.projects.map((p, i) => (
            <Card key={p.id} title={p.es?.title || 'Nuevo proyecto'} onDelete={() => del(p.es?.title, () => mut((n) => n.projects.splice(i, 1)))}>
              <div className="grid2">{fl(['projects', i, L, 'title'], 'Título')}{fl(['projects', i, L, 'status'], 'Estado (ej: En producción)')}</div>
              {fl(['projects', i, L, 'description'], 'Descripción', { area: 1, rows: 4 })}
              {fl(['projects', i, L, 'tags'], 'Etiquetas (una por línea)', { arr: 1 })}
              <div className="grid2">{fl(['projects', i, 'url'], 'Link (opcional)')}{fl(['projects', i, L, 'linkLabel'], 'Texto del link')}</div>
              <label className="f"><span>Estilo de la tarjeta</span>
                <select value={p.theme} onChange={(e) => mut((n) => { n.projects[i].theme = e.target.value; n.projects[i].icon = e.target.value === 'fire' ? 'Flame' : 'Code2' })}>
                  <option value="web">Desarrollo web</option><option value="fire">Bomberos</option>
                </select></label>
            </Card>
          ))}
        </>}

        {tab === 'contact' && <>
          {fl(['profile', 'email'], 'Email')}
          {fl(['contact', L, 'p'], 'Texto de contacto', { area: 1 })}
          <Add label="Agregar red social" fn={(n) => n.socials.push({ id: uid(), label: '', handle: '', url: '', icon: 'Github' })} />
          {d.socials.map((s, i) => (
            <Card key={s.id} title={s.label || 'Nueva red'} onDelete={() => del(s.label, () => mut((n) => n.socials.splice(i, 1)))}>
              <div className="grid2">{fl(['socials', i, 'label'], 'Nombre (ej: GitHub)')}{fl(['socials', i, 'handle'], 'Usuario a mostrar')}</div>
              <div className="grid2">{fl(['socials', i, 'url'], 'Link')}
                <label className="f"><span>Ícono</span>
                  <select value={s.icon} onChange={(e) => set(['socials', i, 'icon'], e.target.value)}>
                    {['Github', 'Linkedin', 'Instagram', 'Mail'].map((x) => <option key={x}>{x}</option>)}
                  </select></label></div>
            </Card>
          ))}
        </>}
      </div>

      {ask && (
        <div className="confirm" role="alertdialog" aria-modal="true">
          <div className="confirm-box">
            <h4>{ask.title}</h4>
            <p>{ask.text}</p>
            <div>
              <button type="button" className="btn-a" onClick={() => setAsk(null)}>Cancelar</button>
              <button type="button" className={`btn-a ${ask.danger ? 'danger' : 'primary'}`} onClick={() => { ask.yes(); setAsk(null) }}>{ask.okLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Admin({ onClose }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SK) === '1')
  return createPortal(
    <div className="admin" role="dialog" aria-modal="true" aria-label="Panel privado">
      <div className="admin-shell">
        {authed ? <Panel onClose={onClose} /> : (
          <>
            <Gate onOk={() => { sessionStorage.setItem(SK, '1'); setAuthed(true) }} />
            <div className="gate" style={{ paddingTop: 0 }}><button type="button" className="btn-a" onClick={onClose}>Cerrar</button></div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
