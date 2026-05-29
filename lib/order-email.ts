import type { StoredOrder } from './order-types';

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

function row(label: string, value?: string | number | null) {
  return `<tr><td style="padding:7px 10px;font-weight:700;border-bottom:1px solid #eadfc8">${escapeHtml(label)}</td><td style="padding:7px 10px;border-bottom:1px solid #eadfc8">${escapeHtml(String(value ?? '-'))}</td></tr>`;
}

export function buildOrderEmailHtml(order: StoredOrder) {
  const entrega = order.entrega.metodo === 'retiro'
    ? 'Retiro en fábrica (Escobar)'
    : `Envío a domicilio - ${order.zona?.nombre ?? 'Zona no informada'}`;
  const direccion = order.entrega.metodo === 'envio'
    ? `${order.entrega.direccion.calleNumero}, ${order.entrega.direccion.localidad}, ${order.entrega.direccion.provincia} (${order.entrega.direccion.codigoPostal})${order.entrega.direccion.pisoDepto ? ` - ${order.entrega.direccion.pisoDepto}` : ''}`
    : 'No aplica';
  const itemRows = [...order.items, ...(order.envioItem ? [order.envioItem] : [])]
    .map(
      (item) =>
        `<tr><td style="padding:7px 10px;border-bottom:1px solid #eadfc8">${escapeHtml(item.title)}</td><td style="padding:7px 10px;text-align:center;border-bottom:1px solid #eadfc8">${item.quantity}</td><td style="padding:7px 10px;text-align:right;border-bottom:1px solid #eadfc8">${formatPrice(item.unit_price)}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#14223D;background:#F4EEDE;padding:24px">
      <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-style:italic">Nueva orden aprobada</h1>
      <p style="margin:0 0 20px;color:#6B6655">Orden ${escapeHtml(order.orderId)} · ${escapeHtml(new Date(order.createdAt).toLocaleString('es-AR'))}</p>

      <h2>Contacto</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px;background:#fffaf0">${row('Nombre', `${order.contacto.nombre} ${order.contacto.apellido}`)}${row('Email', order.contacto.email)}${row('Teléfono', order.contacto.telefono)}</table>

      <h2>Facturación</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px;background:#fffaf0">${row('Tipo', `Factura ${order.facturacion.tipo}`)}${row('Documento', order.facturacion.documento)}${row('Nombre/Razón social', order.facturacion.nombreFiscal)}${row('Condición IVA', order.facturacion.condicionIva)}</table>

      <h2>Entrega</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px;background:#fffaf0">${row('Modalidad', entrega)}${row('Dirección', direccion)}${row('Costo envío', order.envioCosto === null ? 'A coordinar' : formatPrice(order.envioCosto))}</table>

      <h2>Detalle</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px;background:#fffaf0">
        <thead><tr><th style="text-align:left;padding:7px 10px;border-bottom:2px solid #B8924A">Ítem</th><th style="padding:7px 10px;border-bottom:2px solid #B8924A">Cant.</th><th style="text-align:right;padding:7px 10px;border-bottom:2px solid #B8924A">Precio</th></tr></thead>
        <tbody>${itemRows}</tbody>
        <tfoot><tr><td colspan="2" style="padding:10px;font-weight:700;text-align:right">Total cobrado</td><td style="padding:10px;font-weight:700;text-align:right">${formatPrice(order.total)}</td></tr></tfoot>
      </table>
    </div>
  `;
}

export async function sendApprovedOrderEmail(order: StoredOrder) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BMR_NOTIF_EMAIL ?? process.env.CONTACT_TO_EMAIL; // TODO configurar BMR_NOTIF_EMAIL en Vercel si se requiere una casilla distinta.
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error('Faltan variables RESEND_API_KEY / BMR_NOTIF_EMAIL o CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: order.contacto.email,
      subject: `[BMR] Orden aprobada ${order.orderId}`,
      html: buildOrderEmailHtml(order)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend order error ${response.status}: ${errorText}`);
  }
}
