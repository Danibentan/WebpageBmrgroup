'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

const logoPath = '/assets/logos/logosvg_logo%20fondo%20blanco.svg';

const leftColumnVariants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const rightColumnVariants = {
  hidden: { opacity: 0, x: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.12,
      delayChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const reducedColumnVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } }
};

export default function QuienesSomosPage() {
  const [isLogoBroken, setIsLogoBroken] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const activeLeftVariants = prefersReducedMotion ? reducedColumnVariants : leftColumnVariants;
  const activeRightVariants = prefersReducedMotion ? reducedColumnVariants : rightColumnVariants;
  const activeItemVariants = prefersReducedMotion ? reducedItemVariants : itemVariants;

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

      <footer className="w-full border-t border-white/10 bg-[#0a1733] px-8 py-16 md:px-16 md:py-28">
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
          <motion.div
            variants={activeLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-left"
            aria-hidden="false"
          >
            <motion.div variants={activeItemVariants}>
              <Link
                href="/"
                aria-label="Ir al inicio"
                className="inline-flex cursor-pointer transition-all duration-500 ease-out hover:scale-105 hover:opacity-80"
              >
                <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 1 }}>
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
                </motion.div>
              </Link>
            </motion.div>

            <motion.h2 variants={activeItemVariants} className="mt-6 font-editorial text-3xl text-[#c9a961] md:text-4xl">
              BMR Group Argentina
            </motion.h2>
            <motion.p variants={activeItemVariants} className="mt-3 font-editorial text-xl leading-relaxed text-white/90 md:text-2xl">
              Diseño, ingeniería y experiencia premium.
            </motion.p>
          </motion.div>

          <motion.div
            variants={activeRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-start justify-end gap-6 md:items-end"
            aria-hidden="false"
          >
            <motion.span variants={activeItemVariants} className="text-xs uppercase tracking-[0.25em] text-[#c9a961]">
              CONECTÁ CON NOSOTROS
            </motion.span>

            <div className="flex flex-wrap gap-4">
              <motion.a
                variants={activeItemVariants}
                href="https://instagram.com/bmrgroupar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ir al Instagram de BMR Group Argentina"
                className="flex items-center gap-2 rounded-full border border-[#c9a961] px-6 py-3 text-sm tracking-wide text-[#c9a961] transition-all duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                <Instagram size={16} />
                @bmrgroupar
              </motion.a>

              <motion.a
                variants={activeItemVariants}
                href="https://maps.google.com/?q=BMR+Group+Escobar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir ubicación de BMR Group Escobar en Google Maps"
                className="flex items-center gap-2 rounded-full border border-[#c9a961] px-6 py-3 text-sm tracking-wide text-[#c9a961] transition-all duration-300 hover:bg-[#c9a961] hover:text-[#0a1733]"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                <MapPin size={16} />
                Cómo llegar
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
