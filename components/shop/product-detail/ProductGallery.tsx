'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type KeyboardEvent, type TouchEvent } from 'react';

type ProductGalleryProps = {
  images: string[];
  alt: string;
  isNew?: boolean;
};

const SWIPE_THRESHOLD_PX = 40;

export function ProductGallery({ images, alt, isNew = false }: ProductGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setFailedImages([]);
  }, [galleryImages]);

  const availableImages = galleryImages.filter((image) => !failedImages.includes(image));
  const canNavigate = availableImages.length > 1;
  const safeActiveIndex = availableImages.length > 0 ? Math.min(activeIndex, availableImages.length - 1) : 0;
  const displayedImage = availableImages[safeActiveIndex] ?? null;

  const goToImage = (index: number) => {
    if (availableImages.length === 0) return;
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    if (!canNavigate) return;
    setActiveIndex((current) => (current === 0 ? availableImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    if (!canNavigate) return;
    setActiveIndex((current) => (current + 1) % availableImages.length);
  };

  const handleImageError = (image: string) => {
    setFailedImages((current) => (current.includes(image) ? current : [...current, image]));
    setActiveIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!canNavigate) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (!canNavigate) return;
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (!canNavigate || touchStartX === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = touchEndX - touchStartX;
    setTouchStartX(null);

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX > 0) {
      goToPrevious();
      return;
    }

    goToNext();
  };

  return (
    <section
      aria-label={`Galería de imágenes de ${alt}`}
      className="space-y-4"
      tabIndex={canNavigate ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#14223D] shadow-[0_24px_70px_-42px_rgba(20,34,61,0.75)] md:aspect-[5/6]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {displayedImage ? (
          <Image
            key={displayedImage}
            src={displayedImage}
            alt={`${alt} — foto ${safeActiveIndex + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-100 transition-opacity duration-300"
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

        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#14223D]/10 bg-[#F4EEDE]/95 text-[#14223D] shadow-lg shadow-black/10 transition hover:bg-[#EDE5D0] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
            >
              <i className="ti ti-chevron-left text-xl" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Imagen siguiente"
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#14223D]/10 bg-[#F4EEDE]/95 text-[#14223D] shadow-lg shadow-black/10 transition hover:bg-[#EDE5D0] hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
            >
              <i className="ti ti-chevron-right text-xl" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {canNavigate ? (
        <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Miniaturas de producto">
          {availableImages.map((image, index) => {
            const isActive = index === safeActiveIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => goToImage(index)}
                aria-label={`Ir a la imagen ${index + 1}`}
                aria-pressed={isActive}
                className={`relative h-20 w-20 flex-none overflow-hidden rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE] ${
                  isActive ? 'border-2 border-[#B8924A]' : 'border-[#14223D]/15 hover:border-[#B8924A]'
                }`}
              >
                <Image
                  src={image}
                  alt={`${alt} — miniatura ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  loading="lazy"
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
