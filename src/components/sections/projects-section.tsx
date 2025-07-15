
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Lightbulb, TrendingUp, DraftingCompass } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const projects = [
    {
        title: "DeFi Trading Platform",
        description: "A secure, high-performance decentralized finance platform for trading digital assets with advanced charting and analytics.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "crypto trading chart"
        },
        tags: ["Blockchain", "React", "Node.js", "Solidity"],
        caseStudy: {
            challenge: "Our client needed a highly secure and real-time DeFi platform to compete in the fast-paced crypto market. Key challenges included ensuring smart contract security and providing a seamless user experience.",
            solution: "We developed a platform with audited smart contracts, integrated real-time data feeds, and built an intuitive interface using React for a responsive and fast user experience.",
            results: "Achieved a 40% higher transaction speed than competitors and maintained zero security breaches since launch.",
            steps: [
                { id: 1, name: "Discovery & Planning", description: "In-depth analysis of market requirements and technical specifications." },
                { id: 2, name: "Smart Contract Development", description: "Writing and auditing secure Solidity smart contracts for all trading logic." },
                { id: 3, name: "Backend & API Integration", description: "Building robust Node.js services and integrating with blockchain nodes." },
                { id: 4, name: "Frontend Development", description: "Creating a responsive and real-time trading interface with React." },
                { id: 5, name: "Testing & Deployment", description: "Rigorous testing phases followed by a staged mainnet deployment." },
            ]
        }
    },
    {
        title: "AI-Powered Logistics Optimizer",
        description: "An intelligent system that uses machine learning to optimize delivery routes, reducing fuel costs and delivery times by 30%.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "delivery truck map"
        },
        tags: ["AI/ML", "Python", "Next.js", "AWS"],
        caseStudy: {
            challenge: "A major logistics company was struggling with inefficient routing, leading to high fuel costs and delayed deliveries. They needed an automated solution to optimize routes for their fleet of 500+ vehicles daily.",
            solution: "We built a machine learning model using Python that analyzes traffic patterns, delivery windows, and vehicle capacity. The model is served via an API and integrated into a Next.js dashboard for dispatchers.",
            results: "Reduced fuel consumption by 30% and improved on-time delivery rate from 85% to 98%.",
            steps: [
                { id: 1, name: "Data Collection & Analysis", description: "Aggregated historical delivery data, traffic information, and vehicle specs." },
                { id: 2, name: "Model Development", description: "Designed and trained a route optimization model using TensorFlow and Scikit-learn." },
                { id: 3, name: "API & Backend", description: "Developed a Flask API to serve model predictions." },
                { id: 4, name: "Frontend Dashboard", description: "Built an interactive map-based dashboard for dispatchers using Next.js and Mapbox." },
                { id: 5, name: "Deployment on AWS", description: "Deployed the full solution on a scalable AWS infrastructure." },
            ]
        }
    },
    {
        title: "Immersive VR Retail Experience",
        description: "A metaverse storefront that allows users to browse and interact with products in a fully immersive virtual reality environment.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "virtual reality store"
        },
        tags: ["Metaverse", "Unity", "C#", "3D Modeling"],
        caseStudy: {
            challenge: "A luxury fashion brand wanted to create a unique and engaging shopping experience for its tech-savvy customers, moving beyond traditional e-commerce.",
            solution: "We designed and built a stunning virtual reality showroom in Unity. Users can 'walk' through the store, view 3D models of clothing, and make purchases directly within the VR experience.",
            results: "Increased user engagement by 200% compared to their traditional website and generated significant media buzz.",
            steps: [
                { id: 1, name: "Concept & 3D Design", description: "Collaborated with the brand to design the virtual store's architecture and ambiance." },
                { id: 2, name: "Asset Creation", description: "Created high-fidelity 3D models of the products and the environment." },
                { id: 3, name: "Unity Development", description: "Developed the core VR interactions, user interface, and logic in C#." },
                { id: 4, name: "E-commerce Integration", description: "Integrated their existing Shopify backend for seamless checkout." },
                { id: 5, name: "Platform Deployment", description: "Published the experience on Oculus and SteamVR platforms." },
            ]
        }
    },
    {
        title: "Healthcare Telemedicine App",
        description: "A HIPAA-compliant mobile application connecting patients with doctors for remote consultations, prescriptions, and health monitoring.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "doctor video call"
        },
        tags: ["Mobile App", "React Native", "Firebase", "HIPAA"],
        caseStudy: {
            challenge: "To create a user-friendly and secure telemedicine app that complies with strict HIPAA regulations, ensuring patient data privacy and providing reliable video consultation.",
            solution: "We built a cross-platform app using React Native, integrated a secure video call API, and used Firebase for the backend with HIPAA-compliant Firestore rules and security measures.",
            results: "Successfully launched the app with over 10,000 active users in the first six months. Facilitated over 50,000 remote consultations.",
            steps: [
                { id: 1, name: "Requirement & Compliance Analysis", description: "Defined features and ensured all aspects met HIPAA guidelines." },
                { id: 2, name: "UI/UX Design", description: "Designed an intuitive and accessible interface for patients and doctors." },
                { id: 3, name: "Mobile App Development", description: "Built the app for both iOS and Android using a single React Native codebase." },
                { id: 4, name: "Backend and Security", description: "Set up a secure Firebase backend and implemented end-to-end encryption." },
                { id: 5, name: "Testing & App Store Submission", description: "Conducted extensive testing, including security audits, before deployment." },
            ]
        }
    },
    {
        title: "E-learning Platform",
        description: "An online learning platform with interactive courses, video lectures, and progress tracking for students of all ages.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "online education"
        },
        tags: ["EdTech", "Next.js", "PostgreSQL", "Stripe"],
        caseStudy: {
            challenge: "Develop a scalable e-learning platform that supports thousands of concurrent users, with features for course creation, payment processing, and student progress tracking.",
            solution: "We built a robust platform using Next.js for the frontend and a PostgreSQL database for data management. Stripe was integrated for secure payment processing, and video content is streamed via a CDN for performance.",
            results: "The platform now hosts over 500 courses and serves 20,000+ students. Course creator revenue increased by an average of 150%.",
            steps: [
                { id: 1, name: "Architecture Design", description: "Designed a scalable architecture to handle high traffic and large amounts of video data." },
                { id: 2, name: "Backend Development", description: "Built a custom backend with Node.js to manage courses, users, and payments." },
                { id: 3, name: "Frontend Development", description: "Developed a feature-rich and responsive frontend using Next.js." },
                { id: 4, name: "Payment & Video Integration", description: "Integrated Stripe for subscriptions and a video streaming service." },
                { id: 5, name: "Launch & Scaling", description: "Deployed the platform and monitored performance, scaling resources as needed." },
            ]
        }
    },
    {
        title: "Smart Home IoT Dashboard",
        description: "A centralized dashboard to monitor and control various IoT devices in a smart home, from lighting to security cameras.",
        image: {
            src: "https://placehold.co/600x400.png",
            hint: "smart home interface"
        },
        tags: ["IoT", "Vue.js", "MQTT", "Raspberry Pi"],
        caseStudy: {
            challenge: "The goal was to unify dozens of smart home devices from different manufacturers into a single, cohesive, and easy-to-use dashboard that could run on a wall-mounted tablet.",
            solution: "We created a central hub using a Raspberry Pi running an MQTT broker. A Vue.js web application provides the user interface, communicating with all devices in real-time via the MQTT protocol.",
            results: "Created a unified smart home experience, reducing the need for multiple apps by 90% and improving device response time.",
            steps: [
                { id: 1, name: "Hardware & Protocol Setup", description: "Configured Raspberry Pi and set up a secure MQTT broker for device communication." },
                { id: 2, name: "Device Integration", description: "Wrote custom scripts to integrate devices from various brands into the MQTT network." },
                { id: 3, name: "API Development", description: "Built a lightweight API to expose device controls to the frontend." },
                { id: 4, name: "Frontend Dashboard", description: "Designed and developed the interactive dashboard with Vue.js." },
                { id: 5, name: "On-site Installation & Testing", description: "Installed the system in a test home and performed extensive real-world testing." },
            ]
        }
    }
];

