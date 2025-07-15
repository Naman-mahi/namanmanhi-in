import { Card } from "@/components/ui/card";
import { Zap, Award, Cpu } from 'lucide-react';

const onDemandFeatures = [
    { icon: Zap, title: "Efficient Process", description: "Our quick and efficient process means clients do not have to wait much before selecting their ideal team." },
    { icon: Award, title: "Choose the Best", description: "We offer a team of experts who provide quality and excellent work. Our success rate is high because of our work." },
    { icon: Cpu, title: "Advanced Technology", description: "Our experts are proficient with advanced technology and implement it in their profession." }
];

export function OnDemandTeamsSection() {
    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Create Outstanding On-Demand Teams</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">Get the Team or Team Member you want for your project.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {onDemandFeatures.map((feature, index) => (
                        <Card key={index} className="p-8 bg-card shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="mx-auto mb-6 bg-primary/10 text-primary rounded-full w-20 h-20 flex items-center justify-center">
                                <feature.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
