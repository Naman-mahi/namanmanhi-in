"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export function Header({ variant = "sticky" }: { variant?: "sticky" | "inline" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (variant !== "sticky") return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const headerClasses = {
    sticky: cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent"
    ),
    inline: "absolute top-0 left-0 right-0 z-50 bg-transparent text-white",
  };

  const linkClasses = {
    sticky: "text-sm font-medium text-foreground/80 hover:text-primary transition-colors",
    inline: "text-sm font-medium text-white/80 hover:text-white transition-colors",
  }

  return (
    <header className={headerClasses[variant]}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="#home" className="flex items-center">
            <Logo className="h-9 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={linkClasses[variant]}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" className={cn(
                variant === 'inline' ? "border-white text-white hover:bg-white hover:text-primary" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            )}>
              Get a Quote
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(variant === 'inline' && "text-white hover:text-white hover:bg-white/10")}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                     <Logo className="h-9 w-auto" />
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6"/>
                        <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex-grow flex flex-col items-center justify-center space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                    <Button className="w-full">Get a Quote</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
