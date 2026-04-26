# Deploy checklist (Vercel/Railway)

## Canonical production URL

Use **Vercel as the canonical public production URL**:

- Primary: `https://webpage-bmrgroup.vercel.app`
- Secondary (backup/preview): `https://webpagebmrgroup-production.up.railway.app`

Why: Vercel handles frontend static/Next hosting and domain management more cleanly for this repository.

## Runtime modes

This repository supports two modes:

1. **Static mode (default, cloud-safe)**
   - `npm run build` copies static files to `.dist/`
   - `npm run start` serves `.dist/` using Python
   - Works in restricted environments where npm package downloads are blocked

2. **Next mode (full App Router stack)**
   - `npm run mode:next` (switches `package.json` and installs Next dependencies)
   - `npm run build:next`
   - `npm run start:next`

To return to static mode:

- `npm run mode:static`

## Required

- `vercel.json` keeps git deployments enabled.
- `.npmrc` points to the public npm registry.

## Optional environment variables

- `NEXT_PUBLIC_MEDIA_BASE_URL` only if media is served from CDN.

## If install fails with 403 to registry.npmjs.org

1. Check Project Settings -> Environment Variables for inherited proxy variables:
   - `NPM_CONFIG_REGISTRY`
   - `npm_config_registry`
   - `HTTP_PROXY`
   - `HTTPS_PROXY`
2. Remove invalid values and redeploy.
3. Confirm install step can reach `https://registry.npmjs.org/`.
