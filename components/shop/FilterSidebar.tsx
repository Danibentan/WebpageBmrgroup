'use client';
import { useRef } from 'react';
import { useGSAP } from '@/lib/useGSAP';
import { gsap } from '@/lib/gsap';
import { FilterGroup } from './FilterGroup';
import { FilterItem } from './FilterItem';
import type { ShopCategory, ShopMaterial, ShopAvailability } from '@/lib/shop/product-types';

export function FilterSidebar(props: {
  category: ShopCategory; materials: Set<ShopMaterial>; availability: Set<ShopAvailability>;
  onCategory: (c: ShopCategory) => void; onMaterial: (m: ShopMaterial) => void; onAvailability: (a: ShopAvailability) => void;
}) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const activeEl = categoryRef.current?.querySelector('.filter-item.active') as HTMLElement | null;
    if (!activeEl || !indicatorRef.current) return;
    gsap.to(indicatorRef.current, { y: activeEl.offsetTop, height: activeEl.offsetHeight, duration: 0.5, ease: 'expo.out' });
  }, { dependencies: [props.category] });

  useGSAP(() => {
    gsap.fromTo('.filter-item', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.04 });
  }, []);

  return <aside className="filter-sidebar hidden md:block">
    <FilterGroup title="Categoría">
      <div className="category-group" ref={categoryRef}><div ref={indicatorRef} className="active-indicator" />
        <FilterItem label="Todas" count={24} active={props.category==='all'} onClick={() => props.onCategory('all')} />
        <FilterItem label="Ventanas" count={12} active={props.category==='ventanas'} onClick={() => props.onCategory('ventanas')} />
        <FilterItem label="Puertas" count={8} active={props.category==='puertas'} onClick={() => props.onCategory('puertas')} />
        <FilterItem label="Frentes" count={4} active={props.category==='frentes'} onClick={() => props.onCategory('frentes')} />
      </div>
    </FilterGroup>
    <FilterGroup title="Material">
      <FilterItem label="Aluminio" active={props.materials.has('aluminio')} onClick={() => props.onMaterial('aluminio')} />
      <FilterItem label="PVC" active={props.materials.has('pvc')} onClick={() => props.onMaterial('pvc')} />
    </FilterGroup>
    <FilterGroup title="Disponibilidad">
      <FilterItem label="Disponible próximamente" active={props.availability.has('coming-soon')} onClick={() => props.onAvailability('coming-soon')} />
    </FilterGroup>
  </aside>;
}
