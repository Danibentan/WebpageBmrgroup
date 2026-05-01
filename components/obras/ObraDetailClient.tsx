'use client';

import { useState } from 'react';
import Image from 'next/image';

type ObraDetailClientProps = {
  title: string;
  description: string;
  gallery: string[];
};

export function ObraDetailClient({ title, description, gallery }: ObraDetailClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = gallery[activeIndex] ?? '/products/bmr-product-placeholder.svg';

  const prev = () => setActiveIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length);
  const next = () => setActiveIndex((prevIndex) => (prevIndex + 1) % gallery.length);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10">
      <div className="overflow-hidden rounded-2xl border border-[#D4AF6F]/30 bg-[var(--bg-elevated-1)]/60">
        <div className="relative aspect-[16/9]">
          <Image src={currentImage} alt={`${title} - imagen ${activeIndex + 1}`} fill className="object-cover" />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#D4AF6F]/20 px-4 py-4 md:px-6">
          <button type="button" onClick={prev} className="rounded-full border border-[#D4AF6F]/50 px-4 py-2 text-sm font-semibold text-[#D4AF6F] hover:bg-[#D4AF6F]/10">
            Anterior
          </button>
          <p className="text-sm text-white/80">
            {activeIndex + 1} / {gallery.length}
          </p>
          <button type="button" onClick={next} className="rounded-full border border-[#D4AF6F]/50 px-4 py-2 text-sm font-semibold text-[#D4AF6F] hover:bg-[#D4AF6F]/10">
            Siguiente
          </button>
        </div>
      </div>

      <article className="mt-8 rounded-2xl border border-white/10 bg-[var(--bg-elevated-1)]/40 p-6">
        <h1 className="font-editorial text-4xl text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-4xl text-lg text-[#d2e0f2]">{description}</p>
      </article>
    </section>
  );
}

