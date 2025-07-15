"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight, Code, BrainCircuit, Users, Palette, Monitor, TestTube } from 'lucide-react';

const talent = [
    { 
        icon: Code,
        title: "Junior Developers", 
        description: "Our Junior Developers with 1 to 2 years of experience understand the client's needs and ensure that the entire process matches requirements.",
        details: "Junior developers are the energetic backbone of our teams. They are quick learners, proficient in foundational technologies, and bring fresh perspectives to projects. They excel at executing well-defined tasks, writing clean code, and collaborating effectively within the team structure under the guidance of senior mentors."
    },
    { 
        icon: BrainCircuit,
        title: "Senior Developers", 
        description: "Senior Developers having 2 to 8 years of experience are highly skilled and proficient throughout the development process.",
        details: "With extensive experience, our senior developers are masters of complex problem-solving and system architecture. They lead development efforts, mentor junior developers, and ensure the highest standards of code quality and performance. Their deep technical expertise allows them to tackle the most challenging aspects of any project."
    },
    { 
        icon: Users,
        title: "Project Managers", 
        description: "Our project managers are well aware of how to handle and execute projects and keep an eye on every minor detail.",
        details: "Our project managers are the strategic link between your vision and our execution. They are experts in agile methodologies, ensuring projects are delivered on time and within budget. They facilitate clear communication, manage resources effectively, and mitigate risks to guarantee a smooth development lifecycle from start to finish."
    },
    { 
        icon: Palette,
        title: "UI/UX Designers", 
        description: "Our web developers have expertise in all the latest web technologies and deliver exceptional web design and development services.",
        details: "Our UI/UX designers create intuitive, engaging, and aesthetically pleasing digital experiences. They conduct user research, create wireframes and prototypes, and design pixel-perfect interfaces that are not only beautiful but also highly functional. They ensure the final product is user-centric and a joy to interact with."
    },
    { 
        icon: Monitor,
        title: "Web Designers", 
        description: "Our skilled web designers have several years of experience and a futuristic vision of web development.",
        details: "Our web designers specialize in creating visually stunning and highly functional websites. They combine artistic talent with technical skill, focusing on responsive design, branding consistency, and user experience. They work with the latest design trends and technologies to build websites that captivate and convert."
    },
    { 
        icon: TestTube,
        title: "Testers", 
        description: "Our QA team checks every project we work on and helps us deliver bug-free solutions to our clients.",
        details: "The Quality Assurance team is dedicated to perfection. Our testers meticulously review every feature to identify and eliminate bugs before they reach users. Using both manual and automated testing techniques, they ensure the final product is stable, reliable, and performs flawlessly across all devices and platforms."
    },
];

export function TalentSection() {
    const [selectedTalent, setSelectedTalent] = useState<(typeof talent[0]) | null>(null);

    return (
        <>
            <section className="py-20 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Leverage World-Class Talent</h2>
                        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">We have a team of experts who have a pool of expertise in their respective fields. Their approach is out-of-box, dynamic, and unique in the market.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {talent.map(item => (
                            <Card 
                                key={item.title} 
                                onClick={() => setSelectedTalent(item)}
                                className="h-full group overflow-hidden bg-card shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-3">
                                        <item.icon className="h-6 w-6 text-primary"/>
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                    <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                                        Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Dialog open={!!selectedTalent} onOpenChange={() => setSelectedTalent(null)}>
                <DialogContent className="sm:max-w-[425px] bg-card">
                {selectedTalent && (
                    <>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl">
                            <selectedTalent.icon className="h-8 w-8 text-primary"/>
                            {selectedTalent.title}
                        </DialogTitle>
                        <DialogDescription className="pt-4 text-muted-foreground">
                            {selectedTalent.details}
                        </DialogDescription>
                    </DialogHeader>
                     <div className="py-4">
                        <h4 className="font-semibold mb-2 text-foreground">Key Responsibilities:</h4>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>Collaborative Project Execution</li>
                            <li>Agile Development Practices</li>
                            <li>Continuous Learning & Adaptation</li>
                            <li>Ensuring High-Quality Deliverables</li>
                        </ul>
                    </div>
                    </>
                )}
                </DialogContent>
            </Dialog>
        </>
    );
}
