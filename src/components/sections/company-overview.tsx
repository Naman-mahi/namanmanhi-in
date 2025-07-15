import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/animated-counter';
import { BarChart, Briefcase, Code, Users, Star } from 'lucide-react';

const stats = [
  { icon: Users, value: 700, suffix: '+', label: 'Developers' },
  { icon: Code, value: 100, suffix: '+', label: 'Websites' },
  { icon: Briefcase, value: 25, suffix: '+', label: 'Apps' },
  { icon: BarChart, value: 17, suffix: '+', label: 'Years of Experience' },
  { icon: Star, value: 4.9, label: 'Rating' },
];

export function CompanyOverview() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Who We Are</h2>
            <p className="text-lg text-muted-foreground">
              Founded in {new Date().getFullYear() - 17}, Naman Mahi has been at the forefront of technological innovation. We are a team of passionate creators, thinkers, and problem-solvers dedicated to building exceptional digital products.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Our Vision</h3>
                <p className="text-muted-foreground">To empower businesses worldwide with transformative technology and create a connected, intelligent future.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">To deliver high-quality, scalable, and impactful digital solutions through expertise, collaboration, and a relentless commitment to excellence.</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="items-center pb-2">
                  <stat.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-4xl font-bold">
                    {stat.value === 4.9 ? '4.9/5' : <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
