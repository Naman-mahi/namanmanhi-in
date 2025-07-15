import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-foreground" id="contact">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 -translate-y-1/2">
            <svg viewBox="0 0 1440 120" className="w-full h-auto text-secondary/50 fill-current">
                <path d="M1440 48L1200 64L960 48L720 64L480 48L240 64L0 48L0 120L1440 120L1440 48Z" />
            </svg>
        </div>
      </div>
      <div className="relative container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-6">
            <Logo className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              Innovating with cutting-edge technology to build the future of digital experiences.
            </p>
            <div className="flex space-x-2">
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-transform hover:-translate-y-1">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-transform hover:-translate-y-1">
                <Github size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-transform hover:-translate-y-1">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#industries" className="text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3 group">
                <Mail className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0 group-hover:text-primary transition-colors"/>
                <a href="mailto:info@namanmahi.in" className="group-hover:text-primary transition-colors">info@namanmahi.in</a>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0 group-hover:text-primary transition-colors"/>
                <a href="tel:+15551234567" className="group-hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
               <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0 group-hover:text-primary transition-colors"/>
                <span className="group-hover:text-primary transition-colors">123 Tech Avenue, Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-tight">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground">Get the latest updates on tech trends and our services.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background border-border" required/>
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NamanMahi.in. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
