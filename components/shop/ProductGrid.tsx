'use client';
import { useRef } from 'react';
import { useGSAP } from '@/lib/useGSAP';
import { Flip, gsap } from '@/lib/gsap';
import { ProductCard } from './ProductCard';
import type { ShopProduct } from '@/lib/shop/product-types';

export function ProductGrid({ products }: { products: ShopProduct[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.product-card');
    cards.forEach((card, i) => { gsap.fromTo(card,{opacity:0,y:40,scale:.95},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out',delay:(i%3)*.08,scrollTrigger:{trigger:card,start:'top 88%',toggleActions:'play none none none'}}); });
  }, { scope: ref, dependencies: [products.length] });

  useGSAP(() => {
    const state = Flip.getState('.product-card');
    requestAnimationFrame(() => { Flip.from(state,{duration:.6,ease:'power3.inOut',stagger:.04,absolute:true}); });
  }, { scope: ref, dependencies: [products.map((p)=>p.id).join(',')] });

<<<<<<< codex/fix-that-error-uukcbp
  return <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map((product)=><ProductCard key={product.id} product={product} />)}</div>;
=======
  return <div ref={ref} className="grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-6">{products.map((product)=><ProductCard key={product.id} product={product} />)}</div>;
>>>>>>> main
}
