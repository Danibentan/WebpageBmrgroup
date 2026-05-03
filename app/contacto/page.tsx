'use client';

import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Facebook, Mail, MapPin, MessageCircle, Phone, X, Instagram } from 'lucide-react';

import { ProfessionalHeader } from '@/components/layout/ProfessionalHeader';
import { contactInfo } from '@/lib/contact-info';

type FormState = {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  zona: string;
  horario: string;
  fecha: string;
  comentarios: string;
};

const initialFormState: FormState = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  zona: '',
  horario: '',
  fecha: '',
  comentarios: ''
};

export default function ContactoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorToast, setErrorToast] = useState('');
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0];
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const onlyDigits = formState.telefono.replace(/\D/g, '');
    if (onlyDigits.length < 8) {
      setErrorToast('El teléfono debe tener al menos 8 dígitos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        setErrorToast('No pudimos enviar. Probá de nuevo o escribinos por WhatsApp.');
        return;
      }

      setSubmitSuccess(true);
      setFormState(initialFormState);
    } catch (error) {
      console.error('[CONTACT] Error submitting form', error);
      setErrorToast('No pudimos enviar. Probá de nuevo o escribinos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!errorToast) return;
    const timer = window.setTimeout(() => setErrorToast(''), 3500);
    return () => window.clearTimeout(timer);
  }, [errorToast]);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[#e6edf8]">
      <ProfessionalHeader />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF6F]">ESTAMOS PARA AYUDARTE</p>
        <h1 className="mt-4 font-editorial text-5xl text-white md:text-7xl">Contacto</h1>
        <p className="mt-5 max-w-3xl text-lg text-white/70">
          Coordinemos una visita técnica o respondemos tus consultas en menos de 24 horas hábiles.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="flex flex-col rounded-xl border border-[#D4AF6F]/15 bg-[var(--bg-elevated-1)] p-7">
            <Phone className="text-[#D4AF6F]" size={22} />
            <h2 className="mt-4 font-editorial text-3xl text-white">Atención comercial</h2>
            <div className="mt-5 space-y-2 text-white/90">
              <a href={contactInfo.commercial.phonePrimaryHref} className="block transition hover:text-[#D4AF6F]">
                {contactInfo.commercial.phonePrimaryDisplay}
              </a>
              <a href={contactInfo.commercial.phoneSecondaryHref} className="block transition hover:text-[#D4AF6F]">
                {contactInfo.commercial.phoneSecondaryDisplay}
              </a>
            </div>
            <div className="my-5 h-px bg-white/15" />
            <p className="text-sm text-white/70">{contactInfo.commercial.scheduleWeekdays}</p>
            <p className="mt-1 text-sm text-white/70">{contactInfo.commercial.scheduleSaturday}</p>
            <a
              href={contactInfo.commercial.phonePrimaryHref}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[#D4AF6F]/60 px-4 py-2 text-sm font-semibold text-[#D4AF6F] transition hover:bg-[#D4AF6F] hover:text-[#223D5A]"
            >
              Llamar ahora →
            </a>
          </article>

          <article className="flex flex-col rounded-xl border border-[#25D366] bg-[var(--bg-elevated-1)] p-7 shadow-[0_0_24px_#25D36622]">
            <MessageCircle className="text-[#25D366]" size={22} />
            <h2 className="mt-4 font-editorial text-3xl text-white">WhatsApp</h2>
            <p className="mt-5 text-white/80">
              Respuesta inmediata en horario comercial. Mandanos foto del plano o medidas y te cotizamos.
            </p>
            <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1 text-xs text-[#25D366]">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#25D366]" />
              En línea ahora
            </span>
            <a
              href={contactInfo.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Abrir WhatsApp →
            </a>
          </article>

          <article className="flex flex-col rounded-xl border border-[#D4AF6F]/15 bg-[var(--bg-elevated-1)] p-7">
            <MapPin className="text-[#D4AF6F]" size={22} />
            <h2 className="mt-4 font-editorial text-3xl text-white">Ubicación y redes</h2>
            <a
              href={contactInfo.location.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 text-white/80 underline-offset-4 transition hover:text-[#D4AF6F] hover:underline"
            >
              {contactInfo.location.label}
            </a>
            <div className="my-5 h-px bg-white/15" />
            <div className="space-y-2 text-sm text-white/80">
              <a className="flex items-center gap-2 transition hover:text-[#D4AF6F]" href={contactInfo.social.instagramHref} target="_blank" rel="noopener noreferrer">
                <Instagram size={14} className="text-[#D4AF6F]" /> Instagram · {contactInfo.social.instagramLabel}
              </a>
              {contactInfo.social.facebookHref && contactInfo.social.facebookLabel ? (
                <a className="flex items-center gap-2 transition hover:text-[#D4AF6F]" href={contactInfo.social.facebookHref} target="_blank" rel="noopener noreferrer">
                  <Facebook size={14} className="text-[#D4AF6F]" /> Facebook · {contactInfo.social.facebookLabel}
                </a>
              ) : null}
              <a className="flex items-center gap-2 transition hover:text-[#D4AF6F]" href={contactInfo.social.emailHref}>
                <Mail size={14} className="text-[#D4AF6F]" /> Mail · {contactInfo.social.emailLabel}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-editorial text-4xl text-white md:text-6xl">Solicitá tu asesoramiento</h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/70">
            Coordinamos una visita técnica sin cargo en CABA y GBA. Completá el formulario y te contactamos en menos de 24hs.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setIsModalOpen(true);
            }}
            className="mt-8 inline-flex rounded-full bg-[#D4AF6F] px-8 py-3 text-base font-semibold text-[#223D5A] transition hover:bg-[#e3c488]"
          >
            Solicitar asesoramiento →
          </button>
        </div>
      </section>

      {errorToast ? (
        <div className="fixed right-4 top-24 z-[80] rounded-lg border border-red-400/50 bg-red-500/90 px-4 py-3 text-sm text-white shadow-xl">
          {errorToast}
        </div>
      ) : null}

      <div
        className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-[8px] p-4 transition-opacity duration-200 md:items-center ${
          isModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Formulario de asesoramiento"
          className={`relative w-full max-w-[560px] rounded-2xl border border-[#D4AF6F]/20 bg-[var(--bg-elevated-2)] p-6 transition-all duration-200 md:p-8 ${
            isModalOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          } max-h-[92vh] overflow-y-auto`}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/20 p-2 text-white/70 transition hover:text-white"
            aria-label="Cerrar formulario"
          >
            <X size={16} />
          </button>

          {submitSuccess ? (
            <div className="py-8 text-center">
              <p className="text-4xl text-[#D4AF6F]">✓</p>
              <h3 className="mt-4 font-editorial text-4xl text-white">¡Recibimos tu solicitud!</h3>
              <p className="mx-auto mt-3 max-w-md text-white/75">
                Te contactamos dentro de las próximas 24hs hábiles al teléfono que dejaste.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="mt-8 rounded-full bg-[#D4AF6F] px-6 py-2.5 font-semibold text-[#223D5A]"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">
              <h3 className="font-editorial text-3xl text-white">Formulario de asesoramiento</h3>
              <p className="text-sm text-[#1a1a1a]">Completá tus datos y coordinamos una visita técnica.</p>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nombre" id="nombre" required>
                  <Input value={formState.nombre} onChange={(value) => setFormState((prev) => ({ ...prev, nombre: value }))} />
                </Field>
                <Field label="Apellido" id="apellido" required>
                  <Input value={formState.apellido} onChange={(value) => setFormState((prev) => ({ ...prev, apellido: value }))} />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Teléfono" id="telefono" required>
                  <div className="flex overflow-hidden rounded-lg border border-white/15 bg-white/5">
                    <span className="inline-flex items-center border-r border-white/15 px-3 text-sm text-[#1a1a1a]">+54</span>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      minLength={8}
                      value={formState.telefono}
                      onChange={(event) => setFormState((prev) => ({ ...prev, telefono: event.target.value }))}
                      className="w-full bg-transparent px-3 py-3 text-[#1a1a1a] placeholder:text-[#6b6b6b] placeholder:opacity-100 focus:outline-none"
                      placeholder="11 XXXX XXXX"
                    />
                  </div>
                </Field>
                <Field label="Email" id="email" required>
                  <Input type="email" value={formState.email} onChange={(value) => setFormState((prev) => ({ ...prev, email: value }))} />
                </Field>
              </div>

              <Field label="Zona de residencia" id="zona" required>
                <Select
                  id="zona"
                  value={formState.zona}
                  onChange={(value) => setFormState((prev) => ({ ...prev, zona: value }))}
                  options={[
                    'CABA',
                    'GBA Norte (Vicente López, San Isidro, Tigre, Pilar, Escobar...)',
                    'GBA Oeste (Morón, Hurlingham, Ituzaingó...)',
                    'GBA Sur (Avellaneda, Quilmes, Lomas...)',
                    'Interior del país'
                  ]}
                />
              </Field>

              <Field label="Horario preferido" id="horario" required>
                <Select
                  id="horario"
                  value={formState.horario}
                  onChange={(value) => setFormState((prev) => ({ ...prev, horario: value }))}
                  options={['Mañana (09:00 a 13:00)', 'Tarde (14:00 a 18:30)', 'Indistinto']}
                />
              </Field>

              <Field label="Día de visita preferido" id="fecha" required>
                <input
                  id="fecha"
                  type="date"
                  required
                  min={minDate}
                  max={maxDate}
                  value={formState.fecha}
                  onChange={(event) => setFormState((prev) => ({ ...prev, fecha: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white focus:border-[#D4AF6F] focus:bg-white/10 focus:outline-none"
                />
              </Field>

              <Field label="Comentarios" id="comentarios">
                <textarea
                  id="comentarios"
                  rows={4}
                  value={formState.comentarios}
                  onChange={(event) => setFormState((prev) => ({ ...prev, comentarios: event.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-[#1a1a1a] placeholder:text-[#6b6b6b] placeholder:opacity-100 focus:border-[#D4AF6F] focus:bg-white/10 focus:outline-none"
                  placeholder="Contanos brevemente sobre tu proyecto"
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#D4AF6F] px-6 py-3 font-semibold text-[#223D5A] transition hover:bg-[#e3c488] disabled:opacity-70"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud →'}
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="sr-only">
        <Link href={contactInfo.whatsapp.href}>WhatsApp directo</Link>
      </section>
    </main>
  );
}

function Field({
  label,
  id,
  required,
  children
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.1em] text-[#D4AF6F]">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}

function Input({
  type = 'text',
  value,
  onChange
}: {
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type={type}
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-[#1a1a1a] placeholder:text-[#6b6b6b] placeholder:opacity-100 focus:border-[#D4AF6F] focus:bg-white/10 focus:outline-none"
    />
  );
}

function Select({
  id,
  value,
  onChange,
  options
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      id={id}
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white focus:border-[#D4AF6F] focus:bg-white/10 focus:outline-none"
    >
      <option value="" className="text-[#223D5A]">
        Seleccioná una opción
      </option>
      {options.map((option) => (
        <option key={option} value={option} className="text-[#223D5A]">
          {option}
        </option>
      ))}
    </select>
  );
}
