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
      className="relative z-40 mx-auto mt-5 w-[min(1320px,96%)] overflow-hidden rounded-[30px] border border-[#4d6f97] bg-[linear-gradient(120deg,rgba(9,33,60,0.92)_0%,rgba(18,59,109,0.88)_48%,rgba(27,85,151,0.86)_100%)] shadow-[0_24px_54px_rgba(2,10,22,0.45)] backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.28)_0%,rgba(255,106,0,0)_72%)]" />
      <div className="relative flex flex-wrap items-center gap-4 px-4 py-3 md:px-7">
        <div className="flex items-center gap-3 pr-3">
          <Link href="/" aria-label="Ir al inicio">
            <img
              ref={logoRef}
              src="/assets/logos/bmr-icon-blue.svg"
              alt="Logo Bmr Group"
              className="h-16 w-16 rounded-full border border-[#ff6a00]/80 object-contain bg-[#123b6d] shadow-[0_0_0_4px_rgba(12,39,72,0.45)] md:h-[72px] md:w-[72px]"
            />
          </Link>
          <p ref={titleRef} className="text-2xl font-bold tracking-[-0.015em] leading-none text-[#ecf3ff] md:text-4xl">
            Bmr Group Argentina
          </p>
        </div>

        <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm font-semibold text-[#dbe9ff]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="site-nav-link rounded-lg border border-[#5f85b3] bg-[#163f6f]/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:border-[#9ab8df] hover:bg-[#1f4f89] hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cotizar"
          className="header-cta rounded-full border border-[#ff8937] bg-[#ff6a00] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#ff7c1f] hover:text-white"
        >
          Cotizar ahora
        </Link>
      </div>
    </header>
  );
}
