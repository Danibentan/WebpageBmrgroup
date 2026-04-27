export type HeroSlideType = 'image' | 'video';

export type HeroVideoSources = {
  webm: string;
  mp4: string;
};

export type HeroSlide = {
  id: string;
  type: HeroSlideType;
  src: string;
  poster?: string;
  caption: string;
  alt: string;
  duration?: number;
  videoSources?: HeroVideoSources;
};
