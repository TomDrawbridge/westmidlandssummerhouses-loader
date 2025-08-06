import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Dynamically import heavy components only when needed
export const DynamicFramerMotion = dynamic(
  () => import('./FramerMotionComponent'),
  {
    ssr: false, // Disable SSR for animation components
    loading: () => <div className="animate-pulse bg-gray-200 h-20 w-full rounded" />
  }
);

export const DynamicParallax = dynamic(
  () => import('./ParallaxText').then(mod => ({ default: mod.Parallax })),
  {
    ssr: false,
    loading: () => <div className="h-20 w-full" />
  }
);

export const DynamicVerticalSlider = dynamic(
  () => import('./VerticalSlider'),
  {
    ssr: true, // Keep SSR for content sliders
    loading: () => <div className="animate-pulse bg-gray-200 h-64 w-full rounded" />
  }
);

export const DynamicOptimizedVideo = dynamic(
  () => import('./OptimizedVideo'),
  {
    ssr: true,
    loading: () => <div className="animate-pulse bg-gray-900 h-64 w-full rounded" />
  }
);

export const DynamicYouTube = dynamic(
  () => import('./youtube'),
  {
    ssr: false, // YouTube embeds don't need SSR
    loading: () => <div className="animate-pulse bg-red-100 h-64 w-full rounded flex items-center justify-center">
      <span className="text-red-600">Loading video...</span>
    </div>
  }
);

export const DynamicLightGallery = dynamic(
  () => import('./LightGalleryLazy'),
  {
    ssr: false, // Gallery interactions are client-side only
    loading: () => <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-200 h-32 rounded" />
      ))}
    </div>
  }
);
