import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
  thumbnail?: string;
  className?: string;
  width?: number;
  height?: number;
}

const LazyYouTube: React.FC<LazyYouTubeProps> = ({
  videoId,
  title = 'YouTube video',
  thumbnail,
  className = '',
  width = 560,
  height = 315,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const thumbnailSrc = thumbnail || 
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const loadVideo = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      loadVideo();
    }
  }, [loadVideo]);

  if (isLoaded) {
    return (
      <div className={`youtube-embed ${className}`} style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          ref={iframeRef}
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div 
      className={`youtube-facade ${className}`}
      onClick={loadVideo}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${title}`}
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        cursor: 'pointer',
        backgroundImage: `url(${thumbnailSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Image
        src={thumbnailSrc}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
      
      {/* Play button overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '68px',
          height: '48px',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
};

export default LazyYouTube;
