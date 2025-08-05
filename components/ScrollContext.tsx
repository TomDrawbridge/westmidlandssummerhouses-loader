import React, { useEffect, useCallback } from "react";
import { DataProvider } from "@plasmicapp/loader-nextjs";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10; // Small threshold to avoid flickering
    setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial state
      setIsScrolled(window.scrollY > 10);

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]); // ✅ Fixed dependency array

  return (
    <DataProvider name={"isScrolled"} data={isScrolled}>
      {children}
    </DataProvider>
  );
}