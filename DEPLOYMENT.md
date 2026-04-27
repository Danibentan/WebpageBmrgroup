# Deploy checklist (single source: Next.js)

## Qué plataforma usar para trabajar

- **Trabajá sobre Vercel** como entorno principal.
- Todas las modificaciones de producto/UI deben hacerse en el código Next.js (`app/`, `components/`, `hooks/`).
- Railway puede quedar como espejo/backup, pero debe desplegar **el mismo build Next.js** (no una versión estática aparte).

---

## Por qué antes veías dos páginas distintas

Antes la configuración mezclaba dos runtimes:

1. **Vercel** desplegaba Next.js (`app/page.tsx`, `components/...`).
2. **Railway** servía una web estática con `index.html` + `app.js` desde Docker.

Eso generaba dos sitios visualmente diferentes.

---

## Estado recomendado (unificado)

1. **Vercel (principal público)**  
   URL principal para usuarios.

2. **Railway (opcional backup)**  
   Deploy del mismo proyecto Next.js usando `Dockerfile` basado en Node + `next build` + `next start`.

---

## Comandos locales

- Desarrollo: `npm run dev`
- Build de producción: `npm run build`
- Servidor producción: `npm run start`

---

## Regla práctica para el equipo

Si editás cualquiera de estos archivos:

- `app/**/*.tsx`
- `components/**/*.tsx`
- `app/globals.css`

estás editando la **única versión oficial** del sitio.
