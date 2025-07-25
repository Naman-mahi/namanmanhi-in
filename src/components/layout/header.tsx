
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { Separator } from "../ui/separator";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Hire Developers", href: "/hire-developers" },
  { name: "Contact", href: "/contact" },
];

export function Header({ variant = "sticky" }: { variant?: "sticky" | "inline" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (variant === "sticky") {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const headerClasses = cn(
    "left-0 right-0 z-50 transition-all duration-300",
    variant === 'sticky' ? 'fixed top-0' : 'relative bg-card shadow-sm',
    variant === 'sticky' && isScrolled ? "bg-background/80 shadow-md backdrop-blur-sm" : "bg-transparent",
  );
  
  const linkClasses = cn(
    "text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
  );
  
  const mobileMenuIconColor = "text-foreground";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Logo className="h-9 w-auto" />
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={linkClasses}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button asChild>
                <Link href="/get-a-quote">Get a Quote</Link>
              </Button>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={mobileMenuIconColor}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-background p-0 flex flex-col">
                <SheetHeader className="flex flex-row justify-between items-center p-4 border-b">
                   <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                   <Logo className="h-9 w-auto" />
                </SheetHeader>
                <div className="flex flex-col h-full p-6">
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <Separator className="my-6" />
                  <div className="mt-auto flex flex-col gap-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/get-a-quote" onClick={() => setIsMobileMenuOpen(false)}>Get a Quote</Link>
                    </Button>
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
