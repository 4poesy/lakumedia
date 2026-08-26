'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface CinematicCardMotionProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export function CinematicCardMotion({
  children,
  className = '',
  hoverScale = 1.025,
  hoverY = -4,
}: CinematicCardMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
