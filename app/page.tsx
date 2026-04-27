import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import ImmersiveHero from '@/components/hero/ImmersiveHero';

export default function HomePage() {
  return (
    <main className="bg-[#F4F6F8] text-[#0F1F3D]">
      <ProfessionalHeader />
      <ImmersiveHero />
      <section id="quienes" className="mx-auto mt-10 max-w-7xl px-6 pb-6 text-slate-600">
        Bmr Group Argentina · diseño, calidad y precisión.
      </section>
      <section id="categorias" />
      <section id="showroom" />
      <section id="tienda" />
      <footer id="contacto" className="mx-auto max-w-7xl border-t border-black/10 px-6 py-10 text-sm text-slate-600">
        <div className="mb-6 flex items-center gap-4">
          <img
            src="/assets/logos/logo_logo%20fondo%20gris.png"
            alt="Logo Bmr Group"
            className="h-16 w-16 rounded-full border border-[#ff6a00]/40 bg-[#d9d9d9] object-contain"
          />
          <div>
            <h3 className="text-2xl font-bold tracking-[-0.015em] text-[#1f3554]">Bmr Group Argentina</h3>
            <span className="mt-1 block h-[2px] w-44 bg-[#ff6a00]" />
          </div>
        </div>
      </footer>
    </main>
  );
}
