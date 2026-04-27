'use client';

import { useEffect, useRef } from 'react';

type HeaderPanel = 'quienes' | 'categorias' | 'tienda' | 'contacto' | 'cotizar';

type ProfessionalHeaderProps = {
  activePanel: HeaderPanel | null;
  onOpenPanel: (panel: HeaderPanel) => void;
};

export function ProfessionalHeader({ activePanel, onOpenPanel }: ProfessionalHeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    let isActive = true;

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      if (!isActive) return;

      const gsap = gsapModule.gsap;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(headerRef.current, { y: -18, opacity: 0, duration: 0.55 })
        .from(logoRef.current, { scale: 0.9, opacity: 0, duration: 0.4 }, '-=0.3')
        .from(titleRef.current, { y: 12, opacity: 0, duration: 0.45 }, '-=0.25')
        .from('.site-nav-link', { y: 8, opacity: 0, duration: 0.3, stagger: 0.05 }, '-=0.22')
        .from('.header-cta', { y: 8, opacity: 0, duration: 0.35 }, '-=0.2');

      gsap.to('.header-cta', {
        boxShadow: '0 10px 24px rgba(255,106,0,0.22)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    };

    void runAnimation();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-40 mx-auto mt-4 w-[min(1280px,96%)] overflow-hidden rounded-2xl border border-[#d4d7dc] bg-[#ececec]/95 shadow-[0_10px_30px_rgba(31,53,84,0.10)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <img
            ref={logoRef}
            src="/assets/logos/logo_logo%20fondo%20gris.png"
            alt="Logo Bmr Group"
            className="h-12 w-12 rounded-full border border-[#ff6a00]/50 object-contain bg-[#d9d9d9]"
          />
          <p ref={titleRef} className="text-2xl font-bold tracking-[-0.015em] leading-none text-[#1f3554] md:text-3xl">
            Bmr Group Argentina
          </p>
        </div>

        <nav className="hidden gap-3 text-sm font-semibold text-[#2f3743] lg:flex">
          {[
            ['quienes', 'Quiénes somos'],
            ['categorias', 'Categorías'],
            ['tienda', 'Tienda'],
            ['contacto', 'Contacto']
          ].map(([panel, label]) => (
            <button
              key={panel}
              type="button"
              onClick={() => onOpenPanel(panel as HeaderPanel)}
              className={`site-nav-link rounded-md px-3 py-1.5 transition ${
                activePanel === panel ? 'bg-[#A8D2FF] text-[#16345a]' : 'hover:bg-[#dfe8f4]'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => onOpenPanel('cotizar')}
          className="header-cta rounded-full border border-[#1f3554] bg-[#ececec] px-4 py-2 text-sm font-semibold text-[#1f3554] transition hover:bg-[#1f3554] hover:text-white"
        >
          Cotizar ahora
        </button>
      </div>
    </header>
  );
}
