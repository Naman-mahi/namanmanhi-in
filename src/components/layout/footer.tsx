
"use client";

import Link from "next/link";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export function Footer() {
  return (
    <motion.footer 
      className="bg-card text-foreground" 
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="relative">
        <div className="absolute inset-x-0 top-0 -translate-y-1/2">
            <svg viewBox="0 0 1440 120" className="w-full h-auto text-secondary fill-current">
                <path d="M1440 48L1200 64L960 48L720 64L480 48L240 64L0 48L0 120L1440 120L1440 48Z" />
            </svg>
        </div>
      </div>
      <div className="relative container mx-auto px-4 pt-24 pb-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
        >
          {/* Column 1: Logo and About */}
          <motion.div className="space-y-6 lg:col-span-1" variants={itemVariants}>
            <Logo className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              Innovating with cutting-edge technology to build the future of digital experiences.
            </p>
            <div className="flex space-x-2">
              <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter size={20} />
              </motion.a>
              <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Github size={20} />
              </motion.a>
              <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.1 }} className="p-2 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-bold tracking-tight">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/hire-developers" className="text-muted-foreground hover:text-primary transition-colors">Hire Developers</Link></li>
              <li><Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#industries" className="text-muted-foreground hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
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
          </motion.div>
          
          {/* Column 4: Newsletter */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-bold tracking-tight">Subscribe</h3>
            <p className="text-sm text-muted-foreground">Get the latest updates on tech trends and our services.</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your Email" className="bg-background border-border" required/>
              <Button>Subscribe</Button>
            </form>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 border-t border-border pt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p>&copy; {new Date().getFullYear()} NamanMahi.in. All Rights Reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
