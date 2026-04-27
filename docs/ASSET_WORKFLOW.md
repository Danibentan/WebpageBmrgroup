# Asset workflow en la nube (Vercel + Chat)

## Objetivo

Flujo **simple y automatizado** para trabajar sin entorno local: vos subís archivos por chat y yo los integro al repo Next.js en la ruta correcta para Vercel.

---

## Cómo lo hacemos (paso a paso)

### 1) Vos subís el archivo por chat

Puede ser imagen (`.png`, `.jpg`, `.webp`, `.svg`) o video (`.mp4`, `.webm`).

### 2) Me pasás este bloque (copiar/pegar)

```text
TIPO: logo | hero-image | hero-video | pagina
ARCHIVO: nombre-del-archivo.ext
DESTINO: /public/assets/logos/...  o  /public/assets/hero/...  o  /public/videos/...
USO EN: archivo a editar (ej: components/layout/ProfessionalHeader.tsx)
REEMPLAZA: ruta anterior (opcional)
```

### 3) Yo lo automatizo en el repo

- ubico el archivo en la ruta indicada,
- actualizo referencias en código,
- hago commit,
- dejo PR listo para deploy.

---

## Rutas oficiales del proyecto (Next.js)

```text
/public/assets/logos   -> logos de header/footer/marca
/public/assets/hero    -> imágenes de hero o secciones
/public/videos         -> videos de hero
```

> Regla: todo asset nuevo para Vercel entra por `public/` para que quede accesible por URL.

---

## Convención de nombres recomendada

- minúsculas
- sin espacios
- separado por guiones

Ejemplos:

- `logo-bmr-icono-azul.svg`
- `hero-showroom-01.webp`
- `hero-showroom-01.mp4`

---

## Mensaje corto sugerido para cada asset

```text
Subo: logo-bmr-icono-azul.svg
Destino: /public/assets/logos/logo-bmr-icono-azul.svg
Uso en: header y footer
```

Con eso ya puedo dejarlo integrado sin vueltas.
