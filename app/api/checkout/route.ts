import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

import { getZonaEnvio } from '@/lib/envio';
import { saveOrder } from '@/lib/order-storage';
import type { CheckoutItem, CheckoutPayload, StoredOrder } from '@/lib/order-types';

export const runtime = 'nodejs';

type CheckoutRequestBody = {
  items?: CheckoutItem[];
  payer?: {
    email?: string;
    name?: string;
  };
  checkout?: CheckoutPayload;
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
  return Boolean(item.id && item.title) && item.quantity > 0 && item.unit_price > 0 && Number.isInteger(item.unit_price);
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function validateCheckout(checkout: CheckoutPayload | undefined): string | null {
  if (!checkout) return null;

  if (!checkout.contacto.nombre.trim() || !checkout.contacto.apellido.trim() || !checkout.contacto.email.trim() || !checkout.contacto.telefono.trim()) {
    return 'Faltan datos de contacto.';
  }

  if (!/^\S+@\S+\.\S+$/.test(checkout.contacto.email)) return 'Email inválido.';

  const documentDigits = onlyDigits(checkout.facturacion.documento);
  if (checkout.facturacion.tipo === 'A' && documentDigits.length !== 11) return 'CUIT inválido para Factura A.';
  if ((checkout.facturacion.tipo === 'B' || checkout.facturacion.tipo === 'C') && (documentDigits.length < 7 || documentDigits.length > 11)) {
    return 'DNI/CUIT inválido.';
  }
  if (!checkout.facturacion.nombreFiscal.trim()) return 'Faltan datos fiscales.';

  if (checkout.entrega.metodo === 'envio') {
    const zona = getZonaEnvio(checkout.entrega.zonaId);
    if (!zona) return 'Zona de envío inválida.';
    const { calleNumero, localidad, provincia, codigoPostal } = checkout.entrega.direccion;
    if (!calleNumero.trim() || !localidad.trim() || !provincia.trim() || !codigoPostal.trim()) return 'Faltan datos de dirección.';
  }

  return null;
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

    const checkoutError = validateCheckout(payload.checkout);
    if (checkoutError) return NextResponse.json({ error: checkoutError }, { status: 400 });

    const orderId = payload.checkout ? `bmr-${Date.now()}-${randomUUID().slice(0, 8)}` : undefined;
    const baseItems = items.map((item) => ({ ...item, currency_id: 'ARS' }));
    const preferenceItems: CheckoutItem[] = [...baseItems];
    let storedOrder: StoredOrder | null = null;

    if (payload.checkout && orderId) {
      const entrega = payload.checkout.entrega;
      const zona = entrega.metodo === 'envio' ? getZonaEnvio(entrega.zonaId) : null;
      const envioCosto = entrega.metodo === 'retiro' ? 0 : zona?.costo ?? null;
      const envioItem: CheckoutItem | undefined = zona && typeof zona.costo === 'number' && zona.costo > 0
        ? {
            id: `envio-${zona.id}`,
            title: `Envío - ${zona.nombre}`,
            description: 'Costo de envío BMR Group',
            quantity: 1,
            unit_price: zona.costo,
            currency_id: 'ARS'
          }
        : undefined;

      if (envioItem) preferenceItems.push(envioItem);

      const subtotal = baseItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
      const total = subtotal + (envioItem?.unit_price ?? 0);

      storedOrder = {
        orderId,
        createdAt: new Date().toISOString(),
        status: 'created',
        contacto: payload.checkout.contacto,
        facturacion: payload.checkout.facturacion,
        entrega,
        zona: zona ? { id: zona.id, nombre: zona.nombre, costo: zona.costo, esACoordinar: zona.esACoordinar } : undefined,
        items: baseItems,
        envioItem,
        subtotal,
        envioCosto,
        total
      };

      await saveOrder(storedOrder);
    }

    const baseUrl = getBaseUrl();
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);
    const checkout = payload.checkout;
    const payerName = checkout ? `${checkout.contacto.nombre} ${checkout.contacto.apellido}`.trim() : payload.payer?.name;
    const arsItems = preferenceItems.map((item) => ({ ...item, currency_id: 'ARS' }));
    const identificationDigits = checkout ? onlyDigits(checkout.facturacion.documento) : '';

    const preferenceBody = {
      items: arsItems,
      payer: checkout
        ? {
            name: checkout.contacto.nombre,
            surname: checkout.contacto.apellido,
            email: checkout.contacto.email,
            phone: { number: checkout.contacto.telefono },
            identification: { type: identificationDigits.length === 11 ? 'CUIT' : 'DNI', number: identificationDigits }
          }
        : payload.payer,
      ...(checkout?.entrega.metodo === 'envio'
        ? {
            shipments: {
              receiver_address: {
                street_name: checkout.entrega.direccion.calleNumero,
                zip_code: checkout.entrega.direccion.codigoPostal
              }
            }
          }
        : {}),
      ...(orderId ? { external_reference: orderId } : {}),
      back_urls: {
        success: `${baseUrl}/checkout/success`,
        failure: `${baseUrl}/checkout/failure`,
        pending: `${baseUrl}/checkout/pending`
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/mercadopago/webhook`
    };

    const preferenceResponse = await preference.create({ body: preferenceBody as never });

    return NextResponse.json(
      {
        id: preferenceResponse.id,
        orderId: storedOrder?.orderId,
        payerName,
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
