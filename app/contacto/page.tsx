import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <section className="mx-auto mt-10 max-w-5xl rounded-3xl border border-[#d4dcea] bg-white/90 px-6 py-8 shadow-[0_14px_34px_rgba(16,44,79,0.08)] md:px-10">
        <h1 className="text-3xl font-bold text-[#102c4f]">Contacto</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#d2d9e7] bg-[#f8fbff] p-4">
            <h2 className="font-semibold text-[#1f3554]">Atención comercial</h2>
            <p className="mt-2 text-sm text-slate-600">+54 9 11 4321 6789</p>
            <p className="text-sm text-slate-600">+54 9 11 6123 4590</p>
            <p className="mt-2 text-sm text-slate-600">Lunes a Viernes: 09:00 a 18:30</p>
            <p className="text-sm text-slate-600">Sábados: 09:30 a 13:00</p>
          </article>
          <article className="rounded-2xl border border-[#d2d9e7] bg-[#f8fbff] p-4">
            <h2 className="font-semibold text-[#1f3554]">Ubicación y redes</h2>
            <p className="mt-2 text-sm text-slate-600">Av. del Libertador 6710, CABA, Argentina</p>
            <p className="text-sm text-slate-600">@bmrgroupargentina · Instagram</p>
            <p className="text-sm text-slate-600">Bmr Group Argentina · Facebook</p>
            <p className="text-sm text-slate-600">info@bmrgroup.com.ar</p>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
