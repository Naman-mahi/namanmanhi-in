import { Footer } from "@/components/layout/footer";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { CompanyOverview } from "@/components/sections/company-overview";
import { BusinessSolutions } from "@/components/sections/business-solutions";
import { Header } from "@/components/layout/header";
import { Particles } from "@/components/sections/particles";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header variant="sticky" />
      <main>
        <div className="relative">
           <Particles className="absolute inset-0 -z-10" />
           <HeroCarousel />
        </div>
        <ServicesGrid />
        <BusinessSolutions />
        <CompanyOverview />
        <IndustriesCarousel />
      </main>
      <Footer />
    </div>
  );
}
