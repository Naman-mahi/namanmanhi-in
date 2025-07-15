"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={cn("flex items-end gap-2 justify-start")}>
        <div className={cn("max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-secondary text-secondary-foreground rounded-bl-none")}>
            <motion.div className="flex items-center gap-1.5">
                <motion.span
                    style={{ width: 6, height: 6, backgroundColor: 'hsl(var(--muted-foreground))', borderRadius: '50%' }}
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ ...dotVariants.animate.transition, delay: 0 }}
                />
                <motion.span
                    style={{ width: 6, height: 6, backgroundColor: 'hsl(var(--muted-foreground))', borderRadius: '50%' }}
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ ...dotVariants.animate.transition, delay: 0.2 }}
                />
                <motion.span
                    style={{ width: 6, height: 6, backgroundColor: 'hsl(var(--muted-foreground))', borderRadius: '50%' }}
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ ...dotVariants.animate.transition, delay: 0.4 }}
                />
            </motion.div>
        </div>
    </div>
  );
}
