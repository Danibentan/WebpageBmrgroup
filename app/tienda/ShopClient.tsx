'use client';
import { products } from '@/lib/products';
import { useShopFilters } from '@/lib/shop/useShopFilters';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ProductGrid } from '@/components/shop/ProductGrid';

const shopProducts = products.map((p) => ({ ...p, available: false, specs: p.description }));

export function ShopClient() {
  const { category, materials, availability, filteredProducts, updateCategory, toggleMaterial, toggleAvailability } = useShopFilters(shopProducts);
  return <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr]"><FilterSidebar category={category} materials={materials} availability={availability} onCategory={updateCategory} onMaterial={toggleMaterial} onAvailability={toggleAvailability} /><ProductGrid products={filteredProducts} /></div>;
}
