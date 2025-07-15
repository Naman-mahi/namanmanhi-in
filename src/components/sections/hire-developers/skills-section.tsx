"use client";

import { CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const techSkills = {
    "Front-end": ["Angular", "ReactJS", "VueJS", "JavaScript", "TypeScript", "NextJS", "NuxtJS", "CSS3", "HTML5", "jQuery", "Bootstrap", "D3 JS", "Ember.js"],
    "Backend": [".NET", ".NET Core", "Node", "Java", "PHP", "Python"],
    "Mobile": ["Swift", "Kotlin", "React Native", "Flutter", "Xamarin", "Unity3D"],
    "CMS & E-commerce": ["WordPress", "Drupal", "Strapi", "Dotnetnuke", "Sitecore", "Sitefinity", "WooCommerce", "Magento", "Shopify", "NopCommerce", "Storefront"],
    "Cloud & DevOps": ["AWS", "Azure", "Google Cloud", "Oracle", "Jenkins", "Maven", "Terraform", "OpenShift", "Kubernetes", "Docker", "Chef"],
    "Hi-Tech": ["Serverless Architecture", "RabbitMQ", "Metaverse", "AR/VR", "RPA", "Blockchain", "PWA", "AMP", "APIGee", "Kong Enterprise"],
    "AI/ML": ["NLP", "Deep Learning", "Computer Vision", "ChatGPT", "Generative AI", "Chatbot", "Linear Regression", "Logistic Regression"],
    "Frameworks": [".NET Core", ".NET MVC", "NestJS", "ExpressJS", "SpringCloud", "Springboot", "Hibernate", "Laravel", "CodeIgniter", "Flask", "Django"],
    "QA": ["Selenium", "Appium", "TestNG", "Cucumber", "Postman", "JMeter", "LoadRunner"],
    "Database": ["SQL Server", "MySQL", "MongoDB", "MariaDB", "DynamoDB", "Oracle", "PostgreSQL", "SQLite", "DB2", "Sybase"],
    "Platforms & BI": ["Salesforce", "Zoho", "ServiceNow", "Camunda", "Power BI", "Tableau", "Amazon Web Services", "Google Cloud", "Microsoft Azure"]
};

export function SkillsSection() {
    const categories = Object.keys(techSkills);

    return (
        <section className="py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <Tabs defaultValue={categories[0]} className="grid lg:grid-cols-4 gap-12 items-start">
                    <div className="lg:col-span-1 text-left lg:sticky lg:top-24">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tech Expertise</h2>
                        <p className="text-muted-foreground mb-6">
                            Leveraging technical proficiency to unlock the full potential of quality services across various domains.
                        </p>
                        <TabsList className="flex-col h-auto items-stretch bg-transparent p-0 space-y-2">
                            {categories.map((category) => (
                                <TabsTrigger 
                                    key={category} 
                                    value={category}
                                    className="w-full justify-start text-left rounded-lg text-base p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="lg:col-span-3">
                        {categories.map((category) => (
                            <TabsContent key={category} value={category} className="mt-0">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                                    {(techSkills[category as keyof typeof techSkills]).map(skill => (
                                        <div key={skill} className="flex items-center gap-2 group">
                                            <CheckCircle className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
