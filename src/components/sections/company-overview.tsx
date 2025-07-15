"use client";
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const AppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" stroke="currentColor" strokeWidth="1.5"></path> <path d="M10 12L14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 14L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const DevIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const WebsiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 21C14.2091 21 16 16.9706 16 12C16 7.02944 14.2091 3 12 3C9.79086 3 8 7.02944 8 12C8 16.9706 9.79086 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const GameIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.792 10.158C20.6621 10.6384 21.3616 11.3379 21.842 12.208L22 12.5C22 16.918 18.918 20.5 14.5 20.5H9.5C5.082 20.5 2 16.918 2 12.5C2 11.234 2.378 10.05 3.038 9.07402" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 10C18 7.79086 16.2091 6 14 6C11.7909 6 10 7.79086 10 10" stroke="currentColor" strokeWidth="1.5"></path> <path d="M14 6V5C14 3.34315 12.6569 2 11 2C9.34315 2 8 3.34315 8 5V6" stroke="currentColor" strokeWidth="1.5"></path> <path d="M6.5 11C7.32843 11 8 10.3284 8 9.5C8 8.67157 7.32843 8 6.5 8C5.67157 8 5 8.67157 5 9.5C5 10.3284 5.67157 11 6.5 11Z" fill="currentColor"></path> <path d="M6.5 15C7.32843 15 8 14.3284 8 13.5C8 12.6716 7.32843 12 6.5 12C5.67157 12 5 12.6716 5 13.5C5 14.3284 5.67157 15 6.5 15Z" fill="currentColor"></path> <path d="M19.5 14C20.3284 14 21 13.3284 21 12.5C21 11.6716 20.3284 11 19.5 11C18.6716 11 18 11.6716 18 12.5C18 13.3284 18.6716 14 19.5 14Z" fill="currentColor"></path> </g></svg>
);

const AiiotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17C8.65685 17 10 15.6569 10 14C10 12.3431 8.65685 11 7 11C5.34315 11 4 12.3431 4 14C4 15.6569 5.34315 17 7 17Z" stroke="currentColor" strokeWidth="1.5"></path> <path d="M17 13C18.6569 13 20 11.6569 20 10C20 8.34315 18.6569 7 17 7C15.3431 7 14 8.34315 14 10C14 11.6569 15.3431 13 17 13Z" stroke="currentColor" strokeWidth="1.5"></path> <path d="M12 12L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 14L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M10 18L7 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 6L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const ClientIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.826 21.0028C16.826 21.0028 22 21.0028 22 17.8028C22 14.6028 17.812 13.9328 17.812 13.9328C17.812 13.9328 21.189 13.1028 21.189 9.27285C21.189 5.44285 16.485 5.35285 16.485 5.35285C16.485 5.35285 16.925 2.00285 12.353 2.00285C7.78103 2.00285 6.87903 5.58285 6.87903 5.58285C6.87903 5.58285 2.87303 5.53285 2.87303 9.38285C2.87303 13.2328 6.55103 13.9428 6.55103 13.9428C6.55103 13.9428 2.00003 14.4928 2.00003 17.8028C2.00003 21.1128 7.31903 21.0028 7.31903 21.0028" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const SalesforceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.756 16.035C12.756 16.035 12.756 21.002 9.006 21.002C5.256 21.002 5.256 16.035 5.256 16.035C5.256 16.035 2.131 16.176 2.006 12.285C1.881 8.394 5.256 8.243 5.256 8.243C5.256 8.243 5.256 3.864 9.006 3.864C12.756 3.864 12.756 8.243 12.756 8.243C12.756 8.243 16.518 8.159 17.006 12.285C17.494 16.411 12.756 16.035 12.756 16.035Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14.0059 8.24301C14.0059 8.24301 19.3479 8.10901 21.8419 10.323C24.3359 12.538 22.0059 16.035 22.0059 16.035" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);

const DataScienceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 21C13.6569 21 15 19.6569 15 18V6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6V18C9 19.6569 10.3431 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path> <path d="M18 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 17C19.1046 17 20 16.1046 20 15V9C20 7.89543 19.1046 7 18 7C16.8954 7 16 7.89543 16 9V15C16 16.1046 16.8954 17 18 17Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path> <path d="M6 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M6 14C6.55228 14 7 13.5523 7 13V11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11V13C5 13.5523 5.44772 14 6 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path> </g></svg>
);

const stats = [
  { icon: AppIcon, value: 25, suffix: '+', label: 'Apps Developed' },
  { icon: DevIcon, value: 700, suffix: '+', label: 'Developers' },
  { icon: WebsiteIcon, value: 100, suffix: '+', label: 'Websites Designed' },
  { icon: GameIcon, value: 10, suffix: '+', label: 'Games Developed' },
  { icon: AiiotIcon, value: 20, suffix: '+', label: 'AI & IoT Solutions' },
  { icon: ClientIcon, value: 30, suffix: '+', label: 'Happy Clients' },
  { icon: SalesforceIcon, value: 10, suffix: '+', label: 'Salesforce Solutions' },
  { icon: DataScienceIcon, value: 2, suffix: '+', label: 'Data Science' },
];

export function CompanyOverview() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground relative inline-block">
            NamanMahi.in Solutions Bring Transformation For Global Businesses
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary"></span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            Starting from listening to your business problems to delivering accurate solutions; we make sure to follow industry-specific standards and combine them with our technical knowledge, development expertise, and extensive research.
          </p>
        </motion.div>
        
        <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
                key={index}
                variants={itemVariants}
            >
              <Card className="bg-card shadow-lg hover:shadow-primary/20 transition-all duration-300 rounded-xl overflow-hidden border-0 group transform hover:-translate-y-2">
                <CardContent className="flex flex-col items-center text-center gap-4 p-8">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-primary/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <stat.icon className="relative h-12 w-12 flex-shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-4xl font-bold text-foreground">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-base font-semibold text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
