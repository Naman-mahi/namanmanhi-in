import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const solutions = [
    {
        title: "Startups Business",
        description: "Have a strict budget and minimum resources? Don't worry, our professionals can give much-needed tech support to turn your dream idea into a reality."
    },
    {
        title: "Small Business",
        description: "Our proficients can help you build your brand identity blending their development experience well with your development requirements."
    },
    {
        title: "Enterprise Business",
        description: "We help enterprise-level businesses enhance their business reach and streamline processes with innovative technology."
    },
    {
        title: "Agency Business",
        description: "Enhance the offering of your Agency business by leveraging our development expertise and trending technologies."
    }
]

export function BusinessSolutions() {
  return (
    <section className="py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Building Smarter Business through Better Tech Experience
                    </h2>
                    <div className="w-24 h-1 bg-primary"></div>
                    <p className="text-muted-foreground mt-6 text-lg">
                        As a leading app development company in the GCC and India, we have worked with 2700+ businesses whether it is a start-up or enterprise, and deliver the best solution in the industry. At NamanMahi.in, we offer a broad range of IT consulting services based on business requirements.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                    {solutions.map((solution, index) => (
                        <Card key={index} className="bg-card shadow-lg hover:shadow-primary/10 transition-all duration-300 group p-6 border-l-4 border-primary/20 hover:border-primary">
                           <div className="flex flex-col h-full">
                                <div className="flex-grow">
                                    <span className="text-5xl font-bold text-primary/70 group-hover:text-primary transition-colors">0{index + 1}</span>
                                    <h3 className="text-2xl font-bold mt-4 mb-2">{solution.title}</h3>
                                    <p className="text-muted-foreground">{solution.description}</p>
                                </div>
                           </div>
                        </Card>
                    ))}
                </div>
            </div>
            
            <div className="lg:col-span-1 sticky top-24">
                 <Card className="relative bg-gradient-to-br from-primary via-blue-500 to-purple-600 p-8 rounded-2xl shadow-2xl overflow-hidden text-primary-foreground">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"></div>
                    <CardContent className="p-0 relative z-10 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                            <ArrowRight className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Bring Innovation Together!</h3>
                        <p className="opacity-80 mb-6 text-sm">
                            Reach out to our team of innovators and let's build the future you envision.
                        </p>
                        <Button asChild variant="secondary" size="lg" className="bg-white/90 text-primary hover:bg-white w-full">
                            <Link href="/contact">
                                Drop Your Queries
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
