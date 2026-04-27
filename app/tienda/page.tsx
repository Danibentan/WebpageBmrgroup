import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const storeItems = [
  { name: 'Línea Residencial', description: 'Puertas, ventanas y cerramientos para vivienda premium.' },
  { name: 'Línea Corporativa', description: 'Sistemas modulares para oficinas, locales y espacios profesionales.' },
  { name: 'Línea Proyecto', description: 'Soluciones a medida para obras nuevas y remodelaciones.' }
];

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-6xl px-6 pb-12">
        <h1 className="text-3xl font-bold text-[#102c4f]">Tienda</h1>
        <p className="mt-2 text-slate-600">Seleccioná una línea y pedí cotización personalizada.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {storeItems.map((item) => (
            <article key={item.name} className="rounded-2xl border border-[#d4dcea] bg-white/90 p-5 shadow-[0_14px_34px_rgba(16,44,79,0.08)]">
              <h2 className="text-lg font-semibold text-[#1f3554]">{item.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
