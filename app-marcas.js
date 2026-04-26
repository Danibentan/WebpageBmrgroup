const brands = [
  'ALUAR', 'HYDRO', 'HAHN', 'ROTO', 'DVH SAINT-GOBAIN', 'SILESTONE GLASS', 'CORTIZO', 'TECHNAL'
];

function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <a href="index.html" className="mb-8 inline-block text-sm font-bold text-[#143D70]">← Volver al inicio</a>
      <header className="mb-8">
        <h1 className="text-4xl font-black text-[#102c4f]">Marcas con las que trabajamos</h1>
        <p className="mt-2 text-slate-600">Seleccionamos proveedores líderes para garantizar rendimiento, estética y durabilidad premium.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand, i) => (
          <article key={brand} className="rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg" style={{ animation: `fadeIn .45s ease ${i * 80}ms both` }}>
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#143D70] text-lg font-bold text-white">{brand.slice(0,2)}</div>
            <h3 className="text-sm font-extrabold tracking-wide text-[#102c4f]">{brand}</h3>
          </article>
        ))}
      </section>

      <style>{`@keyframes fadeIn { from {opacity:0; transform: translateY(16px);} to {opacity:1; transform: translateY(0);} }`}</style>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
