"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const engagementModels = [
    { 
        image: "https://placehold.co/400x300.png", 
        hint: "dedicated team vector", 
        title: "Dedicated Development Team", 
        description: "Hire a Dedicated development team that holds knowledge about complex development technologies to deliver top-notch results." 
    },
    { 
        image: "https://placehold.co/400x300.png", 
        hint: "team extension vector", 
        title: "Team Extension", 
        description: "Hire dedicated developers who can help you enhance the capabilities of your development team by leveraging the technical proficiency required for the projects." 
    },
    { 
        image: "https://placehold.co/400x300.png", 
        hint: "fixed price contract", 
        title: "Fixed Cost Model", 
        description: "Hire highly skilled developers who hold the proficiency to work on your simplest to most complex custom projects at a fixed cost." 
    },
];

export function EngagementModelsSection() {
    return (
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Engagement Models</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        Browse through our flexible engagement models to hire the best developers from our team of experts for your project needs.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {engagementModels.map(model => (
                        <Card key={model.title} className="bg-card group overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                            <CardHeader className="p-0">
                                <Image 
                                    src={model.image} 
                                    alt={model.title} 
                                    width={400} 
                                    height={300} 
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                                    data-ai-hint={model.hint} 
                                />
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-3">{model.title}</h3>
                                <p className="text-muted-foreground text-sm flex-grow">{model.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
