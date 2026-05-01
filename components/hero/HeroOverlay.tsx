export function HeroOverlay() {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/70 to-[var(--bg-primary)]/40" />

      <p className="pointer-events-none absolute left-6 top-6 z-20 text-[11px] uppercase tracking-[0.22em] text-[#c9ab66] md:left-12 md:top-8">
        Plano detalle de abertura en fachada clara
      </p>

      <p className="absolute bottom-10 right-8 z-20 text-[11px] uppercase tracking-[0.22em] text-[#c9ab66] md:right-12"></p>
    </>
  );
}
