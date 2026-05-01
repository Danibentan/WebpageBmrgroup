type ProjectComingSoonProps = {
  projectName: string;
  aspectRatio?: string;
};

export function ProjectComingSoon({ projectName, aspectRatio = '16 / 10' }: ProjectComingSoonProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D4AF6F]/30 bg-[var(--bg-elevated-1)]/60">
      <div style={{ aspectRatio }} className="flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF6F]/50 text-[#D4AF6F]">
            <span aria-hidden="true">◈</span>
          </div>
          <p className="font-editorial text-3xl text-[#D4AF6F]">Galería en preparación</p>
          <p className="mt-3 text-white/70">Estamos cargando las imágenes de {projectName}.</p>
        </div>
      </div>
    </div>
  );
}

