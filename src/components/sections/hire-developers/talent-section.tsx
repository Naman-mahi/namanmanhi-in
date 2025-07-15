import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const talent = [
    { title: "Junior Developers", description: "Our Junior Developers with 1 to 2 years of experience understand the client's needs and ensure that the entire process matches requirements." },
    { title: "Senior Developers", description: "Senior Developers having 2 to 8 years of experience are highly skilled and proficient throughout the development process." },
    { title: "Project Managers", description: "Our project managers are well aware of how to handle and execute projects and keep an eye on every minor detail." },
    { title: "UI/UX Designers", description: "Our web developers have expertise in all the latest web technologies and deliver exceptional web design and development services." },
    { title: "Web Designers", description: "Our skilled web designers have several years of experience and a futuristic vision of web development." },
    { title: "Testers", description: "Our QA team checks every project we work on and helps us deliver bug-free solutions to our clients." },
];

export function TalentSection() {
    return (
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Leverage World-Class Talent</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">We have a team of experts who have a pool of expertise in their respective fields. Their approach is out-of-box, dynamic, and unique in the market.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {talent.map(item => (
                        <Card key={item.title} className="h-full group overflow-hidden bg-card shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-xl">{item.title}</CardTitle>
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
    );
}
