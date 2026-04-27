# Deploy checklist (Vercel principal + Railway backup)

## Provider roles (fixed)

- **Principal (public production):** `https://webpage-bmrgroup.vercel.app`
- **Backup only:** `https://webpagebmrgroup-production.up.railway.app`

Do not share Railway URL as the main URL.

---

## No-error setup (one-time)

### 1) Vercel must be the only public primary

1. Open Vercel project `webpage-bmrgroup`.
2. Go to **Settings → Domains**.
3. Keep `webpage-bmrgroup.vercel.app` as Production.
4. Remove/disable extra duplicate projects in Vercel to avoid confusion.
5. Keep Git production branch as `main`.

### 2) Railway must stay as backup

1. Open Railway project `WebpageBmrgroup`.
2. Keep generated domain active (`webpagebmrgroup-production.up.railway.app`).
3. Do not promote Railway URL in bios, ads, QR, or social links.
4. Keep Railway for failover/testing.

### 3) Single source of truth for links

Use only this URL in public channels:

- `https://webpage-bmrgroup.vercel.app`

Optional: use a custom domain later and point it to Vercel.

---

## Runtime modes in repository

1. **Next mode (default for Vercel)**
   - `npm run build`
   - `npm run start`

2. **Static mode (backup mode)**
   - `npm run mode:static`
   - `npm run build`
   - `npm run start`

Return to Next mode:

- `npm run mode:next`

---

## Why changes may not appear

- **Vercel URL** shows **Next mode** code (`app/`, `components/`, `hooks/`, `content/`).
- **Railway URL** shows **static mode** code (`index.html`, `app.js`, `styles.css`, `assets/`) because Railway deploy uses Docker static server.

If you edit:

- `app/page.tsx` or `components/layout/ProfessionalHeader.tsx` → check **Vercel URL**.
- `app.js` / `index.html` → check **Railway URL**.

---

## If install fails with 403 to npm registry

1. Check provider environment variables for inherited proxies:
   - `NPM_CONFIG_REGISTRY`
   - `npm_config_registry`
   - `HTTP_PROXY`
   - `HTTPS_PROXY`
2. Remove invalid values.
3. Redeploy.

## Asset organization

Use `docs/ASSET_WORKFLOW.md` as the single source of truth for naming, folders and upload process for hero images/videos/logos.
