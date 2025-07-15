import { Footer } from "@/components/layout/footer";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { CompanyOverview } from "@/components/sections/company-overview";
import { BusinessSolutions } from "@/components/sections/business-solutions";
import { HeroCarousel } from "@/components/sections/hero-carousel";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <HeroCarousel />
        <ServicesGrid />
        <BusinessSolutions />
        <CompanyOverview />
        <IndustriesCarousel />
      </main>
      <Footer />
    </div>
  );
}
