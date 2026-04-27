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
    let cleanupHover: Array<() => void> = [];

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      if (!isActive || !navRef.current) return;

      const gsap = gsapModule.gsap;
      const links = Array.from(navRef.current.querySelectorAll<HTMLElement>('.site-nav-link'));

      gsap.fromTo(navRef.current, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' });
      gsap.fromTo(links, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.05, ease: 'power3.out', clearProps: 'all' });

      cleanupHover = links.map((button) => {
        const onEnter = () => {
          gsap.to(button, { y: -3, scale: 1.04, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        };
        const onLeave = () => {
          gsap.to(button, { y: 0, scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        };

        button.addEventListener('mouseenter', onEnter);
        button.addEventListener('mouseleave', onLeave);

        return () => {
          button.removeEventListener('mouseenter', onEnter);
          button.removeEventListener('mouseleave', onLeave);
        };
      });
    };

    void runAnimation();

    return () => {
      isActive = false;
      cleanupHover.forEach((fn) => fn());
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
