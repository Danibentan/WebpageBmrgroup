import './globals.css';

import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

import { SiteFooter } from '@/components/SiteFooter';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'BAR Group Argentina',
  description: 'Aberturas premium para arquitectura contemporánea.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${cormorant.variable}`}>{children}<SiteFooter /></body>
    </html>
  );
}
