'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const categorias = [
  { id: 'todas', label: 'Todas', count: 24 },
  { id: 'ventanas', label: 'Ventanas', count: 12 },
  { id: 'puertas', label: 'Puertas', count: 8 },
  { id: 'frentes', label: 'Frentes', count: 4 }
];

const materiales = ['Aluminio', 'PVC', 'Madera'];

function SidebarContent({ categoria, setCategoria }: { categoria: string; setCategoria: (value: string) => void }) {
  return (
    <div className="space-y-8 text-sm">
      <div>
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a961]">Categoría</p>
        <ul className="space-y-2">
          {categorias.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={categoria === cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`pl-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50 ${
                  categoria === cat.id ? 'border-l-2 border-[#c9a961] text-[#c9a961]' : 'text-white/65 hover:text-white'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a961]">Material</p>
        <ul className="space-y-2">
          {materiales.map((mat) => (
            <li key={mat}>
              <button
                type="button"
                className="pl-2 text-white/65 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
              >
                {mat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a961]">Precio</p>
        <p className="text-xs text-white/55">USD 200 — USD 2.500</p>
      </div>
    </div>
  );
}

export function ShopSidebar() {
  const [categoria, setCategoria] = useState('todas');
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-[#c9a961]/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
        >
          <SlidersHorizontal size={14} /> Filtros
        </button>
      </div>

      <motion.aside
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="hidden md:block"
      >
        <SidebarContent categoria={categoria} setCategoria={setCategoria} />
      </motion.aside>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Filtros de tienda">
          <button type="button" className="absolute inset-0 bg-[#020816]/80" aria-label="Cerrar filtros" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={{ duration: 0.35 }}
            className="relative h-full w-[86%] max-w-xs border-r border-[#c9a961]/20 bg-[#0a1733] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-[#c9a961]">Filtros</p>
              <button
                type="button"
                className="rounded-full border border-[#c9a961]/40 p-2 text-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/50"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar filtros"
              >
                <X size={14} />
              </button>
            </div>
            <SidebarContent categoria={categoria} setCategoria={setCategoria} />
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
