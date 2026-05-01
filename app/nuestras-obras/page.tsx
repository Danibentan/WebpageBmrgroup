import Link from 'next/link';

import { ProjectCard } from '@/components/obras/ProjectCard';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { obras } from '@/content/obras';

const metrics = [
  { value: '+150', label: 'Proyectos entregados' },
  { value: '12 años', label: 'de trayectoria' },
  { value: '+18.000 m²', label: 'intervenidos' },
  { value: '100%', label: 'proyectos a medida' }
];

export default function NuestrasObrasPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pb-16 text-white">
      <ProfessionalHeader />

      <section className="mx-auto max-w-7xl px-6 pt-12 md:px-10 md:pt-16">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#D4AF6F]">PORTFOLIO · 4 PROYECTOS</p>
        <h1 className="text-4xl font-bold md:text-6xl">Nuestras obras</h1>
        <p className="mt-4 max-w-3xl text-lg text-[#d2e0f2]">
          Explorá una selección de proyectos residenciales y corporativos donde combinamos diseño minimalista, aislación térmica y precisión técnica.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {obras.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section className="mt-16 bg-[color:var(--bg-elevated-1)]/70 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-10">
          {metrics.map((metric) => (
            <article key={metric.label} className="text-center">
              <p className="font-editorial text-4xl text-[#D4AF6F] md:text-5xl">{metric.value}</p>
              <p className="mt-3 text-sm text-white/80">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10">
        <h2 className="font-editorial text-4xl text-white md:text-6xl">¿Tu proyecto es el próximo?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-[#d2e0f2]">Coordinamos una visita técnica sin cargo en CABA y GBA.</p>
        <Link
          href="/contacto"
          className="mt-8 inline-flex rounded-full bg-[#D4AF6F] px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#0f2745] transition hover:bg-[#e0be82]"
        >
          Solicitar visita técnica
        </Link>
      </section>
    </main>
  );
}
