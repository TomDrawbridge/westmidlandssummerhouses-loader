import React, { ReactNode } from "react";
import { motion, useViewportScroll, useTransform, useSpring } from "framer-motion";
import { DataProvider } from "@plasmicapp/loader-nextjs";

interface ParallaxTextProps {
  children: ReactNode;
  from?: number;
  to?: number;
  stiffness?: number;
  damping?: number;
}

export function ParallaxText({ 
  children, 
  from = 0, 
  to = 400, 
  stiffness = 100, 
  damping = 30 
}: ParallaxTextProps) {
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
        style={{ 
          x: springX
        }}
      >  
        {children}
      </motion.div>
    </DataProvider>
  );
}
