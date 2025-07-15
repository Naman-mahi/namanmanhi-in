import { CheckCircle } from 'lucide-react';

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

export function WhyHireUsSection() {
    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Hire Dedicated Developers From NamanMahi.in?</h2>
                    <p className="mt-4 text-muted-foreground">Hire a Dedicated Development Team to implement the Industry Best Practices and Minimize the Business Challenges</p>
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
                        <h3 className="text-2xl font-bold mb-4">The Dedicated Development Team of NamanMahi.in Offering Reasons to Be The Best</h3>
                        <p className="text-muted-foreground mb-6">The dedicated developers of the NamanMahi.in offer shortcuts way of success for global businesses.</p>
                        <ul className="space-y-3">
                            {whyHireUsReasons.map(reason => (
                                <li key={reason} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
