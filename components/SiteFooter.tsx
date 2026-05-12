'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin } from 'lucide-react';
import { InfiniteMarquee } from '@/components/marquee/InfiniteMarquee';

const logoPath = '/logo/bmr-logo.svg';

export function SiteFooter() {
  const [isLogoBroken, setIsLogoBroken] = useState(false);

  return (
    <footer className="w-full">
      <div className="bg-[var(--bg-primary)] px-8 py-20 md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto grid min-h-[280px] max-w-7xl grid-cols-1 items-stretch gap-12 md:min-h-[320px] md:grid-cols-2">
        <div className="flex h-full flex-col justify-end items-start text-left">
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="inline-block transition-opacity duration-300 hover:opacity-80"
          >
            {isLogoBroken ? (
              <div
                className="flex h-16 w-44 items-center justify-center text-sm font-semibold tracking-wide text-[#c9a961] md:h-20"
                aria-hidden="true"
              >
                BMR GROUP
              </div>
            ) : (
              <Image
                src={logoPath}
                alt="BMR Group Argentina"
                width={140}
                height={56}
                priority
                className="h-12 w-auto md:h-14"
                onError={() => {
                  console.warn(`[BMR] Logo no encontrado en ${logoPath}.`);
                  setIsLogoBroken(true);
                }}
              />
            )}
          </Link>
          <div className="mt-[22px] text-center font-sans font-normal uppercase leading-relaxed text-[var(--bmr-letter-blue)]">
            <p className="text-[11px] tracking-[0.22em]">BMR GROUP ARGENTINA</p>
            <p className="mt-1 text-[10px] tracking-[0.18em] opacity-75">UNA EMPRESA DE PAN AMERICAN GLASS S.A.</p>
          </div>
        </div>

        <div className="flex h-full flex-col gap-12 items-start text-left md:items-end md:justify-end md:text-right">
          <div className="flex flex-col items-start gap-6 md:items-end">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a961]">CONECTÁ CON NOSOTROS</span>

            <div className="mt-1 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/bmrgroupar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir al Instagram de BMR Group Argentina"
                className="flex items-center gap-2 rounded-full border border-[#c9a961] px-6 py-3 text-sm tracking-wide text-[#c9a961] transition-all duration-300 hover:scale-[1.03] hover:bg-[#c9a961] hover:text-[#0a1733] active:scale-[0.97]"
              >
                <Instagram size={16} />
                @bmrgroupar
              </a>

              <a
                href="https://maps.google.com/?q=BMR+Group+Escobar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir ubicación de BMR Group Escobar en Google Maps"
                className="flex items-center gap-2 rounded-full border border-[#c9a961] px-6 py-3 text-sm tracking-wide text-[#c9a961] transition-all duration-300 hover:scale-[1.03] hover:bg-[#c9a961] hover:text-[#0a1733] active:scale-[0.97]"
              >
                <MapPin size={16} />
                Cómo llegar
              </a>
            </div>
          </div>

          <div className="text-left text-sm text-white/70 md:text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c9a961]/80">VISITANOS</p>
            <p className="mt-3 font-editorial text-base text-white/80">Escobar, Buenos Aires</p>
            <p className="mt-1 text-sm text-white/60">Lunes a Viernes · 08 a 17 hs</p>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
