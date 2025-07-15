
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
    {
        title: "DeFi Trading Platform",
        description: "A secure, high-performance decentralized finance platform for trading digital assets with advanced charting and analytics.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "crypto trading chart"
        },
        tags: ["Blockchain", "React", "Node.js", "Solidity"],
        link: "#"
    },
    {
        title: "AI-Powered Logistics Optimizer",
        description: "An intelligent system that uses machine learning to optimize delivery routes, reducing fuel costs and delivery times by 30%.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "delivery truck map"
        },
        tags: ["AI/ML", "Python", "Next.js", "AWS"],
        link: "#"
    },
    {
        title: "Immersive VR Retail Experience",
        description: "A metaverse storefront that allows users to browse and interact with products in a fully immersive virtual reality environment.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "virtual reality store"
        },
        tags: ["Metaverse", "Unity", "C#", "3D Modeling"],
        link: "#"
    },
    {
        title: "Healthcare Telemedicine App",
        description: "A HIPAA-compliant mobile application connecting patients with doctors for remote consultations, prescriptions, and health monitoring.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "doctor video call"
        },
        tags: ["Mobile App", "React Native", "Firebase", "HIPAA"],
        link: "#"
    }
];

export function ProjectsSection() {
    return (
        <section className="py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Featured Projects</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        We take pride in our work. Here's a glimpse of the innovative solutions we've delivered to our clients across various industries.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.title} className="bg-card group overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                            <CardHeader className="p-0">
                                <Image
                                    src={project.image.src}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                    data-ai-hint={project.image.hint}
                                />
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <CardTitle className="mb-3 text-2xl">{project.title}</CardTitle>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Button asChild variant="link" className="p-0 h-auto text-primary">
                                    <Link href={project.link}>
                                        View Case Study
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
