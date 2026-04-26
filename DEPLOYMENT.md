# Deploy checklist (Vercel)

## Required

- `vercel.json` keeps git deployments enabled.
- `.npmrc` points to the public npm registry.

## Optional environment variables

- `NEXT_PUBLIC_MEDIA_BASE_URL` only if media is served from CDN.

## If build fails with 403 to registry.npmjs.org

1. Check Vercel Project Settings -> Environment Variables for inherited proxy variables:
   - `NPM_CONFIG_REGISTRY`
   - `npm_config_registry`
   - `HTTP_PROXY`
   - `HTTPS_PROXY`
2. Remove invalid values and redeploy.
3. Confirm install step can reach `https://registry.npmjs.org/`.
