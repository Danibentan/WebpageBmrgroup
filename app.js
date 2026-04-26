const { useMemo, useState } = React;

const WINDOW_TYPES = {
  modena: { label: 'Módena', bars: 'vertical' },
  a40: { label: 'A40', bars: 'grid' },
  fijo: { label: 'Ventanal Fijo', bars: 'none' }
};

const COLORS = {
  blanco: { label: 'Blanco', frame: '#F6F7F8' },
  roble: { label: 'Madera Roble', frame: '#A87444' },
  negro: { label: 'Negro Mate', frame: '#1D232B' },
  verde: { label: 'Verde Country', frame: '#4B6656' }
};

const MATERIALS = {
  pvc: { label: 'PVC', finish: 'Satinado' },
  aluminio: { label: 'Aluminio', finish: 'Microtexturado' },
  madera: { label: 'Madera', finish: 'Natural Premium' }
};

function OptionGroup({ title, options, selected, onSelect }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</h3>
      <div className="grid gap-2">
        {Object.entries(options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`rounded-xl border px-3 py-2 text-left transition ${
              selected === key
                ? 'border-bmrBlue bg-bmrBlue text-white shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:border-bmrOrange hover:text-slate-900'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WindowOverlay({ type, color, material }) {
  const bars = useMemo(() => {
    if (type === 'modena') {
      return <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 bg-white/55" />;
    }

    if (type === 'a40') {
      return (
        <>
          <div className="absolute inset-y-0 left-1/2 w-[4px] -translate-x-1/2 bg-white/55" />
          <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 bg-white/55" />
        </>
      );
    }

    return null;
  }, [type]);

  const texture = material === 'madera'
    ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.03) 6px, rgba(0,0,0,0.08) 8px)'
    : material === 'aluminio'
    ? 'linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0.04))'
    : 'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.12))';

  return (
    <div className="relative h-[320px] w-[280px] rounded-md shadow-premium" style={{ backgroundColor: color, padding: '16px' }}>
      <div className="relative h-full w-full rounded-[2px] border border-white/30 bg-sky-100/20 backdrop-blur-sm">
        <div className="absolute inset-0" style={{ backgroundImage: texture, mixBlendMode: 'overlay' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 to-sky-950/30" />
        {bars}
      </div>
    </div>
  );
}

function App() {
  const [windowType, setWindowType] = useState('modena');
  const [frameColor, setFrameColor] = useState('blanco');
  const [material, setMaterial] = useState('pvc');

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px,1fr]">
        <aside className="rounded-2xl bg-white p-6 shadow-premium">
          <img src="assets/bmr-logo.svg" alt="BMR Group" className="mb-5 h-12 w-12 rounded-xl" />
          <h1 className="text-2xl font-bold text-bmrBlue">Configurador de Ventanas Premium</h1>
          <p className="mb-6 mt-2 text-sm text-slate-600">Visualizá en tiempo real cómo quedaría tu abertura en una fachada estilo country.</p>

          <div className="space-y-6">
            <OptionGroup title="Tipo de ventana" options={WINDOW_TYPES} selected={windowType} onSelect={setWindowType} />
            <OptionGroup title="Color del marco" options={COLORS} selected={frameColor} onSelect={setFrameColor} />
            <OptionGroup title="Material" options={MATERIALS} selected={material} onSelect={setMaterial} />
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p><span className="font-semibold">Modelo:</span> {WINDOW_TYPES[windowType].label}</p>
            <p><span className="font-semibold">Color:</span> {COLORS[frameColor].label}</p>
            <p><span className="font-semibold">Material:</span> {MATERIALS[material].label} · {MATERIALS[material].finish}</p>
          </div>

          <button className="mt-5 w-full rounded-xl bg-bmrBlue px-4 py-3 font-semibold text-white transition hover:bg-[#0f335f]">Previsualizar proyecto</button>
        </aside>

        <section className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-premium">
          <img
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=2000&q=80"
            alt="Fachada casa estilo country"
            className="h-[760px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

          <div className="absolute left-[54%] top-[50%] -translate-x-1/2 -translate-y-1/2">
            <WindowOverlay
              type={windowType}
              color={COLORS[frameColor].frame}
              material={material}
            />
          </div>

          <div className="absolute bottom-5 left-5 rounded-xl bg-white/85 px-4 py-3 backdrop-blur">
            <p className="text-sm font-semibold text-bmrBlue">Vista previa en tiempo real</p>
            <p className="text-xs text-slate-600">Línea Premium · {WINDOW_TYPES[windowType].label}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
