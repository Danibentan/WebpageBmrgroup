'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/quienes-somos', label: 'Quienes somos' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/nuestras-obras', label: 'Nuestras obras' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/catalogo', label: 'Catalogo' }
];

export function ProfessionalHeader() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isActive = true;

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      if (!isActive) return;

      const gsap = gsapModule.gsap;
      gsap.from(navRef.current, { y: -14, opacity: 0, duration: 0.55, ease: 'power3.out' });
      gsap.from('.site-nav-link', { y: 8, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out', delay: 0.05 });

      gsap.utils.toArray<HTMLElement>('.site-nav-link').forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { y: -3, scale: 1.04, duration: 0.2, ease: 'power2.out' });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out' });
        });
      });
    };

    void runAnimation();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <header className="relative z-50 mx-auto mt-5 w-full px-4 md:px-8">
      <nav ref={navRef} className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-[#f2f4f8] md:justify-end">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="site-nav-link rounded-full border border-[#4f658f] bg-[#0b1f43]/75 px-3 py-1.5 tracking-[0.05em] transition hover:border-[#c9ab66] hover:bg-[#122d5d] hover:text-[#f2f4f8]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
