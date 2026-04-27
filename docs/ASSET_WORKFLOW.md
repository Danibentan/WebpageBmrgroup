# Asset workflow (estructura ordenada pro)

## Objetivo

Tener una convención única para imágenes, videos y logos en ambos modos del proyecto:

- **Next mode** (rutas desde `/public`)
- **Static mode** (rutas relativas desde `assets/`)

## Estructura recomendada

```text
/public
  /assets
    /hero        # imágenes usadas por hero en Next mode
    /logos       # logos para header/footer en Next mode
  /videos        # videos hero (mp4/webm)

/assets
  /hero          # fallback estático (index.html/app.js)
  /logos         # fallback estático (index.html/app.js)
```

## Convención de nombres

- Hero imágenes: `hero-01.jpg`, `hero-02.jpg`, `hero-03.jpg`
- Posters de video: `hero-video-01-poster.jpg`
- Videos: `hero-video-01.mp4`, `hero-video-01.webm`
- Logos: `logo-bmr-header.svg`, `logo-bmr-footer.svg`

## Flujo de carga (siempre igual)

1. Preparar archivos (sin espacios, minúsculas, guiones).
2. Optimizar antes de subir:
   - imágenes: webp/jpg livianas
   - videos: máximo 2 MB, 1920x1080
3. Copiar en carpetas:
   - Next: `/public/assets/...` y `/public/videos/...`
   - Static: `/assets/...`
4. Actualizar rutas en:
   - `content/hero-slides.ts` (Next mode)
   - `app.js` (Static mode)
5. Commit + push + redeploy.

## Regla simple

- Si se cambia media del hero, se actualiza **Next + Static** en el mismo commit.
- Si no querés mantener duplicado, usar CDN con `NEXT_PUBLIC_MEDIA_BASE_URL` para Next y dejar static como backup mínimo.
