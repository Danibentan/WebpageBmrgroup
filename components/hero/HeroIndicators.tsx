'use client';

type HeroIndicatorsProps = {
  count: number;
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
  onPause: () => void;
  onResume: () => void;
};

export function HeroIndicators({
  count,
  activeIndex,
  progress,
  onSelect,
  onPause,
  onResume
}: HeroIndicatorsProps) {
  return (
    <div
      className="absolute bottom-8 left-6 z-20 flex gap-3 md:bottom-10 md:left-10"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className="group relative h-[2px] w-8 overflow-hidden rounded-full bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={`Ir al slide ${index + 1}`}
          >
            <span
              className="absolute inset-0 origin-left bg-white/90 transition-transform duration-300"
              style={{
                transform: `scaleX(${isActive ? progress : 0})`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            <span
              className={`absolute inset-0 border border-white/70 transition-opacity ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-80'}`}
            />
          </button>
        );
      })}
    </div>
  );
}
