import React from 'react';
import Image from 'next/image';

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
  images?: ImageItem[];
  video?: VideoItem;
  className?: string;
  galleryId?: string;
  maxItemsPerRow?: 2 | 3 | 4 | 5;
  generateVideoThumbnail?: boolean;
  imageHeight?: 'small' | 'medium' | 'large' | 'extra-large';
}

// Simple test component without any LightGallery dependencies
const LightGalleryTestComponent: React.FC<LightGalleryComponentProps> = ({
  images = [],
  video,
  className = '',
  maxItemsPerRow = 4,
  imageHeight = 'medium',
}) => {
  // Combine video and images, with video first if provided
  const allItems = React.useMemo(() => {
    const items = [...images];
    if (video) {
      const videoItem: ImageItem = {
        id: video.id,
        src: video.src,
        thumb: video.thumb,
        alt: video.alt || video.title || 'Video',
        size: '1920-1080',
        subHtml: video.subHtml || video.title || '',
      };
      items.unshift(videoItem);
    }
    return items;
  }, [images, video]);

  const getImageHeight = () => {
    switch (imageHeight) {
      case 'small':
        return '128px';
      case 'medium':
        return '192px';
      case 'large':
        return '256px';
      case 'extra-large':
        return '320px';
      default:
        return '192px';
    }
  };

  const containerHeight = getImageHeight();

  return (
    <div className={`simple-gallery-container ${className}`}>
      <div className="simple-gallery-grid">
        {allItems.map((item, index) => {
          const isVideo = video && index === 0;
          
          return (
            <div
              key={item.id}
              className="simple-gallery-item"
              onClick={() => {
                // Simple click handler - just log for now
                console.log('Gallery item clicked:', item);
              }}
            >
              <div className="simple-image-container">
                <Image
                  src={item.thumb}
                  alt={item.alt || `Gallery image ${item.id}`}
                  className="simple-gallery-image"
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              {isVideo && (
                <div className="simple-video-overlay">
                  <div className="simple-play-button">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.7)"/>
                      <polygon points="10,8 16,12 10,16" fill="white"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .simple-gallery-grid {
          display: grid;
          grid-template-columns: repeat(${maxItemsPerRow}, 1fr);
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .simple-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .simple-gallery-grid {
            grid-template-columns: 1fr;
          }
        }

        .simple-gallery-item {
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .simple-gallery-item:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .simple-image-container {
          position: relative;
          width: 100%;
          height: ${containerHeight};
        }

        .simple-gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .simple-gallery-item:hover .simple-gallery-image {
          transform: scale(1.05);
        }

        .simple-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .simple-play-button {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .simple-gallery-item:hover .simple-play-button {
          transform: scale(1.1);
        }

        .simple-gallery-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default LightGalleryTestComponent;
