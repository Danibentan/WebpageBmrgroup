export function SiteFooter() {
  return (
    <footer className="mx-auto mt-6 max-w-7xl border-t border-[#3a4f78]/70 px-6 py-10 text-sm text-[#c8d2e6]">
      <div className="mb-6 flex items-center gap-4">
        <img
          src="/assets/logos/bmr-icon-blue.svg"
          alt="Logo Bmr Group"
          className="h-[72px] w-[72px] rounded-full border border-[#c9ab66]/70 bg-[#07142f] object-contain"
        />
        <div>
          <h3 className="font-editorial text-3xl font-semibold tracking-[-0.015em] text-[#f2f4f8]">Bmr Group Argentina</h3>
          <span className="mt-1 block h-[2px] w-44 bg-[#c9ab66]" />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-editorial text-[38px] leading-none text-[#f2f4f8]">Diseño, ingeniería y experiencia premium.</p>
          <a
            href="https://instagram.com/bmrgroupar"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex rounded-full border border-[#c9ab66]/70 px-4 py-1.5 font-semibold text-[#f2f4f8] transition hover:border-[#e0c992] hover:bg-[#c9ab66]/10"
          >
            @bmrgroupar
          </a>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Colectora+Este+Ramal+Escobar+1871,+Bel%C3%A9n+de+Escobar+1625"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-xl border border-[#c9ab66]/70 bg-[#091a38]/75 px-4 py-2 font-semibold text-[#f2f4f8] transition hover:border-[#e0c992] hover:bg-[#142b56]"
        >
          Cómo llegar
        </a>
      </div>
    </footer>
  );
}
