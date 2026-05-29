'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, type MouseEvent } from 'react';
import { gsap } from '@/lib/gsap';
import type { ShopProduct } from '@/lib/shop/product-types';
import type { ProductVariant } from '@/types/product';
import { SizeDropdown } from './SizeDropdown';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

export function ProductCard({ product }: { product: ShopProduct }) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [coverFailed, setCoverFailed] = useState(false);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches;
  const isCustom = selectedVariant.type === 'custom';
  const displayPrice = typeof product.priceFrom === 'number' ? product.priceFrom : null;
  const isPurchasable = Boolean(product.disponibleParaCompra && displayPrice && displayPrice > 0);

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

    if (isCustom && isPurchasable) {
      window.location.href = `/contacto?producto=${product.id}&medida=custom`;
      return;
    }

    if (isPurchasable) {
      window.location.href = `/tienda/${product.slug}`;
    }
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
        {product.imagenPortada && !coverFailed ? (
          <div ref={imageRef} className="product-card__image">
            <Image
              src={product.imagenPortada}
              alt={product.imagenAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              onError={() => setCoverFailed(true)}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#14223D]" role="img" aria-label={`Imagen pendiente para ${product.name}`}>
            <p className="font-editorial text-2xl text-[#F4EEDE]">Próximamente</p>
          </div>
        )}
        <div ref={overlayRef} className="product-card__overlay" />
        {product.featured ? <div className="product-card__badge">Nuevo</div> : null}
      </div>
      <div className="product-card__body z-[2] flex-1">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__subtitle">{product.description}</p>

        {isPurchasable ? (
          <p className="mt-3 font-editorial text-2xl italic text-[#14223D]">{formatPrice(displayPrice ?? 0)}</p>
        ) : null}

        <div className="relative z-[3]" onClick={(event) => event.stopPropagation()}>
          <SizeDropdown variants={product.variants} onChange={setSelectedVariant} />
        </div>

        <button
          className={`product-card__cta ${isPurchasable ? 'product-card__cta--active' : ''}`}
          aria-disabled={!isPurchasable}
          disabled={!isPurchasable}
          onClick={handleCtaClick}
        >
          <i className={`ti ${isCustom && isPurchasable ? 'ti-mail' : 'ti-shopping-bag'}`} aria-hidden="true" />
          {isPurchasable ? (isCustom ? 'Solicitar cotización' : 'Comprar') : 'Próximamente'}
        </button>
      </div>
    </article>
  );
}
