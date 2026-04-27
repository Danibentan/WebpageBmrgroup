'use client';

import { useEffect, useRef, useState } from 'react';

import { heroContent, heroSlides } from '@/content/hero-slides';

import { HeroIndicators } from './HeroIndicators';
import { HeroMedia } from './HeroMedia';
import { HeroOverlay } from './HeroOverlay';

const SLIDE_INTERVAL_MS = 5000;

export default function ImmersiveHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleSelect = (index: number) => {
    const bounded = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    setActiveIndex(bounded);
  };

  return (
    <section
      ref={rootRef}
      className="relative h-[75vh] w-screen overflow-hidden sm:h-[80vh] lg:h-[85vh] lg:max-h-[720px]"
      aria-roledescription="carousel"
      aria-label="Galería principal de BAR Group"
    >
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <HeroMedia key={slide.id} slide={slide} index={index} activeIndex={activeIndex} />
        ))}
      </div>

      <HeroOverlay title={heroContent.title} subtitle={heroContent.subtitle} ctaLabel={heroContent.ctaLabel} ctaHref={heroContent.ctaHref} />

      <HeroIndicators count={heroSlides.length} activeIndex={activeIndex} onSelect={handleSelect} />

      <style jsx global>{`
        @keyframes heroScroll {
          0% {
            transform: translate(-50%, 0);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 34px);
            opacity: 0;
          }
        }

        @keyframes captionFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
