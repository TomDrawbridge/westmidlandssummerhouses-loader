import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

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

interface LightGalleryInstance {
  refresh: () => void;
  destroy: () => void;
  openGallery: (index?: number) => void;
  closeGallery: () => void;
}

interface LightGalleryInitDetail {
  instance: LightGalleryInstance;
}

interface LightGalleryComponentProps {
  images: ImageItem[];
  video?: VideoItem;
  className?: string;
  galleryId?: string;
  maxItemsPerRow?: 2 | 3 | 4 | 5;
  maxRows?: number;
  generateVideoThumbnail?: boolean;
}

// Video thumbnail generator function
const generateVideoThumbnail = (videoSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.crossOrigin = 'anonymous';
    video.muted = true;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const seekTime = Math.min(1, video.duration * 0.1);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnailDataUrl);
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video'));
    };

    video.src = videoSrc;
    video.load();
  });
};

const LightGalleryAdvanced: React.FC<LightGalleryComponentProps> = ({
  images,
  video,
  className = '',
  galleryId = 'lightgallery',
  maxItemsPerRow = 4,
  maxRows,
  generateVideoThumbnail: enableThumbnailGeneration = false,
}) => {
  const lightGalleryRef = useRef<LightGalleryInstance | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const onInit = (detail: LightGalleryInitDetail) => {
    lightGalleryRef.current = detail.instance;
  };

  // Generate video thumbnail when video prop changes
  useEffect(() => {
    if (video && enableThumbnailGeneration && !videoThumbnail) {
      setThumbnailLoading(true);
      console.log('Generating thumbnail for:', video.src);
      generateVideoThumbnail(video.src)
        .then((thumbnailUrl) => {
          console.log('Thumbnail generated successfully');
          setVideoThumbnail(thumbnailUrl);
          setThumbnailLoading(false);
        })
        .catch((error) => {
          console.error('Failed to generate video thumbnail:', error);
          setThumbnailLoading(false);
        });
    }
  }, [video, enableThumbnailGeneration, videoThumbnail]);

  // Combine video and images, with video first if provided
  const allItems = React.useMemo(() => {
    const items = [...images];
    if (video) {
      const videoItem: ImageItem = {
        id: video.id,
        src: video.src,
        thumb: enableThumbnailGeneration && videoThumbnail ? videoThumbnail : video.thumb,
        alt: video.alt || video.title || 'Video',
        size: '1920-1080',
        subHtml: video.subHtml || video.title || '',
      };
      items.unshift(videoItem);
    }
    return items;
  }, [images, video, videoThumbnail, enableThumbnailGeneration]);

  // Apply maxRows limiting if specified
  const displayItems = React.useMemo(() => {
    if (maxRows && maxRows > 0) {
      const maxItems = maxItemsPerRow * maxRows;
      return allItems.slice(0, maxItems);
    }
    return allItems;
  }, [allItems, maxRows, maxItemsPerRow]);

  return (
    <div className={`lightgallery-container ${className}`}>
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgVideo]}
        mode="lg-fade"
        thumbnail={true}
        animateThumb={true}
        zoomFromOrigin={false}
        allowMediaOverlap={true}
        toggleThumb={true}
        galleryId={galleryId}
        download={false}
        elementClassNames="gallery-grid"
      >
        {displayItems.map((item, index) => {
          const isVideo = video && index === 0;

          const getVideoType = (src: string) => {
            if (src.includes('.webm')) return 'video/webm';
            if (src.includes('.ogg')) return 'video/ogg';
            if (src.includes('.mp4')) return 'video/mp4';
            return 'video/mp4';
          };

          const videoType = isVideo ? getVideoType(item.src) : 'video/mp4';

          return (
            <a
              key={item.id}
              href={isVideo ? "" : item.src}
              data-lg-size={item.size}
              data-sub-html={item.subHtml}
              data-poster={isVideo ? video.poster : undefined}
              data-video={isVideo ? `{"source": [{"src":"${item.src}", "type":"${videoType}"}], "attributes": {"preload": false, "controls": true}}` : undefined}
              className="gallery-item"
            >
              <div className="image-container">
                <Image
                  src={item.thumb}
                  alt={item.alt || `Gallery image ${item.id}`}
                  className="gallery-image"
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              {isVideo && thumbnailLoading && (
                <div className="thumbnail-loading">
                  <div className="loading-spinner"></div>
                  <span className="loading-text">Generating thumbnail...</span>
                </div>
              )}
              {isVideo && (
                <div className="video-overlay">
                  <div className="play-button">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.7)" />
                      <polygon points="10,8 16,12 10,16" fill="white" />
                    </svg>
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </LightGallery>

      <style jsx>{`
        .lightgallery-container {
          width: 100%;
          margin: 0 auto;
        }

        .lightgallery-container :global(.gallery-grid) {
          display: grid !important;
          grid-template-columns: repeat(${maxItemsPerRow}, 1fr) !important;
          width: 100% !important;
        }
        
        @media (max-width: 768px) {
          .lightgallery-container :global(.gallery-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .lightgallery-container :global(.gallery-grid) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        .lightgallery-container :global(.gallery-item) {
          position: relative !important;
          display: block !important;
          overflow: hidden !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          transition: box-shadow 0.3s ease, transform 0.3s ease !important;
          text-decoration: none !important;
          color: inherit !important;
        }

        .lightgallery-container :global(.gallery-item:hover) {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-2px) !important;
        }

        .lightgallery-container :global(.image-container) {
          position: relative !important;
          width: 100% !important;
          aspect-ratio: 1 / 1 !important;
        }

        .lightgallery-container :global(.gallery-image) {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.3s ease !important;
        }

        .lightgallery-container :global(.gallery-item:hover .gallery-image) {
          transform: scale(1.05) !important;
        }

        .lightgallery-container :global(.thumbnail-loading) {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: rgba(0, 0, 0, 0.8) !important;
          border-radius: 8px !important;
          padding: 15px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 10px !important;
          z-index: 10 !important;
        }

        .lightgallery-container :global(.loading-spinner) {
          width: 30px !important;
          height: 30px !important;
          border: 3px solid #ffffff30 !important;
          border-top: 3px solid #ffffff !important;
          border-radius: 50% !important;
          animation: spin 1s linear infinite !important;
        }

        .lightgallery-container :global(.loading-text) {
          color: white !important;
          font-size: 12px !important;
          text-align: center !important;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .lightgallery-container :global(.video-overlay) {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          opacity: 1 !important;
          transition: opacity 0.3s ease !important;
          border-radius: 8px !important;
          pointer-events: none !important;
          z-index: 5 !important;
        }

        .lightgallery-container :global(.play-button) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: transform 0.3s ease !important;
        }

        .lightgallery-container :global(.gallery-item:hover .play-button) {
          transform: scale(1.1) !important;
        }

        /* Fix LightGallery video controls overlap */
        :global(.lg-components) {
          pointer-events: none;
        }
        :global(.lg-components > *:not(.lg-sub-html)) {
          pointer-events: auto;
        }
        :global(.lg-sub-html) {
          pointer-events: none;
        }

        :global(.lg-download) {
          display: none !important;
        }

        :global(.lg-video-object) {
          padding-bottom: 40px;
        }
      `}</style>
    </div>
  );
};

export default LightGalleryAdvanced;