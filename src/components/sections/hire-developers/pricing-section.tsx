import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, CalendarClock, Star, CheckCircle } from 'lucide-react';
import Link from "next/link";

const pricingTiers = [
    {
        icon: Clock,
        title: "Hourly",
        price: "$23",
        period: "/ hour",
        description: "Ideal for short-term projects and specific tasks.",
        features: ["Pay-as-you-go flexibility", "Quick start", "No long-term commitment"],
        popular: false
    },
    {
        icon: CalendarDays,
        title: "Monthly",
        price: "$2,890",
        period: "/ month",
        description: "Perfect for ongoing projects requiring dedicated support.",
        features: ["Cost-effective for long-term", "Dedicated developer", "Stable team", "Priority support"],
        popular: true
    },
    {
        icon: CalendarClock,
        title: "Quarterly",
        price: "$7,999",
        period: "/ quarter",
        description: "Best value for long-term, large-scale development.",
        features: ["Maximum cost savings", "Strategic partnership", "Deep integration with your team"],
        popular: false
    }
];

export function PricingSection() {
    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Cost To Hire Dedicated Developers</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Flexible hiring models designed to fit your project scope and budget. NamanMahi.in offers transparent pricing to start building your team today.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                    {pricingTiers.map(tier => (
                        <Card key={tier.title} className={cn(
                            "rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full",
                            tier.popular ? "border-2 border-primary scale-105 bg-card" : "bg-card"
                        )}>
                            <CardHeader className="text-center relative">
                                {tier.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2"><Star className="w-3 h-3 mr-1" /> Most Popular</Badge>}
                                <div className={cn("mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center", tier.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                                    <tier.icon className="w-8 h-8" />
                                </div>
                                <CardTitle className="text-2xl">{tier.title}</CardTitle>
                                <CardDescription>{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between">
                                <div className="text-center mb-8">
                                    <span className="text-5xl font-bold">{tier.price}</span>
                                    <span className="text-muted-foreground">{tier.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8 text-muted-foreground">
                                    {tier.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                 <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                                    <Link href="#contact-form">Hire Now</Link>
                                </Button>
                            </CardContent>
                            <p className="text-xs text-muted-foreground mt-4 text-center p-4">We sign an NDA for all our projects.</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
