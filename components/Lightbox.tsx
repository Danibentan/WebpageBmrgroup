'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type LightboxImage = {
  src: string;
  alt?: string;
};

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const imageInnerRef = useRef<HTMLImageElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(useGSAP);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement;
      setCurrentIndex(initialIndex);
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible && !isClosing) {
      setIsVisible(false);
    }
  }, [initialIndex, isOpen, isVisible, isClosing]);

  useEffect(() => {
    if (!isVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const totalImages = images.length;
  const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

  const goPrev = () => {
    if (isAnimating || totalImages < 2) return;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goNext = () => {
    if (isAnimating || totalImages < 2) return;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const startCloseAnimation = () => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setIsClosing(false);
        onClose();
        openerRef.current?.focus();
      }
    });

    tl.to(imageWrapRef.current, { scale: 0.92, opacity: 0, duration: 0.2, ease: 'power2.inOut' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.inOut' }, '-=0.12');
  };

  useGSAP(
    () => {
      if (!isVisible || !overlayRef.current || !imageWrapRef.current) return;
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(imageWrapRef.current, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      tl.to(imageWrapRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, '-=0.1');
      closeButtonRef.current?.focus();
    },
    { dependencies: [isVisible], scope: overlayRef }
  );

  useGSAP(
    () => {
      if (!imageInnerRef.current || !isVisible) return;
      setIsAnimating(true);
      const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
      tl.to(imageInnerRef.current, { opacity: 0, duration: 0.15, ease: 'power2.out' });
      tl.to(imageInnerRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' }, '-=0.02');
    },
    { dependencies: [currentIndex], scope: imageWrapRef }
  );

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        startCloseAnimation();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
        return;
      }

      if (event.key === 'Tab') {
        const focusable = [closeButtonRef.current, prevButtonRef.current, nextButtonRef.current].filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;

        const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey) {
          const nextIndex = activeIndex <= 0 ? focusable.length - 1 : activeIndex - 1;
          event.preventDefault();
          focusable[nextIndex].focus();
        } else {
          const nextIndex = activeIndex === focusable.length - 1 ? 0 : activeIndex + 1;
          event.preventDefault();
          focusable[nextIndex].focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isVisible, isAnimating, totalImages]);

  if (!mounted || !isVisible || !currentImage) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/90"
      onClick={(event) => {
        if (event.target === event.currentTarget) startCloseAnimation();
      }}
      onTouchStart={(event) => {
        setTouchStartX(event.changedTouches[0]?.clientX ?? null);
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX ?? null;
        if (touchStartX === null || endX === null) return;
        const deltaX = endX - touchStartX;
        if (Math.abs(deltaX) > 40) {
          if (deltaX > 0) {
            goPrev();
          } else {
            goNext();
          }
        }
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Cerrar"
        onClick={startCloseAnimation}
        className="absolute right-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.35)] hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/90 sm:h-11 sm:w-11"
      >
        <X size={24} strokeWidth={2.6} aria-hidden="true" />
      </button>

      <button
        ref={prevButtonRef}
        type="button"
        aria-label="Imagen anterior"
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.35)] hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/90 sm:h-11 sm:w-11"
      >
        <ChevronLeft size={24} strokeWidth={2.6} aria-hidden="true" />
      </button>

      <button
        ref={nextButtonRef}
        type="button"
        aria-label="Imagen siguiente"
        onClick={goNext}
        className="absolute right-4 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.35)] hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/90 sm:h-11 sm:w-11"
      >
        <ChevronRight size={24} strokeWidth={2.6} aria-hidden="true" />
      </button>

      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <div ref={imageWrapRef} className="flex h-full w-full items-center justify-center">
          <img
            key={currentImage.src}
            ref={imageInnerRef}
            src={currentImage.src}
            alt={currentImage.alt ?? `Imagen ${currentIndex + 1}`}
            className="max-h-[95vh] max-w-[95vw] object-contain"
            draggable={false}
          />
        </div>
      </div>

      <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {totalImages}
      </p>
    </div>,
    document.body
  );
}
