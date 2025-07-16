
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
import { Button } from "../ui/button";

const slides = [
  {
    title: "AI & ML",
    subtitle: "Intelligent Automation",
    descriptionLine1: "Harness the power of AI to build",
    descriptionLine2: "smarter, more efficient applications.",
    image: {
      src: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=550&auto=format&fit=crop",
      hint: "AI robot vector"
    },
  },
  {
    title: "Blockchain Development",
    subtitle: "Decentralized & Secure",
    descriptionLine1: "Create secure, transparent solutions",
    descriptionLine2: "with blockchain technology.",
    image: {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=550&auto=format&fit=crop",
      hint: "blockchain network vector"
    },
  },
  {
    title: "Metaverse Experiences",
    subtitle: "The Next Digital Frontier",
    descriptionLine1: "Build immersive, interactive worlds",
    descriptionLine2: "in the metaverse.",
    image: {
      src: "https://images.unsplash.com/photo-1639762681057-408e52192e50?q=80&w=550&auto=format&fit=crop",
      hint: "metaverse vr vector"
    },
  },
  {
    title: "Mobile App Development",
    subtitle: "Solutions in Your Pocket",
    descriptionLine1: "High-performance applications for",
    descriptionLine2: "both iOS and Android.",
    image: {
      src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=550&auto=format&fit=crop",
      hint: "mobile app interface"
    },
  },
  {
    title: "Web Development",
    subtitle: "Crafting Digital Experiences",
    descriptionLine1: "Modern, responsive websites that",
    descriptionLine2: "drive user engagement.",
    image: {
      src: "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=550&auto=format&fit=crop",
      hint: "web design code"
    },
  },
  {
    title: "Game Development",
    subtitle: "Engage and Entertain",
    descriptionLine1: "Create captivating games for",
    descriptionLine2: "a global audience.",
    image: {
      src: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=550&auto=format&fit=crop",
      hint: "game controller"
    },
  },
  {
    title: "E-commerce Solutions",
    subtitle: "Your Digital Storefront",
    descriptionLine1: "Build powerful, scalable online stores",
    descriptionLine2: "that drive sales.",
    image: {
      src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=550&auto=format&fit=crop",
      hint: "ecommerce online shopping"
    },
  },
  {
    title: "IoT Integration",
    subtitle: "Connecting the World",
    descriptionLine1: "Develop smart, connected devices",
    descriptionLine2: "for a seamless ecosystem.",
    image: {
      src: "https://images.unsplash.com/photo-1586796676735-81639a04a34b?q=80&w=550&auto=format&fit=crop",
      hint: "iot smart home"
    },
  },
  {
    title: "Salesforce Customization",
    subtitle: "Empower Your CRM",
    descriptionLine1: "Tailor Salesforce to fit your unique",
    descriptionLine2: "business processes.",
    image: {
      src: "https://images.unsplash.com/photo-1616401784845-180844d1baed?q=80&w=550&auto=format&fit=crop",
      hint: "salesforce cloud crm"
    },
  },
];

export function HeroCarousel() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <InteractiveGrid className="absolute inset-0 z-0 opacity-50" />
      <div className="relative z-10">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
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
                            <Button asChild>
                                <Link href="/contact">
                                    Drop Your Queries
                                    <ArrowRight />
                                </Link>
                            </Button>
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
      </div>
    </section>
  );
}
