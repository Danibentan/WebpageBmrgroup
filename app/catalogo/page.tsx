import Link from 'next/link';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pb-12 text-white">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-5xl px-6">
        <h1 className="text-4xl font-bold md:text-6xl">Catalogo</h1>
        <p className="mt-4 text-lg text-[#d2e0f2]">Descargá o solicitá nuestro catálogo actualizado con líneas de producto, medidas estándar y prestaciones técnicas.</p>

        <div className="mt-8 rounded-2xl border border-[#6d8eb6]/55 bg-[color:var(--bg-elevated-1)]/72 p-6 md:p-8">
          <ul className="space-y-3 text-[#d2e0f2]">
            <li>• Sistemas corredizos y batientes de alto rendimiento.</li>
            <li>• Opciones de vidriado DVH y herrajes premium.</li>
            <li>• Acabados y colores disponibles para cada línea.</li>
            <li>• Recomendaciones de uso por tipo de obra.</li>
          </ul>
          <Link
            href="/contacto"
            className="mt-6 inline-flex rounded-full border border-[#c9ab66] bg-[#c9ab66]/95 px-6 py-2 text-sm font-semibold text-[#08152f] transition hover:bg-[#dcc084]"
          >
            Solicitar catálogo completo
          </Link>
        </div>
      </section>
    </main>
  );
}
