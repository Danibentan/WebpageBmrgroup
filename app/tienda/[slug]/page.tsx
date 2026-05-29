import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { notFound } from 'next/navigation';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { ProductGallery } from '@/components/shop/product-detail/ProductGallery';
import { ProductPurchaseControls } from '@/components/shop/product-detail/ProductPurchaseControls';
import { getCategoryLabel, getMaterialLabel, getProductDetailBySlug, getProductDetailSlugs } from '@/lib/product-detail';

type ProductPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getProductDetailSlugs();
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductDetailBySlug(params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado — BMR Group Argentina'
    };
  }

  const image = product.imagenes[0];
  const title = `${product.nombre} — BMR Group Argentina`;
  const description = product.descripcionLarga;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductDetailBySlug(params.slug);
  if (!product) notFound();

  const categoryLabel = getCategoryLabel(product.categoria);
  const materialLabel = getMaterialLabel(product.material);

  return (
    <main className="min-h-screen bg-[#F4EEDE] pb-24 text-[#14223D]">
      <ProfessionalHeader />

      <div className="mx-auto w-full max-w-7xl px-6 pt-10 md:px-10 md:pt-14">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[#6B6655]">
          <Link href="/tienda" className="inline-flex items-center gap-2 rounded-full border border-[#14223D]/10 px-3 py-1.5 transition hover:border-[#B8924A] hover:text-[#14223D] focus:outline-none focus:ring-2 focus:ring-[#B8924A]">
            <ArrowLeft size={15} aria-hidden="true" />
            Volver
          </Link>
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2">
            <Link href="/tienda" className="hover:text-[#14223D]">
              Tienda
            </Link>
            <span aria-hidden="true">/</span>
            <span>{categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <span className="truncate text-[#14223D]">{product.nombre}</span>
          </nav>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-16">
          <ProductGallery images={product.imagenes} alt={product.imageAlt} isNew={product.esNuevo} />

          <section className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B6655]">{materialLabel}</p>
            <h1 className="mt-3 font-editorial text-5xl italic leading-[0.95] text-[#14223D] md:text-6xl">{product.nombre}</h1>
            <div className="mt-5 h-px w-full bg-[#14223D]/15" aria-hidden="true" />
            <p className="mt-6 text-base leading-8 text-[#6B6655]">{product.descripcionLarga}</p>

            <div className="mt-8">
              <ProductPurchaseControls product={product} />
            </div>
          </section>
        </div>
      </div>

      <section className="mt-20 bg-[#EDE5D0] py-12">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B6655]">Qué incluye</h2>
            <ul className="mt-6 space-y-4">
              {product.incluye.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[#14223D]">
                  <Check size={18} className="mt-1 flex-none text-[#B8924A]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6B6655]">Especificaciones</h2>
            <dl className="mt-6 divide-y divide-[#14223D]/10 overflow-hidden rounded-3xl border border-[#14223D]/10 bg-[#F4EEDE]/45">
              {product.especificaciones.map((spec) => (
                <div key={spec.label} className="grid gap-1 px-5 py-4 text-sm sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="font-medium text-[#6B6655]">{spec.label}</dt>
                  <dd className="text-[#14223D]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
