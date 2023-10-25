import React from "react";
import { motion, AnimationProps } from "framer-motion";

type EffectType = "Appear" | "ScrollTransform";

type TransitionProps = {
  type?: "tween" | "spring" | "inertia";
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  duration?: number;
  [key: string]: any;  // for value-specific transitions
};

type MotionProps = AnimationProps & {
  children?: React.ReactNode;
  effectType: EffectType;

  // For the Appear effect type
  opacity?: number;
  scale?: number;
  rotate?: number;
  offsetX?: number;
  offsetY?: number;

  // For the Scroll Transform effect type
  fromOpacity?: number;
  fromScale?: number;
  fromRotate?: number;
  fromOffsetX?: number;
  fromOffsetY?: number;
  toOpacity?: number;
  toScale?: number;
  toRotate?: number;
  toOffsetX?: number;
  toOffsetY?: number;

  // Transition
  transitionType?: "tween" | "spring" | "inertia";
  transitionDelay?: number;
  transitionStiffness?: number;
  transitionDamping?: number;
  transitionMass?: number;
  transitionEase?: "linear" | "easeIn" | "easeOut" | "easeInOut";
  transitionDuration?: number;
};

export function MotionWrapper(props: MotionProps) {
  const {
    children,
    effectType,
    transitionType = "tween", 
    transitionDelay = 0,
    transitionStiffness = 0,
    transitionDamping = 0,
    transitionMass = 1,
    transitionEase = "linear",
    transitionDuration = 0.3,
    ...otherProps
  } = props;

  // Initialize an empty transition object
  let transition = {};

  // Use a switch case to populate the transition object based on transitionType
  switch (transitionType) {
    case "tween":
        transition = {
            type: "tween",
            delay: transitionDelay,
            ease: transitionEase,
            duration: transitionDuration,
        };
        break;
    case "spring":
        transition = {
            type: "spring",
            delay: transitionDelay,
            stiffness: transitionStiffness,
            damping: transitionDamping,
            mass: transitionMass,
        };
        break;
    case "inertia":
        transition = {
            type: "inertia",
            delay: transitionDelay,
            // additional inertia-related properties can be added here
        };
        break;
    default:
        transition = {
            delay: transitionDelay
        };
  }

  let initial: AnimationProps = {};
  let animate: AnimationProps = {};

if (effectType === "Appear") {
    initial = {
        opacity: props.opacity || 1,
        scale: props.scale || 1,
        rotate: props.rotate || 0,
        x: props.offsetX || 0,
        y: props.offsetY || 0,
    };

    animate = {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
    }; 
  } else if (effectType === "ScrollTransform") {
    initial = {
      opacity: props.fromOpacity,
      scale: props.fromScale,
      rotate: props.fromRotate,
      x: props.fromOffsetX,
      y: props.fromOffsetY,
    };

    animate = {
      opacity: props.toOpacity,
      scale: props.toScale,
      rotate: props.toRotate,
      x: props.toOffsetX,
      y: props.toOffsetY,
    };
  }

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      {...otherProps}
    >
      {children}
    </motion.div>
  );
}
