'use client';

import { useState } from 'react';
import Image from 'next/image';
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

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 text-center md:px-6 md:pb-20">
        {isLogoBroken ? (
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a961]/70 bg-[#07142f] text-xs font-semibold text-[#c9a961]"
            aria-hidden="true"
          >
            BMR
          </div>
        ) : (
          <Image
            src={logoPath}
            alt="BMR Group Argentina"
            width={88}
            height={88}
            className="mx-auto mb-6 h-20 w-auto"
            onError={() => {
              console.warn(`[BMR] Logo no encontrado en ${logoPath}. Verificá que exista en public/assets/logos.`);
              setIsLogoBroken(true);
            }}
          />
        )}

        <h2 className="font-editorial text-3xl font-semibold tracking-[-0.015em] text-[#c9a961] md:text-4xl">BMR Group Argentina</h2>
        <p className="mt-4 font-editorial text-2xl leading-tight text-[#f2f4f8] md:text-3xl">Diseño, ingeniería y experiencia premium.</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://instagram.com/bmrgroupar"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#c9a961] px-6 py-3 font-semibold text-[#c9a961] transition-colors duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
          >
            @bmrgroupar
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Colectora+Este+Ramal+Escobar+1871,+Bel%C3%A9n+de+Escobar+1625"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#c9a961] px-6 py-3 font-semibold text-[#c9a961] transition-colors duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
          >
            Cómo llegar
          </a>
        </div>
      </section>
    </main>
  );
}
