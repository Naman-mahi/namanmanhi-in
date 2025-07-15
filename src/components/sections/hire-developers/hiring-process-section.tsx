"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ClipboardList, Users, MessageSquare, Code, Rocket, Handshake } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";


const hiringProcess = [
    { 
        icon: ClipboardList, 
        title: "Submit Your Requirements", 
        description: "Reach out to our team and provide the details of your project. The more we know, the better we can assist you." 
    },
    { 
        icon: Users, 
        title: "Screening & Shortlisting", 
        description: "Based on your needs, we will share profiles of our top developers for you to assess and shortlist the most suitable candidates." 
    },
    { 
        icon: MessageSquare, 
        title: "Schedule Interviews", 
        description: "You can interview the shortlisted developers to test their technical proficiency and ensure they are the perfect fit for your team." 
    },
    { 
        icon: Code, 
        title: "Trial Period / Task", 
        description: "Assign a small test project or conduct a trial period to see our developers in action before making a final commitment."
    },
    {
        icon: Handshake,
        title: "Finalize & Sign Agreement",
        description: "Once you are satisfied, we'll finalize the terms and sign an agreement, including an NDA to protect your project idea."
    },
    { 
        icon: Rocket, 
        title: "Team Onboarding & Kick-off", 
        description: "Your new dedicated developer or team is onboarded. You get full access to monitor progress and collaborate in real-time." 
    }
];

export function HiringProcessSection() {
    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">A Well-Defined Hiring Process</h2>
                    <p className="mt-4 text-muted-foreground">Need to augment your team? Follow our quick and transparent steps to onboard top talent for your project.</p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {hiringProcess.map((step, index) => (
                            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                                <div className="p-1 h-full">
                                    <Card className="h-full bg-card shadow-lg border-t-4 border-primary/20 hover:border-primary transition-all duration-300 group">
                                        <CardContent className="flex flex-col items-center text-center p-8">
                                            <div className="relative mb-6">
                                                <div className="bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                                    <step.icon className="w-10 h-10" />
                                                </div>
                                                <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg border-4 border-background">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                            <p className="text-muted-foreground text-sm flex-grow">{step.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </section>
    );
}
