import { ArrowRight } from 'lucide-react';

import type { HeroSlide } from '@/types/hero';

type HeroOverlayProps = {
  currentSlide: HeroSlide;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HeroOverlay({ currentSlide, title, subtitle, ctaLabel, ctaHref }: HeroOverlayProps) {
  return (
    <>
      <div className="absolute inset-0 z-10 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(15,31,61,0.85) 0%, rgba(15,31,61,0.4) 50%, transparent 70%)' }} />
      <div className="absolute inset-0 z-10 md:hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,31,61,0.7) 60%, rgba(15,31,61,0.95) 100%)' }} />

      <div className="absolute inset-0 z-20 flex items-end md:items-center">
        <div className="w-full px-6 pb-14 pt-10 md:max-w-[600px] md:px-12 md:pb-12 lg:px-16">
          <h1 className="text-balance font-bold tracking-[-0.02em] text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            {title}
          </h1>
          <p className="mt-5 text-white/90" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
            {subtitle}
          </p>
          <a
            href={ctaHref}
            className="mt-8 inline-flex items-center gap-2 border border-white px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0F1F3D]"
          >
            {ctaLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <p
        aria-live="polite"
        className="absolute bottom-8 right-6 z-20 text-xs uppercase tracking-[0.2em] text-white/80 transition-opacity delay-300 duration-700 md:bottom-10 md:right-10"
      >
        {currentSlide.caption}
      </p>

      <img
        src="/assets/bmr-logo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-6 z-10 h-16 w-16 opacity-20 mix-blend-overlay md:h-24 md:w-24"
      />

      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")' }} />

      <div className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <div className="relative h-12 w-[1px] bg-white/40">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white animate-[heroScroll_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </>
  );
}
