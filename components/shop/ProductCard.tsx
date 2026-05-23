'use client';
import { useRef, type MouseEvent } from 'react';
import { ShoppingBag } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import LiquidButton from '@/components/ui/LiquidButton';
import type { ShopProduct } from '@/lib/shop/product-types';

export function ProductCard({ product }: { product: ShopProduct }) {
  const cardRef = useRef<HTMLElement>(null); const imageRef = useRef<HTMLImageElement>(null); const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches;
  const move = (e: MouseEvent<HTMLElement>) => {
    if (reduced || isTouch || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect(); const x = e.clientX-r.left; const y=e.clientY-r.top; const cx=r.width/2; const cy=r.height/2;
    gsap.to(cardRef.current,{rotateY:((x-cx)/cx)*6,rotateX:-((y-cy)/cy)*6,transformPerspective:1200,duration:0.5,ease:'power2.out'});
    if (imageRef.current) gsap.to(imageRef.current,{x:-(x-cx)*0.04,y:-(y-cy)*0.04,duration:0.5,ease:'power2.out'});
  };
  return <article ref={cardRef} className="product-card" onMouseMove={move} onMouseEnter={()=>{ if(!reduced){ gsap.to(imageRef.current,{scale:1.06,duration:.6}); gsap.to(overlayRef.current,{opacity:1,duration:.4}); }}} onMouseLeave={()=>{ gsap.to(cardRef.current,{rotateX:0,rotateY:0,duration:.8,ease:'elastic.out(1,.5)'}); gsap.to(imageRef.current,{x:0,y:0,scale:1,duration:.8,ease:'elastic.out(1,.5)'}); gsap.to(overlayRef.current,{opacity:0,duration:.4}); }} aria-label={product.name}>
    <div className="product-card__media">
      <img ref={imageRef} className="product-card__image" src={product.image} alt={product.name} />
      <div ref={overlayRef} className="product-card__overlay" />
      {product.featured ? <div className="product-card__badge">Nuevo</div> : null}
      <span className="product-card__category">BMR Premium</span>
    </div>
    <div className="product-card__body"><h3 className="product-card__title">{product.name}</h3><p className="product-card__subtitle">{product.description}</p><div style={{transform:'translateZ(20px)'}}><LiquidButton variant="outline" className="product-card__cta"><ShoppingBag size={14} /> {product.available ? 'Cotizar' : 'Próximamente'}</LiquidButton></div></div>
  </article>;
}
