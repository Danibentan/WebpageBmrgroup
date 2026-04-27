'use client';

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import ImmersiveHero from '@/components/hero/ImmersiveHero';
import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';

type PanelKey = 'quienes' | 'categorias' | 'tienda' | 'contacto' | 'cotizar';

const panelContent: Record<PanelKey, { title: string; subtitle: string; body: ReactNode }> = {
  quienes: {
    title: 'Quiénes somos',
    subtitle: 'Historia, visión y evolución de Bmr Group Argentina.',
    body: (
      <div className="space-y-4 text-sm text-slate-600 md:text-base">
        <p>
          Bmr Group Argentina nació en 2014 como una iniciativa para elevar los estándares de diseño y ejecución en soluciones constructivas premium.
          El proyecto surgió al detectar una necesidad concreta en el mercado: proveedores con criterio técnico, asesoramiento estratégico y resultados
          estéticos de alto nivel en cada obra.
        </p>
        <p>
          Con el tiempo, Bmr Group evolucionó desde su especialidad en aberturas de aluminio y PVC hacia una marca integral con foco en arquitectura,
          renovación residencial, retail técnico y atención personalizada para desarrolladores, estudios y clientes finales.
        </p>
        <p>
          Hoy la compañía se posiciona como un socio de largo plazo que integra diseño, ingeniería, logística y postventa, con una identidad profesional,
          vanguardista y orientada a la experiencia de cliente de principio a fin.
        </p>
      </div>
    )
  },
  categorias: {
    title: 'Categorías',
    subtitle: 'Líneas de producto y servicios de alto desempeño.',
    body: (
      <div className="grid gap-3 sm:grid-cols-2">
        {['Aberturas premium', 'Frentes integrales', 'Divisiones interiores', 'Soluciones para obras', 'Automatizaciones', 'Asesoría técnica'].map((category) => (
          <article key={category} className="rounded-xl border border-[#d2d9e7] bg-[#f8fbff] p-4 text-sm font-medium text-[#1f3554] shadow-sm">
            {category}
          </article>
        ))}
      </div>
    )
  },
  tienda: {
    title: 'Tienda virtual',
    subtitle: 'Explorá propuestas por línea y solicitá presupuesto directo.',
    body: (
      <div className="space-y-3">
        {[
          { name: 'Línea Residencial', desc: 'Puertas, ventanas y cerramientos para vivienda premium.' },
          { name: 'Línea Corporativa', desc: 'Sistemas modulares para oficinas, locales y espacios profesionales.' },
          { name: 'Línea Proyecto', desc: 'Soluciones a medida para obras nuevas y remodelaciones.' }
        ].map((item) => (
          <div key={item.name} className="rounded-xl border border-[#d2d9e7] bg-white p-4 shadow-sm">
            <h4 className="font-semibold text-[#1f3554]">{item.name}</h4>
            <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  contacto: {
    title: 'Contacto',
    subtitle: 'Canales directos para asesoramiento y soporte.',
    body: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#d2d9e7] bg-white p-4 shadow-sm">
          <h4 className="font-semibold text-[#1f3554]">Atención comercial</h4>
          <p className="mt-2 text-sm text-slate-600">+54 9 11 4321 6789</p>
          <p className="text-sm text-slate-600">+54 9 11 6123 4590</p>
          <p className="mt-2 text-sm text-slate-600">Lunes a Viernes: 09:00 a 18:30</p>
          <p className="text-sm text-slate-600">Sábados: 09:30 a 13:00</p>
        </div>
        <div className="rounded-xl border border-[#d2d9e7] bg-white p-4 shadow-sm">
          <h4 className="font-semibold text-[#1f3554]">Ubicación y redes</h4>
          <p className="mt-2 text-sm text-slate-600">Av. del Libertador 6710, CABA, Argentina</p>
          <p className="text-sm text-slate-600">@bmrgroupargentina · Instagram</p>
          <p className="text-sm text-slate-600">Bmr Group Argentina · Facebook</p>
          <p className="text-sm text-slate-600">info@bmrgroup.com.ar</p>
        </div>
      </div>
    )
  },
  cotizar: {
    title: 'Cotizar ahora',
    subtitle: 'Completá los datos y nuestro equipo te contacta en el horario que prefieras.',
    body: (
      <form className="grid gap-3 md:grid-cols-2">
        {[
          { label: 'Nombre', type: 'text', name: 'nombre' },
          { label: 'Apellido', type: 'text', name: 'apellido' },
          { label: 'Número de teléfono', type: 'tel', name: 'telefono' },
          { label: 'Horario preferido', type: 'time', name: 'horario' },
          { label: 'Día de visita (lunes a sábado)', type: 'date', name: 'dia' }
        ].map((field) => (
          <label key={field.name} className={`text-sm font-medium text-[#1f3554] ${field.name === 'dia' ? 'md:col-span-2' : ''}`}>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              required
              className="mt-1 w-full rounded-lg border border-[#c8d1e0] bg-white px-3 py-2 text-slate-700 outline-none transition focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20"
            />
          </label>
        ))}
        <button type="submit" className="md:col-span-2 rounded-lg bg-[#1f3554] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102843]">
          Enviar solicitud
        </button>
      </form>
    )
  }
};

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const panelOverlayRef = useRef<HTMLDivElement | null>(null);
  const panelCardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isActive = true;
    const run = async () => {
      const gsapModule = await import('gsap');
      if (!isActive || !sectionRef.current) return;
      const gsap = gsapModule.gsap;

      gsap.from('.bmr-accent-card', {
        y: 22,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out'
      });
    };
    void run();
    return () => {
      isActive = false;
    };
  }, [mounted]);

  useEffect(() => {
    if (!activePanel) return;

    let isActive = true;
    const run = async () => {
      const gsapModule = await import('gsap');
      if (!isActive) return;
      const gsap = gsapModule.gsap;

      gsap.fromTo(panelOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' });
      gsap.fromTo(panelCardRef.current, { y: 28, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    };
    void run();

    return () => {
      isActive = false;
    };
  }, [activePanel]);

  const selectedPanel = useMemo(() => (activePanel ? panelContent[activePanel] : null), [activePanel]);

  return (
    <main className="min-h-screen bg-[linear-gradient(165deg,#f1f4f9_0%,#e9eef7_35%,#f8f9fc_100%)] text-[#0F1F3D]">
      <ProfessionalHeader activePanel={activePanel} onOpenPanel={setActivePanel} />
      <ImmersiveHero />

      <section ref={sectionRef} className="mx-auto mt-12 grid max-w-7xl gap-4 px-6 pb-12 md:grid-cols-3">
        {[
          ['Diseño vanguardista', 'Interiores y exteriores con identidad contemporánea.'],
          ['Ingeniería de detalle', 'Precisión técnica en cada medición y montaje.'],
          ['Experiencia Bmr', 'Acompañamiento profesional de punta a punta.']
        ].map(([title, text]) => (
          <article key={title} className="bmr-accent-card rounded-2xl border border-[#d4dcea] bg-white/80 p-5 shadow-[0_14px_34px_rgba(16,44,79,0.08)] backdrop-blur-sm">
            <h3 className="text-lg font-bold text-[#1f3554]">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <footer className="mx-auto max-w-7xl border-t border-black/10 px-6 py-10 text-sm text-slate-600">
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

      {selectedPanel && (
        <div ref={panelOverlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-[#091324]/55 p-4">
          <div ref={panelCardRef} className="w-full max-w-3xl rounded-2xl border border-[#bfd0e8] bg-[#f5f8fd] p-6 shadow-[0_30px_80px_rgba(5,24,46,0.35)] md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#102c4f]">{selectedPanel.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{selectedPanel.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="rounded-lg border border-[#b7c8df] bg-white px-3 py-1.5 text-sm font-semibold text-[#1f3554] hover:bg-[#e9f0fa]"
              >
                Cerrar
              </button>
            </div>
            {selectedPanel.body}
          </div>
        </div>
      )}
    </main>
  );
}
