"use client";
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';

const AppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="app" x1="24" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6B9B" />
        <stop offset="1" stopColor="#E6396F" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <rect x="12" y="12" width="24" height="24" rx="4" fill="url(#app)" />
    <circle cx="21" cy="18" r="1" fill="white" />
    <circle cx="27" cy="18" r="1" fill="white" />
    <path d="M20 28C20 26.8954 20.8954 26 22 26H26C27.1046 26 28 26.8954 28 28V30H20V28Z" fill="white" fillOpacity="0.8" />
  </svg>
);

const DevIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="dev" x1="24" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#21D4B4" />
        <stop offset="1" stopColor="#15A68A" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <rect x="12" y="16" width="24" height="16" rx="3" fill="url(#dev)" />
    <path d="M20 25L17 22L20 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 25L31 22L28 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WebsiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="web" x1="24" y1="14" x2="24" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6763FF" />
        <stop offset="1" stopColor="#4A45E5" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <rect x="12" y="14" width="24" height="20" rx="3" fill="url(#web)" />
    <path d="M12 20H36" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
    <circle cx="16" cy="17" r="1" fill="white" fillOpacity="0.8" />
    <circle cx="20" cy="17" r="1" fill="white" fillOpacity="0.8" />
  </svg>
);

const GameIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="game" x1="24" y1="15" x2="24" y2="33" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA6A6" />
        <stop offset="1" stopColor="#FF6B6B" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <path d="M18 21H15V18H18V21Z" fill="#FF6B6B" />
    <path d="M21 24H18V21H21V24Z" fill="#FFA6A6" />
    <path d="M21 18H24V15H21V18Z" fill="#FFA6A6" />
    <path d="M27 18H30V21H27V18Z" fill="#FF6B6B" />
    <path d="M27 24H30V27H27V24Z" fill="#FFA6A6" />
    <path d="M24 21H27V24H24V21Z" fill="#FF6B6B" />
    <path d="M24 27H21V30H24V27Z" fill="#FF6B6B" />
    <path d="M18 27H21V30H18V27Z" fill="#FFA6A6" />
    <path d="M24 33V30H21V27H18V24H15V21H18V18H21V15H24V18H27V21H30V24H27V27H24V30H27V33" stroke="url(#game)" strokeWidth="0" />
  </svg>
);

const AiiotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="ai" x1="24" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A96BFF" />
        <stop offset="1" stopColor="#8A3DFF" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <rect x="16" y="16" width="16" height="16" rx="3" fill="url(#ai)" />
    <rect x="23" y="20" width="2" height="2" rx="1" fill="white" />
    <rect x="23" y="26" width="2" height="2" rx="1" fill="white" />
    <rect x="19" y="23" width="2" height="2" rx="1" fill="white" />
    <rect x="27" y="23" width="2" height="2" rx="1" fill="white" />
  </svg>
);

const ClientIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="client" x1="24" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD166" />
        <stop offset="1" stopColor="#F9A825" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <path d="M24 16L26.3495 22.0669L32.8058 22.5L28.2 26.545L29.695 32.9331L24 29.5L18.305 32.9331L19.8 26.545L15.1942 22.5L21.6505 22.0669L24 16Z" fill="url(#client)" />
  </svg>
);

const SalesforceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="salesforce" x1="24" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#56D287" />
        <stop offset="1" stopColor="#2AB661" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <path d="M26.24,25.33a4.63,4.63,0,0,1-3.1,1.15,4.71,4.71,0,0,1-4.8-4.6,4.71,4.71,0,0,1,4.8-4.6,4.63,4.63,0,0,1,3.1,1.15l.4-.4a5.6,5.6,0,0,0-3.5-1.35c-3.2,0-5.8,2.5-5.8,5.6s2.6,5.6,5.8,5.6a5.6,5.6,0,0,0,3.5-1.35Z" fill="url(#salesforce)" />
  </svg>
);

const DataScienceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="data" x1="24" y1="16" x2="24" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D06BFF" />
        <stop offset="1" stopColor="#A83CFF" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="8" fill="hsl(var(--card))" />
    <rect x="16" y="24" width="4" height="8" rx="1" fill="url(#data)" />
    <rect x="22" y="20" width="4" height="12" rx="1" fill="url(#data)" />
    <rect x="28" y="16" width="4" height="16" rx="1" fill="url(#data)" />
  </svg>
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
    <section id="about" className="py-20 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground relative inline-block">
            NamanMahi.in Solutions Bring Transformation For Global Businesses
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary"></span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            Starting from listening to your business problems to delivering accurate solutions; we make sure to follow industry-specific standards and combine them with our technical knowledge, development expertise, and extensive research.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border-0">
              <CardContent className="flex flex-col items-center text-center gap-4 p-8">
                <stat.icon className="h-12 w-12 flex-shrink-0" />
                <div className="flex flex-col">
                  <p className="text-4xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-base font-semibold text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
