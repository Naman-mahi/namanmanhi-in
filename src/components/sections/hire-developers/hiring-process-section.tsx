import Image from "next/image";

const hiringProcess = [
    { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=100&auto=format&fit=crop", hint: "discussion meeting", title: "Interact with Our Developers", description: "Reach out to our development professionals and discuss your development requirements to discuss your development goals and working methods." },
    { image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=100&auto=format&fit=crop", hint: "team chart", title: "Team Allocation", description: "Based on your development requirements we will share the profiles of a few developers so that you can assess and shortlist the most suitable ones." },
    { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", hint: "job interview", title: "Schedule Interview", description: "You can interview the shortlisted developers to test their development proficiency and make sure you acquire the best development team working for you." },
    { image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=100&auto=format&fit=crop", hint: "team onboarding", title: "Team Onboarding Process", description: "Once you get the most satisfying Developers, you can access their technical skills at the best with real-time progress monitoring accessibility." }
];

export function HiringProcessSection() {
    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">The Well-defined Process to Hire Dedicated Developers</h2>
                    <p className="mt-4 text-muted-foreground">Need some of our talents to glorify your development team? Follow quick and easy steps.</p>
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {hiringProcess.map((step, index) => (
                            <div key={step.title} className="text-center p-4 relative">
                                <Image src={step.image} alt={step.title} width={100} height={100} className="rounded-full mx-auto mb-4 border-4 border-background shadow-lg object-cover" data-ai-hint={step.hint} />
                                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl z-10 relative border-4 border-background -mt-12">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
