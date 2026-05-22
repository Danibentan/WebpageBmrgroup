import { CartButton } from '@/components/tienda/CartButton';
import { CartDrawer } from '@/components/tienda/CartDrawer';
import { CartHydration } from '@/components/tienda/CartHydration';
import { SHOP_CHECKOUT_ENABLED } from '@/lib/feature-flags';

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {SHOP_CHECKOUT_ENABLED ? (
        <>
          <CartHydration />
          <CartButton />
          <CartDrawer />
        </>
      ) : null}
    </>
  );
}
