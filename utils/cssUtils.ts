/**
 * Utility to defer loading of non-critical CSS
 */

export const deferStyles = (href: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = 'style';
  link.onload = function() {
    // @ts-ignore
    this.onload = null;
    // @ts-ignore
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

export const loadStylesAsync = (cssModules: string[]) => {
  if (typeof window === 'undefined') return;

  cssModules.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() {
      // @ts-ignore
      this.media = 'all';
    };
    document.head.appendChild(link);

    // Fallback for browsers that don't support onload
    setTimeout(() => {
      if (link.media === 'print') {
        link.media = 'all';
      }
    }, 1000);
  });
};

export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  if (as === 'font') {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
};
