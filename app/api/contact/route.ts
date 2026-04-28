import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    console.log('[CONTACT] New request', body);

    // TODO: integrar con servicio de email (Resend, SendGrid) o forwarding a info@bmrgroup.com.ar.
    // TODO: integrar con Google Calendar para crear evento de visita técnica.

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[CONTACT] Invalid payload', error);
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }
}
