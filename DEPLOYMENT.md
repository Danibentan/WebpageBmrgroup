# Deploy checklist (Vercel/Railway)

## Current runtime mode

This repository uses a static build pipeline by default:

- `npm run build` copies static assets into `.dist/`.
- `npm run start` serves `.dist/` with `python -m http.server`.

This avoids dependency-install failures in restricted cloud environments.

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
