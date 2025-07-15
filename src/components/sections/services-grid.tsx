"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ArrowRight, Bot, Blocks, Puzzle, Smartphone, Globe, Gamepad, ShoppingCart, Nfc, BarChart } from 'lucide-react';

const services = [
  { icon: Bot, title: 'AI & ML', description: 'Intelligent solutions to automate and optimize your business processes.' },
  { icon: Blocks, title: 'Blockchain', description: 'Secure and transparent decentralized applications.' },
  { icon: Puzzle, title: 'Metaverse', description: 'Immersive and interactive virtual world experiences.' },
  { icon: Smartphone, title: 'Mobile Apps', description: 'High-performance applications for iOS and Android.' },
  { icon: Globe, title: 'Web Development', description: 'Modern, responsive websites that drive user engagement.' },
  { icon: Gamepad, title: 'Game Development', description: 'Engaging and interactive games for multiple platforms.' },
  { icon: ShoppingCart, title: 'E-commerce', description: 'Scalable and user-friendly online shopping platforms.' },
  { icon: Nfc, title: 'IoT', description: 'Connecting devices and creating smart ecosystems.' },
  { icon: BarChart, title: 'Salesforce', description: 'Custom Salesforce solutions to enhance your CRM capabilities.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<(typeof services[0]) | null>(null);

  return (
    <>
      <section id="services" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Services</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">We offer a wide range of services to help you build your next big thing.</p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                onClick={() => setSelectedService(service)}
                className="cursor-pointer"
              >
                <Card className="h-full group overflow-hidden bg-card shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <service.icon className="h-10 w-10 text-primary" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                    <div className="mt-4 flex items-center text-primary font-semibold">
                      Learn more <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                    <selectedService.icon className="h-8 w-8 text-primary"/>
                    {selectedService.title}
                </DialogTitle>
                <DialogDescription className="pt-4 text-muted-foreground">
                  This is a detailed look at our {selectedService.title} services. We leverage cutting-edge technologies to deliver robust and scalable solutions tailored to your specific needs. From initial concept to final deployment, our team ensures a seamless development process and a high-quality end product.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Scalable Architecture</li>
                    <li>Agile Development</li>
                    <li>Dedicated Support</li>
                    <li>Secure by Design</li>
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
