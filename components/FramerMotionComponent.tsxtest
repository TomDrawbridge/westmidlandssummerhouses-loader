// FramerMotionComponent.tsx
import * as React from 'react';
import { motion } from 'framer-motion';

interface FramerMotionComponentProps {
  transition: {
    duration: number;
  };
  children?: React.ReactNode;
}

const FramerMotionComponent: React.FC<FramerMotionComponentProps> = ({ transition, children }) => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 300 }}
      transition={transition}  // Now transition is an object with a duration field
    >
      {children}
    </motion.div>
  );
};

export default FramerMotionComponent;