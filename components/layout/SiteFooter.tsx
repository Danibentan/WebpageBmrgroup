export function SiteFooter() {
  return (
    <footer className="mx-auto mt-6 max-w-7xl border-t border-[#4d6f97]/60 px-6 py-10 text-sm text-[#d4e5ff]">
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
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[32px] leading-none text-[#dbe8fb]">Diseño:ingenieria y experiencia premiun.</p>
          <a
            href="https://instagram.com/bmrgroupar"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex rounded-full border border-[#8ca7ca] px-4 py-1.5 font-semibold text-[#e8f1ff] transition hover:border-white hover:bg-white/10"
          >
            @bmrgroupar
          </a>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Colectora+Este+Ramal+Escobar+1871,+Bel%C3%A9n+de+Escobar+1625"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-[#8ca7ca] bg-[#102f52]/70 px-4 py-2 font-semibold text-[#eef5ff] transition hover:border-white hover:bg-[#1a446f]"
        >
          Cómo llegar
        </a>
      </div>
    </footer>
  );
}
