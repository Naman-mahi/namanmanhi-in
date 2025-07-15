"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const slides = [
  {
    title: "Blockchain Development",
    description: "Secure, scalable, and decentralized solutions to power your business.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "blockchain network"
    }
  },
  {
    title: "AI & ML Solutions",
    description: "Harness the power of artificial intelligence to drive growth and innovation.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "artificial intelligence"
    }
  },
  {
    title: "Metaverse Experiences",
    description: "Build immersive and interactive worlds in the metaverse.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "metaverse vr"
    }
  },
  {
    title: "Mobile App Development",
    description: "Engaging and high-performance mobile applications for iOS and Android.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "mobile app"
    }
  },
  {
    title: "Web Development",
    description: "Modern, responsive, and powerful websites that deliver results.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "web development"
    }
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

export function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-screen">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <Image
                src={slide.image.src}
                alt={slide.title}
                fill
                className="object-cover"
                data-ai-hint={slide.image.hint}
                priority={index === 0}
              />
              <div className="relative z-20 flex items-center justify-center h-full text-center text-white">
                <AnimatePresence>
                  {current === index && (
                    <motion.div
                      className="container mx-auto px-4"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                        variants={textVariants}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80"
                        variants={textVariants}
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div variants={textVariants} className="mt-8">
                        <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Drop Your Queries
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className='hidden md:block'>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30" />
        </div>
      </Carousel>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              current === index ? "w-6 bg-primary" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
