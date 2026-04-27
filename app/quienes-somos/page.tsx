import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function QuienesSomosPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-5xl rounded-3xl border border-[#d4dcea] bg-white/90 px-6 py-8 shadow-[0_14px_34px_rgba(16,44,79,0.08)] md:px-10">
        <h1 className="text-3xl font-bold text-[#102c4f]">Quiénes somos</h1>
        <p className="mt-4 text-slate-600">
          Bmr Group Argentina se fundó en 2014 para elevar los estándares del mercado en soluciones de arquitectura y aberturas premium.
          Nacimos con una visión clara: unir estética, precisión técnica y servicio personalizado en cada etapa del proyecto.
        </p>
        <p className="mt-3 text-slate-600">
          Hoy operamos como una marca integral para obras residenciales, corporativas y comerciales, brindando diseño, asesoría técnica,
          logística y postventa profesional.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
