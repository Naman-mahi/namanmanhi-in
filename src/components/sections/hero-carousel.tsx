"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { InteractiveGrid } from "./interactive-grid";
import Link from "next/link";

const slides = [
  {
    title: "AI & ML",
    subtitle: "Intelligent Automation",
    descriptionLine1: "Harness the power of AI to build",
    descriptionLine2: "smarter, more efficient applications.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "AI robot vector"
    },
  },
  {
    title: "Blockchain Development",
    subtitle: "Decentralized & Secure",
    descriptionLine1: "Create secure, transparent solutions",
    descriptionLine2: "with blockchain technology.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "blockchain network vector"
    },
  },
  {
    title: "Metaverse Experiences",
    subtitle: "The Next Digital Frontier",
    descriptionLine1: "Build immersive, interactive worlds",
    descriptionLine2: "in the metaverse.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "metaverse vr vector"
    },
  },
  {
    title: "Mobile App Development",
    subtitle: "Solutions in Your Pocket",
    descriptionLine1: "High-performance applications for",
    descriptionLine2: "both iOS and Android.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "mobile app interface vector"
    },
  },
  {
    title: "Web Development",
    subtitle: "Crafting Digital Experiences",
    descriptionLine1: "Modern, responsive websites that",
    descriptionLine2: "drive user engagement.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "web design code vector"
    },
  },
  {
    title: "Game Development",
    subtitle: "Engage and Entertain",
    descriptionLine1: "Create captivating games for",
    descriptionLine2: "a global audience.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "game controller vector"
    },
  },
  {
    title: "E-commerce Solutions",
    subtitle: "Your Digital Storefront",
    descriptionLine1: "Build powerful, scalable online stores",
    descriptionLine2: "that drive sales.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "ecommerce online shopping vector"
    },
  },
  {
    title: "IoT Integration",
    subtitle: "Connecting the World",
    descriptionLine1: "Develop smart, connected devices",
    descriptionLine2: "for a seamless ecosystem.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "iot smart home vector"
    },
  },
  {
    title: "Salesforce Customization",
    subtitle: "Empower Your CRM",
    descriptionLine1: "Tailor Salesforce to fit your unique",
    descriptionLine2: "business processes.",
    image: {
      src: "https://placehold.co/550x550.png",
      hint: "salesforce cloud crm vector"
    },
  },
];

export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <InteractiveGrid className="absolute inset-0 -z-10" />
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
                           <Link href="#contact" className="group inline-flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full border border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
                                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                              </div>
                              <span className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Drop Your Queries</span>
                          </Link>
                      </div>
                    </div>
                    <div className="relative hidden md:block">
                       <Image
                          src={slide.image.src}
                          alt={slide.title}
                          width={550}
                          height={550}
                          className="object-contain rounded-xl relative z-10"
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
