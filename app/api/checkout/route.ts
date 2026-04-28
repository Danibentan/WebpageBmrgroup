import { NextResponse } from 'next/server';

import type { CartItem } from '@/types/product';

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items?: CartItem[] };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }

    const hasPayableItem = items.some((item) => item.priceUnit !== 'consultar');
    if (!hasPayableItem) {
      return NextResponse.json({ error: 'No hay items pagables en el carrito' }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          'Checkout no configurado. Definí las credenciales de Mercado Pago en Vercel para habilitar pagos.'
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ error: 'Payload inválido en checkout' }, { status: 400 });
  }
}
