"use client";

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          // Handle floating point numbers for ratings
          const formattedValue = latest.toFixed(value % 1 !== 0 ? 1 : 0);
          ref.current.textContent = `${Intl.NumberFormat('en-US').format(parseFloat(formattedValue))}${suffix}`;
        }
      }),
    [springValue, suffix, value]
  );

  return <span ref={ref} />;
}
