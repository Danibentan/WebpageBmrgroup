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

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-transparent pb-20">
      <ProfessionalHeader />
      <div className="mx-auto max-w-7xl px-6 pt-12 md:px-10 md:pt-16">
        <Suspense fallback={null}>
          <ShopClient />
        </Suspense>
      </div>
    </main>
  );
}
