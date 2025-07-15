import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CompanyOverview } from "@/components/sections/company-overview";
import { CheckCircle, ArrowRight, Clock, CalendarDays, CalendarClock, Star } from 'lucide-react';
import Image from "next/image";
import { ContactForm } from "@/components/sections/contact-form";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const stats = [
    { value: "20+", label: "Years of Experience" },
    { value: "700+", label: "Developers" },
    { value: "30+", label: "Clients" }
];

const pricingTiers = [
    { 
        icon: Clock,
        title: "Hourly", 
        price: "$23",
        period: "/ hour",
        description: "Ideal for short-term projects and specific tasks.",
        features: ["Pay-as-you-go flexibility", "Quick start", "No long-term commitment"],
        popular: false
    },
    { 
        icon: CalendarDays,
        title: "Monthly", 
        price: "$2,890",
        period: "/ month",
        description: "Perfect for ongoing projects requiring dedicated support.",
        features: ["Cost-effective for long-term", "Dedicated developer", "Stable team", "Priority support"],
        popular: true
    },
    { 
        icon: CalendarClock,
        title: "Quarterly", 
        price: "$7,999",
        period: "/ quarter",
        description: "Best value for long-term, large-scale development.",
        features: ["Maximum cost savings", "Strategic partnership", "Deep integration with your team"],
        popular: false
    }
];

const talent = [
    { title: "Junior Developers", description: "Our Junior Developers with 1 to 2 years of experience understand the client's needs and ensure that the entire process matches requirements." },
    { title: "Senior Developers", description: "Senior Developers having 2 to 8 years of experience are highly skilled and proficient throughout the development process." },
    { title: "Project Managers", description: "Our project managers are well aware of how to handle and execute projects and keep an eye on every minor detail." },
    { title: "UI/UX Designers", description: "Our web developers have expertise in all the latest web technologies and deliver exceptional web design and development services." },
    { title: "Web Designers", description: "Our skilled web designers have several years of experience and a futuristic vision of web development." },
    { title: "Testers", description: "Our QA team checks every project we work on and helps us deliver bug-free solutions to our clients." },
];

const onDemandFeatures = [
    { title: "Efficient Process", description: "Our quick and efficient process means clients do not have to wait much before selecting their ideal team." },
    { title: "Choose the Best", description: "We offer a team of experts who provide quality and excellent work. Our success rate is high because of our work." },
    { title: "Advanced Technology", description: "Our experts are proficient with advanced technology and implement it in their profession." }
];

const techSkills = {
    "Front-end": ["Angular", "ReactJS", "VueJS", "JavaScript", "TypeScript", "NextJS", "NuxtJS", "CSS3", "HTML5", "jQuery", "Bootstrap", "D3 JS", "Ember.js"],
    "Backend": [".NET", ".NET Core", "Node", "Java", "PHP", "Python"],
    "Mobile": ["Swift", "Kotlin", "React Native", "Flutter", "Xamarin", "Unity3D"],
    "CMS/ E-commerce": ["WordPress", "Drupal", "Strapi", "Dotnetnuke", "Sitecore", "Sitefinity", "WooCommerce", "Magento", "Shopify", "NopCommerce", "Storefront"],
    "Cloud / DevOps": ["AWS", "Azure", "Google Cloud", "Oracle", "Jenkins", "Maven", "Terraform", "OpenShift", "Kubernetes", "Docker", "Chef"],
    "Hi-Tech": ["Serverless Architecture", "RabbitMQ", "Metaverse", "AR/VR", "RPA", "Blockchain", "PWA", "AMP", "APIGee", "Kong Enterprise"],
    "AI/ML": ["NLP", "Deep Learning", "Computer Vision", "ChatGPT", "Generative AI", "Chatbot", "Linear Regression", "Logistic Regression"],
    "Frameworks": [".NET Core", ".NET MVC", "NestJS", "ExpressJS", "SpringCloud", "Springboot", "Hibernate", "Laravel", "CodeIgniter", "Flask", "Django"],
    "QA": ["Selenium", "Appium", "TestNG", "Cucumber", "Postman", "JMeter", "LoadRunner"],
    "Database": ["SQL Server", "MySQL", "MongoDB", "MariaDB", "DynamoDB", "Oracle", "PostgreSQL", "SQLite", "DB2", "Sybase"],
    "Platforms/BI Tools": ["Salesforce", "Zoho", "ServiceNow", "Camunda", "Power BI", "Tableau", "Amazon Web Services", "Google Cloud", "Microsoft Azure"]
};

