const { useState } = React;

const brands = [
  { name: 'ALUAR', desc: 'Perfiles de aluminio de alta precisión.' },
  { name: 'HYDRO', desc: 'Sistemas premium para envolventes modernas.' },
  { name: 'HAHN', desc: 'Bisagras y herrajes de alto rendimiento.' },
  { name: 'ROTO', desc: 'Tecnología alemana en mecanismos de apertura.' },
  { name: 'DVH SAINT-GOBAIN', desc: 'Vidrios con eficiencia térmica superior.' },
  { name: 'CORTIZO', desc: 'Carpintería arquitectónica contemporánea.' },
  { name: 'TECHNAL', desc: 'Diseño europeo para proyectos de autor.' },
  { name: 'SIEGENIA', desc: 'Sistemas de cierre y confort premium.' }
];

function App() {
  const [active, setActive] = useState(brands[0]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <a href="index.html" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#143D70] transition hover:text-[#FF6512]">← Volver al inicio</a>
      <header className="mb-8">
        <h1 className="text-4xl font-black text-[#102c4f]">Marcas con las que trabajamos</h1>
        <p className="mt-2 text-slate-600">Partners estratégicos seleccionados para ofrecer aberturas premium en cada proyecto.</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, i) => (
            <article
              key={brand.name}
              onMouseEnter={() => setActive(brand)}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              style={{ animation: `fadeIn .45s ease ${i * 70}ms both` }}
            >
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#143D70] text-base font-bold text-white">{brand.name.slice(0,2)}</div>
              <h3 className="text-sm font-extrabold tracking-wide text-[#102c4f]">{brand.name}</h3>
              <p className="mt-2 text-xs text-slate-600">{brand.desc}</p>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#143D70]">Marca destacada</p>
          <h2 className="mt-3 text-2xl font-black text-[#102c4f]">{active.name}</h2>
          <p className="mt-3 text-sm text-slate-600">{active.desc}</p>
          <button className="mt-5 rounded-full bg-[#143D70] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#102f55]">Ver productos compatibles</button>
        </aside>
      </section>

      <style>{`@keyframes fadeIn { from {opacity:0; transform: translateY(16px);} to {opacity:1; transform: translateY(0);} }`}</style>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
