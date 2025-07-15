
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
    const dotRadius = 2.8;
    const maxDistortion = 30;
    const dampening = 0.08;

    const colors = [
      'hsl(var(--primary))',
      'hsl(210 90% 55%)',
      'hsl(160 90% 55%)',
      'hsl(45 90% 55%)',
      'hsl(30 90% 55%)',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
      'hsl(280 80% 60%)',
    ];

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
            color: colors[Math.floor(Math.random() * colors.length)],
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
      const isDark = document.documentElement.classList.contains('dark');

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

        ctx.fillStyle = dot.color;
        ctx.globalAlpha = 0.3 + gradient * 0.5;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;

        const lineColor = isDark ? `rgba(255, 255, 255, 0.5)` : `rgba(0, 0, 0, 0.5)`;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.2;

        if (i < dots.length - 1 && (i + 1) % cols !== 0) {
          const nextDot = dots[i + 1];
           ctx.beginPath();
           ctx.moveTo(dot.x, dot.y);
           ctx.lineTo(nextDot.x, nextDot.y);
           ctx.stroke();
        }

        if (i + cols < dots.length) {
          const dotBelow = dots[i + cols];
            ctx.beginPath();
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
