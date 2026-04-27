# Immersive Hero

Este módulo implementa el hero full-bleed con carrusel de imágenes/videos para la home.

## Estructura

- `ImmersiveHero.tsx`: orquestador del hero y accesibilidad general.
- `HeroMedia.tsx`: render de media con `next/image` y `<video>` nativo.
- `HeroOverlay.tsx`: gradientes, copy editorial, CTA, caption y detalles visuales.
- `HeroIndicators.tsx`: navegación por barras con progreso sincronizado.
- `hooks/useHeroCarousel.ts`: máquina de estado (autoplay, teclado, preload, pause/resume).
- `content/hero-slides.ts`: fuente única de contenido editable.
- `types/hero.ts`: tipos compartidos (`HeroSlide`).

## Cómo editar slides

1. Abrí `content/hero-slides.ts`.
2. Agregá o editá objetos del array `heroSlides`.
3. Recomendación: mantener entre 4 y 5 slides.

```ts
{
  id: 'nuevo-slide',
  type: 'image',
  src: '/assets/mi-imagen.jpg',
  caption: 'Texto corto en mayúsculas visuales',
  alt: 'Descripción accesible de la imagen',
  duration: 6000
}
```

## Videos para producción

- Guardar archivos en `/public/videos`.
- Objetivo técnico: máximo 2 MB por video, 1920x1080.
- Incluir `webm` + `mp4` para fallback.

```ts
videoSources: {
  webm: '/videos/showroom-hero.webm',
  mp4: '/videos/showroom-hero.mp4'
}
```

### CDN externo (opcional)

Si usás un CDN, definí `NEXT_PUBLIC_MEDIA_BASE_URL`.

Ejemplos comentados para producción:

- Vercel Blob: `https://<store>.public.blob.vercel-storage.com`
- Cloudinary: `https://res.cloudinary.com/<cloud_name>/video/upload`

Luego, `content/hero-slides.ts` antepone automáticamente ese base URL a rutas relativas.
