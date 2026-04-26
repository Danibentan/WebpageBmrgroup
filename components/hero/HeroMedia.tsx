'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { HeroSlide } from '@/types/hero';

type HeroMediaProps = {
  slide: HeroSlide;
  index: number;
  activeIndex: number;
  mountedVideoIndex: number | null;
  isReducedMotion: boolean;
  onVideoEnded: () => void;
  onVideoTimeUpdate: (currentTime: number, duration: number) => void;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const canAutoplayVideoOnMobile = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const prefersDataSaver = connection?.saveData === true;
  const isWifi = connection?.effectiveType === 'wifi';

  return !prefersDataSaver && isWifi;
};

export function HeroMedia({
  slide,
  index,
  activeIndex,
  mountedVideoIndex,
  isReducedMotion,
  onVideoEnded,
  onVideoTimeUpdate
}: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const isActive = index === activeIndex;

  const showPosterOnly = useMemo(
    () => slide.type === 'video' && (isReducedMotion || (isMobile && !canAutoplayVideoOnMobile())),
    [isMobile, isReducedMotion, slide.type]
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video || slide.type !== 'video') {
      return;
    }

    if (!isActive || showPosterOnly) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      // autoplay fallback keeps poster visible
    });
  }, [isActive, showPosterOnly, slide.type]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-[800ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'opacity-100' : 'opacity-0'}`}
      aria-label={slide.alt}
    >
      {slide.type === 'image' || showPosterOnly ? (
        <Image
          src={slide.type === 'video' ? (slide.poster ?? slide.src) : slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          quality={85}
          priority={index === 0}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="object-cover [transform:translateZ(0)]"
        />
      ) : (
        mountedVideoIndex === index && (
          <video
            ref={videoRef}
            className="h-full w-full object-cover [transform:translateZ(0)]"
            muted
            autoPlay
            loop={false}
            playsInline
            preload="metadata"
            poster={slide.poster}
            onEnded={onVideoEnded}
            onTimeUpdate={(event) => onVideoTimeUpdate(event.currentTarget.currentTime, event.currentTarget.duration)}
          >
            {slide.videoSources?.webm ? <source src={slide.videoSources.webm} type="video/webm" /> : null}
            {slide.videoSources?.mp4 ? <source src={slide.videoSources.mp4} type="video/mp4" /> : null}
          </video>
        )
      )}
    </div>
  );
}