const hiringProcess = [
    { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=100&auto=format&fit=crop", hint: "discussion meeting", title: "Interact with Our Developers", description: "Reach out to our development professionals and discuss your development requirements to discuss your development goals and working methods." },
    { image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=100&auto=format&fit=crop", hint: "team chart", title: "Team Allocation", description: "Based on your development requirements we will share the profiles of a few developers so that you can assess and shortlist the most suitable ones." },
    { image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", hint: "job interview", title: "Schedule Interview", description: "You can interview the shortlisted developers to test their development proficiency and make sure you acquire the best development team working for you." },
    { image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=100&auto=format&fit=crop", hint: "team onboarding", title: "Team Onboarding Process", description: "Once you get the most satisfying Developers, you can access their technical skills at the best with real-time progress monitoring accessibility." }
];

const engagementModels = [
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=80&auto=format&fit=crop", hint: "team collaboration", title: "Dedicated Development Team", description: "Hire a Dedicated development team that holds knowledge about complex development technologies to deliver top-notch results." },
    { image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=80&auto=format&fit=crop", hint: "team extension", title: "Team Extension", description: "Hire dedicated developers who can help you enhance the capabilities of your development team by leveraging the technical proficiency required for the projects." },
    { image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=80&auto=format&fit=crop", hint: "fixed price", title: "Fix Cost Model", description: "Hire highly skilled developers who hold the proficiency to work on your simplest to most complex custom projects at a fixed cost." },
];

const whyHireUsStats = [
    { value: "20+", label: "Years of Experience" },
    { value: "700+", label: "Dedicated Developers" },
    { value: "97%", label: "Success Ratio" },
    { value: "30+", label: "Global Clients Served" },
];

const whyHireUsReasons = [
    "Enhanced Development Expertise",
    "End-to-end Development Support",
    "Multiple Hiring Models",
    "Access to a Pool of Experts with Multi-Tech Stack Expertise",
    "Minimize Your Training and Retaining Expenses",
    "Maximize Your IT Portfolio",
    "Flexibility to Modify the Plan",
    "Identify and Build on tech gaps",
    "Continuous Knowledge Sharing",
    "Direct Communication With Resources"
];

export default function HireDevelopersPage() {
    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-primary font-semibold">Home &gt; Hire Dedicated Developers</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Hire Dedicated Developers</h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
                            Hire a dedicated team of developers to accelerate your initiatives with innovation, experience, and development expertise.
                        </p>
                        <div className="flex justify-center gap-8 md:gap-16">
                            {stats.map(stat => (
                                <div key={stat.label}>
                                    <p className="text-4xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Hire Dedicated Programmers To Scale Up Your Development Project Outcomes</h2>
                            <p className="text-muted-foreground mt-4">
                                The dedicated development team of NamanMahi.in has been delivering high-end custom digital solutions that make them the most preferable development team globally. Their development proficiency minimizes the development complexity and delivers top-notch solutions. Hire experienced developers that hold experience to help global businesses achieve incredible heights based on custom development requirements.
                            </p>
                             <Button className="mt-6">Get a Quote</Button>
                        </div>
                    </div>
                </section>
                
                <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Cost To Hire Dedicated Developers</h2>
                            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Flexible hiring models designed to fit your project scope and budget. NamanMahi.in offers transparent pricing to start building your team today.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                            {pricingTiers.map(tier => (
                                <Card key={tier.title} className={cn(
                                    "rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full",
                                    tier.popular ? "border-2 border-primary scale-105 bg-card" : "bg-card"
                                )}>
                                    <CardHeader className="text-center relative">
                                        {tier.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2"><Star className="w-3 h-3 mr-1" /> Most Popular</Badge>}
                                        <div className={cn("mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center", tier.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>
                                          <tier.icon className="w-8 h-8"/>
                                        </div>
                                        <CardTitle className="text-2xl">{tier.title}</CardTitle>
                                        <CardDescription>{tier.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        <div className="text-center mb-8">
                                          <span className="text-5xl font-bold">{tier.price}</span>
                                          <span className="text-muted-foreground">{tier.period}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8 text-muted-foreground">
                                          {tier.features.map(feature => (
                                              <li key={feature} className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                                <span>{feature}</span>
                                              </li>
                                          ))}
                                        </ul>
                                        <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>Hire Now</Button>
                                    </CardContent>
                                    <p className="text-xs text-muted-foreground mt-4 text-center p-4">We sign an NDA for all our projects.</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                         <div className="text-center mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold">Leverage World-Class Talent</h2>
                             <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">We have a team of experts who have a pool of expertise in their respective fields. Their approach is out-of-box, dynamic, and unique in the market.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {talent.map(item => (
                                <Card key={item.title} className="h-full group overflow-hidden bg-card shadow-lg border-l-4 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                        <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                                          Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                         <div className="text-center mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold">Create Outstanding On-Demand Teams</h2>
                             <p className="mt-4 text-muted-foreground">Get the Team or Team Member you want for your project.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {onDemandFeatures.map(feature => (
                                <div key={feature.title} className="p-6">
                                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Our Highly Skilled Developer Team</h2>
                            <p className="mt-4 text-muted-foreground">Leveraging Their Technical Proficiency to Unlock the Full Potential of Quality Services</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                            {Object.entries(techSkills).map(([category, skills]) => (
                                <div key={category}>
                                    <h3 className="font-bold text-lg mb-3 text-primary">{category}</h3>
                                    <ul className="space-y-2">
                                        {skills.map(skill => (
                                            <li key={skill} className="text-muted-foreground flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-primary/70 flex-shrink-0" /> <span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">The Well-defined Process to Hire Dedicated Developers</h2>
                            <p className="mt-4 text-muted-foreground">Need some of our talents to glorify your development team? Follow quick and easy steps.</p>
                        </div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                             <div className="grid md:grid-cols-4 gap-8">
                                {hiringProcess.map((step, index) => (
                                    <div key={step.title} className="text-center p-4 relative">
                                        <Image src={step.image} alt={step.title} width={100} height={100} className="rounded-full mx-auto mb-4 border-4 border-background shadow-lg object-cover" data-ai-hint={step.hint} />
                                        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl z-10 relative border-4 border-background -mt-12">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 lg:py-24">
                    <div className="container mx-auto px-4">
                         <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Our Engagement Model to Hire Dedicated Developers</h2>
                            <p className="mt-4 text-muted-foreground">Browse through the engagement model to hire the best developers from our team of experts.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {engagementModels.map(model => (
                                <Card key={model.title} className="p-6 text-center">
                                    <Image src={model.image} alt={model.title} width={80} height={80} className="mx-auto mb-4 rounded-full object-cover" data-ai-hint={model.hint} />
                                    <h3 className="text-xl font-bold mb-2">{model.title}</h3>
                                    <p className="text-muted-foreground">{model.description}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-20 lg:py-24 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Why Hire Dedicated Developers From NamanMahi.in?</h2>
                            <p className="mt-4 text-muted-foreground">Hire a Dedicated Development Team to implement the Industry Best Practices and Minimize the Business Challenges</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    {whyHireUsStats.map(stat => (
                                        <div key={stat.label} className="text-center p-4 bg-background rounded-lg shadow-md">
                                            <p className="text-4xl font-bold text-primary">{stat.value}</p>
                                            <p className="text-muted-foreground mt-2">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                 <h3 className="text-2xl font-bold mb-4">The Dedicated Development Team of NamanMahi.in Offering Reasons to Be The Best</h3>
                                <p className="text-muted-foreground mb-6">The dedicated developers of the NamanMahi.in offer shortcuts way of success for global businesses.</p>
                                <ul className="space-y-3">
                                    {whyHireUsReasons.map(reason => (
                                        <li key={reason} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                                            <span className="text-muted-foreground">{reason}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <ContactForm />

                <CompanyOverview />
            </main>

            <Footer />
        </div>
    );
}
