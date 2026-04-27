import { ArrowRight } from 'lucide-react';

type HeroOverlayProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export function HeroOverlay({ title, subtitle, ctaLabel, ctaHref }: HeroOverlayProps) {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a1733]/90 via-[#0a1733]/70 to-[#0a1733]/40" />

      <div className="absolute inset-0 z-20 flex items-end justify-end md:items-center">
        <div className="w-full px-6 pb-14 pt-10 md:max-w-[760px] md:px-12 md:pb-12 lg:px-16">
          <div className="rounded-2xl border border-[#bba066]/35 bg-[#0a1733]/60 p-6 backdrop-blur-sm md:p-8">
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

      <p className="pointer-events-none absolute left-6 top-6 z-20 text-[11px] uppercase tracking-[0.22em] text-[#c9ab66] md:left-12 md:top-8">
        Plano detalle de abertura en fachada clara
      </p>

      <p className="absolute bottom-10 right-8 z-20 text-[11px] uppercase tracking-[0.22em] text-[#c9ab66] md:right-12">DETALLE VERTICAL DE FACHADA</p>
    </>
  );
}
