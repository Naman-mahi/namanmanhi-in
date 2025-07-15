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
      src: "https://placehold.co/800x600.png",
      hint: "digital technology abstract"
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
      src: "https://placehold.co/800x600.png",
      hint: "futuristic cityscape night"
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
      src: "https://placehold.co/800x600.png",
      hint: "team brainstorming office"
    },
  },
];

export function HeroCarousel() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-background">
       <Header variant="sticky" />
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="h-full w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full w-full">
              <div className="container mx-auto h-full w-full flex items-center">
                <div className="grid md:grid-cols-2 items-center gap-12">
                  <div className="flex flex-col items-start text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                      {slide.title}
                    </h1>
                    <p className="mt-4 max-w-xl text-lg md:text-xl text-muted-foreground">
                      {slide.description}
                    </p>
                    <div className="mt-8">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Let's Build Together
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                     <Image
                        src={slide.image.src}
                        alt="Hero background"
                        width={800}
                        height={600}
                        className="object-cover rounded-lg shadow-2xl"
                        data-ai-hint={slide.image.hint}
                        priority={index === 0}
                      />
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
