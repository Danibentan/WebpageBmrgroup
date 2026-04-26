'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { HeroSlide } from '@/types/hero';

type UseHeroCarouselParams = {
  slides: HeroSlide[];
  defaultImageDuration?: number;
};

type UseHeroCarouselReturn = {
  activeIndex: number;
  isPaused: boolean;
  isReducedMotion: boolean;
  mountedVideoIndex: number | null;
  progress: number;
  setActiveIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
  onVideoEnded: () => void;
  onHeroEnterViewport: () => void;
  onVideoTimeUpdate: (currentTime: number, duration: number) => void;
};

const IMAGE_DEFAULT_DURATION = 6000;

export function useHeroCarousel({
  slides,
  defaultImageDuration = IMAGE_DEFAULT_DURATION
}: UseHeroCarouselParams): UseHeroCarouselReturn {
  const [activeIndex, setActiveIndexState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mountedVideoIndex, setMountedVideoIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const hasPreloadedNext = useRef(false);
  const startedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const activeSlide = slides[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndexState((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndexState((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const setActiveIndex = useCallback(
    (index: number) => {
      const bounded = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndexState(bounded);
      setProgress(0);
      hasPreloadedNext.current = false;
      startedAtRef.current = performance.now();
    },
    [slides.length]
  );

  const preloadNext = useCallback(() => {
    if (slides.length < 2 || hasPreloadedNext.current) {
      return;
    }

    const nextIndex = (activeIndex + 1) % slides.length;
    const nextSlideData = slides[nextIndex];

    if (nextSlideData.type === 'image') {
      const img = new Image();
      img.src = nextSlideData.src;
    }

    if (nextSlideData.type === 'video') {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = nextSlideData.videoSources?.mp4 ?? nextSlideData.src;
    }

    hasPreloadedNext.current = true;
  }, [activeIndex, slides]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const togglePause = useCallback(() => setIsPaused((prev) => !prev), []);

  const onVideoEnded = useCallback(() => {
    nextSlide();
  }, [nextSlide]);

  const onHeroEnterViewport = useCallback(() => {
    const current = slides[activeIndex];
    if (current?.type === 'video') {
      setMountedVideoIndex(activeIndex);
    }
  }, [activeIndex, slides]);

  const onVideoTimeUpdate = useCallback(
    (currentTime: number, duration: number) => {
      if (duration <= 0) {
        return;
      }

      const ratio = Math.min(currentTime / duration, 1);
      setProgress(ratio);

      if (ratio >= 0.7) {
        preloadNext();
      }
    },
    [preloadNext]
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const reduced = media.matches;
      setIsReducedMotion(reduced);
      setIsPaused(reduced);
    };

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextSlide();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevSlide();
      }
      if (event.key === ' ') {
        event.preventDefault();
        togglePause();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nextSlide, prevSlide, togglePause]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const imageDuration = useMemo(
    () => activeSlide?.duration ?? defaultImageDuration,
    [activeSlide?.duration, defaultImageDuration]
  );

  useEffect(() => {
    setProgress(0);
    hasPreloadedNext.current = false;
    startedAtRef.current = performance.now();

    if (activeSlide?.type === 'video') {
      setMountedVideoIndex(activeIndex);
    }
  }, [activeIndex, activeSlide?.type]);

  useEffect(() => {
    if (isPaused || isReducedMotion || activeSlide?.type === 'video') {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    const tick = () => {
      const elapsed = performance.now() - startedAtRef.current;
      const ratio = Math.min(elapsed / imageDuration, 1);
      setProgress(ratio);

      if (ratio >= 0.7) {
        preloadNext();
      }

      if (ratio >= 1) {
        nextSlide();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeSlide?.type, imageDuration, isPaused, isReducedMotion, nextSlide, preloadNext]);

  return {
    activeIndex,
    isPaused,
    isReducedMotion,
    mountedVideoIndex,
    progress,
    setActiveIndex,
    nextSlide,
    prevSlide,
    pause,
    resume,
    togglePause,
    onVideoEnded,
    onHeroEnterViewport,
    onVideoTimeUpdate
  };
}
