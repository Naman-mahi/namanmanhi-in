import { Button } from "@/components/ui/button";

export function IntroSection() {
    return (
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Hire Dedicated Programmers To Scale Up Your Development Project Outcomes</h2>
                    <p className="text-muted-foreground mt-4">
                        The dedicated development team of NamanMahi.in has been delivering high-end custom digital solutions that make them the most preferable development team globally. Their development proficiency minimizes the development complexity and delivers top-notch solutions. Hire experienced developers that hold experience to help global businesses achieve incredible heights based on custom development requirements.
                    </p>
                    <Button className="mt-6">Get a Quote</Button>
                </div>
            </div>
        </section>
    );
}
