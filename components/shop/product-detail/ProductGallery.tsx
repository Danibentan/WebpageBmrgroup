'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type ProductGalleryProps = {
  images: string[];
  alt: string;
  isNew?: boolean;
};

export function ProductGallery({ images, alt, isNew = false }: ProductGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeImage, setActiveImage] = useState<string | null>(galleryImages[0] ?? null);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  useEffect(() => {
    setActiveImage(galleryImages[0] ?? null);
    setFailedImages([]);
  }, [galleryImages]);

  const availableImages = galleryImages.filter((image) => !failedImages.includes(image));
  const displayedImage = activeImage && !failedImages.includes(activeImage) ? activeImage : availableImages[0] ?? null;

  const handleImageError = (image: string) => {
    setFailedImages((current) => (current.includes(image) ? current : [...current, image]));
    setActiveImage((current) => {
      if (current !== image) return current;
      return galleryImages.find((candidate) => candidate !== image && !failedImages.includes(candidate)) ?? null;
    });
  };

  return (
    <section aria-label={`Galería de imágenes de ${alt}`} className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#14223D] shadow-[0_24px_70px_-42px_rgba(20,34,61,0.75)] md:aspect-[5/6]">
        {displayedImage ? (
          <Image
            src={displayedImage}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            onError={() => handleImageError(displayedImage)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#14223D]" role="img" aria-label={`Imagen pendiente para ${alt}`}>
            <p className="font-editorial text-3xl text-[#F4EEDE]">Próximamente</p>
          </div>
        )}
        {isNew ? (
          <span className="absolute left-4 top-4 rounded-full border border-[#14223D]/10 bg-[#F4EEDE]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14223D] backdrop-blur">
            Nuevo
          </span>
        ) : null}
      </div>

      {availableImages.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Miniaturas de producto">
          {availableImages.map((image, index) => {
            const isActive = image === displayedImage;

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
                <Image
                  src={image}
                  alt={`${alt} miniatura ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={() => handleImageError(image)}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
