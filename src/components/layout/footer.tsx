import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Logo className="h-10 w-auto" />
            <p className="text-sm">
              Innovating with cutting-edge technology to build the future of digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-secondary-foreground/70 hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-secondary-foreground/70 hover:text-primary"><Github size={20} /></Link>
              <Link href="#" className="text-secondary-foreground/70 hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#services" className="hover:text-primary">Services</Link></li>
              <li><Link href="#industries" className="hover:text-primary">Industries</Link></li>
              <li><Link href="#about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>info@namanmahi.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Tech Avenue, Silicon Valley, CA</li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe to our Newsletter</h3>
            <p className="text-sm">Get the latest updates on tech trends and our services.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background"/>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Naman Mahi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
