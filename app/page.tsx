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
      <footer id="contacto" />
    </main>
  );
}
