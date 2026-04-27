'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/categorias', label: 'Categorías' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/contacto', label: 'Contacto' }
];

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
        boxShadow: '0 10px 24px rgba(201,171,102,0.28)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to('.site-nav-link', {
        backgroundColor: 'rgba(214, 198, 151, 0.18)',
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.08,
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
      className="relative z-40 mx-auto mt-5 w-[min(1320px,96%)] overflow-hidden rounded-[30px] border border-[#40567f] bg-[linear-gradient(120deg,rgba(5,14,35,0.92)_0%,rgba(8,23,52,0.9)_52%,rgba(18,40,79,0.88)_100%)] shadow-[0_24px_54px_rgba(2,10,22,0.45)] backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-1/3 bg-[radial-gradient(circle_at_center,rgba(201,171,102,0.24)_0%,rgba(201,171,102,0)_72%)]" />
      <div className="relative flex flex-wrap items-center gap-4 px-4 py-3 md:px-7">
        <div className="flex items-center gap-3 pr-3">
          <Link href="/" aria-label="Ir al inicio">
            <img
              ref={logoRef}
              src="/assets/logos/bmr-icon-blue.svg"
              alt="Logo Bmr Group"
              className="h-16 w-16 rounded-full border border-[#c9ab66]/80 object-contain bg-[#07142f] shadow-[0_0_0_4px_rgba(7,20,47,0.55)] md:h-[72px] md:w-[72px]"
            />
          </Link>
          <p ref={titleRef} className="font-editorial text-3xl font-semibold tracking-[-0.015em] leading-none text-[#f2f4f8] md:text-5xl">
            Bmr Group Argentina
          </p>
        </div>

        <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm font-semibold text-[#f2f4f8]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="site-nav-link rounded-lg border border-[#4f658f] bg-[#0b1f43]/75 px-3 py-1.5 tracking-[0.08em] transition hover:-translate-y-0.5 hover:border-[#c9ab66] hover:bg-[#122d5d] hover:text-[#f2f4f8]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cotizar"
          className="header-cta rounded-full border border-[#c9ab66] bg-[#c9ab66]/95 px-5 py-2 text-sm font-semibold tracking-[0.08em] text-[#08152f] transition hover:bg-[#dcc084] hover:text-[#08152f]"
        >
          Cotizar ahora
        </Link>
      </div>
    </header>
  );
}
