import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { catalogPdfChecklist, featuredCatalog, lineCatalogs } from '@/lib/catalogos';

export const metadata: Metadata = {
  title: 'Catálogo · BMR Group',
  description: 'Nuestro catálogo técnico está en preparación. Próximamente disponible para descarga.'
};

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pb-16 text-[#111111]">
      <ProfessionalHeader />

      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-10 md:pt-16">
        <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF6F]">DOCUMENTACIÓN TÉCNICA</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[0.98] text-[#111111] md:text-7xl">
          Catálogo
        </h1>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-[120px]" aria-labelledby="catalogo-proximamente-title">
        <article className="rounded-[14px] border border-[#D4AF6F]/20 bg-[var(--bg-elevated-1)]/70 px-8 py-12 text-center md:px-14 md:py-16">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF6F]/35 bg-[#D4AF6F]/10 text-[#D4AF6F]" aria-hidden="true">
            <FileText size={20} />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-[#D4AF6F]">EN PREPARACIÓN</p>
          <h2 id="catalogo-proximamente-title" className="mt-4 font-editorial text-4xl leading-tight text-[#111111] md:text-6xl">
            Catálogo próximamente disponible
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#1F4257] md:text-lg">
            Estamos finalizando la nueva edición de nuestro catálogo técnico con todas las líneas, prestaciones y opciones de terminación.
            Muy pronto vas a poder descargarlo.
          </p>
          <p className="mt-5 text-sm font-semibold text-[#D4AF6F]">Mientras tanto, podés solicitarlo por contacto directo.</p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contacto"
              aria-label="Solicitar catálogo por contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF6F] px-6 py-3 text-sm font-semibold text-[#223D5A] transition hover:bg-[#e3c488] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated-1)]"
            >
              <span>Solicitar catálogo por contacto</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/nuestras-obras"
              aria-label="Ver nuestras obras"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF6F]/65 px-6 py-3 text-sm font-semibold text-[#1F4257] transition hover:bg-[#D4AF6F]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated-1)]"
            >
              <span>Ver nuestras obras</span>
            </Link>
          </div>
        </article>
      </section>

      {/* TODO: descomentar cuando esté el catálogo final
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <article className="rounded-[14px] border border-[#D4AF6F]/20 bg-[var(--bg-elevated-1)] p-7 md:p-8">...</article>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 md:px-10">
        <h2 className="font-editorial text-4xl text-white md:text-5xl">Catálogos por línea</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">...</div>
      </section>
      */}

      {/* TODO: descomentar cuando esté el catálogo final */}
      <section className="sr-only" aria-label="Checklist de PDFs de catálogo">
        <ul>
          {catalogPdfChecklist.map((pdf) => (
            <li key={pdf}>{pdf}</li>
          ))}
        </ul>
      </section>

      {/* Referencias reservadas para reactivar catálogo final sin perder imports */}
      <section className="sr-only" aria-hidden="true">
        <pre>{JSON.stringify({ featuredCatalog: featuredCatalog.title, lineCatalogs: lineCatalogs.length })}</pre>
      </section>
    </main>
  );
}
