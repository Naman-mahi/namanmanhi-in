import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Particles } from './particles';

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-background pt-20">
      <Particles className="absolute inset-0 -z-10" />
      <div className="container mx-auto pt-16 pb-24">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Artificial Intelligence(AI)
            </h1>
            <p className="mt-2 text-2xl text-foreground/80">Development Company</p>
            
            <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-primary">#1</span>
                    <div>
                        <p className="font-semibold">Top AI Development Company in</p>
                        <p className="text-muted-foreground">GCC and India</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                    </div>
                    <a href="#contact" className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">Drop Your Queries</a>
                </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-30"></div>
            <div 
                className="absolute top-1/2 left-1/2 w-[600px] h-[450px] bg-gradient-to-br from-blue-400 to-purple-500 -translate-x-1/2 -translate-y-1/2"
                style={{
                    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
            ></div>
             <Image
                src="https://placehold.co/550x550.png"
                alt="AI Development"
                width={550}
                height={550}
                className="object-contain relative z-10"
                data-ai-hint="artificial intelligence robot"
                priority
              />
          </div>
        </div>
      </div>
    </section>
  );
}
