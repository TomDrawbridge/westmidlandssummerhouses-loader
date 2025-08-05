"use client";

import { useEffect, useRef, useCallback } from "react";

interface TidioProps {
    tidioId: string;
    loadOnInteraction?: boolean; // Keep for backward compatibility
    loadDelay?: number;
    loadStrategy?: 'immediate' | 'interaction' | 'idle' | 'viewport';
}

export default function Tidio({
    tidioId,
    loadOnInteraction = true,
    loadDelay = 10000,
    loadStrategy
}: TidioProps) {
    const hasLoaded = useRef(false);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    // Determine the actual strategy to use
    const actualStrategy = loadStrategy || (loadOnInteraction ? 'interaction' : 'immediate');

    const loadTidio = useCallback(() => {
        if (hasLoaded.current || scriptRef.current) return;

        hasLoaded.current = true;

        const script = document.createElement("script");
        script.src = `https://code.tidio.co/${tidioId}.js`; // Use HTTPS explicitly
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log("Tidio chat loaded successfully");
        };

        script.onerror = () => {
            console.warn("Failed to load Tidio chat");
            hasLoaded.current = false; // Allow retry
            scriptRef.current = null;
        };

        document.head.appendChild(script);
        scriptRef.current = script;
    }, [tidioId]);

    const loadTidioIdle = useCallback(() => {
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
                if (!hasLoaded.current) loadTidio();
            }, { timeout: loadDelay });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
                if (!hasLoaded.current) loadTidio();
            }, Math.min(loadDelay, 3000)); // Cap at 3 seconds for fallback
        }
    }, [loadTidio, loadDelay]);

    useEffect(() => {
        // Only load in production
        if (process.env.NODE_ENV !== 'production') return;

        let timeoutId: NodeJS.Timeout;
        let observer: IntersectionObserver | null = null;

        const cleanup = () => {
            const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
            events.forEach(event => {
                document.removeEventListener(event, handleInteraction, { capture: true });
            });
            if (timeoutId) clearTimeout(timeoutId);
            if (observer) observer.disconnect();
        };

        const handleInteraction = () => {
            loadTidio();
            cleanup();
        };

        switch (actualStrategy) {
            case 'immediate':
                loadTidio();
                break;

            case 'idle':
                loadTidioIdle();
                break;

            case 'interaction':
                // Load on user interaction for better performance
                const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];

                // Attach interaction listeners
                events.forEach(event => {
                    document.addEventListener(event, handleInteraction, {
                        once: true,
                        passive: true,
                        capture: true
                    });
                });

                // Fallback timeout
                timeoutId = setTimeout(() => {
                    if (!hasLoaded.current) {
                        loadTidio();
                        cleanup();
                    }
                }, loadDelay);
                break;

            case 'viewport':
                // Load when user scrolls to footer (more engagement-based)
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !hasLoaded.current) {
                                loadTidio();
                                observer?.disconnect();
                                cleanup();
                            }
                        });
                    },
                    { threshold: 0.1 }
                );

                // Observe footer if it exists
                const footer = document.querySelector('footer');
                if (footer) {
                    observer.observe(footer);
                }

                // Also add fallback timeout for viewport strategy
                timeoutId = setTimeout(() => {
                    if (!hasLoaded.current) {
                        loadTidio();
                        cleanup();
                    }
                }, loadDelay);
                break;
        }

        return () => {
            cleanup();

            // Cleanup script on unmount
            if (scriptRef.current && scriptRef.current.parentNode) {
                scriptRef.current.parentNode.removeChild(scriptRef.current);
            }
        };
    }, [tidioId, actualStrategy, loadDelay, loadTidio, loadTidioIdle]);

    return null;
}