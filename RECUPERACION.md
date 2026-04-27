# Recuperar el proyecto BMR Group en Codex (local + nube)

Si se cerró el navegador o la pestaña de Codex, tu proyecto no se borra automáticamente.

## A) Si estabas trabajando en la nube (Vercel/Railway/GitHub)

### 1) Recuperar desde GitHub (fuente principal)

1. Entra al repositorio en GitHub y revisa:
   - **Commits** (historial)
   - **Branches** (rama donde trabajabas)
   - **Pull Requests** (si dejaste cambios en PR)
2. Si usabas Codex, vuelve a abrir el workspace y ejecuta:

```bash
cd /workspace/WebpageBmrgroup
git fetch --all --prune
git branch -a
```

3. Cámbiate a la rama correcta:

```bash
git checkout <tu-rama>
git pull
```

### 2) Recuperar versión desplegada en Vercel

- Abre tu proyecto en Vercel.
- Ve a **Deployments** y localiza el último deploy sano.
- Si el último deploy está mal, usa **Promote to Production** (o redeploy del commit correcto).
- Recuerda que este repo define Vercel como entorno principal (ver `DEPLOYMENT.md`).

### 3) Recuperar versión desplegada en Railway (backup)

- Abre el proyecto en Railway.
- Revisa **Deployments** y selecciona un deploy previo estable.
- Este repo usa Dockerfile para Railway (`railway.toml`).

---

## B) Si quieres reanudar edición en Codex (workspace)

### 1) Entrar a la carpeta del proyecto

```bash
cd /workspace/WebpageBmrgroup
```

### 2) Verificar estado del repo

```bash
git status --short --branch
```

### 3) Reinstalar dependencias (si hace falta)

```bash
npm install
```

### 4) Levantar nuevamente la web

```bash
npm run dev
```

Abre el enlace local que muestra Next.js (normalmente `http://localhost:3000`).

### 5) Si el puerto 3000 está ocupado

```bash
npm run dev -- -p 3001
```

### 6) Confirmar páginas clave de BMR Group

- Inicio: `/`
- Categorías: `/categorias`
- Tienda: `/tienda`
- Cotizar: `/cotizar`
- Quiénes somos: `/quienes-somos`
- Contacto: `/contacto`

---

## Checklist rápido de recuperación

1. ¿Tus cambios estaban **commiteados**? → recupéralo con `git checkout` + `git pull`.
2. ¿No estaban commiteados pero sí desplegados? → recupéralo desde **Deployments** (Vercel/Railway).
3. ¿No estaban commiteados ni desplegados? → no hay forma confiable de restaurarlos automáticamente.

## Nota importante

Cerrar el navegador no borra el proyecto por sí solo. Lo crítico es si tus cambios alcanzaron GitHub (commit/push) o un deploy en nube.
