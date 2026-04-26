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

1. **Static mode (default, cloud-safe)**
   - `npm run build` copies static files to `.dist/`
   - `npm run start` serves `.dist/` using Python

2. **Next mode (optional)**
   - `npm run mode:next`
   - `npm run build:next`
   - `npm run start:next`

Return to static:

- `npm run mode:static`

---

## If install fails with 403 to npm registry

1. Check provider environment variables for inherited proxies:
   - `NPM_CONFIG_REGISTRY`
   - `npm_config_registry`
   - `HTTP_PROXY`
   - `HTTPS_PROXY`
2. Remove invalid values.
3. Redeploy.
