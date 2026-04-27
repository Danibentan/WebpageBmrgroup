import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

export default function NuestrasObrasPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#07142f_0%,#0f3159_60%,#1e4a74_100%)] pb-12 text-white">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <h1 className="text-4xl font-bold md:text-6xl">Nuestras obras</h1>
        <p className="mt-4 max-w-3xl text-lg text-[#d2e0f2]">Explorá una selección de proyectos residenciales y corporativos donde combinamos diseño minimalista, aislación térmica y precisión técnica.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Casa Patio Norte',
              detail: 'Corredizas de gran formato con perfiles de baja visual y DVH para máxima entrada de luz.'
            },
            {
              title: 'Edificio Libertador',
              detail: 'Sistema de carpintería técnica con control acústico y terminación premium para fachada continua.'
            },
            {
              title: 'Oficinas Costanera',
              detail: 'Aberturas de operación intensiva para uso corporativo con foco en hermeticidad y durabilidad.'
            },
            {
              title: 'Casa Bosque Sur',
              detail: 'Puertas ventana y paños fijos panorámicos para integración interior-exterior.'
            }
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#6d8eb6]/55 bg-[rgba(8,28,52,0.72)] p-6">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-[#d2e0f2]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
