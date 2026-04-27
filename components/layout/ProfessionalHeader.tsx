'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/quienes-somos', label: 'Quienes somos' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/nuestras-obras', label: 'Nuestras obras' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/catalogo', label: 'Catalogo' }
];

export function ProfessionalHeader() {
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      gsap.fromTo(desktopLinks, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.06, delay: 0.05, ease: 'power3.out', clearProps: 'all' });

      if (logo) {
        gsap.fromTo(logo, { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.35, delay: 0.1, ease: 'power3.out', clearProps: 'all' });
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
      className={`fixed left-0 right-0 top-0 z-50 border-b border-white/5 px-4 py-3 transition-colors duration-300 md:px-8 md:py-4 ${
        isScrolled ? 'bg-[#0a1733]/95' : 'bg-[#0a1733]/70 backdrop-blur-md'
      }`}
    >
      <nav ref={navRef} aria-label="Navegación principal" className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4 lg:gap-8">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#f2f4f8] transition hover:text-[#c9a961] md:hidden"
            aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden items-center gap-4 md:flex lg:gap-8">
            {navLinks.map(({ href, label }) => {
              const active = isActiveLink(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`site-nav-link-desktop pb-1 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    active ? 'border-b-2 border-[#c9a961] text-[#c9a961]' : 'text-white/80 hover:text-[#c9a961]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        <Link href="/" aria-label="Ir al inicio" className="site-nav-logo cursor-pointer transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/assets/logos/logosvg_logo%20fondo%20blanco.svg"
            alt="BmR Group Argentina"
            width={120}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex transform flex-col items-center justify-center bg-[#0a1733]/95 backdrop-blur-lg transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const active = isActiveLink(href);

            return (
              <Link
                key={href}
                href={href}
                className={`pb-1 text-2xl font-medium tracking-wide transition-colors duration-300 ${
                  active ? 'border-b-2 border-[#c9a961] text-[#c9a961]' : 'text-white/90 hover:text-[#c9a961]'
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
