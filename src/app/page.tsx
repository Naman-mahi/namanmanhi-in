import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { CompanyOverview } from "@/components/sections/company-overview";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <CompanyOverview />
        <IndustriesCarousel />
      </main>
      <Footer />
    </div>
  );
}
