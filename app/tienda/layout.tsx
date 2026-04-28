import { CartButton } from '@/components/tienda/CartButton';
import { CartDrawer } from '@/components/tienda/CartDrawer';
import { CartHydration } from '@/components/tienda/CartHydration';

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartHydration />
      {children}
      <CartButton />
      <CartDrawer />
    </>
  );
}
