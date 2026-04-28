'use client';

import { useEffect } from 'react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

const caseStudies = [
  {
    id: '01',
    title: 'Casa Patio Norte',
    subtitle: 'Flujo de luz + minimal frame system',
    text: 'Sistema corredizo de gran formato con transición interior-exterior continua. Ingeniería térmica y visual limpia.'
  },
  {
    id: '02',
    title: 'Oficinas Costanera',
    subtitle: 'Performance corporativa + identidad',
    text: 'Piel vidriada y aberturas técnicas para operación intensiva. Resolución acústica, control solar y presencia de marca.'
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

      gsap.from('.case-study-row', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.24,
        ease: 'power3.out',
        delay: 0.45
      });
    };
    void runAnimation();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <ImmersiveHero />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:pt-32">
        <p className="mixd-inspired-block text-xs uppercase tracking-[0.36em] text-[#c1d6ef]">BMR GROUP ARGENTINA · CASE STUDIES</p>
        <h2 className="mixd-inspired-block mt-5 max-w-[12ch] text-5xl font-semibold leading-[0.98] text-white md:text-7xl">
          Aperturas premium para arquitectura de alto impacto.
        </h2>
        <p className="mixd-inspired-block mt-8 max-w-[52ch] text-lg leading-relaxed text-[#c7d8ee]">
          Un enfoque editorial y técnico: menos ruido visual, más precisión en materiales, proporciones y performance para obras contemporáneas.
        </p>
        <span className="mixd-divider mt-12 block h-px w-full bg-[#87a7cc]/40" />
      </section>

      <section id="nuestras-obras" className="mx-auto max-w-7xl px-6 pb-8">
        <div className="space-y-10">
          {caseStudies.map((item) => (
            <article key={item.id} className="case-study-row rounded-2xl border border-[#6d8eb6]/55 bg-[linear-gradient(135deg,rgba(8,28,52,0.88)_0%,rgba(15,48,84,0.86)_100%)] p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-[120px,1fr]">
                <span className="text-7xl font-semibold leading-none text-[#7da0ca] md:text-8xl">{item.id}</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[#bfd3ed]">{item.subtitle}</p>
                  <h3 className="mt-3 max-w-[16ch] text-4xl font-semibold leading-[1.02] text-white md:text-5xl">{item.title}</h3>
                  <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[#d2e0f2]">{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-12 max-w-7xl px-6 pt-8 md:pt-14">
        <div className="mixd-inspired-block rounded-2xl border border-[#6c8db4]/60 bg-[#0b2848]/55 p-8 md:flex md:items-end md:justify-between md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#c1d6ef]">Project readiness</p>
            <h3 className="mt-4 max-w-[14ch] text-4xl font-semibold leading-[1.02] text-white md:text-6xl">Iniciemos tu próximo caso de referencia.</h3>
          </div>
          <a href="/contacto" className="mt-6 inline-flex rounded-full border border-[#c6d4e6] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[#0f2745] md:mt-0">
            Iniciar proyecto
          </a>
        </div>
      </section>

    </main>
  );
}
