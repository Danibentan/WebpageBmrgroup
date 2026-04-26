'use client';

import { useEffect, useRef } from 'react';

export function ProfessionalHeader() {
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
            onError={(event) => {
              event.currentTarget.src = '/assets/logos/logo-bmr-fallback.svg';
            }}
            className="h-12 w-12 rounded-full border border-[#ff6a00]/50 object-cover"
          />
          <p ref={titleRef} className="text-2xl font-semibold leading-none text-[#1f3554] md:text-3xl">
            Bmr Group Argentina
          </p>
        </div>

        <nav className="hidden gap-6 text-sm font-semibold text-[#2f3743] lg:flex">
          <a href="#tienda" className="site-nav-link">Tienda</a>
          <a href="#quienes" className="site-nav-link">Quiénes somos</a>
          <a href="#categorias" className="site-nav-link">Categorías</a>
          <a href="#showroom" className="site-nav-link">Showroom</a>
          <a href="/marcas.html" className="site-nav-link">Marcas</a>
          <a href="#contacto" className="site-nav-link">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="header-cta rounded-full border border-[#1f3554] bg-[#ececec] px-4 py-2 text-sm font-semibold text-[#1f3554] transition hover:bg-[#1f3554] hover:text-white"
        >
          Cotizar ahora
        </a>
      </div>
    </header>
  );
}
