"use client";
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, School, UtensilsCrossed, HeartPulse, Landmark, Plane, Users } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";

const industries = [
  { icon: Gamepad2, name: 'Gaming', description: 'Immersive and engaging gaming experiences.' },
  { icon: School, name: 'EdTech', description: 'Innovative solutions for modern education.' },
  { icon: UtensilsCrossed, name: 'Food & Restaurant', description: 'Streamlining operations for the food industry.' },
  { icon: HeartPulse, name: 'Healthcare & Fitness', description: 'HIPAA-compliant apps for better health.' },
  { icon: Landmark, name: 'Fintech', description: 'Secure and scalable financial technology.' },
  { icon: Plane, name: 'Travel & Hospitality', description: 'Enhancing travel experiences with tech.' },
  { icon: Users, name: 'Social Media', description: 'Building communities and connecting people.' },
];

export function IndustriesCarousel() {
  return (
    <section id="industries" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Industries We Serve</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We have experience across a wide range of industries, delivering tailored solutions that meet unique challenges.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {industries.map((industry, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full bg-card group border-transparent hover:border-primary transition-all duration-300">
                    <CardContent className="flex flex-col items-center text-center p-6">
                      <div className="mb-4 p-4 bg-primary/10 rounded-full group-hover:bg-primary transition-colors duration-300">
                        <industry.icon className="h-12 w-12 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                      <p className="text-muted-foreground text-sm">{industry.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex"/>
          <CarouselNext className="hidden md:flex"/>
        </Carousel>
      </div>
    </section>
  );
}
