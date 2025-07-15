import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 text-foreground" id="contact">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <div className="space-y-6">
            <Logo className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              Innovating with cutting-edge technology to build the future of digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#industries" className="text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0"/>
                <a href="mailto:info@namanmahi.in" className="hover:text-primary transition-colors">info@namanmahi.in</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0"/>
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
               <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary/80 flex-shrink-0"/>
                <span>123 Tech Avenue, Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Subscribe to our Newsletter</h3>
            <p className="text-sm text-muted-foreground">Get the latest updates on tech trends and our services.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background border-border"/>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NamanMahi.in. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
