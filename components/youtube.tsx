"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface YouTubeProps {
    videoId: string;
    title: string;
    autoplay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    start?: number;
    end?: number;
    loadStrategy?: 'eager' | 'interaction' | 'intersection' | 'idle';
    className?: string;
    style?: React.CSSProperties;
    aspectRatio?: '16:9' | '4:3' | '1:1';
    height?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    onLoad?: () => void;
    onError?: () => void;
}

export default function YouTube({
    videoId,
    title,
    autoplay = false,
    muted = false,
    controls = true,
    loop = false,
    start,
    end,
    loadStrategy = 'intersection',
    className = '',
    style,
    aspectRatio = '16:9',
    height,
    priority = false,
    placeholder = 'empty',
    onLoad,
    onError
}: YouTubeProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasTriggered = useRef(false);

    // Calculate dimensions based on aspect ratio
    const getDimensions = () => {
        // If height is specified, calculate width based on aspect ratio
        if (height) {
            switch (aspectRatio) {
                case '16:9':
                    return { width: Math.round(height * 16 / 9), height };
                case '4:3':
                    return { width: Math.round(height * 4 / 3), height };
                case '1:1':
                    return { width: height, height };
                default:
                    return { width: Math.round(height * 16 / 9), height };
            }
        }
        
        // Default to responsive width (100%) and let aspect ratio be maintained by CSS
        return { width: '100%', height: 'auto' };
    };

    const { width: calculatedWidth, height: calculatedHeight } = getDimensions();

    // Build YouTube URL with simplified parameters
    const buildYouTubeUrl = useCallback(() => {
        const params = new URLSearchParams();

        // Core functionality
        if (autoplay) params.set('autoplay', '1');
        if (muted) params.set('mute', '1');
        if (!controls) params.set('controls', '0');
        if (loop) {
            params.set('loop', '1');
            params.set('playlist', videoId); // Required for loop
        }
        if (start) params.set('start', start.toString());
        if (end) params.set('end', end.toString());

        // Sensible defaults for better UX
        params.set('modestbranding', '1'); // Remove YouTube logo
        params.set('rel', '0'); // No related videos
        params.set('playsinline', '1'); // Play inline on mobile

        return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    }, [videoId, autoplay, muted, controls, loop, start, end]);

    // Load the iframe
    const loadVideo = useCallback(() => {
        if (hasTriggered.current || loaded) return;
        hasTriggered.current = true;
        setLoaded(true);
        onLoad?.();
    }, [loaded, onLoad]);

    // Load strategies
    const setupLoadStrategy = useCallback(() => {
        if (loadStrategy === 'eager') {
            loadVideo();
            return;
        }

        if (loadStrategy === 'idle') {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                    if (!hasTriggered.current) loadVideo();
                }, { timeout: 3000 });
            } else {
                setTimeout(loadVideo, 1000);
            }
            return;
        }

        if (loadStrategy === 'interaction') {
            const events = ['mousedown', 'touchstart', 'keydown'];
            const handleInteraction = () => {
                loadVideo();
                events.forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };

            events.forEach(event => {
                document.addEventListener(event, handleInteraction, {
                    once: true,
                    passive: true
                });
            });
            return;
        }

        if (loadStrategy === 'intersection' && containerRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !hasTriggered.current) {
                            loadVideo();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '50px' }
            );

            observer.observe(containerRef.current);

            return () => observer.disconnect();
        }
    }, [loadStrategy, loadVideo]);

    // Setup load strategy on mount
    useEffect(() => {
        const cleanup = setupLoadStrategy();
        return cleanup;
    }, [setupLoadStrategy]);

    return (
        <div
            ref={containerRef}
            className={`youtube-container ${className}`}
            style={{
                position: 'relative',
                width: calculatedWidth,
                height: calculatedHeight,
                backgroundColor: '#000',
                borderRadius: '8px',
                overflow: 'hidden',
                // Maintain aspect ratio when width is responsive
                ...(calculatedWidth === '100%' && {
                    aspectRatio: aspectRatio === '16:9' ? '16/9' : 
                                aspectRatio === '4:3' ? '4/3' : 
                                aspectRatio === '1:1' ? '1/1' : '16/9'
                }),
                ...style
            }}
        >
            {!loaded && !error && (
                <>
                    {/* Simple placeholder with click-to-play */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                            backgroundColor: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={loadVideo}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                loadVideo();
                            }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Play video: ${title}`}
                    >
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
                                transition: 'all 0.2s ease',
                            }}
                            className="play-button"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                                style={{ marginLeft: '2px' }}
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        {/* Video title overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                padding: '20px 16px 16px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {title}
                        </div>
                    </div>
                </>
            )}

            {loaded && !error && (
                <iframe
                    src={buildYouTubeUrl()}
                    title={title}
                    width={calculatedWidth}
                    height={calculatedHeight}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    style={{
                        border: 'none',
                        width: '100%',
                        height: '100%'
                    }}
                    onError={() => {
                        setError(true);
                        onError?.();
                    }}
                />
            )}

            {error && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f0f0f0',
                        color: '#666',
                        fontSize: '14px'
                    }}
                >
                    Failed to load video
                </div>
            )}

            <style jsx>{`
                .youtube-container:hover .play-button {
                    background-color: rgba(255, 0, 0, 1);
                    transform: translate(-50%, -50%) scale(1.1);
                }
                
                .youtube-container:focus {
                    outline: 2px solid #1976d2;
                    outline-offset: 2px;
                }
            `}</style>
        </div>
    );
}