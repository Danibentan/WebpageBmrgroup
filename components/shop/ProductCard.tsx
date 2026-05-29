'use client';

import Link from 'next/link';
import { useRef, useState, type MouseEvent } from 'react';
import { gsap } from '@/lib/gsap';
import type { ShopProduct } from '@/lib/shop/product-types';
import type { ProductVariant } from '@/types/product';
import { SizeDropdown } from './SizeDropdown';

export function ProductCard({ product }: { product: ShopProduct }) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches;
  const isCustom = selectedVariant.type === 'custom';

  const move = (event: MouseEvent<HTMLElement>) => {
    if (reduced || isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(cardRef.current, { rotateY: ((x - cx) / cx) * 6, rotateX: -((y - cy) / cy) * 6, transformPerspective: 1200, duration: 0.5, ease: 'power2.out' });
    if (imageRef.current) gsap.to(imageRef.current, { x: -(x - cx) * 0.04, y: -(y - cy) * 0.04, duration: 0.5, ease: 'power2.out' });
  };

  const handleCtaClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isCustom) return;

    window.location.href = `/contacto?producto=${product.id}&medida=custom`;
  };

  return (
    <article
      ref={cardRef}
      className="product-card group h-full"
      onMouseMove={move}
      onMouseEnter={() => {
        if (!reduced) {
          gsap.to(imageRef.current, { scale: 1.06, duration: 0.6 });
          gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
        }
      }}
      onMouseLeave={() => {
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1,.5)' });
        gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'elastic.out(1,.5)' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
      }}
      aria-label={product.name}
    >
      <Link
        href={`/tienda/${product.slug}`}
        aria-label={`Ver detalle de ${product.name}`}
        className="absolute inset-0 z-[1] rounded-[18px] focus:outline-none focus:ring-2 focus:ring-[#B8924A] focus:ring-offset-2 focus:ring-offset-[#F4EEDE]"
      />
      <div className="product-card__image-wrapper transition duration-300 group-hover:brightness-[1.03]">
        <img ref={imageRef} className="product-card__image" src={product.image} alt={product.name} />
        <div ref={overlayRef} className="product-card__overlay" />
        {product.featured ? <div className="product-card__badge">Nuevo</div> : null}
      </div>
      <div className="product-card__body z-[2] flex-1">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__subtitle">{product.description}</p>

        <div className="relative z-[3]" onClick={(event) => event.stopPropagation()}>
          <SizeDropdown variants={product.variants} onChange={setSelectedVariant} />
        </div>

        <button className={`product-card__cta ${isCustom ? 'product-card__cta--active' : ''}`} aria-disabled={!isCustom} onClick={handleCtaClick}>
          <i className={`ti ${isCustom ? 'ti-mail' : 'ti-shopping-bag'}`} aria-hidden="true" />
          {isCustom ? 'Solicitar cotización' : 'Próximamente'}
        </button>
      </div>
    </article>
  );
}
