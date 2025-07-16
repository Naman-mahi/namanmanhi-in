import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CompanyOverview } from "@/components/sections/company-overview";
import { ContactForm } from "@/components/sections/contact-form";

import { HeroSection } from "@/components/sections/hire-developers/hero-section";
import { PricingSection } from "@/components/sections/hire-developers/pricing-section";
import { TalentSection } from "@/components/sections/hire-developers/talent-section";
import { OnDemandTeamsSection } from "@/components/sections/hire-developers/on-demand-teams-section";
import { SkillsSection } from "@/components/sections/hire-developers/skills-section";
import { HiringProcessSection } from "@/components/sections/hire-developers/hiring-process-section";
import { EngagementModelsSection } from "@/components/sections/hire-developers/engagement-models-section";
import { WhyHireUsSection } from "@/components/sections/hire-developers/why-hire-us-section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hire Dedicated Developers",
  description: "Hire dedicated developers from NamanMahi.in to scale your projects. We offer flexible engagement models (hourly, monthly, quarterly) to hire expert developers for web, mobile, AI, and more.",
  alternates: {
    canonical: '/hire-developers',
  },
  openGraph: {
    title: "Hire Dedicated Developers | NamanMahi.in",
    description: "Access a pool of 700+ expert developers. Hire our dedicated team for flexible, cost-effective, and high-quality development services.",
    url: '/hire-developers',
  },
  twitter: {
    title: "Hire Dedicated Developers | NamanMahi.in",
    description: "Access a pool of 700+ expert developers. Hire our dedicated team for flexible, cost-effective, and high-quality development services.",
  },
};

export default function HireDevelopersPage() {
    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <HeroSection />
                <PricingSection />
                <TalentSection />
                <OnDemandTeamsSection />
                <SkillsSection />
                <HiringProcessSection />
                <EngagementModelsSection />
                <WhyHireUsSection />
                <ContactForm />
                <CompanyOverview />
            </main>

            <Footer />
        </div>
    );
}
