'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { Logo } from '@/components/Logo';

const navLinks = [
  { href: '/quienes-somos', label: 'Quiénes somos' },
  { href: '/nuestras-obras', label: 'Nuestras obras' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/contacto', label: 'Contacto' }
];

export function ProfessionalHeader() {
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let isActive = true;

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      if (!isActive || !navRef.current) return;

      const gsap = gsapModule.gsap;
      const desktopLinks = Array.from(navRef.current.querySelectorAll<HTMLElement>('.site-nav-link-desktop'));
      const logo = navRef.current.querySelector<HTMLElement>('.site-nav-logo');

      gsap.fromTo(navRef.current, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' });
      gsap.fromTo(desktopLinks, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.06, delay: 0.05, ease: 'power3.out', clearProps: 'all' });

      if (logo) {
        gsap.fromTo(logo, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.35, delay: 0.1, ease: 'power3.out', clearProps: 'all' });
      }
    };

    void runAnimation();

    return () => {
      isActive = false;
    };
  }, []);

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] w-full border-b px-4 md:px-10 ${
        isHome
          ? 'border-white/10 bg-gradient-to-b from-[#102d49]/80 via-[#163857]/45 to-transparent backdrop-blur-[6px]'
          : 'border-[#D4AF6F]/10 bg-[var(--bg-primary)]/95 backdrop-blur-md'
      }`}
    >
      <nav ref={navRef} aria-label="Navegación principal" className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
        <div className="site-nav-logo">
          <span className="md:hidden">
            <Logo compact />
          </span>
          <span className="hidden md:inline-flex">
            <Logo compact={false} />
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = isActiveLink(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`site-nav-link-desktop pb-[3px] text-[13px] font-normal transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                  active ? 'border-b border-[#D4AF6F] text-[#D4AF6F]' : 'text-white/85 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}

        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#D4AF6F] transition hover:text-[#E0BC7F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] md:hidden"
          aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} strokeWidth={1.8} />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[60] flex transform flex-col bg-[var(--bg-primary)] px-6 py-8 transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar menú"
            className="rounded-md p-2 text-[#D4AF6F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = isActiveLink(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`pb-1 font-editorial text-3xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                  active ? 'border-b border-[#D4AF6F] text-[#D4AF6F]' : 'text-white/90 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

      </div>
    </header>
  );
}
