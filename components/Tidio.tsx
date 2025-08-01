"use client";

import { useEffect, useRef } from "react";

interface TidioProps {
    tidioId: string;
    loadOnInteraction?: boolean;
    loadDelay?: number;
}

export default function Tidio({
    tidioId,
    loadOnInteraction = true,
    loadDelay = 10000
}: TidioProps) {
    const hasLoaded = useRef(false);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    const loadTidio = () => {
        if (hasLoaded.current || scriptRef.current) return;

        hasLoaded.current = true;

        const script = document.createElement("script");
        script.src = `//code.tidio.co/${tidioId}.js`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log("Tidio chat loaded successfully");
        };

        script.onerror = () => {
            console.warn("Failed to load Tidio chat");
            hasLoaded.current = false; // Allow retry
        };

        document.head.appendChild(script);
        scriptRef.current = script;
    };

    useEffect(() => {
        // Only load in production
        if (process.env.NODE_ENV !== 'production') return;

        if (!loadOnInteraction) {
            // Load immediately if not waiting for interaction
            loadTidio();
            return;
        }

        // Load on user interaction for better performance
        const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
        let timeoutId: NodeJS.Timeout;

        const handleInteraction = () => {
            loadTidio();
            cleanup();
        };

        const cleanup = () => {
            events.forEach(event => {
                document.removeEventListener(event, handleInteraction, { capture: true });
            });
            if (timeoutId) clearTimeout(timeoutId);
        };

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

        // Alternative: Load when user scrolls to footer (more engagement-based)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasLoaded.current) {
                        loadTidio();
                        observer.disconnect();
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

        return () => {
            cleanup();
            observer.disconnect();

            // Cleanup script on unmount
            if (scriptRef.current && scriptRef.current.parentNode) {
                scriptRef.current.parentNode.removeChild(scriptRef.current);
            }
        };
    }, [tidioId, loadOnInteraction, loadDelay]);

    return null;
}