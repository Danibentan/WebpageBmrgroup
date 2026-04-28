import Link from 'next/link';

type SuccessProps = {
  searchParams?: {
    payment_id?: string;
    status?: string;
    status_code?: string;
  };
};

export default function CheckoutSuccessPage({ searchParams }: SuccessProps) {
  const paymentId = searchParams?.payment_id ?? 'N/D';
  const statusCode = searchParams?.status_code ?? searchParams?.status ?? 'N/D';

  return (
    <main className="min-h-screen bg-[#0a1733] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#c9a961]/30 bg-[#0d2141]/80 p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#c9a961]">Pago confirmado</p>
        <h1 className="mt-4 font-editorial text-5xl leading-[1.05] text-white md:text-6xl">Gracias por tu compra</h1>
        <p className="mt-5 text-white/75">Mercado Pago informó que tu pago fue aprobado.</p>

        <div className="mt-8 space-y-3 rounded-xl border border-white/10 bg-black/20 p-5 text-sm">
          <p>
            <span className="text-white/60">payment_id:</span> <span className="text-[#c9a961]">{paymentId}</span>
          </p>
          <p>
            <span className="text-white/60">status_code:</span> <span className="text-[#c9a961]">{statusCode}</span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tienda" className="rounded-full bg-[#c9a961] px-5 py-2.5 text-sm font-semibold text-[#0a1733]">
            Seguir comprando
          </Link>
          <Link href="/" className="rounded-full border border-[#c9a961]/50 px-5 py-2.5 text-sm text-[#c9a961]">
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
