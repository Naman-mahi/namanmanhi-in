"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { Particles } from "./particles";

const slides = [
  {
    title: "Artificial Intelligence (AI)",
    subtitle: "Development Company",
    descriptionLine1: "Top AI Development Company in",
    descriptionLine2: "GCC and India",
    image: {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=550&auto=format&fit=crop",
      hint: "artificial intelligence robot"
    },
  },
  {
    title: "Web Development",
    subtitle: "Crafting Digital Experiences",
    descriptionLine1: "Modern, responsive websites that",
    descriptionLine2: "drive user engagement.",
    image: {
      src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=550&auto=format&fit=crop",
      hint: "web design code"
    },
  },
  {
    title: "Mobile App Development",
    subtitle: "Solutions in Your Pocket",
    descriptionLine1: "High-performance applications for",
    descriptionLine2: "both iOS and Android.",
    image: {
      src: "https://images.unsplash.com/photo-1605152276825-9516d2698c62?q=80&w=550&auto=format&fit=crop",
      hint: "mobile app interface"
    },
  },
];

export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Particles className="absolute inset-0 -z-10" />
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="w-full pt-20">
                <div className="container mx-auto pt-16 pb-24">
                  <div className="grid md:grid-cols-2 items-center gap-12">
                    <div className="flex flex-col items-start text-left">
                      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                        {slide.title}
                      </h1>
                      <p className="mt-2 text-2xl text-foreground/80">{slide.subtitle}</p>
                      
                      <div className="mt-8 space-y-6">
                          <div className="flex items-center gap-4">
                              <span className="text-5xl font-bold text-primary">#1</span>
                              <div>
                                  <p className="font-semibold">{slide.descriptionLine1}</p>
                                  <p className="text-muted-foreground">{slide.descriptionLine2}</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4 group">
                              <div className="w-12 h-12 rounded-full border border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
                                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                              </div>
                              <a href="#contact" className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Drop Your Queries</a>
                          </div>
                      </div>
                    </div>
                    <div className="relative hidden md:block">
                      <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-30"></div>
                      <Image
                          src={slide.image.src}
                          alt={slide.title}
                          width={550}
                          height={550}
                          className="object-cover rounded-xl shadow-2xl relative z-10"
                          data-ai-hint={slide.image.hint}
                          priority={index === 0}
                        />
                    </div>
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
