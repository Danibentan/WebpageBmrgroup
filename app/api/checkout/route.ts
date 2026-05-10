import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export const runtime = 'nodejs';

type CheckoutItem = {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
};

type CheckoutRequestBody = {
  items?: CheckoutItem[];
  payer?: {
    email?: string;
    name?: string;
  };
};

function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    return configured.startsWith('http') ? configured : `https://${configured}`;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
  }

  return 'http://localhost:3000';
}

function isValidItem(item: CheckoutItem): boolean {
  return Boolean(item.id && item.title) && item.quantity > 0 && item.unit_price > 0;
}

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Falta MP_ACCESS_TOKEN en variables de entorno de Vercel.' },
        { status: 503 }
      );
    }

    const payload = (await request.json()) as CheckoutRequestBody;
    const items = payload.items ?? [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Debes enviar al menos un ítem para pagar.' }, { status: 400 });
    }

    const invalidItem = items.find((item) => !isValidItem(item));
    if (invalidItem) {
      return NextResponse.json(
        {
          error:
            'Hay ítems inválidos en el checkout. Verificá id/title y que quantity/unit_price sean mayores a 0.'
        },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);
    const arsItems = items.map((item) => ({ ...item, currency_id: 'ARS' }));

    const preferenceResponse = await preference.create({
      body: {
        items: arsItems,
        payer: payload.payer,
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/mercadopago/webhook`
      }
    });

    return NextResponse.json(
      {
        id: preferenceResponse.id,
        init_point: preferenceResponse.init_point,
        sandbox_init_point: preferenceResponse.sandbox_init_point
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[MP][checkout] Error creating preference', error);
    return NextResponse.json(
      { error: 'No se pudo crear la preferencia de pago en Mercado Pago.' },
      { status: 500 }
    );
  }
}
