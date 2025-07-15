import { Footer } from "@/components/layout/footer";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { CompanyOverview } from "@/components/sections/company-overview";
import { BusinessSolutions } from "@/components/sections/business-solutions";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header variant="sticky" />
      <main>
        <HeroSection />
        <ServicesGrid />
        <BusinessSolutions />
        <CompanyOverview />
        <IndustriesCarousel />
      </main>
      <Footer />
    </div>
  );
}
