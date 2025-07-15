"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: (
      <>
        Pioneering <span className="text-primary">Digital</span> Transformation
      </>
    ),
    description: "We craft innovative solutions in Blockchain, AI/ML, and Web/Mobile Development to elevate your business in the digital era.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "digital technology"
    },
  },
  {
    title: (
      <>
        Building The <span className="text-primary">Future</span>, Today
      </>
    ),
    description: "Our expertise in cutting-edge tech helps you stay ahead of the curve and deliver exceptional user experiences.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "futuristic cityscape"
    },
  },
  {
    title: (
      <>
        Your Vision, <span className="text-primary">Engineered</span>
      </>
    ),
    description: "From concept to launch, we are your dedicated partners in turning ambitious ideas into reality.",
    image: {
      src: "https://placehold.co/1920x1080.png",
      hint: "team brainstorming"
    },
  },
];

export function HeroCarousel() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
       <Header variant="inline" />
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="h-full w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full w-full">
              <div className="relative h-full w-full flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                  src={slide.image.src}
                  alt="Hero background"
                  fill
                  className="object-cover"
                  data-ai-hint={slide.image.hint}
                  priority={index === 0}
                />
                <div className="relative z-20 flex flex-col items-center text-white container mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
                    {slide.description}
                  </p>
                  <div className="mt-8">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Let's Build Together
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
