'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { catalogPdfChecklist, featuredCatalog, lineCatalogs } from '@/lib/catalogos';

const MAIL_BASE = 'mailto:info@bmrgroup.com.ar';

function buildCatalogMailto(subject: string) {
  return `${MAIL_BASE}?subject=${encodeURIComponent(subject)}`;
}

async function openPdfWithFallback(pdfPath: string, fallbackSubject: string) {
  const fallbackHref = buildCatalogMailto(fallbackSubject);

  try {
    const response = await fetch(pdfPath, { method: 'HEAD' });

    if (response.ok) {
      window.open(pdfPath, '_blank', 'noopener,noreferrer');
      return;
    }
  } catch {
    // Si falla la verificación de archivo, usamos fallback a email.
  }

  window.location.href = fallbackHref;
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pb-16 text-white">
      <ProfessionalHeader />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-10 md:pt-16">
        <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF6F]">DOCUMENTACIÓN TÉCNICA</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[0.98] text-white md:text-7xl">
          Catálogo <em className="text-[#D4AF6F] not-italic italic">BMR Premium</em>
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/75">
          Descargá o solicitá nuestro catálogo actualizado con líneas de producto, medidas estándar, prestaciones técnicas y opciones de
          terminación.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <article className="rounded-[14px] border border-[#D4AF6F]/20 bg-[var(--bg-elevated-1)] p-7 md:p-8">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="mx-auto w-full max-w-[320px]">
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-[8px] border border-[#D4AF6F]/25 px-6 py-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                style={{
                  background: 'linear-gradient(160deg, #1A2E47, #2C4A6B)',
                  transform: 'perspective(800px) rotateY(-2deg)',
                  transformOrigin: 'left center'
                }}
                aria-hidden="true"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-[#D4AF6F]" />
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#D4AF6F]">CATÁLOGO GENERAL</p>
                <h2 className="mt-6 font-editorial text-4xl leading-tight text-white md:text-5xl">
                  Aberturas <em className="text-[#D4AF6F] not-italic italic">premium</em>
                </h2>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/70">2026 · ED. 04</span>
                  <span className="font-editorial text-2xl text-[#D4AF6F]">BMR</span>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-flex rounded-full border border-[#D4AF6F]/40 bg-[#D4AF6F]/10 px-4 py-1 text-[11px] uppercase tracking-[0.24em] text-[#D4AF6F]">
                DESTACADO · NUEVA EDICIÓN
              </span>
              <h3 className="mt-4 font-editorial text-4xl text-white md:text-5xl">{featuredCatalog.title}</h3>
              <p className="mt-4 max-w-3xl text-white/80">{featuredCatalog.description}</p>

              <div className="mt-7 grid grid-cols-1 gap-4 border-y border-white/15 py-5 sm:grid-cols-3">
                {featuredCatalog.meta.map((meta) => (
                  <div key={meta.label}>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">{meta.label}</p>
                    <p className="mt-2 font-editorial text-3xl text-[#D4AF6F]">{meta.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openPdfWithFallback(featuredCatalog.pdfPath, 'Solicito catalogo general 2026')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF6F] px-6 py-3 text-sm font-semibold text-[#223D5A] transition hover:bg-[#e3c488] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated-1)]"
                  aria-label="Descargar catálogo general en PDF, 18 MB"
                >
                  <Download size={16} />
                  <span>Descargar PDF</span>
                </button>
                <a
                  href={buildCatalogMailto('Solicito catalogo impreso')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF6F]/65 px-6 py-3 text-sm font-semibold text-[#D4AF6F] transition hover:bg-[#D4AF6F]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated-1)]"
                  aria-label="Solicitar versión impresa del catálogo"
                >
                  <span>Versión impresa</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 md:px-10">
        <h2 className="font-editorial text-4xl text-white md:text-5xl">Catálogos por línea</h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lineCatalogs.map((catalog) => (
            <article
              key={catalog.slug}
              className="group rounded-xl border border-[#D4AF6F]/15 bg-[var(--bg-elevated-1)] p-5 transition duration-300 hover:-translate-y-[3px] hover:border-[#D4AF6F]/45"
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#D4AF6F]/20 p-5"
                style={{ background: catalog.coverGradient }}
                aria-hidden="true"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#D4AF6F]">LÍNEA</p>
                <h3 className="mt-8 font-editorial text-3xl leading-tight text-white">
                  {catalog.coverTitle.split(' ')[0]} <em className="text-[#D4AF6F] not-italic italic">premium</em>
                </h3>
                <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.2em] text-white/70">{catalog.systems}</p>
              </div>

              <h4 className="mt-5 font-editorial text-3xl text-white">{catalog.name}</h4>
              <p className="mt-3 min-h-[70px] text-sm leading-relaxed text-white/75">{catalog.description}</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/60">
                {catalog.pages} · {catalog.size}
              </p>

              <button
                type="button"
                onClick={() => openPdfWithFallback(catalog.pdfPath, `Solicito catalogo ${catalog.name}`)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF6F] transition hover:text-[#e3c488] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated-1)]"
                aria-label={`Descargar catálogo de ${catalog.name} en PDF, ${catalog.size}`}
              >
                <Download size={15} />
                <span>Descargar PDF</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 rounded-[14px] border border-[#D4AF6F]/20 bg-[linear-gradient(110deg,#2C4A6B,#1F3858)] px-8 py-8 md:flex-row md:items-end md:justify-between md:px-9">
          <div>
            <h3 className="font-editorial text-4xl leading-tight text-white md:text-5xl">
              ¿Necesitás algo <em className="text-[#D4AF6F] not-italic italic">a medida</em>?
            </h3>
            <p className="mt-4 max-w-3xl text-white/75">
              Si tu proyecto requiere especificaciones particulares, coordinamos una visita técnica con asesoramiento personalizado.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF6F] px-6 py-3 text-sm font-semibold text-[#223D5A] transition hover:bg-[#e3c488] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          >
            <span>Solicitar asesoramiento</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Subir PDFs en /public/catalogos/:
          - bmr-catalogo-general-2026.pdf
          - bmr-aluminio-2026.pdf
          - bmr-pvc-2026.pdf
          - bmr-madera-2026.pdf
      */}
      <section className="sr-only" aria-label="Checklist de PDFs de catálogo">
        <ul>
          {catalogPdfChecklist.map((pdf) => (
            <li key={pdf}>{pdf}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
