const { useEffect, useRef, useState } = React;

const categories = ['Corredizas Premium', 'Línea A40', 'Línea Módena', 'Ventanales Fijos', 'Puertas Ventana', 'Frentes Vidriados'];

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

function PremiumLink({ children, href = '#' }) {
  return (
    <a href={href} className="group inline-flex items-center gap-1 text-sm font-bold text-primary transition hover:text-accent">
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition group-hover:scale-x-100" />
      </span>
      <span className="transition group-hover:translate-x-1">→</span>
    </a>
  );
}

function Header() {
  return (
    <>
      <div className="bg-primary py-2 text-center text-xs font-semibold tracking-wide text-white">LÍNEA PREMIUM · ASESORAMIENTO TÉCNICO PERSONALIZADO</div>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f6f4ef]/95 backdrop-blur">
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
}

function Hero() {
  const [ref, show] = useReveal();
  return (
    <section ref={ref} className={`mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14 md:px-6 reveal ${show ? 'show' : ''}`}>
      <div className="flex flex-col justify-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">BMR PRESTIGE COLLECTION</p>
        <h1 className="text-4xl font-black leading-tight text-[#102c4f] md:text-6xl">Minimalista, moderno y técnicamente superior.</h1>
        <p className="mt-4 max-w-xl text-slate-600">Diseño limpio, apertura suave y máxima eficiencia térmica para proyectos residenciales y corporativos de alto nivel.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-[#0f3159]">Comprar online</button>
          <button className="rounded-full border border-black/20 px-6 py-3 text-sm font-bold hover:border-primary hover:text-primary">Descargar catálogo</button>
        </div>
        <div className="mt-5"><PremiumLink href="marcas.html">Conocé nuestras marcas aliadas</PremiumLink></div>
      </div>
      <div className="relative overflow-hidden rounded-3xl shadow-soft">
        <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl anim-float" />
        <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80" alt="Fachada premium con aberturas" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Hero />

      <section id="categorias" className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <h2 className="mb-4 text-2xl font-extrabold text-[#102c4f]">Comprar por categoría</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button key={c} className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:text-primary" style={{ animation: `fadeUp .45s ease ${i * 90}ms both` }}>{c}</button>
          ))}
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-[#102c4f]">Productos destacados</h2>
          <PremiumLink>Ver toda la colección</PremiumLink>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => (
            <article key={p.name} className="group rounded-2xl bg-white shadow-soft transition hover:-translate-y-1" style={{ animation: `fadeUp .55s ease ${i * 110}ms both` }}>
              <div className="relative overflow-hidden rounded-t-2xl">
                <img src={p.img} alt={p.name} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{p.tag}</span>
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

      <section id="showroom" className="bg-[#102c4f] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <img src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80" alt="Showroom BMR" className="rounded-2xl" />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">Showroom Experience</p>
            <h3 className="mt-3 text-3xl font-black">Conocé acabados y aperturas en tamaño real.</h3>
            <p className="mt-4 text-slate-200">Visitá nuestro showroom y compará línea Módena, A40 y ventanales fijos con asesoramiento técnico.</p>
            <button className="mt-6 w-fit rounded-full bg-white px-6 py-3 text-sm font-bold text-primary transition hover:-translate-y-1 hover:shadow-xl">Reservar visita</button>
          </div>
        </div>
      </section>

      <footer id="contacto" className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:px-6">
        <p>© 2026 BMR Group Argentina · Aberturas de línea premium</p>
        <p>info@bmrgroup.com.ar · +54 9 11 0000 0000</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
