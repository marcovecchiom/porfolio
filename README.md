# Porfolio · Mauricio Marcovecchio

Porfolio personal construido como **SPA en React + TypeScript** con Vite. Bilingüe
(EN/ES), con modo claro/oscuro, y un fondo de red de partículas animado en el hero.

🔗 **Demo:** _(agregar URL de Vercel/Netlify al publicar)_

## Stack

- **React 18** + **TypeScript** (modo estricto)
- **Vite** como bundler y dev server
- **CSS Modules** con _design tokens_ en variables CSS (un único lugar para el color)
- **Space Grotesk** auto-alojada vía `@fontsource` (sin llamadas a terceros)
- Cero dependencias de runtime más allá de React

## Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # typecheck + build de producción en dist/
npm run preview  # previsualizar el build
npm run lint     # ESLint
```

Requiere **Node 20+** (ver `.nvmrc`).

## Arquitectura

El código está pensado para leerse. Cada pieza tiene una sola responsabilidad
(SRP) y las decisiones transversales viven en un único lugar.

```
src/
├── config/site.ts          # datos de contacto, acento e idioma por defecto
├── content/portfolio.ts     # todos los textos EN/ES (la "fuente de verdad")
├── theme/palette.ts         # paletas de color → tokens → variables CSS
├── context/                 # providers de tema e idioma (+ sus hooks)
├── hooks/                   # lógica reutilizable (animaciones, persistencia…)
├── components/
│   ├── ui/                  # piezas reutilizables (Reveal, LinkButton, ProjectCard…)
│   ├── layout/              # header, footer, cursor, barra de progreso
│   └── sections/            # cada sección de la página (Hero, Work, …)
├── App.tsx                  # composición de providers + secciones
└── main.tsx                 # punto de entrada
```

### Principios aplicados

- **Fuente única de verdad:** textos en `content/portfolio.ts`, color en
  `theme/palette.ts`, contacto en `config/site.ts`. Cambiar un dato es tocar una
  sola línea.
- **Abierto/cerrado:** agregar un idioma o un acento de color no requiere tocar
  ningún componente.
- **Separación de intereses:** la lógica de animación vive en _custom hooks_
  (`useNetworkCanvas`, `useInView`, `useScrollProgress`, `useCustomCursor`); los
  componentes solo describen la UI.
- **Accesibilidad:** navegación por teclado con foco visible, `aria-*` en los
  controles, y respeto de `prefers-reduced-motion` (todas las animaciones se
  desactivan) y `prefers-color-scheme` (tema inicial).

## Personalización

| Qué                        | Dónde                        |
| -------------------------- | ---------------------------- |
| Textos y traducciones      | `src/content/portfolio.ts`   |
| Email y redes              | `src/config/site.ts`         |
| Acento de color / defaults | `src/config/site.ts`         |
| Paletas de color           | `src/theme/palette.ts`       |

## Deploy

Listo para **Vercel** (`vercel.json`) y **Netlify** (`netlify.toml`): ambos
detectan Vite, corren `npm run build` y publican `dist/`. No requiere configuración
adicional.

## Licencia

[MIT](./LICENSE) © 2026 Mauricio Marcovecchio
