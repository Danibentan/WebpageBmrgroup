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

      <div className="absolute inset-0 z-20 flex items-end justify-end md:items-center">
        <div className="w-full px-6 pb-14 pt-10 md:max-w-[760px] md:px-12 md:pb-12 lg:px-16">
          <div className="rounded-2xl border border-[#bba066]/35 bg-[#040b1f]/45 p-6 backdrop-blur-[2px] md:p-8">
            <p className="kicker mb-3 text-xs">Presentación comercial</p>
            <h1 className="font-editorial max-w-[14ch] font-semibold text-[#f2f4f8]" style={{ fontSize: 'clamp(2.2rem, 4.6vw, 4.8rem)', lineHeight: 0.98 }}>
              {title}
            </h1>
            <p className="mt-4 max-w-[48ch] text-[#d0d8e8]" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)' }}>
              {subtitle}
            </p>
          </div>
          <a
            href={ctaHref}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#c9ab66] px-5 py-2.5 text-sm font-semibold text-[#f2f4f8] transition hover:bg-[#c9ab66] hover:text-[#08152f]"
          >
            {ctaLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")' }} />

      <div className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <div className="relative h-12 w-[1px] bg-white/40">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white animate-[heroScroll_1.8s_ease-in-out_infinite]" />
        </div>
      </div>

      <p className="absolute bottom-10 right-8 z-20 text-[11px] uppercase tracking-[0.22em] text-[#c9ab66] md:right-12">
        {currentSlide.caption}
      </p>
    </>
  );
}
