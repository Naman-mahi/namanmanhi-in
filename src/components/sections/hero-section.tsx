import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Header } from '@/components/layout/header';

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      <Header />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Hero background"
        fill
        className="object-cover"
        data-ai-hint="digital technology"
        priority
      />
      <div className="relative z-20 flex flex-col items-center text-white container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Pioneering <span className="text-primary">Digital</span> Transformation
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
          We craft innovative solutions in Blockchain, AI/ML, and Web/Mobile Development to elevate your business in the digital era.
        </p>
        <div className="mt-8">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Let's Build Together
          </Button>
        </div>
      </div>
    </section>
  );
}
