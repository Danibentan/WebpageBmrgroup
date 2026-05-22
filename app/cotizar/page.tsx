import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import LiquidButton from '@/components/ui/LiquidButton';

export default function CotizarPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#1a1a1a]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-4xl rounded-3xl border border-[var(--bmr-border)] bg-[var(--bg-primary)] px-6 py-8 shadow-[0_14px_34px_rgba(16,44,79,0.08)] md:px-10">
        <h1 className="text-3xl font-bold text-[#1a1a1a]">Cotizar ahora</h1>
        <p className="mt-2 text-[#1a1a1a]/80">Completá el formulario y coordinamos una visita con nuestro equipo.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-[#1a1a1a]/85">
            Nombre
            <input required className="mt-1 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] placeholder:text-[#6b6b6b] focus:border-[#c9a961] focus:outline-none" />
          </label>
          <label className="text-sm text-[#1a1a1a]/85">
            Apellido
            <input required className="mt-1 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] placeholder:text-[#6b6b6b] focus:border-[#c9a961] focus:outline-none" />
          </label>
          <label className="text-sm text-[#1a1a1a]/85">
            Número de teléfono
            <input type="tel" required className="mt-1 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] placeholder:text-[#6b6b6b] focus:border-[#c9a961] focus:outline-none" />
          </label>
          <label className="text-sm text-[#1a1a1a]/85">
            Horario preferido
            <input type="time" required className="mt-1 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] focus:border-[#c9a961] focus:outline-none" />
          </label>
          <label className="text-sm text-[#1a1a1a]/85 md:col-span-2">
            Día de visita (lunes a sábado)
            <input type="date" required className="mt-1 w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[#1a1a1a] focus:border-[#c9a961] focus:outline-none" />
          </label>
          <LiquidButton type="submit" variant="primary" className="md:col-span-2">
            Enviar solicitud
          </LiquidButton>
        </form>
      </section>
    </main>
  );
}
