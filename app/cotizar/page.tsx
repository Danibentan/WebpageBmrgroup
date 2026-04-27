import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function CotizarPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(165deg,#f1f4f9_0%,#e9eef7_35%,#f8f9fc_100%)] text-[#0F1F3D]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-[#d4dcea] bg-white/90 px-6 py-8 shadow-[0_14px_34px_rgba(16,44,79,0.08)] md:px-10">
        <h1 className="text-3xl font-bold text-[#102c4f]">Cotizar ahora</h1>
        <p className="mt-2 text-slate-600">Completá el formulario y coordinamos una visita con nuestro equipo.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-[#1f3554]">
            Nombre
            <input required className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1f3554]">
            Apellido
            <input required className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1f3554]">
            Número de teléfono
            <input type="tel" required className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1f3554]">
            Horario preferido
            <input type="time" required className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-[#1f3554] md:col-span-2">
            Día de visita (lunes a sábado)
            <input type="date" required className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2" />
          </label>
          <button type="submit" className="md:col-span-2 rounded-lg bg-[#1f3554] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102843]">
            Enviar solicitud
          </button>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
