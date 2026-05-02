'use client';

import Link from 'next/link';
import { useState } from 'react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

const caseStudies = [
  {
    id: '01',
    title: 'Obras Residenciales',
    subtitle: 'Flujo de luz + minimal frame system',
    text: 'Sistema corredizo de gran formato con transición interior-exterior continua. Ingeniería térmica y visual limpia.'
  },
  {
    id: '02',
    title: 'Obras corporativas',
    subtitle: 'Performance corporativa + identidad',
    text: 'Piel vidriada y aberturas técnicas para operación intensiva. Resolución acústica, control solar y presencia de marca.'
  }
];

export function HomePageClient() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="-mt-[var(--nav-height)] min-h-screen bg-transparent text-[var(--bmr-text)]">
      <ProfessionalHeader />
      <ImmersiveHero />


      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:pt-32">
        <p className="mixd-inspired-block text-xs uppercase tracking-[0.36em] text-[var(--bmr-terracota)]">BMR GROUP ARGENTINA · CASE STUDIES</p>
        <h2 className="mixd-inspired-block mt-5 max-w-[12ch] text-5xl font-semibold leading-[0.98] text-[var(--bmr-slate)] md:text-7xl">
          Aberturas premiun para tu proyecto.
        </h2>
        <p className="mixd-inspired-block mt-8 max-w-[52ch] text-lg leading-relaxed text-[var(--bmr-text-muted)]">
          Un enfoque editorial y técnico: menos ruido visual, más precisión en materiales, proporciones y performance para obras contemporáneas.
        </p>
        <span className="mixd-divider mt-12 block h-px w-full bg-[#87a7cc]/40" />
      </section>

      <section id="nuestras-obras" className="mx-auto max-w-7xl px-6 pb-8">
        <div className="space-y-10">
          {caseStudies.map((item) => (
            <Link
              key={item.id}
              href="/nuestras-obras"
              className="case-study-row block opacity-100 rounded-2xl border border-[var(--bmr-border)] bg-[linear-gradient(135deg,var(--bg-elevated-2)_0%,var(--bg-elevated-1)_100%)] p-6 transition hover:border-[var(--bmr-gold)]/60 md:p-10"
            >
              <article>
                <div className="grid gap-8 md:grid-cols-[120px,1fr]">
                  <span className="text-7xl font-semibold leading-none text-[var(--bmr-slate)]/40 md:text-8xl">{item.id}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-[var(--bmr-terracota)]">{item.subtitle}</p>
                    <h3 className="mt-3 max-w-[16ch] text-4xl font-semibold leading-[1.02] text-[var(--bmr-slate)] md:text-5xl">{item.title}</h3>
                    <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--bmr-text-muted)]">{item.text}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-12 max-w-7xl px-6 pt-8 md:pt-14">
        <div className="mixd-inspired-block rounded-2xl border border-[var(--bmr-border)] bg-[var(--bmr-cream-2)] p-8 md:flex md:items-end md:justify-between md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--bmr-terracota)]">Canal exclusivo corporativos,Arquitectos,Constructoras.</p>
            <h3 className="mt-4 max-w-[14ch] text-4xl font-semibold leading-[1.02] text-[var(--bmr-slate)] md:text-6xl">Iniciemos tu próximo caso de referencia.</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="mt-6 inline-flex rounded-full border border-[#c6d4e6] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--bmr-slate)] transition hover:bg-[var(--bmr-slate)] hover:text-[var(--bmr-cream)] md:mt-0"
          >
            Contactanos
          </button>
        </div>
      </section>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#061325]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-[#7d9cc1]/40 bg-[#0f2c4c] p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-[var(--bmr-slate)] md:text-3xl">Contacto corporativo</h4>
              <button type="button" onClick={() => setIsContactModalOpen(false)} className="rounded-md px-2 py-1 text-[var(--bmr-slate)]/70 hover:bg-white/10 hover:text-[var(--bmr-slate)]">
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <label className="block text-sm text-[var(--bmr-slate)]/85">
                Nombre De empresa
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-white/25 bg-transparent px-3 py-2 text-[var(--bmr-slate)] placeholder:text-[var(--bmr-slate)]/45 focus:border-[#c9a961] focus:outline-none"
                  placeholder="Ingresá el nombre de la empresa"
                />
              </label>

              <label className="block text-sm text-[var(--bmr-slate)]/85">
                SI son constructoras,arquitectos, corporativos,otros
                <select className="mt-2 w-full rounded-lg border border-white/25 bg-[#0f2c4c] px-3 py-2 text-[var(--bmr-slate)] focus:border-[#c9a961] focus:outline-none">
                  <option>Constructoras</option>
                  <option>Arquitectos</option>
                  <option>Corporativos</option>
                  <option>Otros</option>
                </select>
              </label>

              <label className="block text-sm text-[var(--bmr-slate)]/85">
                Mail
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-white/25 bg-transparent px-3 py-2 text-[var(--bmr-slate)] placeholder:text-[var(--bmr-slate)]/45 focus:border-[#c9a961] focus:outline-none"
                  placeholder="nombre@empresa.com"
                />
              </label>

              <div className="pt-2">
                <button type="button" onClick={() => setIsContactModalOpen(false)} className="inline-flex rounded-full bg-[var(--bmr-gold)] px-6 py-2 text-sm font-semibold text-[var(--bmr-slate)] transition hover:bg-[#d4b876]">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
