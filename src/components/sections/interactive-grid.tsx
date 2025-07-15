"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface InteractiveGridProps extends React.HTMLAttributes<HTMLCanvasElement> {}

export function InteractiveGrid({ className, ...props }: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = 0;
    let mouseY = 0;

    const spacing = 35;
    const dotRadius = 1.5;
    const maxDistortion = 30;
    const dampening = 0.08;

    let dots: any[] = [];

    const createGrid = () => {
      dots = [];
      const rows = Math.floor(height / spacing) + 1;
      const cols = Math.floor(width / spacing) + 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            x: x * spacing,
            y: y * spacing,
            originalX: x * spacing,
            originalY: y * spacing,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    createGrid();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      createGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.floor(width / spacing) + 1;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = mouseX - dot.originalX;
        const dy = mouseY - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          const targetX = dot.originalX - Math.cos(angle) * force * maxDistortion;
          const targetY = dot.originalY - Math.sin(angle) * force * maxDistortion;

          dot.vx += (targetX - dot.x) * dampening;
          dot.vy += (targetY - dot.y) * dampening;
        } else {
          dot.vx += (dot.originalX - dot.x) * dampening;
          dot.vy += (dot.originalY - dot.y) * dampening;
        }

        dot.vx *= 0.92;
        dot.vy *= 0.92;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const dotDistance = Math.sqrt(
          (mouseX - dot.x) * (mouseX - dot.x) + (mouseY - dot.y) * (mouseY - dot.y)
        );

        const gradient = 1 - Math.min(1, dotDistance / 200);
        
        const isDark = document.documentElement.classList.contains('dark');
        
        ctx.fillStyle = isDark ? `rgba(200, 200, 255, ${0.1 + gradient * 0.4})` : `rgba(31, 41, 55, ${0.1 + gradient * 0.4})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Horizontal line to the next dot
        if (i < dots.length - 1 && (i + 1) % cols !== 0) {
          const nextDot = dots[i + 1];
           ctx.beginPath();
           ctx.strokeStyle = isDark ? `rgba(100, 100, 140, ${0.05 + gradient * 0.2})` : `rgba(31, 41, 55, ${0.05 + gradient * 0.2})`;
           ctx.lineWidth = 0.5;
           ctx.moveTo(dot.x, dot.y);
           ctx.lineTo(nextDot.x, nextDot.y);
           ctx.stroke();
        }

        // Vertical line to the dot below
        if (i + cols < dots.length) {
          const dotBelow = dots[i + cols];
            ctx.beginPath();
            ctx.strokeStyle = isDark ? `rgba(100, 100, 140, ${0.05 + gradient * 0.2})` : `rgba(31, 41, 55, ${0.05 + gradient * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dotBelow.x, dotBelow.y);
            ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn(className)} {...props}></canvas>;
}
