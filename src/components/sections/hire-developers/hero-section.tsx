import { Button } from "@/components/ui/button";

const stats = [
    { value: "20+", label: "Years of Experience" },
    { value: "700+", label: "Dedicated Developers" },
    { value: "97%", label: "Success Ratio" },
    { value: "30+", label: "Global Clients Served" },
];

export function HeroSection() {
    return (
        <section className="relative pt-24 pb-16 overflow-hidden bg-secondary/30">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <p className="text-primary font-semibold">Home &gt; Hire Dedicated Developers</p>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Hire Dedicated Developers To Scale Up Your Project</h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                    Hire a dedicated team of developers to accelerate your initiatives with innovation, experience, and development expertise. The dedicated development team of NamanMahi.in has been delivering high-end custom digital solutions that make them the most preferable development team globally.
                </p>
                <Button size="lg">Get a Free Quote</Button>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map(stat => (
                        <div key={stat.label} className="text-center p-4 bg-background/50 rounded-lg shadow-sm backdrop-blur-sm">
                            <p className="text-4xl font-bold text-primary">{stat.value}</p>
                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
