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
    if (cards.length === 0) return;

    gsap.set(cards, { clearProps: 'opacity,transform' });
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.06,
        clearProps: 'opacity,transform'
      }
    );
  }, { scope: ref, dependencies: [products.length] });

  useGSAP(() => {
    const state = Flip.getState('.product-card');
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.03
      });
    });
  }, { scope: ref, dependencies: [products.map((p) => p.id).join(',')] });

  return <div ref={ref} className="grid grid-cols-1 items-start justify-items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map((product)=><ProductCard key={product.id} product={product} />)}</div>;
}
