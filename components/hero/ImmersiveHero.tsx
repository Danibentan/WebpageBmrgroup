'use client';

import { useEffect, useRef } from 'react';

import { heroContent, heroSlides } from '@/content/hero-slides';
import { useHeroCarousel } from '@/hooks/useHeroCarousel';

import { HeroIndicators } from './HeroIndicators';
import { HeroMedia } from './HeroMedia';
import { HeroOverlay } from './HeroOverlay';

export default function ImmersiveHero() {
  const rootRef = useRef<HTMLElement | null>(null);

  const {
    activeIndex,
    isPaused,
    isReducedMotion,
    mountedVideoIndex,
    progress,
    setActiveIndex,
    pause,
    resume,
    togglePause,
    onVideoEnded,
    onHeroEnterViewport,
    onVideoTimeUpdate
  } = useHeroCarousel({ slides: heroSlides });

  useEffect(() => {
    const target = rootRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onHeroEnterViewport();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [onHeroEnterViewport]);

  return (
    <section
      ref={rootRef}
      className="relative h-[75vh] w-screen overflow-hidden sm:h-[80vh] lg:h-[85vh] lg:max-h-[720px]"
      aria-roledescription="carousel"
      aria-label="Galería principal de BAR Group"
    >
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <HeroMedia
            key={slide.id}
            slide={slide}
            index={index}
            activeIndex={activeIndex}
            mountedVideoIndex={mountedVideoIndex}
            isReducedMotion={isReducedMotion}
            onVideoEnded={onVideoEnded}
            onVideoTimeUpdate={onVideoTimeUpdate}
          />
        ))}
      </div>

      <HeroOverlay currentSlide={heroSlides[activeIndex]} title={heroContent.title} subtitle={heroContent.subtitle} ctaLabel={heroContent.ctaLabel} ctaHref={heroContent.ctaHref} />

      <HeroIndicators
        count={heroSlides.length}
        activeIndex={activeIndex}
        progress={progress}
        onSelect={setActiveIndex}
        onPause={pause}
        onResume={resume}
      />

      <button type="button" className="sr-only" onClick={togglePause}>
        {isPaused ? 'Reanudar slideshow' : 'Pausar slideshow'}
      </button>

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
      `}</style>
    </section>
  );
}
