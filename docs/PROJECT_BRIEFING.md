# Briefing técnico integral (BMR)

## Objetivo

Verificar salud del proyecto para Vercel:

- rutas y estructura Next.js correctas,
- ausencia de errores críticos de assets,
- identificar archivos legacy/duplicados que pueden generar confusión,
- checklist para PRs y cambios de UI.

## Hallazgos actuales

1. La estructura Next principal está presente (`app/`, `components/`, `content/`).  
2. Hay archivos legacy estáticos (`index.html`, `app.js`, etc.) que no son parte del flujo principal Vercel y pueden confundir si se editan por error.
3. El slideshow espera estos assets:
   - `public/assets/hero/bmr-slide-01.jpg`
   - `public/assets/hero/bmr-slide-02.jpg`
   - `public/assets/hero/bmr-slide-03.jpg`
   - `public/assets/hero/bmr-slide-04.jpg`
4. Si faltan esos archivos, el hero no va a mostrar las imágenes en producción.

## Acción implementada

Se agregó `npm run audit` para validar rápidamente archivos críticos del proyecto antes de deploy/PR.

## Flujo recomendado antes de cada PR

1. `npm run sync:assets`
2. `npm run audit`
3. `npm run build` (si el entorno tiene dependencias instaladas)
4. Revisar que el cambio impacte en rutas Next correctas (`app/`, `components/`, `content/`).
