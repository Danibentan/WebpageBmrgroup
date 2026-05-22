import type { Metadata } from 'next';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { ProductGrid } from '@/components/tienda/ProductGrid';
import { ShopSidebar } from '@/components/tienda/ShopSidebar';

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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr]">
          <ShopSidebar />
          <ProductGrid />
        </div>
      </div>
    </main>
  );
}
