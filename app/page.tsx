import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';

const quickLinks = [
  { href: '/quienes-somos', title: 'Quiénes somos', description: 'Conocé la historia, misión y visión de nuestra marca.' },
  { href: '/categorias', title: 'Categorías', description: 'Explorá líneas de producto y soluciones por tipo de proyecto.' },
  { href: '/tienda', title: 'Tienda', description: 'Ingresá al catálogo virtual y descubrí propuestas destacadas.' },
  { href: '/contacto', title: 'Contacto', description: 'Teléfonos, horarios, ubicación y redes para atención directa.' },
  { href: '/cotizar', title: 'Cotizar ahora', description: 'Completá el formulario y coordinamos asesoramiento personalizado.' }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[#e6edf8]">
      <ProfessionalHeader />
      <ImmersiveHero />

      <section className="mx-auto mt-10 max-w-7xl px-6 pb-12">
        <h2 className="text-3xl font-bold text-[#eef5ff]">Navegación principal</h2>
        <p className="mt-2 text-[#c8d9ee]">Ahora cada botón del header abre una página dedicada con contenido específico.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-[#d4dcea] bg-white/90 p-5 shadow-[0_14px_34px_rgba(16,44,79,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(16,44,79,0.15)]"
            >
              <h3 className="text-lg font-bold text-[#1f3554]">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
