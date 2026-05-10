'use client';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { NuestrosServicios } from '@/components/sections/NuestrosServicios';

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[#e6edf8]">
      <ProfessionalHeader />

      <section className="mx-auto w-full max-w-4xl px-4 pt-32 pb-14 md:px-6 md:pt-40">
        <article className="rounded-2xl border border-white/10 bg-[var(--bg-elevated-1)]/60 p-8 text-white/90 backdrop-blur-md md:p-12">
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

        <NuestrosServicios />
      </section>
    </main>
  );
}
