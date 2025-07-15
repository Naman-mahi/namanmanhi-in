import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyOverview } from "@/components/sections/company-overview";
import { CheckCircle, Users, Lightbulb, ShieldCheck, Handshake } from 'lucide-react';
import Image from "next/image";
import { ContactForm } from "@/components/sections/contact-form";

const values = [
    { icon: Lightbulb, title: "Innovation", description: "We constantly seek new and better ways to solve problems, pushing the boundaries of technology." },
    { icon: Users, title: "Customer Centricity", description: "Our clients are our partners. We succeed when they succeed." },
    { icon: ShieldCheck, title: "Integrity", description: "We operate with transparency and honesty in everything we do." },
    { icon: Handshake, title: "Collaboration", description: "We believe the best results come from teamwork and open communication." },
];

const whyHireUsStats = [
    { value: "20+", label: "Years of Experience" },
    { value: "700+", label: "Dedicated Developers" },
    { value: "97%", label: "Success Ratio" },
    { value: "30+", label: "Global Clients Served" },
];

const whyHireUsReasons = [
    "Enhanced Development Expertise",
    "End-to-end Development Support",
    "Multiple Hiring Models",
    "Access to a Pool of Experts with Multi-Tech Stack Expertise",
    "Minimize Your Training and Retaining Expenses",
    "Maximize Your IT Portfolio",
    "Flexibility to Modify the Plan",
    "Identify and Build on tech gaps",
    "Continuous Knowledge Sharing",
    "Direct Communication With Resources"
];


export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-primary font-semibold">Home &gt; About Us</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">We're Building the Future</h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            Learn more about our journey, our values, and the talented team that makes NamanMahi.in a leader in digital innovation.
                        </p>
                    </div>
                </section>
                
                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                                <p className="text-muted-foreground mb-4">
                                    Founded with a passion for technology and a drive to innovate, NamanMahi.in started as a small team of developers with a big vision. We set out to create digital solutions that not only meet but exceed client expectations.
                                </p>
                                <p className="text-muted-foreground mb-6">
                                    Today, we are a globally recognized development company, but our core mission remains the same: to leverage technology to solve complex business challenges and build a better digital future for everyone.
                                </p>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-primary">Our Mission</h3>
                                        <p className="text-muted-foreground">To empower businesses with transformative digital solutions through our expertise in AI, Blockchain, and web technologies.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-primary">Our Vision</h3>
                                        <p className="text-muted-foreground">To be the most trusted and innovative digital partner for businesses worldwide, shaping the future of technology.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" alt="Our Team" width={600} height={400} className="rounded-lg shadow-xl object-cover" data-ai-hint="team collaboration office" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
                             <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">The principles that guide our work and our culture.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map(value => (
                                <Card key={value.title} className="p-6 text-center bg-card shadow-lg hover:shadow-primary/20 transition-all">
                                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-muted-foreground">{value.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <CompanyOverview />
                
                 <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Why Choose NamanMahi.in?</h2>
                            <p className="mt-4 text-muted-foreground">We implement Industry Best Practices to Minimize Business Challenges</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    {whyHireUsStats.map(stat => (
                                        <div key={stat.label} className="text-center p-4 bg-background rounded-lg shadow-md">
                                            <p className="text-4xl font-bold text-primary">{stat.value}</p>
                                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                 <h3 className="text-2xl font-bold mb-4">The Dedicated Development Team of NamanMahi.in Solution Offering Reasons to Be The Best</h3>
                                <p className="text-muted-foreground mb-6">The dedicated developers of the NamanMahi.in Solution offer shortcuts way of success for global businesses.</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {whyHireUsReasons.map(reason => (
                                        <li key={reason} className="flex items-start gap-3 p-4 border rounded-lg shadow-sm bg-background">
                                            <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactForm />
            </main>

            <Footer />
        </div>
    );
}
