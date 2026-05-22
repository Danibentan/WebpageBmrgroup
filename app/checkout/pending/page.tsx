import Link from 'next/link';
import LiquidButton from '@/components/ui/LiquidButton';

export default function CheckoutPendingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#c9a961]/30 bg-[color:var(--bg-elevated-1)]/80 p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c9a961]">Pago pendiente</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[1.05] text-white md:text-6xl">Tu pago está en revisión</h1>
        <p className="mt-5 text-white/75">Mercado Pago todavía está procesando tu operación. Te notificaremos cuando haya confirmación.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LiquidButton as={Link} href="/tienda" variant="primary" className="!px-5 !py-2.5 text-sm">
            Volver al carrito
          </LiquidButton>
          <LiquidButton as={Link} href="/" variant="outline" className="!px-5 !py-2.5 text-sm">
            Ir al inicio
          </LiquidButton>
        </div>
      </div>
    </main>
  );
}
