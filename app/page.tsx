'use client';

import { useEffect } from 'react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { SiteFooter } from '@/components/layout/SiteFooter';

const experienceBlocks = [
  {
    title: 'Hospitality residencial',
    text: 'Diseñamos experiencias de apertura que combinan luz natural, confort térmico y lenguaje arquitectónico contemporáneo.'
  },
  {
    title: 'Espacios corporativos',
    text: 'Sistemas técnicos de alto rendimiento para oficinas y proyectos comerciales con foco en imagen de marca y eficiencia.'
  },
  {
    title: 'Ejecución integral',
    text: 'Asesoría, ingeniería, fabricación e instalación con acompañamiento de punta a punta en cada etapa del proyecto.'
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
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.15
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

      <section className="mx-auto mt-10 max-w-7xl px-6 pb-8">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#c1d6ef]">New world of premium openings</p>
        <div className="grid gap-4 md:grid-cols-3">
          {experienceBlocks.map((block) => (
            <article
              key={block.title}
              className="mixd-inspired-block rounded-2xl border border-[#5f7fa8]/60 bg-[linear-gradient(150deg,rgba(11,40,72,0.9)_0%,rgba(16,55,95,0.82)_100%)] p-6 shadow-[0_18px_36px_rgba(2,10,22,0.3)]"
            >
              <h2 className="text-2xl font-semibold text-white">{block.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-[#c8d9ee]">{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-6 max-w-7xl px-6">
        <div className="mixd-inspired-block rounded-2xl border border-[#6c8db4]/60 bg-[#0b2848]/70 p-7 md:flex md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#c1d6ef]">Project readiness</p>
            <h3 className="mt-3 max-w-[18ch] text-3xl font-semibold leading-tight text-white md:text-4xl">Tu proyecto merece una experiencia de diseño superior.</h3>
          </div>
          <a href="/contacto" className="mt-5 inline-flex rounded-full border border-[#c6d4e6] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0f2745] md:mt-0">
            Iniciar proyecto
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
