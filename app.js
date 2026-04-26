const { useEffect, useRef, useState } = React;

const categories = ['Corredizas Premium', 'Línea A40', 'Línea Módena', 'Ventanales Fijos', 'Puertas Ventana', 'Frentes Vidriados'];
const stats = [
  { label: 'Proyectos entregados', value: '+450' },
  { label: 'Años de garantía', value: '10' },
  { label: 'Aislación térmica', value: 'Superior' }
];

const products = [
  { name: 'Módena Corrediza 2H', price: '$ 1.250.000', tag: 'Nuevo', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80' },
  { name: 'A40 Batiente Térmica', price: '$ 1.490.000', tag: 'Top ventas', img: 'https://images.unsplash.com/photo-1600566752734-1f2f1f2d6bb1?auto=format&fit=crop&w=900&q=80' },
  { name: 'Ventanal Fijo Panorámico', price: '$ 1.790.000', tag: 'Premium', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Corrediza Minimal 3 Guías', price: '$ 2.050.000', tag: 'Arquitectos', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80' }
];

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setShow(true), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, show];
}

const PremiumLink = ({ children, href = '#' }) => (
  <a href={href} className="group inline-flex items-center gap-1 text-sm font-bold text-primary transition hover:text-accent">
    <span className="relative">
      {children}
      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition group-hover:scale-x-100" />
    </span>
    <span className="transition group-hover:translate-x-1">→</span>
  </a>
);

const Header = () => (
  <>
    <div className="bg-primary py-2 text-center text-xs font-semibold tracking-wide text-white">LÍNEA PREMIUM · ASESORAMIENTO TÉCNICO PERSONALIZADO</div>
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f7f6f2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <img src="assets/bmr-logo.svg" alt="BMR" className="h-11 w-11 rounded-xl anim-float" />
          <div>
            <p className="text-lg font-bold text-primary">BMR Group Argentina</p>
            <p className="text-xs text-slate-600">Aberturas de línea premium</p>
          </div>
        </div>
        <nav className="hidden gap-6 text-sm font-semibold lg:flex">
          <a href="#catalogo" className="nav-link">Tienda</a>
          <a href="#categorias" className="nav-link">Categorías</a>
          <a href="#showroom" className="nav-link">Showroom</a>
          <a href="marcas.html" className="nav-link">Marcas</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>
        <button className="anim-pulse rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-white">Cotizar ahora</button>
      </div>
    </header>
  </>
);

function Hero() {
  const [ref, show] = useReveal();
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx(((e.clientX - r.left) / r.width) * 100);
        setMy(((e.clientY - r.top) / r.height) * 100);
      }}
      className={`relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-3xl bg-white px-4 py-10 shadow-soft md:grid-cols-2 md:py-14 md:px-8 reveal ${show ? 'show' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(circle at ${mx}% ${my}%, rgba(20,61,112,0.12), transparent 35%)` }} />
      <div className="relative z-10 flex flex-col justify-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">BMR PRESTIGE COLLECTION</p>
        <h1 className="text-4xl font-black leading-tight text-[#102c4f] md:text-6xl">Minimalista, moderno y técnicamente superior.</h1>
        <p className="mt-4 max-w-xl text-slate-600">Diseño limpio, apertura suave y máxima eficiencia térmica para proyectos residenciales y corporativos de alto nivel.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-[#0f3159]">Comprar online</button>
          <button className="rounded-full border border-black/20 px-6 py-3 text-sm font-bold hover:border-primary hover:text-primary">Descargar catálogo</button>
        </div>
        <div className="mt-5"><PremiumLink href="marcas.html">Conocé nuestras marcas aliadas</PremiumLink></div>
      </div>
      <div className="relative z-10 overflow-hidden rounded-3xl premium-hover">
        <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80" alt="Fachada premium" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main className="space-y-10 py-8">
        <Hero />

        <section className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3 md:px-6">
          {stats.map((s, i) => (
            <article key={s.label} className="premium-hover rounded-2xl border border-black/10 bg-white p-5" style={{ animation: `fadeUp .55s ease ${i * 120}ms both` }}>
              <p className="text-3xl font-black text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-slate-600">{s.label}</p>
            </article>
          ))}
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-4 text-2xl font-extrabold text-[#102c4f]">Comprar por categoría</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button key={c} className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:text-primary" style={{ animation: `fadeUp .45s ease ${i * 90}ms both` }}>{c}</button>
            ))}
          </div>
        </section>

        <section id="catalogo" className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-[#102c4f]">Productos destacados</h2>
            <PremiumLink>Ver toda la colección</PremiumLink>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((p, i) => (
              <article key={p.name} className="group premium-hover overflow-hidden rounded-2xl bg-white shadow-soft" style={{ animation: `fadeUp .55s ease ${i * 110}ms both` }}>
                <div className="relative overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{p.tag}</span>
                  <button className="absolute bottom-3 right-3 translate-y-5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">Vista rápida</button>
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-lg font-bold text-[#102c4f]">{p.name}</h3>
                  <p className="text-sm text-slate-600">Perfil premium, herrajes de alto rendimiento y aislación superior.</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-extrabold">{p.price}</p>
                    <button className="rounded-full border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white">+ Agregar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacto" className="mx-auto flex max-w-7xl flex-col justify-between gap-4 border-t border-black/10 px-4 py-8 text-sm text-slate-600 md:flex-row md:px-6">
        <p>© 2026 BMR Group Argentina · Aberturas de línea premium</p>
        <p>info@bmrgroup.com.ar · +54 9 11 0000 0000</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