type Project = typeof projects[0];

export function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <>
            <section className="py-20 lg:py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold">Our Featured Projects</h2>
                        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                            We take pride in our work. Here's a glimpse of the innovative solutions we've delivered to our clients across various industries.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <CardTitle className="mb-3 text-xl">{project.title}</CardTitle>
                                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setSelectedProject(project)}>
                                        View Case Study
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="sm:max-w-3xl bg-card">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold">{selectedProject.title}</DialogTitle>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {selectedProject.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </DialogHeader>
                            <div className="grid md:grid-cols-2 gap-8 py-4 max-h-[70vh] overflow-y-auto pr-4">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Lightbulb className="text-primary w-5 h-5" /> Challenge</h3>
                                        <p className="text-sm text-muted-foreground">{selectedProject.caseStudy.challenge}</p>
                                    </div>
                                     <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><DraftingCompass className="text-primary w-5 h-5" /> Solution</h3>
                                        <p className="text-sm text-muted-foreground">{selectedProject.caseStudy.solution}</p>
                                    </div>
                                     <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><TrendingUp className="text-primary w-5 h-5" /> Results</h3>
                                        <p className="text-sm text-muted-foreground">{selectedProject.caseStudy.results}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Project Lifecycle</h3>
                                     <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[120px]">Step</TableHead>
                                                    <TableHead>Activity</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedProject.caseStudy.steps.map(step => (
                                                    <TableRow key={step.id}>
                                                        <TableCell className="font-medium">{step.name}</TableCell>
                                                        <TableCell>{step.description}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                             <Separator />
                            <div className="flex justify-end pt-4">
                                <Button asChild>
                                    <Link href="/contact">Discuss Your Project</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

    