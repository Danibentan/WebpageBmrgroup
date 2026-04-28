'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin } from 'lucide-react';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

const logoPath = '/assets/logos/logosvg_logo%20fondo%20blanco.svg';

export default function QuienesSomosPage() {
  const [isLogoBroken, setIsLogoBroken] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a1733] text-[#e6edf8]">
      <ProfessionalHeader />

      <section className="mx-auto w-full max-w-4xl px-4 pt-32 pb-14 md:px-6 md:pt-40">
        <article className="rounded-2xl border border-white/10 bg-[#0a1733]/60 p-8 text-white/90 backdrop-blur-md md:p-12">
          <p className="font-editorial text-xs uppercase tracking-[0.25em] text-[#c9a961] md:text-sm">NUESTRA HISTORIA</p>
          <h1 className="mt-3 font-editorial text-4xl font-semibold tracking-[-0.015em] text-[#c9a961] md:text-5xl">Quiénes somos</h1>

          <div className="mt-8 space-y-6 font-sans text-base leading-relaxed text-white/90 md:text-lg">
            <p>
              BMR Group Argentina es una empresa especializada en la venta y colocación de aberturas premium, con base en la ciudad de
              Escobar, provincia de Buenos Aires. Desde nuestros inicios trabajamos con una premisa clara: ofrecer soluciones que
              combinen diseño, performance técnica y durabilidad, acompañando a arquitectos, constructores y clientes finales en cada
              etapa de su proyecto.
            </p>
            <p>
              Nos enfocamos en aberturas de alta gama —en aluminio, PVC y madera— seleccionadas por su calidad estructural, eficiencia
              térmica y acústica, y terminaciones que elevan la estética de cualquier obra. Trabajamos con líneas certificadas y
              proveedores de primera, garantizando productos pensados para residencias particulares, desarrollos inmobiliarios y espacios
              corporativos exigentes.
            </p>
            <p>
              Nuestro diferencial está en el servicio integral: asesoramiento técnico personalizado, medición en obra, logística
              coordinada y colocación profesional realizada por equipos propios. Cuidamos cada detalle —desde el primer plano hasta el
              ajuste final— porque entendemos que una abertura premium no es solo un producto, es parte de la experiencia de habitar un
              espacio.
            </p>
            <p>
              Desde Escobar trabajamos para toda la zona norte de Buenos Aires, CABA y proyectos a nivel nacional, construyendo
              relaciones a largo plazo con clientes que buscan calidad sin compromisos.
            </p>
          </div>
        </article>
      </section>

      <footer className="w-full border-t border-white/10 bg-[#0a1733] px-8 py-20 md:px-16 md:py-28 lg:px-24">
        <div className="grid min-h-[400px] grid-cols-1 gap-12 items-stretch md:min-h-[480px] md:grid-cols-2">
          <div className="flex h-full flex-col justify-between text-left opacity-100">
            <div aria-hidden="true" className="hidden md:block" />

            <div>
              <p className="editorial-eyebrow-reveal mb-4 text-xs uppercase tracking-[0.3em] text-[#c9a961]/80 md:text-sm">BMR · ESCOBAR · DESDE 2023</p>
              <h2 className="editorial-name-reveal mt-3 mb-4 text-3xl font-editorial font-normal leading-[1.05] tracking-[-0.02em] text-gold-gradient md:text-5xl">
                BmR Group <span className="italic font-light">Argentina</span>
              </h2>
              <p className="editorial-tagline-reveal mt-6 max-w-2xl font-editorial text-base italic font-light tracking-[0.01em] text-white/75 md:text-lg">
                Diseño que trasciende. <span className="mx-3 text-[#c9a961]">·</span>
                Ingeniería que perdura.
              </p>
              <div className="editorial-line-reveal mt-8 h-px w-16 bg-[#c9a961]/50" />

              <div className="mt-10">
                <Link
                  href="/"
                  aria-label="Ir al inicio"
                  className="inline-flex cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:opacity-80"
                >
                  {isLogoBroken ? (
                    <div
                      className="flex h-16 w-44 items-center justify-center rounded border border-[#c9a961]/70 bg-[#07142f] text-sm font-semibold tracking-wide text-[#c9a961] md:h-20"
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
                        console.warn(`[BMR] Logo no encontrado en ${logoPath}. Verificá que exista en public/assets/logos.`);
                        setIsLogoBroken(true);
                      }}
                    />
                  )}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col justify-between items-start md:items-end">
            <div aria-hidden="true" className="hidden md:block" />

            <div className="flex flex-col items-start justify-end gap-6 md:items-end">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c9a961]">CONECTÁ CON NOSOTROS</span>

              <div className="flex flex-wrap gap-4">
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

              <div className="pt-4 text-left text-sm text-white/70 md:text-right">
                <p className="text-xs uppercase tracking-[0.25em] text-[#c9a961]/80">VISITANOS</p>
                <p className="mt-3 font-editorial text-base text-white/80">Escobar, Buenos Aires</p>
                <p className="mt-1 text-sm text-white/60">Lunes a Viernes · 9 a 18hs</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
