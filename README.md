# Thiago Campagnaro — Portfolio

Sitio personal hecho con **React + Vite**, CSS separado por componente, modo claro/oscuro y selector de idioma (ES/EN).

## Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [framer-motion](https://www.framer.com/motion/) para animaciones y reveals al hacer scroll
- [lucide-react](https://lucide.dev/) para los íconos (GitHub, LinkedIn, Instagram, etc.)
- CSS plano organizado por componente (sin frameworks de CSS)

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173` en el navegador.

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── App.jsx                  # Orquesta las secciones
├── data.js                  # Metadata que NO cambia con el idioma (urls, fechas, temas visuales)
├── i18n.js                  # Todos los textos en español e inglés
├── context/
│   ├── ThemeContext.jsx     # Modo claro / oscuro (persistido en localStorage)
│   └── LanguageContext.jsx  # Idioma ES / EN (persistido en localStorage)
├── styles/
│   └── index.css            # Variables CSS globales (incluye [data-theme='dark'])
└── components/
    ├── Header.jsx / .css    # Nav + botones de tema e idioma
    ├── Hero.jsx / .css      # Terminal animada
    ├── About.jsx / .css     # Bio + badges (la de "Bombero voluntario" está en rojo bomberil)
    ├── Experience.jsx / .css
    ├── Skills.jsx / .css
    ├── Projects.jsx / .css  # Cards con tema propio: "web" (CIC-DB) y "fire" (cuartel)
    ├── Contact.jsx / .css   # Mail + redes (GitHub, LinkedIn, Instagram)
    └── Footer.jsx / .css
```

## Cosas para personalizar

- **Textos**: todo el copy vive en `src/i18n.js`, separado por `es` y `en`.
- **Datos que no cambian de idioma** (fechas, orgs, urls, temas visuales): `src/data.js`.
- **Colores**: variables CSS en `src/styles/index.css`, con su versión oscura bajo `[data-theme='dark']`.
- **Nuevo proyecto**: agregá una entrada en `projectsMeta` (data.js) y su traducción correspondiente en `projects.items` (i18n.js, en ambos idiomas). El campo `theme` acepta `"web"` o `"fire"`; para un tercer estilo hay que sumar sus reglas en `Projects.css`.
