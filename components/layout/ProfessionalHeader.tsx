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
      className="relative z-40 mx-auto mt-4 w-[min(1320px,96%)] overflow-hidden rounded-[28px] border border-[#c4d4e8] bg-[linear-gradient(135deg,rgba(239,243,249,0.96)_0%,rgba(232,238,247,0.95)_62%,rgba(224,233,245,0.95)_100%)] shadow-[0_20px_45px_rgba(15,31,61,0.14)] backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3 pr-3">
          <Link href="/" aria-label="Ir al inicio">
          <img
            ref={logoRef}
            src="/assets/logos/logo_logo%20fondo%20gris.png"
            alt="Logo Bmr Group"
            className="h-12 w-12 rounded-full border border-[#ff6a00]/50 object-contain bg-[#d9d9d9]"
          />
          </Link>
          <p ref={titleRef} className="text-2xl font-bold tracking-[-0.015em] leading-none text-[#1f3554] md:text-3xl">
            Bmr Group Argentina
          </p>
        </div>

        <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm font-semibold text-[#2f3743]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="site-nav-link rounded-lg border border-transparent bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:border-[#aac4e3] hover:bg-white hover:text-[#16345a]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cotizar"
          className="header-cta rounded-full border border-[#1f3554] bg-[#ececec] px-4 py-2 text-sm font-semibold text-[#1f3554] transition hover:bg-[#1f3554] hover:text-white"
        >
          Cotizar ahora
        </Link>
      </div>
    </header>
  );
}
