export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-black/10 px-6 py-10 text-sm text-slate-600">
      <div className="mb-6 flex items-center gap-4">
        <img
          src="/assets/logos/logo_logo%20fondo%20gris.png"
          alt="Logo Bmr Group"
          className="h-16 w-16 rounded-full border border-[#ff6a00]/40 bg-[#d9d9d9] object-contain"
        />
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.015em] text-[#1f3554]">Bmr Group Argentina</h3>
          <span className="mt-1 block h-[2px] w-44 bg-[#ff6a00]" />
        </div>
      </div>
      <p>Diseño, ingeniería y experiencia premium para proyectos residenciales y corporativos.</p>
    </footer>
  );
}
