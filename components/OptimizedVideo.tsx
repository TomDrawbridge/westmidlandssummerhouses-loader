import React, { useRef, useEffect, useState, useCallback } from 'react';

interface OptimizedVideoProps {
    src: string;
    poster?: string;
    className?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    lazy?: boolean;
    width?: string;
    height?: string;
    preload?: 'none' | 'metadata' | 'auto';
    onLoadStart?: () => void;
    onCanPlay?: () => void;
    onPlaying?: () => void;
    onError?: (error: Event) => void;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
    src,
    poster,
    className = '',
    autoPlay = true,
    loop = true,
    muted = true,
    controls = false,
    lazy = false,
    width = '100%',
    height = 'auto',
    preload = lazy ? 'none' : 'metadata',
    onLoadStart,
    onCanPlay,
    onPlaying,
    onError
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(!lazy);
    const [hasError, setHasError] = useState(false);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!lazy) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, [lazy]);

    // Handle video events
    const handleLoadStart = useCallback(() => {
        onLoadStart?.();
    }, [onLoadStart]);

    const handleCanPlay = useCallback(() => {
        onCanPlay?.();
    }, [onCanPlay]);

    const handlePlaying = useCallback(() => {
        onPlaying?.();
    }, [onPlaying]);

    const handleError = useCallback((event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        setHasError(true);
        onError?.(event.nativeEvent);
    }, [onError]);

    // Preconnect to video domain for faster loading
    useEffect(() => {
        if (!shouldLoad || !src) return;

        try {
            const videoUrl = new URL(src);
            const existingLink = document.querySelector(`link[rel="preconnect"][href="${videoUrl.origin}"]`);

            if (!existingLink) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = videoUrl.origin;
                document.head.appendChild(link);

                return () => {
                    if (document.head.contains(link)) {
                        document.head.removeChild(link);
                    }
                };
            }
        } catch (error) {
            console.warn('Could not preconnect to video domain:', error);
        }
    }, [shouldLoad, src]);

    const videoProps = {
        ref: videoRef,
        className: `optimized-video ${className}`,
        autoPlay: shouldLoad && autoPlay,
        loop,
        muted,
        controls,
        preload: shouldLoad ? preload : 'none',
        poster: poster,
        width,
        height,
        onLoadStart: handleLoadStart,
        onCanPlay: handleCanPlay,
        onPlaying: handlePlaying,
        onError: handleError,
        // Performance optimizations
        playsInline: true,
        disablePictureInPicture: true,
        disableRemotePlaybook: true,
    };

    return (
        <div className={`video-container ${className}`}>
            {/* Error fallback */}
            {hasError && (
                <div className="video-error">
                    <p>Video failed to load</p>
                </div>
            )}

            {/* Video element */}
            <video
                {...videoProps}
                src={shouldLoad ? src : undefined}
            >
                Your browser does not support the video tag.
            </video>

            <style jsx>{`
        .video-container {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .optimized-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        
        .video-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 1rem;
          border-radius: 4px;
          text-align: center;
          z-index: 2;
        }
        
        /* Performance optimizations */
        .optimized-video {
          will-change: auto;
          transform: translateZ(0);
        }
      `}</style>
        </div>
    );
};

export default React.memo(OptimizedVideo);