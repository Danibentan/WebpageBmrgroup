import Link from 'next/link';

export default function CheckoutPendingPage() {
  return (
    <main className="min-h-screen bg-[#0a1733] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#c9a961]/30 bg-[#0d2141]/80 p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c9a961]">Pago pendiente</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[1.05] text-white md:text-6xl">Tu pago está en revisión</h1>
        <p className="mt-5 text-white/75">Mercado Pago todavía está procesando tu operación. Te notificaremos cuando haya confirmación.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tienda" className="rounded-full bg-[#c9a961] px-5 py-2.5 text-sm font-semibold text-[#0a1733]">
            Volver al carrito
          </Link>
          <Link href="/" className="rounded-full border border-[#c9a961]/50 px-5 py-2.5 text-sm text-[#c9a961]">
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
