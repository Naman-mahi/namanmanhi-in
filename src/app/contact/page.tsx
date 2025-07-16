import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ContactForm } from "@/components/sections/contact-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with NamanMahi.in. Fill out our contact form or find our contact details to discuss your project. Let's build the future together.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Us | NamanMahi.in",
    description: "Ready to start your project? Contact the NamanMahi.in team for a consultation on our web, mobile, AI, and blockchain development services.",
    url: '/contact',
  },
  twitter: {
    title: "Contact Us | NamanMahi.in",
    description: "Ready to start your project? Contact the NamanMahi.in team for a consultation on our web, mobile, AI, and blockchain development services.",
  },
};

export default function ContactPage() {
    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-primary font-semibold">Home &gt; Contact Us</p>
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
