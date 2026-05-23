'use client';

import { type ElementType, type MouseEvent, type ReactNode, useRef, useState } from 'react';
import { useGSAP } from '@/lib/useGSAP';

import { gsap } from '@/lib/gsap';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp';

type LiquidButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'onClick' | 'className'>;

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'lb-primary', secondary: 'lb-secondary', ghost: 'lb-ghost', outline: 'lb-outline', whatsapp: 'lb-whatsapp'
};

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function LiquidButton<T extends ElementType = 'button'>({ as, children, variant = 'primary', className = '', onClick, ...rest }: LiquidButtonProps<T>) {
  const Tag = (as ?? 'button') as ElementType;
  const btnRef = useRef<HTMLElement | null>(null);
  const shimmerRef = useRef<HTMLSpanElement | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useGSAP(() => {
    if (!btnRef.current || prefersReducedMotion()) return;
    gsap.fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 });
  }, { scope: btnRef });

  const handleEnter = () => {
    if (!btnRef.current || prefersReducedMotion()) return;
    gsap.to(btnRef.current, { scale: 1.04, y: -2, duration: 0.25, ease: 'power2.out' });
    if (shimmerRef.current) {
      gsap.fromTo(shimmerRef.current, { xPercent: -120 }, { xPercent: 120, duration: 0.7, ease: 'power2.inOut', delay: 0.1 });
    }
  };
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    if (!btnRef.current || prefersReducedMotion()) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;
    const dx = Math.max(-8, Math.min(8, (relX - rect.width / 2) * 0.15));
    const dy = Math.max(-8, Math.min(8, (relY - rect.height / 2) * 0.15));
    gsap.to(btnRef.current, { x: dx, y: dy - 2, duration: 0.4, ease: 'power3.out' });
    btnRef.current.style.setProperty('--mx', `${(relX / rect.width) * 100}%`);
    btnRef.current.style.setProperty('--my', `${(relY / rect.height) * 100}%`);
  };
  const handleLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { scale: 1, x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
  };
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (!btnRef.current || prefersReducedMotion()) {
      onClick?.(event);
      return;
    }
    const rect = btnRef.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    gsap.to(btnRef.current, { scale: 0.94, duration: 0.08, ease: 'power2.out', onComplete: () => {
      gsap.to(btnRef.current, { scale: 1.04, duration: 0.5, ease: 'elastic.out(1.2, 0.5)' });
    }});
    onClick?.(event);
  };

  return (
    <Tag
      ref={btnRef}
      className={`liquid-btn ${VARIANT_STYLES[variant]} ${className}`}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      {...rest}
    >
      <span ref={shimmerRef} className="liquid-btn__shimmer" aria-hidden />
      <span className="liquid-btn__spotlight" aria-hidden />
      <span className="liquid-btn__content">{children}</span>
      {ripples.map((ripple) => <span key={ripple.id} className="liquid-btn__ripple" style={{ left: ripple.x, top: ripple.y }} />)}
    </Tag>
  );
}
