import React, { ReactNode } from "react";
import { motion, useViewportScroll, useTransform, useSpring } from "framer-motion";
import { DataProvider } from "@plasmicapp/loader-nextjs";

interface ParallaxProps {
  children: ReactNode;
  className?: string;  // Add className to your props
  from?: number;
  to?: number;
  stiffness?: number;
  damping?: number;
}

export function Parallax({ 
  children, 
  className,  // Deconstruct className from your props
  from = 0, 
  to = 400, 
  stiffness = 150, 
  damping = 30
}: ParallaxProps) {
  const { scrollYProgress } = useViewportScroll();
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);
  const springX = useSpring(x, {
    stiffness: stiffness, 
    damping: damping,
    restDelta: 0.001
  });
  
  return (
    <DataProvider name={"scrollYProgress"} data={scrollYProgress.get()}>
      <motion.div 
        className={className}  // Apply the className to your component
        style={{ 
          x: springX
        }}
      >  
        {children}
      </motion.div>
    </DataProvider>
  );
}
