# Deploy checklist (Vercel/Railway)

## Required

- `vercel.json` keeps git deployments enabled.
- `.npmrc` points to the public npm registry.
- `next` must stay patched to `^14.2.35` or newer to satisfy vulnerability scanners.

## Optional environment variables

- `NEXT_PUBLIC_MEDIA_BASE_URL` only if media is served from CDN.

## If build fails with 403 to registry.npmjs.org

1. Check Project Settings -> Environment Variables for inherited proxy variables:
   - `NPM_CONFIG_REGISTRY`
   - `npm_config_registry`
   - `HTTP_PROXY`
   - `HTTPS_PROXY`
2. Remove invalid values and redeploy.
3. Confirm install step can reach `https://registry.npmjs.org/`.

## Railway security scan failure on Next.js

If Railway reports vulnerable `next@14.2.33`, upgrade and redeploy:

```bash
npm install next@^14.2.35
npm run build
npm run start
```
