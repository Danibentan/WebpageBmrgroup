'use client';

import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { InfiniteMarquee } from '@/components/marquee/InfiniteMarquee';
import { gsap } from '@/lib/gsap';

const caseStudies = [
  {
    id: '01',
    title: 'Obras Residenciales',
    subtitle: 'Flujo de luz + minimal frame system',
    text: 'Sistema corredizo de gran formato con transición interior-exterior continua. Ingeniería térmica y visual limpia.'
  }
];

export function HomePageClient() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSendingCorporate, setIsSendingCorporate] = useState(false);
  const [corporateSuccess, setCorporateSuccess] = useState(false);
  const [corporateError, setCorporateError] = useState('');
  const [corporateForm, setCorporateForm] = useState({
    empresa: '',
    segmento: 'Constructoras',
    email: ''
  });

  useGSAP(
    () => {
      if (!rootRef.current) return;

      gsap.fromTo(
        '.case-study-row, .reference-row',
        { y: 22, autoAlpha: 0, scale: 0.985 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'transform,opacity,visibility'
        }
      );
    },
    { scope: rootRef }
  );

  const handleCorporateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSendingCorporate(true);
    setCorporateError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'corporativo', ...corporateForm })
      });

      if (!response.ok) {
        throw new Error('Error enviando formulario corporativo');
      }

      setCorporateSuccess(true);
      setCorporateForm({ empresa: '', segmento: 'Constructoras', email: '' });
    } catch (error) {
      console.error('[CORPORATE] Submit error', error);
      setCorporateError('No pudimos enviar tu consulta. Intentá nuevamente.');
    } finally {
      setIsSendingCorporate(false);
    }
  };

  return (
    <main ref={rootRef} className="-mt-[var(--nav-height)] min-h-screen bg-transparent text-[var(--bmr-text)]">
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
          {caseStudies.map((item) => {
            const href = '/nuestras-obras';
            const ariaLabel = `Ver sección ${item.title}`;

            return (
            <Link
              key={item.id}
              href={href}
              aria-label={ariaLabel}
              className="case-study-row block cursor-pointer opacity-100 rounded-2xl border border-[var(--bmr-border)] bg-[linear-gradient(135deg,var(--bg-elevated-2)_0%,var(--bg-elevated-1)_100%)] p-6 transition duration-300 hover:-translate-y-[2px] hover:border-[var(--bmr-gold)]/60 hover:shadow-[0_14px_30px_rgba(42,36,24,0.12)] md:p-10"
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
          );
          })}
        </div>
      </section>

      <section className="mx-auto mb-12 max-w-7xl px-6 pt-8 md:pt-14">
        <div className="reference-row rounded-2xl border border-[var(--bmr-border)] bg-[var(--bmr-cream-2)] p-8 md:flex md:items-end md:justify-between md:p-12">
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
          <div className="w-full max-w-xl rounded-2xl border border-[var(--bmr-border)] bg-[var(--bg-primary)] p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-2xl font-semibold text-[#1a1a1a] md:text-3xl">Contacto corporativo</h4>
              <button type="button" onClick={() => setIsContactModalOpen(false)} className="rounded-md px-2 py-1 text-[#1a1a1a]/70 hover:bg-black/5 hover:text-[#1a1a1a]">
                ✕
              </button>
            </div>

            <form onSubmit={handleCorporateSubmit} className="space-y-4">
              <label className="block text-sm text-[#1a1a1a]/85">
                Nombre De empresa
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] placeholder:text-[#6b6b6b] placeholder:opacity-100 focus:border-[#c9a961] focus:outline-none"
                  placeholder="Ingresá el nombre de la empresa"
                  required
                  value={corporateForm.empresa}
                  onChange={(event) => setCorporateForm((prev) => ({ ...prev, empresa: event.target.value }))}
                />
              </label>

              <label className="block text-sm text-[#1a1a1a]/85">
                SI son constructoras,arquitectos, corporativos,otros
                <select
                  className="mt-2 w-full rounded-lg border border-black/20 bg-[var(--bg-primary)] px-3 py-2 text-[#1a1a1a] focus:border-[#c9a961] focus:outline-none"
                  value={corporateForm.segmento}
                  onChange={(event) => setCorporateForm((prev) => ({ ...prev, segmento: event.target.value }))}
                >
                  <option>Constructoras</option>
                  <option>Arquitectos</option>
                  <option>Corporativos</option>
                  <option>Otros</option>
                </select>
              </label>

              <label className="block text-sm text-[#1a1a1a]/85">
                Mail
                <input
                  type="email"
                  className="mt-2 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] placeholder:text-[#6b6b6b] placeholder:opacity-100 focus:border-[#c9a961] focus:outline-none"
                  placeholder="nombre@empresa.com"
                  required
                  value={corporateForm.email}
                  onChange={(event) => setCorporateForm((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>

              <div className="pt-2">
                <button type="submit" disabled={isSendingCorporate} className="inline-flex rounded-full bg-[var(--bmr-gold)] px-6 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#d4b876] disabled:cursor-not-allowed disabled:opacity-60">
                  {isSendingCorporate ? 'Enviando...' : 'Enviar'}
                </button>
                {corporateSuccess ? <p className="mt-2 text-sm text-emerald-700">¡Consulta enviada! Te respondemos pronto.</p> : null}
                {corporateError ? <p className="mt-2 text-sm text-red-600">{corporateError}</p> : null}
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
