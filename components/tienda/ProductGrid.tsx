'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { products } from '@/lib/products';
import { ProductCard } from './ProductCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
};

export function ProductGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={reduceMotion ? undefined : containerVariants}
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : 'visible'}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index === 0} />
      ))}
    </motion.div>
  );
}
