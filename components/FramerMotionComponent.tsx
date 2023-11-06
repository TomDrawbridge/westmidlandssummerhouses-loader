import * as React from 'react';
import { motion, useInView, stagger, staggerChildren } from 'framer-motion';

interface FramerMotionComponentProps {
  className: string;
  duration?: number;
  bounce?: number;
  delay?: number;
  initialX?: number;
  initialY?: number;
  initialOpacity?: number;
  initialRotate?: number;
  inViewX?: number;
  inViewY?: number;
  inViewOpacity?: number;
  inViewRotate?: number;
  children?: React.ReactNode;
}

const FramerMotionComponent: React.FC<FramerMotionComponentProps> = ({
  className = 'framerDiv',
  duration = 1,
  bounce = 0.2,
  delay = 0.2,
  initialX = 0,
  initialY = 100,
  initialOpacity = 0,
  initialRotate = 0,
  inViewX = 0,
  inViewY = 0,
  inViewOpacity = 1,
  inViewRotate = 0,
  stagger = 0.5,
  children
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  const initialState = {
    x: initialX,
    y: initialY,
    opacity: initialOpacity,
    rotate: initialRotate,
  };

  const inViewState = {
    x: inView ? inViewX : initialX,
    y: inView ? inViewY : initialY,
    opacity: inView ? inViewOpacity : initialOpacity,
    rotate: inView ? inViewRotate : initialRotate,
  };

  return (
    <motion.div
      className={`framerMotion ${className}`}
      ref={ref}
      initial={initialState}
      animate={inViewState}
      transition={{
        type: 'spring',
        duration: duration,
        bounce: bounce,
        delay: delay,
        staggerChildren: stagger, 
      }}
    >
      {children}
    </motion.div>
  );
};

export default FramerMotionComponent;
