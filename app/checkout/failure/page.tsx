import Link from 'next/link';

export default function CheckoutFailurePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#c9a961]/30 bg-[color:var(--bg-elevated-1)]/80 p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c9a961]">Pago rechazado</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[1.05] text-white md:text-6xl">No pudimos completar el pago</h1>
        <p className="mt-5 text-white/75">Revisá el medio de pago y volvé a intentarlo desde tu carrito.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tienda" className="rounded-full bg-[#c9a961] px-5 py-2.5 text-sm font-semibold text-[#0a1733]">
            Volver al carrito
          </Link>
          <Link href="/checkout/pending" className="rounded-full border border-[#c9a961]/50 px-5 py-2.5 text-sm text-[#c9a961]">
            Ver estado pendiente
          </Link>
        </div>
      </div>
    </main>
  );
}
