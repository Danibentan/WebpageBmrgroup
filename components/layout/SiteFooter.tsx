export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-7xl border-t border-[#4d6f97]/60 px-6 py-10 text-sm text-[#d4e5ff]">
      <div className="mb-6 flex items-center gap-4">
        <img
          src="/assets/logos/bmr-icon-blue.svg"
          alt="Logo Bmr Group"
          className="h-[72px] w-[72px] rounded-full border border-[#ff6a00]/70 bg-[#123b6d] object-contain"
        />
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.015em] text-white">Bmr Group Argentina</h3>
          <span className="mt-1 block h-[2px] w-44 bg-[#ff6a00]" />
        </div>
      </div>
      <p>Diseño, ingeniería y experiencia premium para proyectos residenciales y corporativos.</p>
    </footer>
  );
}
