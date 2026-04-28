import { notFound } from 'next/navigation';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { products } from '@/lib/products';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#0a1733] px-6 pb-20 pt-32 text-white">
      <ProfessionalHeader />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-editorial text-4xl text-white">{product.name}</h1>
        <p className="mt-4 text-white/60">{product.description}</p>
        <p className="mt-6 font-editorial text-lg text-[#c9a961]">Detalle completo en construcción</p>
      </div>
    </main>
  );
}
