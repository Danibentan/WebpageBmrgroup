import Link from 'next/link';

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  const iconWidth = compact ? 28 : 36;
  const iconHeight = compact ? 24 : 32;

  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className="group inline-flex items-center gap-[10px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
    >
      <svg viewBox="0 0 60 50" width={iconWidth} height={iconHeight} className="transition duration-200 group-hover:brightness-110" aria-hidden="true">
        <path d="M5 45 L18 8 L30 28 L42 8 L55 45" stroke="#D4AF6F" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span className="leading-none">
        <span className={`block font-editorial tracking-[0.04em] text-white ${compact ? 'text-[18px]' : 'text-[22px]'}`}>BMR</span>
        <span className={`mt-0.5 block uppercase tracking-[0.4em] text-[#D4AF6F] ${compact ? 'text-[7px]' : 'text-[8px]'}`}>GROUP</span>
      </span>
    </Link>
  );
}
