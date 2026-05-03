import Link from 'next/link';

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  const letterSize = compact ? 'text-[46px]' : 'text-[56px]';
  const groupSize = compact ? 'text-[10px]' : 'text-[11px]';
  const mWidth = compact ? 44 : 54;
  const mHeight = compact ? 36 : 44;

  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className="group inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
    >
      <span className="inline-flex flex-col items-center leading-none">
        <span className="inline-flex items-end gap-1">
          <span className={`${letterSize} font-light text-[#173B63]`}>B</span>
          <svg viewBox="0 0 60 48" width={mWidth} height={mHeight} className="mb-1 transition duration-200 group-hover:brightness-110" aria-hidden="true">
            <path d="M3 42 L16 12 L26 34 L36 12 L49 42" stroke="#E76B37" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 42 L24 12 L34 34 L44 12 L57 42" stroke="#E76B37" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`${letterSize} font-light text-[#173B63]`}>R</span>
        </span>
        <span className={`${groupSize} -mt-1 block uppercase tracking-[0.36em] text-[#173B63]`}>GROUP</span>
      </span>
    </Link>
  );
}
