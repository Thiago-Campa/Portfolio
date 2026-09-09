export const profile = {
  name: 'Thiago Campagnaro',
  email: 'thiagocampa7@gmail.com',
}

export const socials = [
  { key: 'github', url: 'https://github.com/Thiago-Campa', icon: 'Github', handle: 'Thiago-Campa' },
  {
    key: 'linkedin',
    url: 'https://www.linkedin.com/in/thiago-campagnaro-b90500218/',
    icon: 'Linkedin',
    handle: 'thiago-campagnaro',
  },
  { key: 'instagram', url: 'https://www.instagram.com/thiago.campa/', icon: 'Instagram', handle: '@thiago.campa' },
]

// Metadata cronologica/estructural de la experiencia (no se traduce)
export const experienceMeta = [
  {
    org: 'Universidad del Gran Rosario',
    time: 'Sept. 2026 — actualidad · Jornada completa',
    place: 'Rosario, Santa Fe, Argentina · Presencial',
    current: true,
  },
  {
    org: 'Microcom Argentina S.A.',
    time: 'Dic. 2025 — Jun. 2026 · 7 meses · Jornada parcial',
    place: 'Rosario, Santa Fe, Argentina · Presencial',
    current: false,
  },
  {
    org: 'INALPA S.A.',
    time: 'Mar. 2025 — Dic. 2025 · 10 meses · Jornada parcial',
    place: 'Pavon Arriba, Santa Fe, Argentina · Presencial',
    current: false,
  },
]

// Metadata visual/estructural de los proyectos (no se traduce)
// theme: 'web'  -> paleta y motivos de desarrollo web (CIC-DB)
// theme: 'fire' -> paleta y motivos bomberiles (proyecto del cuartel)
export const projectsMeta = [
  {
    key: 'cic',
    theme: 'web',
    icon: 'Code2',
    url: 'https://cic-db.web.app/',
  },
  {
    key: 'fire',
    theme: 'fire',
    icon: 'Flame',
    url: null,
  },
]
