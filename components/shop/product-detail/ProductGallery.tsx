'use client';

import { useState } from 'react';

type ProductGalleryProps = {
  images: string[];
  alt: string;
  isNew?: boolean;
};

const FALLBACK_IMAGE = '/products/bmr-product-placeholder.svg';

export function ProductGallery({ images, alt, isNew = false }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [FALLBACK_IMAGE];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <section aria-label={`Galería de imágenes de ${alt}`} className="space-y-4">
      <div className="relative overflow-hidden rounded-[14px] bg-[#14223D] shadow-[0_24px_70px_-42px_rgba(20,34,61,0.75)]">
        <img src={activeImage} alt={alt} className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
        {isNew ? (
          <span className="absolute left-4 top-4 rounded-full border border-[#14223D]/10 bg-[#F4EEDE]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14223D] backdrop-blur">
            Nuevo
          </span>
        ) : null}
      </div>

      {galleryImages.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Miniaturas de producto">
          {galleryImages.map((image, index) => {
            const isActive = image === activeImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`Ver imagen ${index + 1} de ${alt}`}
                aria-pressed={isActive}
                className={`relative h-20 w-20 flex-none overflow-hidden rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE] ${
                  isActive ? 'border-[#14223D]' : 'border-[#14223D]/15 hover:border-[#B8924A]'
                }`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
