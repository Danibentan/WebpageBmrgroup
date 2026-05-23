'use client';

import { useEffect, useRef } from 'react';

type Layer = {
  text: string;
  size: number;
  top: string;
  speed: number;
  opacity: number;
  color: string;
  italic: boolean;
};

const LAYERS: Layer[] = [
  { text: 'ABERTURAS · VIDRIO · ALUMINIO · MARCO · ', size: 200, top: '8%', speed: 0.3, opacity: 0.06, color: '#0F0F1E', italic: false },
  { text: 'CERRAMIENTOS · DVH · PVC · TEMPLADO · ', size: 140, top: '30%', speed: -0.5, opacity: 0.09, color: '#C8A86B', italic: true },
  { text: 'DISEÑO · OBRA · DETALLE · LUZ · ', size: 240, top: '55%', speed: 0.4, opacity: 0.05, color: '#0F0F1E', italic: false },
  { text: 'BMR ·  · BUENOS AIRES· ESCOBAR · ', size: 90, top: '78%', speed: -0.8, opacity: 0.14, color: '#C8A86B', italic: true }
];

export default function KineticBackground() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<number[]>(LAYERS.map(() => 0));
  const mouseInfluence = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const isMobile = window.innerWidth < 768;
    const speedMul = isMobile ? 0.6 : 1;

    const onMove = (e: MouseEvent) => {
      mouseInfluence.current = e.clientX / window.innerWidth - 0.5;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const accel = 1 + Math.abs(mouseInfluence.current) * 1.5;

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const layer = LAYERS[i];
        positions.current[i] -= layer.speed * accel * speedMul;

        const halfW = el.offsetWidth / 2;
        if (positions.current[i] < -halfW) positions.current[i] = 0;
        if (positions.current[i] > 0) positions.current[i] = -halfW;

        el.style.transform = `translate3d(${positions.current[i]}px, 0, 0)`;
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#F5EFE0'
      }}
    >
      {LAYERS.map((layer, i) => (
        <div
          key={layer.text}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            top: layer.top,
            whiteSpace: 'nowrap',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: `clamp(${layer.size * 0.5}px, ${layer.size / 14.4}vw, ${layer.size}px)`,
            fontWeight: 700,
            letterSpacing: '-3px',
            color: layer.color,
            opacity: layer.opacity,
            fontStyle: layer.italic ? 'italic' : 'normal',
            willChange: 'transform'
          }}
        >
          {layer.text.repeat(8)}
        </div>
      ))}
    </div>
  );
}
