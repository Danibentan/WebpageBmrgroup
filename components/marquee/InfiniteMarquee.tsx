'use client';

import styles from './marquee.module.css';

type InfiniteMarqueeProps = {
  words?: string[];
  speed?: number;
  pauseOnHover?: boolean;
  fadeWidth?: number;
  className?: string;
};

const defaultWords = ['ABERTURAS', 'ALUMINIO', 'PVC', 'COLOCACION', 'BMR', 'GROUP', 'ARGENTINA', 'OBRAS RESINDECIALES', 'PRESPUESTO A MEDIDA', 'ESPEJOS'];

function buildMarqueeText(words: string[]) {
  return words.join(' · ');
}

export function InfiniteMarquee({
  words = defaultWords,
  speed = 50,
  pauseOnHover = true,
  fadeWidth = 15,
  className
}: InfiniteMarqueeProps) {
  const safeSpeed = Number.isFinite(speed) && speed > 0 ? speed : 50;
  const responsiveFade = `clamp(10%, ${fadeWidth}%, ${fadeWidth}%)`;
  const text = buildMarqueeText(words);

  return (
    <div
      className={[styles.viewport, pauseOnHover ? styles.pauseOnHover : '', className ?? ''].filter(Boolean).join(' ')}
      style={{
        ['--marquee-duration' as string]: `${safeSpeed}s`,
        ['--fade-start' as string]: responsiveFade,
        ['--fade-end' as string]: `calc(100% - ${responsiveFade})`
      }}
    >
      <div className={styles.track}>
        <p className="inline-flex items-center pr-16 font-black uppercase tracking-tight text-[#EEF1F4] [font-size:clamp(80px,14vw,220px)] leading-none sm:[font-size:clamp(80px,14vw,220px)] max-sm:[font-size:clamp(48px,16vw,90px)]">
          {text}
        </p>
        <p aria-hidden="true" className="inline-flex items-center pr-16 font-black uppercase tracking-tight text-[#EEF1F4] [font-size:clamp(80px,14vw,220px)] leading-none sm:[font-size:clamp(80px,14vw,220px)] max-sm:[font-size:clamp(48px,16vw,90px)]">
          {text}
        </p>
      </div>
    </div>
  );
}
