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

      <div className="absolute left-6 top-6 z-20 flex items-center gap-3 rounded-2xl border border-white/25 bg-[#0b2848]/55 px-4 py-2 backdrop-blur-md md:left-10 md:top-8">
        <img src="/assets/logos/bmr-icon-blue.svg" alt="Logo Bmr Group" className="h-12 w-12 rounded-full border border-[#ff6a00]/80 bg-[#123b6d] p-1" />
        <p className="text-xl font-bold tracking-[-0.015em] text-white md:text-3xl">Bmr Group Argentina</p>
      </div>

      <div className="absolute inset-0 z-20 flex items-end md:items-center">
        <div className="w-full px-6 pb-14 pt-10 md:max-w-[720px] md:px-12 md:pb-12 lg:px-16">
          <div className="rounded-2xl border border-white/20 bg-[#081b31]/25 p-6 backdrop-blur-[2px] md:p-8">
            <h1 className="max-w-[15ch] font-semibold tracking-[-0.015em] text-white" style={{ fontSize: 'clamp(2rem, 4.2vw, 4.1rem)', lineHeight: 1.02 }}>
              {title}
            </h1>
            <p className="mt-4 max-w-[48ch] text-white/85" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}>
              {subtitle}
            </p>
          </div>
          <a
            href={ctaHref}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/80 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0F1F3D]"
          >
            {ctaLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

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

      <p className="absolute bottom-8 left-6 z-20 text-[11px] uppercase tracking-[0.22em] text-white/65 md:left-10">
        {currentSlide.caption}
      </p>
    </>
  );
}
