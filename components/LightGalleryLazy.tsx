import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Define the interface for props
interface ImageItem {
  id: string;
  src: string;
  thumb: string;
  alt?: string;
  size?: string;
  subHtml?: string;
}

interface VideoItem {
  id: string;
  src: string;
  thumb: string;
  alt?: string;
  title?: string;
  poster?: string;
  subHtml?: string;
}

interface LightGalleryComponentProps {
  images: ImageItem[];
  video?: VideoItem;
  className?: string;
  galleryId?: string;
  maxItemsPerRow?: 2 | 3 | 4 | 5;
  maxRows?: number;
  generateVideoThumbnail?: boolean;
  [key: string]: any;
}

// Dynamically import LightGallery with no SSR and CSS loading only when needed
const DynamicLightGallery = dynamic(
  () => import('./LightGalleryComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    ),
  }
);

const LightGalleryLazy: React.FC<LightGalleryComponentProps> = (props) => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    }>
      <DynamicLightGallery {...props} />
    </Suspense>
  );
};

export default LightGalleryLazy;
