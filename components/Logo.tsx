import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  compact?: boolean;
  href?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function Logo({ compact = false, href = '/', className = '', priority = true, width, height }: LogoProps) {
  const resolvedWidth = width ?? (compact ? 140 : 164);
  const resolvedHeight = height ?? (compact ? 48 : 56);
  return (
    <Link
      href={href}
      aria-label="BMR Group - Inicio"
      className={`inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6F] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${className}`}
    >
      <Image src="/logo/bmr-logo.svg" alt="BMR Group" width={resolvedWidth} height={resolvedHeight} priority={priority} className="h-10 w-auto md:h-12" />
    </Link>
  );
}
