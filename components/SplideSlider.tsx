import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export interface SplideSliderProps {
  className?: string;
  children?: React.ReactNode;
  // Splide options
  rewind?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  speed?: number;
  gap?: string | number;
  perPage?: number;
  perMove?: number;
  arrows?: boolean;
  pagination?: boolean;
  keyboard?: boolean;
  wheel?: boolean;
  drag?: boolean;
  snap?: boolean;
  // Responsive breakpoints
  breakpoints?: Record<number, any>;
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  // Visual options
  width?: string | number;
  height?: string | number;
  fixedWidth?: string | number;
  fixedHeight?: string | number;
  // Direction
  direction?: 'ltr' | 'rtl' | 'ttb';
  // Easing
  easing?: string;
  // Cover mode
  cover?: boolean;
  // Focus
  focus?: number | 'center';
  // Live region
  isNavigation?: boolean;
  // Trimming space
  trimSpace?: boolean;
}

export function SplideSlider({
  className,
  children,
  rewind = true,
  loop = false,
  autoplay = false,
  interval = 3000,
  pauseOnHover = true,
  pauseOnFocus = true,
  speed = 400,
  gap = '1rem',
  perPage = 1,
  perMove = 1,
  arrows = true,
  pagination = true,
  keyboard = true,
  wheel = false,
  drag = true,
  snap = false,
  breakpoints,
  ariaLabel,
  ariaLabelledBy,
  width,
  height,
  fixedWidth,
  fixedHeight,
  direction = 'ltr',
  easing,
  cover = false,
  focus = 0,
  isNavigation = false,
  trimSpace = true,
  ...props
}: SplideSliderProps) {
  const options = {
    rewind,
    loop,
    autoplay,
    interval,
    pauseOnHover,
    pauseOnFocus,
    speed,
    gap,
    perPage,
    perMove,
    arrows,
    pagination,
    keyboard,
    wheel,
    drag,
    snap,
    breakpoints,
    width,
    height,
    fixedWidth,
    fixedHeight,
    direction,
    easing,
    cover,
    focus,
    isNavigation,
    trimSpace,
  };

  // Filter out undefined values
  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(([_, value]) => value !== undefined)
  );

  // If children are not SplideSlide components, wrap them
  const processedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === SplideSlide) {
      return child;
    }
    return (
      <SplideSlide key={index}>
        {child}
      </SplideSlide>
    );
  });

  return (
    <Splide
      className={className}
      options={filteredOptions}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {processedChildren}
    </Splide>
  );
}
