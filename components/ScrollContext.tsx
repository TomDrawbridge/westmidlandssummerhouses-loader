import React, { ReactNode, useEffect } from "react";
import { DataProvider } from "@plasmicapp/loader-nextjs";

export interface ScrollContextValue {
  isScrolled: boolean;
}

export const ScrollContext = React.createContext<ScrollContextValue>({
  isScrolled: false,
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  useEffect(() => {
    // This condition ensures that this effect only runs in the browser where window is defined
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });
  
  return (
      <DataProvider name={"isScrolled"} data={isScrolled}>
        {children}
      </DataProvider>
  );
}
