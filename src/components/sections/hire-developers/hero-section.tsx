
const stats = [
    { value: "20+", label: "Years of Experience" },
    { value: "700+", label: "Developers" },
    { value: "30+", label: "Clients" }
];

export function HeroSection() {
    return (
        <section className="pt-24 pb-12 bg-secondary/30">
            <div className="container mx-auto px-4 text-center">
                <p className="text-primary font-semibold">Home &gt; Hire Dedicated Developers</p>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Hire Dedicated Developers</h1>
                <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                    Hire a dedicated team of developers to accelerate your initiatives with innovation, experience, and development expertise.
                </p>
                <div className="flex justify-center gap-8 md:gap-16">
                    {stats.map(stat => (
                        <div key={stat.label}>
                            <p className="text-4xl font-bold text-primary">{stat.value}</p>
                            <p className="text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
