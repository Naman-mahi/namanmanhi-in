
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-foreground/50 pointer-events-none z-[9999]"
      style={{
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 500,
        mass: 0.5,
      }}
    />
  );
}
