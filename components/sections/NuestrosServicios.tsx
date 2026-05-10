'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const services = [
  {
    title: 'SERVICIOS RESIDENCIALES',
    description:
      'Venta y colocación de aberturas premium para viviendas particulares en aluminio, PVC. Asesoramiento personalizado desde el primer plano hasta el ajuste final.'
  },
  {
    title: 'OBRAS CORPORATIVAS',
    description:
      'Soluciones a medida para oficinas y espacios corporativos exigentes, con foco en performance térmica, acústica y terminaciones de alta gama.'
  },
  {
    title: 'DESARROLLOS PARA CONSTRUCTORAS',
    description:
      'Proveeduría y colocación en proyectos inmobiliarios, edificios y desarrollos a gran escala con líneas certificadas y logística coordinada.'
  },
  {
    title: 'MAMPARAS DE VIDRIO PARA BAÑOS Y ESPEJOS',
    description:
      'Diseño y fabricación de mamparas de cristal templado a medida, espejos decorativos y soluciones para espacios húmedos.'
  },
  {
    title: 'CERRAMIENTOS DE CRISTAL Y PUERTAS PIVOTANTES',
    description:
      'Cerramientos de cristal para balcones, terrazas y galerías. Puertas pivotantes de gran formato para ingresos premium.'
  },
  {
    title: 'ASESORAMIENTO TÉCNICO EN OBRA',
    description:
      'Medición en obra, supervisión técnica y acompañamiento profesional en cada etapa del proyecto, con equipos propios especializados.'
  },
  {
    title: 'INSTALACIONES A NIVEL NACIONAL',
    description:
      'Realizamos obras en todo el país . Logística coordinada y equipos de colocación móviles.'
  }
];

type AccordionItemProps = {
  title: string;
  description: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionItem({ title, description, index, isOpen, onToggle }: AccordionItemProps) {
  const panelId = `servicio-panel-${index}`;
  const buttonId = `servicio-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className={`border-b border-[rgba(200,164,74,0.25)] transition-colors duration-200 ease-in-out ${
        isOpen ? 'bg-white/[0.45]' : 'bg-white/25 hover:bg-white/[0.35]'
      }`}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-6 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#C8A44A] md:px-8 md:py-[26px]"
      >
        <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1A2B4A] md:text-sm">{title}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-[22px] font-light leading-none text-[#C8A44A] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.25, delay: 0.1 }
            }}
            style={{ overflow: 'hidden' }}
          >
            <p className="max-w-[620px] px-5 pb-7 pt-1 font-sans text-[15px] leading-[1.75] text-[#4A5568] md:px-8">
              {description}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function NuestrosServicios() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-24 md:mt-28"
      aria-labelledby="nuestros-servicios-title"
    >
      <div className="mb-10 h-px w-20 bg-[#C8A44A]/20" />

      <p className="font-sans text-xs italic uppercase tracking-[0.25em] text-[#C8A44A]">QUÉ HACEMOS</p>
      <h2
        id="nuestros-servicios-title"
        className="mt-3 font-editorial text-4xl font-normal leading-none tracking-[-0.02em] text-[#C8A44A] md:text-[56px]"
      >
        Nuestros servicios
      </h2>
      <div className="mb-7 mt-5 h-0.5 w-12 bg-[#C8A44A]" />
      <p className="mb-12 max-w-3xl font-editorial text-xl leading-relaxed text-[#2A3B5C]">
        Brindamos un servicio integral en aberturas premium, acompañando cada proyecto desde el asesoramiento hasta la instalación final.
      </p>

      <div>
        {services.map((service, index) => (
          <AccordionItem
            key={service.title}
            title={service.title}
            description={service.description}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>
    </motion.section>
  );
}
