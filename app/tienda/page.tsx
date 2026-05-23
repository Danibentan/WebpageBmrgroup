import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { ShopClient } from './ShopClient';

export const metadata: Metadata = {
  title: 'Tienda — BMR Group Argentina',
  description: 'Catálogo de aberturas premium en aluminio, PVC y madera. Ventanas, puertas y frentes integrales.',
  openGraph: {
    title: 'Tienda BMR — Aberturas premium',
    description: 'Ventanas, puertas y frentes integrales en aluminio, PVC y madera.',
    images: ['/og/tienda.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tienda BMR — Aberturas premium',
    description: 'Ventanas, puertas y frentes integrales en aluminio, PVC y madera.',
    images: ['/og/tienda.jpg']
  }
};

function ShopFallback() {
  return (
    <div className="rounded-2xl border border-[var(--bmr-border)] bg-[var(--bg-elevated-1)] p-6 text-sm text-[var(--bmr-text-muted)]">
      Cargando tienda…
    </div>
  );
}

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-transparent pb-20">
      <ProfessionalHeader />
      <div className="tienda-shell mx-auto max-w-7xl pt-12 md:pt-16">
        <Suspense fallback={<ShopFallback />}>
          <ShopClient />
        </Suspense>
      </div>
    </main>
  );
}
