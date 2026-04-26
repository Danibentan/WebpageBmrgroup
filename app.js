const { useEffect, useRef, useState } = React;

const categories = [
  { name: 'Corredizas', desc: 'Ideal para grandes paños y apertura suave.' },
  { name: 'Batientes A40', desc: 'Máxima hermeticidad y rendimiento térmico.' },
  { name: 'Ventanales Fijos', desc: 'Visual limpia con alta entrada de luz.' },
  { name: 'Puertas Ventana', desc: 'Conexión elegante entre interior y exterior.' }
];

const products = [
  { name: 'Módena Corrediza 2H', price: '$ 1.250.000', sku: 'MOD-2H', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80' },
  { name: 'A40 Batiente Térmica', price: '$ 1.490.000', sku: 'A40-BT', img: 'https://images.unsplash.com/photo-1600566752734-1f2f1f2d6bb1?auto=format&fit=crop&w=900&q=80' },
  { name: 'Ventanal Fijo Panorámico', price: '$ 1.790.000', sku: 'FIX-PAN', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Corrediza Minimal 3 Guías', price: '$ 2.050.000', sku: 'MIN-3G', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80' }
];

const PremiumLink = ({ children, href = '#' }) => (
  <a href={href} className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-accent">
    <span className="relative">{children}<span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-accent transition group-hover:scale-x-100" /></span>
    <span className="transition group-hover:translate-x-1">→</span>
  </a>
);

function Header() {
  const titleRef = useRef(null);
  const logoRef = useRef(null);
  const headerRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    if (!window.gsap) return;
    const tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(logoRef.current, { scale: 0.7, opacity: 0, duration: 0.6 })
      .from(titleRef.current, { y: 22, opacity: 0, duration: 0.7 }, '-=0.25')
      .from('.nav-link', { y: -10, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.35');

    window.gsap.fromTo(shineRef.current, { xPercent: -120, opacity: 0.15 }, { xPercent: 120, opacity: 0.35, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    window.gsap.to(headerRef.current, { boxShadow: '0 10px 28px rgba(147,197,253,0.25)', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 overflow-hidden border-b border-black/10 bg-[#f7f6f2]/95 backdrop-blur">
      <div ref={shineRef} className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div ref={logoRef} className="group relative h-12 w-12">
            <span className="absolute inset-0 rounded-full border border-accent/40 transition group-hover:scale-110 group-hover:opacity-0" />
            <img src="assets/bmr-logo.svg" alt="BMR" className="h-12 w-12 rounded-full anim-float transition duration-500 group-hover:rotate-12 group-hover:scale-105" />
          </div>
          <div>
            <p ref={titleRef} className="text-2xl leading-none font-semibold text-primary md:text-3xl">Bmr Group Argentina</p>
          </div>
        </div>

        <nav className="hidden gap-6 text-sm font-semibold lg:flex">
          <a href="#tienda" className="nav-link">Tienda</a>
          <a href="#quienes" className="nav-link">Quiénes somos</a>
          <a href="#categorias" className="nav-link">Categorías</a>
          <a href="#showroom" className="nav-link">Showroom</a>
          <a href="marcas.html" className="nav-link">Marcas</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>

        <a href="#contacto" className="anim-pulse rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white">Cotizar ahora</a>
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main className="space-y-12 py-8">
        <section className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-[#102c4f] md:text-6xl">Aberturas premium estándar listas para comprar.</h1>
            <p className="max-w-xl text-base text-slate-600">Modelos estandarizados con disponibilidad inmediata. Diseñados para arquitectura moderna, confort térmico y durabilidad.</p>
            <div className="flex gap-3">
              <a href="#tienda" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">Ir a tienda</a>
              <a href="#quienes" className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold">Conocer BMR</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl premium-hover shadow-soft">
            <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80" alt="Fachada premium" className="h-full w-full object-cover" />
          </div>
        </section>

        <section id="quienes" className="mx-auto max-w-7xl rounded-3xl bg-white px-6 py-8 shadow-soft md:px-8">
          <h2 className="text-2xl font-semibold text-[#102c4f]">Quiénes somos</h2>
          <p className="mt-3 text-slate-600">Bmr Group Argentina nació para elevar el estándar de las aberturas en proyectos residenciales y comerciales. Nos fundamos con el objetivo de combinar diseño minimalista, rendimiento técnico y atención personalizada, acercando soluciones premium de forma simple y confiable.</p>
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-4 text-2xl font-semibold text-[#102c4f]">Categorías</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((c) => (
              <article key={c.name} className="premium-hover rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="text-lg font-semibold text-primary">{c.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="showroom" className="mx-auto max-w-7xl rounded-3xl bg-[#102c4f] px-6 py-8 text-white md:px-8">
          <h2 className="text-2xl font-semibold">Showroom y materiales</h2>
          <p className="mt-3 text-slate-200">Trabajamos con aluminio premium, DVH y herrajes de alta prestación. En showroom mostramos acabados reales, funcionamiento de aperturas y detalles de instalación para que el cliente elija con seguridad y transparencia. Nuestro proceso prioriza calidad de fabricación, control técnico y terminaciones impecables.</p>
        </section>

        <section id="tienda" className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-[#102c4f]">Tienda · Aberturas estandarizadas</h2>
            <PremiumLink href="https://wa.me/5491100000000?text=Hola%20BMR%2C%20quiero%20catalogo%20completo">Comprar por WhatsApp</PremiumLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((p) => (
              <article key={p.sku} className="group premium-hover overflow-hidden rounded-2xl bg-white shadow-soft">
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-lg font-semibold text-[#102c4f]">{p.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-slate-500">SKU {p.sku}</p>
                  <p className="text-base font-semibold">{p.price}</p>
                  <a
                    href={`https://wa.me/5491100000000?text=Quiero%20comprar%20${encodeURIComponent(p.name)}%20(${p.sku})`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full justify-center rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white"
                  >
                    Comprar ahora
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacto" className="mx-auto max-w-7xl border-t border-black/10 px-4 py-8 text-sm text-slate-600 md:px-6">
        <h3 className="text-xl font-semibold text-[#102c4f]">Contacto</h3>
        <p className="mt-2">Teléfono: +54 9 11 0000 0000 · Email: info@bmrgroup.com.ar</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a className="font-semibold text-primary" href="https://instagram.com/bmrgroupargentina" target="_blank" rel="noreferrer">Instagram</a>
          <a className="font-semibold text-primary" href="https://wa.me/5491100000000" target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="font-semibold text-primary" href="mailto:info@bmrgroup.com.ar">Email institucional</a>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
