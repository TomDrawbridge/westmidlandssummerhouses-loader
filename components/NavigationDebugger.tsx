import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NavigationDebugger = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log('🔧 Navigation Debugger initialized');
    console.log('📍 Current location:', {
      pathname: router.pathname,
      asPath: router.asPath,
      query: router.query,
      href: window.location.href
    });
    console.log('📱 Device info:', {
      userAgent: navigator.userAgent,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      touchSupport: 'ontouchstart' in window,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`
    });

    // Monitor router events
    const handleRouteChangeStart = (url: string) => {
      console.log('🚀 [ROUTER] Route change started:', url);
    };

    const handleRouteChangeComplete = (url: string) => {
      console.log('✅ [ROUTER] Route change completed:', url);
      console.log('🔍 [DEBUG] Current page state after route change:', {
        windowLocationHref: window.location.href,
        windowLocationPathname: window.location.pathname,
        routerPathname: router.pathname,
        routerAsPath: router.asPath,
        documentTitle: document.title,
        bodyHTML: document.body.innerHTML.substring(0, 500) + '...' // First 500 chars of body
      });
    };

    const handleRouteChangeError = (err: any, url: string) => {
      console.error('❌ [ROUTER] Route change error:', err, 'URL:', url);
    };

    const handleBeforeHistoryChange = (url: string) => {
      console.log('📚 [ROUTER] Before history change:', url);
    };

    // Add router event listeners
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);

    // Monitor all click events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        console.log('🔗 [CLICK] Link clicked:', {
          href: link.href,
          hrefAttribute: link.getAttribute('href'),
          textContent: link.textContent?.trim(),
          tagName: link.tagName,
          className: link.className,
          id: link.id,
          target: link.target,
          rel: link.rel,
          clickedElement: target.tagName + (target.className ? '.' + target.className.split(' ').join('.') : ''),
          mouseButton: e.button,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          defaultPrevented: e.defaultPrevented,
          bubbles: e.bubbles,
          isTrusted: e.isTrusted,
          timeStamp: e.timeStamp
        });

        // Check if it's an internal link
        if (link.href && link.href.startsWith(window.location.origin)) {
          console.log('🏠 [CLICK] Internal link detected');
        } else if (link.href) {
          console.log('🌐 [CLICK] External link detected');
        }
      } else {
        // Log clicks on buttons or other interactive elements
        const button = target.closest('button, [role="button"], [onclick]');
        if (button) {
          console.log('🔘 [CLICK] Button/interactive element clicked:', {
            tagName: button.tagName,
            textContent: button.textContent?.trim(),
            className: button.className,
            id: button.id,
            type: (button as HTMLButtonElement).type,
            onclick: button.getAttribute('onclick'),
            role: button.getAttribute('role')
          });
        }
      }
    };

    // Monitor touch events
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        console.log('👆 [TOUCH] Touch start on link:', {
          href: link.href,
          hrefAttribute: link.getAttribute('href'),
          textContent: link.textContent?.trim(),
          touches: e.touches.length,
          targetTouches: e.targetTouches.length
        });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        console.log('👆 [TOUCH] Touch end on link:', {
          href: link.href,
          hrefAttribute: link.getAttribute('href'),
          textContent: link.textContent?.trim(),
          changedTouches: e.changedTouches.length
        });
      }
    };

    // Monitor form submissions
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      console.log('📝 [FORM] Form submitted:', {
        action: form.action,
        method: form.method,
        target: form.target,
        elements: form.elements.length
      });
    };

    // Monitor keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link) {
          console.log('⌨️ [KEYBOARD] Enter/Space pressed on link:', {
            href: link.href,
            key: e.key,
            defaultPrevented: e.defaultPrevented
          });
        }
      }
    };

    // Monitor history changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(state, title, url) {
      console.log('📖 [HISTORY] pushState called:', { state, title, url });
      return originalPushState.apply(this, arguments as any);
    };

    history.replaceState = function(state, title, url) {
      console.log('📖 [HISTORY] replaceState called:', { state, title, url });
      return originalReplaceState.apply(this, arguments as any);
    };

    // Monitor popstate events
    const handlePopState = (e: PopStateEvent) => {
      console.log('⬅️ [HISTORY] popstate event:', {
        state: e.state,
        url: window.location.href
      });
    };

    // Add all event listeners
    document.addEventListener('click', handleClick, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('submit', handleSubmit, true);
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('popstate', handlePopState);

    // Monitor URL changes
    let lastUrl = window.location.href;
    const checkUrlChange = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        console.log('🔄 [URL] URL changed:', {
          from: lastUrl,
          to: currentUrl,
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash
        });
        
        // Check for Plasmic components after URL change
        setTimeout(() => {
          const plasmicComponents = document.querySelectorAll('[data-plasmic-name], [class*="plasmic"]');
          console.log('🎨 [PLASMIC] Components found after URL change:', plasmicComponents.length);
          
          const plasmicErrors = document.querySelectorAll('.plasmic-error, [data-plasmic-error]');
          if (plasmicErrors.length > 0) {
            console.error('❌ [PLASMIC] Error components found:', plasmicErrors);
          }
          
          // Check if the main content area updated
          const mainContent = document.querySelector('main, [role="main"], .main-content');
          if (mainContent) {
            console.log('📄 [CONTENT] Main content area found, innerHTML length:', mainContent.innerHTML.length);
          } else {
            console.warn('⚠️ [CONTENT] No main content area found');
          }
        }, 100);
        
        lastUrl = currentUrl;
      }
    };

    const urlCheckInterval = setInterval(checkUrlChange, 100);

    // Cleanup
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('submit', handleSubmit, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('popstate', handlePopState);

      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      
      clearInterval(urlCheckInterval);
    };
  }, [router]);

  return null;
};

export default NavigationDebugger;
