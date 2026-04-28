'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin } from 'lucide-react';

const logoPath = '/logo/bmr-logo.svg';

export function SiteFooter() {
  const [isLogoBroken, setIsLogoBroken] = useState(false);

  return (
    <footer
      className="w-full border-t border-[#c9a961]/15 bg-[#0a1733] px-8 py-20 md:px-16 md:py-24 lg:px-24"
      style={{
        backgroundImage:
          'linear-gradient(rgba(201, 169, 97, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 169, 97, 0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}
    >
      <div className="mx-auto grid min-h-[320px] max-w-7xl grid-cols-1 items-stretch gap-12 md:min-h-[360px] md:grid-cols-2">
        <div className="flex h-full flex-col gap-12 text-left md:justify-end">
          <div>
            <p className="editorial-eyebrow-reveal mb-4 text-xs uppercase tracking-[0.3em] text-[#c9a961]/80 md:text-sm">BMR · ESCOBAR · DESDE 2023</p>
            <h2 className="editorial-name-reveal mt-3 mb-4 text-2xl font-editorial font-normal leading-[1.05] tracking-[-0.02em] text-gold-gradient md:text-4xl">
              BmR Group <span className="italic font-light">Argentina</span>
            </h2>
            <p className="editorial-tagline-reveal mt-6 max-w-2xl font-editorial text-base italic font-light tracking-[0.01em] text-white/75 md:text-lg">
              Diseño que trasciende. <span className="mx-3 text-[#c9a961]">·</span>
              Ingeniería que perdura.
            </p>
            <div className="editorial-line-reveal mt-8 h-px w-16 bg-[#c9a961]/50" />
          </div>

          <div>
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="inline-flex cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:opacity-80"
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
                  width={220}
                  height={80}
                  className="h-16 w-auto md:h-20"
                  onError={() => {
                    console.warn(`[BMR] Logo no encontrado en ${logoPath}.`);
                    setIsLogoBroken(true);
                  }}
                />
              )}
            </Link>
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
            <p className="mt-1 text-sm text-white/60">Lunes a Viernes · 9 a 18hs</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
