import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  formType?: 'asesoramiento' | 'corporativo';
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
  zona?: string;
  horario?: string;
  fecha?: string;
  comentarios?: string;
  empresa?: string;
  segmento?: string;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const requiredByType: Record<'asesoramiento' | 'corporativo', Array<keyof ContactPayload>> = {
  asesoramiento: ['nombre', 'apellido', 'telefono', 'email', 'zona', 'horario', 'fecha'],
  corporativo: ['empresa', 'segmento', 'email']
};

const buildHtml = (payload: ContactPayload) => {
  const rows = Object.entries(payload)
    .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 10px;font-weight:600;border-bottom:1px solid #ececec">${escapeHtml(key)}</td><td style="padding:6px 10px;border-bottom:1px solid #ececec">${escapeHtml(value as string)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#1a1a1a">
      <h2>Nueva consulta desde web</h2>
      <table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table>
    </div>
  `;
};

async function sendWithResend(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error('Faltan variables RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
  }

  const formType = payload.formType === 'corporativo' ? 'Corporativo' : 'Asesoramiento';
  const subject = `[Web] ${formType} - ${payload.empresa || `${payload.nombre || ''} ${payload.apellido || ''}`.trim()}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      html: buildHtml(payload)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend error ${response.status}: ${errorText}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const formType = body.formType === 'corporativo' ? 'corporativo' : 'asesoramiento';

    const missing = requiredByType[formType].filter((field) => !String(body[field] ?? '').trim());
    if (missing.length > 0) {
      return NextResponse.json({ error: `Faltan campos requeridos: ${missing.join(', ')}` }, { status: 400 });
    }

    await sendWithResend({ ...body, formType });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('[CONTACT] Error submitting contact form', error);
    return NextResponse.json({ error: 'No pudimos enviar el formulario.' }, { status: 500 });
  }
}
