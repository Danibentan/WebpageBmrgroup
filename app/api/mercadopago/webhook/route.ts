import crypto from 'node:crypto';

import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export const runtime = 'nodejs';

type WebhookBody = {
  action?: string;
  data?: { id?: string | number };
  id?: string | number;
  live_mode?: boolean;
  type?: string;
};

function parseSignature(signatureHeader: string): { ts?: string; v1?: string } {
  return signatureHeader.split(',').reduce<{ ts?: string; v1?: string }>((acc, chunk) => {
    const [rawKey, rawValue] = chunk.split('=');
    const key = rawKey?.trim();
    const value = rawValue?.trim();
    if (!key || !value) return acc;
    if (key === 'ts') acc.ts = value;
    if (key === 'v1') acc.v1 = value;
    return acc;
  }, {});
}

function verifySignature(params: {
  secret: string;
  signatureHeader: string;
  requestId: string;
  dataId: string;
}): boolean {
  const { secret, signatureHeader, requestId, dataId } = params;
  const { ts, v1 } = parseSignature(signatureHeader);
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  return expected === v1;
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);

  try {
    const payload = (await request.json()) as WebhookBody;
    const topic = requestUrl.searchParams.get('topic') ?? requestUrl.searchParams.get('type');
    const resourceId = requestUrl.searchParams.get('id') ?? requestUrl.searchParams.get('data.id');
    const paymentId = payload.data?.id ?? payload.id ?? resourceId;

    if (topic && topic !== 'payment' && payload.type && payload.type !== 'payment') {
      return NextResponse.json({ received: true, ignored: true, topic }, { status: 200 });
    }

    if (!paymentId) {
      return NextResponse.json({ received: true, ignored: true, reason: 'missing_payment_id' }, { status: 200 });
    }

    const webhookSecret = process.env.MP_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signatureHeader = request.headers.get('x-signature') ?? '';
      const requestId = request.headers.get('x-request-id') ?? '';

      if (!signatureHeader || !requestId) {
        console.error('[MP][webhook] Missing signature headers', {
          hasSignature: Boolean(signatureHeader),
          hasRequestId: Boolean(requestId)
        });

        return NextResponse.json({ error: 'Headers de firma incompletos.' }, { status: 401 });
      }

      const valid = verifySignature({
        secret: webhookSecret,
        signatureHeader,
        requestId,
        dataId: String(paymentId)
      });

      if (!valid) {
        return NextResponse.json({ error: 'Firma inválida en webhook de Mercado Pago.' }, { status: 401 });
      }
    }

    let paymentStatus = 'unknown';
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (accessToken) {
      try {
        const client = new MercadoPagoConfig({ accessToken });
        const paymentClient = new Payment(client);
        const payment = await paymentClient.get({ id: String(paymentId) });
        paymentStatus = String(payment.status ?? 'unknown');
      } catch (error) {
        console.error('[MP][webhook] Error retrieving payment detail', error);
      }
    }

    console.log('[MP][webhook] payment update', {
      paymentId: String(paymentId),
      status: paymentStatus,
      type: payload.type,
      action: payload.action,
      live_mode: payload.live_mode
    });

    // TODO: persistir paymentId + status en base de datos para reconciliación de órdenes.
    // TODO: implementar lógica idempotente de actualización de órdenes por paymentId.

    return NextResponse.json({ received: true, paymentId: String(paymentId), status: paymentStatus }, { status: 200 });
  } catch (error) {
    console.error('[MP][webhook] Invalid payload', error);
    return NextResponse.json({ received: true, ignored: true, reason: 'invalid_payload' }, { status: 200 });
  }
}
