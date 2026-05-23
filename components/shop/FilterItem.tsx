'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Props = { label: string; count?: number; active: boolean; onClick: () => void };

export function FilterItem({ label, count, active, onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <button
      ref={ref}
      className={`filter-item liquid-glass ${active ? 'active liquid-glass--active' : ''}`}
      aria-pressed={active}
      onMouseEnter={() => {
        if (reduced) return;
        gsap.to(ref.current, { x: 4, duration: 0.25, ease: 'power2.out' });
        gsap.fromTo(shimmerRef.current, { xPercent: -120 }, { xPercent: 120, duration: 0.7, ease: 'power2.inOut', delay: 0.1 });
      }}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })}
      onClick={() => {
        if (!reduced) {
          gsap.timeline().to(ref.current, { scale: 0.96, duration: 0.08 }).to(ref.current, { scale: 1.04, duration: 0.18 }).to(ref.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1.2,0.5)' });
          if (countRef.current) gsap.fromTo(countRef.current, { scale: 1.25 }, { scale: 1, duration: 0.35, ease: 'elastic.out(1.4,0.5)' });
        }
        onClick();
      }}
    >
      <span ref={shimmerRef} className="filter-item__shimmer" aria-hidden />
      <span>{label}</span>
      {count !== undefined ? <span ref={countRef} className="count">{count}</span> : null}
    </button>
  );
}
