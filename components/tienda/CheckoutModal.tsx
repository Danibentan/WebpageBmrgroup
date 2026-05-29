'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';

import { ZONAS_ENVIO } from '@/lib/envio';
import type { CheckoutPayload, FacturaTipo } from '@/lib/order-types';

type CheckoutModalItem = {
  id: string;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
};

type CheckoutModalProps = {
  open: boolean;
  items: CheckoutModalItem[];
  onClose: () => void;
};

type Errors = Partial<Record<string, string>>;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);

const onlyDigits = (value: string) => value.replace(/\D/g, '');

export function CheckoutModal({ open, items, onClose }: CheckoutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [entrega, setEntrega] = useState<'retiro' | 'envio'>('retiro');
  const [zonaId, setZonaId] = useState('escobar');
  const [contacto, setContacto] = useState({ nombre: '', apellido: '', email: '', telefono: '' });
  const [facturaTipo, setFacturaTipo] = useState<FacturaTipo>('B');
  const [facturacion, setFacturacion] = useState({ documento: '', nombreFiscal: '', razonSocial: '' });
  const [direccion, setDireccion] = useState({ calleNumero: '', localidad: '', provincia: '', codigoPostal: '', pisoDepto: '' });

  const selectedZona = ZONAS_ENVIO.find((zona) => zona.id === zonaId) ?? ZONAS_ENVIO[0]!;
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0), [items]);
  const envioCosto = entrega === 'retiro' ? 0 : selectedZona.costo;
  const total = subtotal + (typeof envioCosto === 'number' ? envioCosto : 0);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.activeElement as HTMLElement | null;
    const timeout = window.setTimeout(() => modalRef.current?.focus(), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', handleKeyDown);
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const nextErrors: Errors = {};
    if (!contacto.nombre.trim()) nextErrors.nombre = 'Ingresá tu nombre.';
    if (!contacto.apellido.trim()) nextErrors.apellido = 'Ingresá tu apellido.';
    if (!/^\S+@\S+\.\S+$/.test(contacto.email)) nextErrors.email = 'Ingresá un email válido.';
    if (!contacto.telefono.trim()) nextErrors.telefono = 'Ingresá un teléfono.';

    const documento = onlyDigits(facturacion.documento);
    if (facturaTipo === 'A' && documento.length !== 11) nextErrors.documento = 'CUIT debe tener 11 dígitos.';
    if ((facturaTipo === 'B' || facturaTipo === 'C') && (documento.length < 7 || documento.length > 11)) nextErrors.documento = 'DNI/CUIT inválido.';
    if (!facturacion.nombreFiscal.trim() && !(facturaTipo === 'A' && facturacion.razonSocial.trim())) nextErrors.nombreFiscal = 'Completá el nombre o razón social.';

    if (entrega === 'envio') {
      if (!selectedZona) nextErrors.zona = 'Seleccioná una zona.';
      if (!direccion.calleNumero.trim()) nextErrors.calleNumero = 'Completá calle y número.';
      if (!direccion.localidad.trim()) nextErrors.localidad = 'Completá localidad.';
      if (!direccion.provincia.trim()) nextErrors.provincia = 'Completá provincia.';
      if (!direccion.codigoPostal.trim()) nextErrors.codigoPostal = 'Completá código postal.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePay = async () => {
    if (items.length === 0) {
      setSubmitError('Tu carrito no tiene ítems para pagar.');
      return;
    }
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const checkout: CheckoutPayload = {
        contacto,
        facturacion: {
          tipo: facturaTipo,
          documento: facturacion.documento,
          nombreFiscal: facturaTipo === 'A' ? facturacion.razonSocial : facturacion.nombreFiscal,
          condicionIva: facturaTipo === 'A' ? 'Responsable Inscripto' : undefined
        },
        entrega: entrega === 'retiro'
          ? { metodo: 'retiro' }
          : {
              metodo: 'envio',
              zonaId,
              direccion
            }
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, checkout })
      });

      const data = (await response.json()) as { init_point?: string; sandbox_init_point?: string; error?: string };
      if (!response.ok) throw new Error(data.error || 'No se pudo iniciar el checkout.');
      const checkoutUrl = data.init_point || data.sandbox_init_point;
      if (!checkoutUrl) throw new Error('Mercado Pago no devolvió URL de checkout.');
      window.location.href = checkoutUrl;
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'No se pudo iniciar el pago.');
      setIsSubmitting(false);
    }
  };

  const inputClass = 'mt-1 w-full rounded-xl border border-[#14223D]/15 bg-[#F4EEDE] px-3 py-2 text-sm text-[#14223D] outline-none transition focus:border-[#B8924A] focus:ring-2 focus:ring-[#B8924A]/25';
  const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B6655]';

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm md:items-center" role="presentation">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout de compra"
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#F4EEDE] text-[#14223D] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#14223D]/10 bg-[#F4EEDE] p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#B8924A]">Checkout</p>
            <h2 className="font-editorial text-3xl italic">Datos de compra</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar checkout" className="rounded-full p-2 text-[#14223D] hover:bg-[#EDE5D0]">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section>
              <h3 className={labelClass}>Entrega</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { id: 'retiro', label: 'Retiro en fábrica', hint: 'Escobar · sin cargo' },
                  { id: 'envio', label: 'Envío a domicilio', hint: 'Costo por zona' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setEntrega(option.id as 'retiro' | 'envio')}
                    className={`rounded-2xl border p-4 text-left transition ${entrega === option.id ? 'border-[#14223D] bg-[#14223D] text-[#F4EEDE]' : 'border-[#14223D]/15 bg-[#EDE5D0]/50 text-[#14223D]'}`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 block text-xs opacity-75">{option.hint}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2">
              <h3 className={`${labelClass} sm:col-span-2`}>Contacto</h3>
              {(['nombre', 'apellido', 'email', 'telefono'] as const).map((field) => (
                <label key={field} className="text-sm">
                  <span className={labelClass}>{field}</span>
                  <input className={inputClass} value={contacto[field]} onChange={(event) => setContacto((current) => ({ ...current, [field]: event.target.value }))} />
                  {errors[field] ? <span className="mt-1 block text-xs text-red-600">{errors[field]}</span> : null}
                </label>
              ))}
            </section>

            <section className="space-y-3">
              <h3 className={labelClass}>Facturación</h3>
              <select className={inputClass} value={facturaTipo} onChange={(event) => setFacturaTipo(event.target.value as FacturaTipo)} aria-label="Tipo de factura">
                <option value="B">Factura B</option>
                <option value="A">Factura A</option>
                <option value="C">Factura C</option>
              </select>
              <div className="grid gap-3 sm:grid-cols-2">
                <label>
                  <span className={labelClass}>{facturaTipo === 'A' ? 'CUIT' : 'DNI o CUIT'}</span>
                  <input className={inputClass} value={facturacion.documento} onChange={(event) => setFacturacion((current) => ({ ...current, documento: event.target.value }))} />
                  {errors.documento ? <span className="mt-1 block text-xs text-red-600">{errors.documento}</span> : null}
                </label>
                <label>
                  <span className={labelClass}>{facturaTipo === 'A' ? 'Razón social' : 'Nombre y apellido / razón social'}</span>
                  <input
                    className={inputClass}
                    value={facturaTipo === 'A' ? facturacion.razonSocial : facturacion.nombreFiscal}
                    onChange={(event) => setFacturacion((current) => ({ ...current, [facturaTipo === 'A' ? 'razonSocial' : 'nombreFiscal']: event.target.value }))}
                  />
                  {errors.nombreFiscal ? <span className="mt-1 block text-xs text-red-600">{errors.nombreFiscal}</span> : null}
                </label>
              </div>
              {facturaTipo === 'A' ? <p className="text-xs text-[#6B6655]">Condición: Responsable Inscripto.</p> : null}
            </section>

            {entrega === 'envio' ? (
              <section className="grid gap-3 sm:grid-cols-2">
                <h3 className={`${labelClass} sm:col-span-2`}>Dirección de envío</h3>
                <label className="sm:col-span-2">
                  <span className={labelClass}>Zona</span>
                  <select className={inputClass} value={zonaId} onChange={(event) => setZonaId(event.target.value)}>
                    {ZONAS_ENVIO.map((zona) => (
                      <option key={zona.id} value={zona.id}>{zona.nombre}</option>
                    ))}
                  </select>
                </label>
                {(['calleNumero', 'localidad', 'provincia', 'codigoPostal', 'pisoDepto'] as const).map((field) => (
                  <label key={field} className={field === 'pisoDepto' ? 'sm:col-span-2' : undefined}>
                    <span className={labelClass}>{field === 'calleNumero' ? 'Calle y número' : field === 'codigoPostal' ? 'Código postal' : field === 'pisoDepto' ? 'Piso/depto (opcional)' : field}</span>
                    <input className={inputClass} value={direccion[field]} onChange={(event) => setDireccion((current) => ({ ...current, [field]: event.target.value }))} />
                    {errors[field] ? <span className="mt-1 block text-xs text-red-600">{errors[field]}</span> : null}
                  </label>
                ))}
              </section>
            ) : null}
          </div>

          <aside className="rounded-3xl border border-[#14223D]/10 bg-[#EDE5D0]/55 p-4">
            <h3 className={labelClass}>Resumen del pedido</h3>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-sm">
                  <span>{item.title} × {item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.unit_price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-[#14223D]/10 pt-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span>Envío</span>
                  <span>{entrega === 'retiro' ? 'Sin cargo' : envioCosto === null ? 'A coordinar' : formatPrice(envioCosto)}</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-[#14223D]/10 pt-3 font-editorial text-2xl italic">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              {submitError ? <p className="text-xs text-red-600">{submitError}</p> : null}
              <button type="button" onClick={handlePay} disabled={isSubmitting || items.length === 0} className="mt-2 w-full rounded-full bg-[#14223D] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#F4EEDE] transition hover:bg-[#1d3158] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Creando pago…' : 'Ir a pagar'}
              </button>
              <p className="text-[11px] leading-relaxed text-[#6B6655]">No solicitamos datos de tarjeta. El pago se realiza en Mercado Pago.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
