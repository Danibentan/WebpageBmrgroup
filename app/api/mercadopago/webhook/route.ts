import crypto from 'node:crypto';

import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

import { getOrder, markOrderApproved, markOrderNotified } from '@/lib/order-storage';
import { sendApprovedOrderEmail } from '@/lib/order-email';

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
    let externalReference: string | undefined;
    const accessToken = process.env.MP_ACCESS_TOKEN;

    if (accessToken) {
      try {
        const client = new MercadoPagoConfig({ accessToken });
        const paymentClient = new Payment(client);
        const payment = await paymentClient.get({ id: String(paymentId) });
        const paymentDetail = payment as { status?: string | null; external_reference?: string | null };
        paymentStatus = String(paymentDetail.status ?? 'unknown');
        externalReference = paymentDetail.external_reference ? String(paymentDetail.external_reference) : undefined;
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

    if (paymentStatus === 'approved' && externalReference) {
      const order = await getOrder(externalReference);

      if (!order) {
        console.warn('[MP][webhook] Approved payment without stored order', {
          paymentId: String(paymentId),
          externalReference
        });
      } else if (order.notificationSentAt) {
        console.log('[MP][webhook] Approved order already notified, skipping email', {
          paymentId: String(paymentId),
          orderId: order.orderId
        });
      } else {
        const approvedOrder = await markOrderApproved(order.orderId, String(paymentId));

        try {
          await sendApprovedOrderEmail(approvedOrder ?? order);
          await markOrderNotified(order.orderId);
        } catch (error) {
          console.error('[MP][webhook] Error sending approved order email', error);
        }
      }
    }

    return NextResponse.json({ received: true, paymentId: String(paymentId), status: paymentStatus }, { status: 200 });
  } catch (error) {
    console.error('[MP][webhook] Invalid payload', error);
    return NextResponse.json({ received: true, ignored: true, reason: 'invalid_payload' }, { status: 200 });
  }
}
