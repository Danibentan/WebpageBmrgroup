'use client';

type HeroIndicatorsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function HeroIndicators({ count, activeIndex, onSelect }: HeroIndicatorsProps) {
  return (
    <div className="absolute bottom-8 left-6 z-20 flex gap-3 md:bottom-10 md:left-10">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className="group relative h-[2px] w-8 overflow-hidden rounded-full bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={isActive}
          >
            <span className={`absolute inset-0 bg-white/90 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`} />
          </button>
        );
      })}
    </div>
  );
}
