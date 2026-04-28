import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

const categories = [
  'Aberturas premium',
  'Frentes integrales',
  'Divisiones interiores',
  'Soluciones para obras',
  'Automatizaciones',
  'Asesoría técnica'
];

export default function CategoriasPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-6xl px-6 pb-12">
        <h1 className="text-3xl font-bold text-[#102c4f]">Categorías</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <article key={category} className="rounded-2xl border border-[#d4dcea] bg-white/90 p-5 shadow-[0_14px_34px_rgba(16,44,79,0.08)]">
              <h2 className="text-lg font-semibold text-[#1f3554]">{category}</h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
