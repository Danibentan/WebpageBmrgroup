'use client';

import { useEffect } from 'react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { SiteFooter } from '@/components/layout/SiteFooter';

const experienceBlocks = [
  {
    title: '01 · Estrategia espacial',
    text: 'Diseñamos aperturas como parte de una narrativa arquitectónica integral: luz, escala y fluidez en equilibrio.'
  },
  {
    title: '02 · Precisión técnica',
    text: 'Cada sistema se define con criterio de ingeniería, performance térmica y durabilidad real para obras exigentes.'
  },
  {
    title: '03 · Ejecución premium',
    text: 'Gestionamos asesoría, fabricación e instalación con un estándar profesional que cuida detalle, tiempos y acabados.'
  }
];

export default function HomePage() {
  useEffect(() => {
    let isActive = true;
    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      if (!isActive) return;
      const gsap = gsapModule.gsap;
      gsap.from('.mixd-inspired-block', {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.mixd-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.35
      });
    };
    void runAnimation();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ImmersiveHero />

      <section className="mx-auto max-w-7xl px-6 pb-6 pt-20 md:pt-28">
        <p className="mixd-inspired-block text-xs uppercase tracking-[0.36em] text-[#c1d6ef]">BMR GROUP ARGENTINA</p>
        <h2 className="mixd-inspired-block mt-5 max-w-[14ch] text-4xl font-semibold leading-[1.04] text-white md:text-6xl">
          Minimalismo técnico para arquitectura contemporánea.
        </h2>
        <p className="mixd-inspired-block mt-8 max-w-[52ch] text-lg leading-relaxed text-[#c7d8ee]">
          Desarrollamos sistemas de aberturas premium para proyectos residenciales y corporativos con una dirección estética clara y una ejecución
          de alta precisión.
        </p>
        <span className="mixd-divider mt-12 block h-px w-full bg-[#87a7cc]/40" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-8 md:pt-12">
        <div className="grid gap-10 md:grid-cols-3">
          {experienceBlocks.map((block) => (
            <article
              key={block.title}
              className="mixd-inspired-block border-t border-[#8ca9cc]/50 pt-6"
            >
              <h3 className="text-lg font-semibold uppercase tracking-[0.08em] text-[#eaf2ff]">{block.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-[#c8d9ee]">{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-10 max-w-7xl px-6 pt-12 md:pt-20">
        <div className="mixd-inspired-block rounded-2xl border border-[#6c8db4]/60 bg-[#0b2848]/55 p-8 md:flex md:items-end md:justify-between md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#c1d6ef]">Project readiness</p>
            <h3 className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.08] text-white md:text-5xl">Tu proyecto merece una experiencia superior.</h3>
          </div>
          <a href="/contacto" className="mt-6 inline-flex rounded-full border border-[#c6d4e6] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[#0f2745] md:mt-0">
            Iniciar proyecto
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
