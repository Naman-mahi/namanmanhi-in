import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ContactForm } from "@/components/sections/contact-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request a free, no-obligation quote for your project. NamanMahi.in provides custom quotes for web development, app development, AI solutions, and more.",
  alternates: {
    canonical: '/get-a-quote',
  },
  openGraph: {
    title: "Get a Quote | NamanMahi.in",
    description: "Tell us about your project and get a custom quote from our experts. We offer competitive pricing for high-quality digital solutions.",
    url: '/get-a-quote',
  },
  twitter: {
    title: "Get a Quote | NamanMahi.in",
    description: "Tell us about your project and get a custom quote from our experts. We offer competitive pricing for high-quality digital solutions.",
  },
};

export default function GetAQuotePage() {
    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                 <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-primary font-semibold">Home &gt; Get a Quote</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Let's Bring Innovation Together!</h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            We would be happy to hear from you, please fill in the form below or mail us your requirements at info@namanmahi.in
                        </p>
                    </div>
                </section>
                
                <ContactForm />

                <CompanyOverview />
            </main>

            <Footer />
        </div>
    );
}
