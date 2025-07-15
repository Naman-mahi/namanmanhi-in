import { Card } from "@/components/ui/card";
import Image from "next/image";

const engagementModels = [
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=80&auto=format&fit=crop", hint: "team collaboration", title: "Dedicated Development Team", description: "Hire a Dedicated development team that holds knowledge about complex development technologies to deliver top-notch results." },
    { image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=80&auto=format&fit=crop", hint: "team extension", title: "Team Extension", description: "Hire dedicated developers who can help you enhance the capabilities of your development team by leveraging the technical proficiency required for the projects." },
    { image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=80&auto=format&fit=crop", hint: "fixed price", title: "Fix Cost Model", description: "Hire highly skilled developers who hold the proficiency to work on your simplest to most complex custom projects at a fixed cost." },
];

export function EngagementModelsSection() {
    return (
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Engagement Model to Hire Dedicated Developers</h2>
                    <p className="mt-4 text-muted-foreground">Browse through the engagement model to hire the best developers from our team of experts.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {engagementModels.map(model => (
                        <Card key={model.title} className="p-6 text-center">
                            <Image src={model.image} alt={model.title} width={80} height={80} className="mx-auto mb-4 rounded-full object-cover" data-ai-hint={model.hint} />
                            <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                            <p className="text-muted-foreground">{model.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
