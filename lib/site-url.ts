import { headers } from 'next/headers';

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    if (host) return `${proto}://${host}`;
  } catch {}
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://bmrgroup.com.ar';
}
