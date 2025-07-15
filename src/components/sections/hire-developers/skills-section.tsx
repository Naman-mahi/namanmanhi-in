"use client";

import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Tech Expertise</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        Leveraging technical proficiency to unlock the full potential of quality services across various domains.
                    </p>
                </div>
                
                <Tabs defaultValue={categories[0]} className="w-full">
                    <div className="flex justify-center">
                        <ScrollArea className="max-w-full pb-4 whitespace-nowrap">
                            <TabsList>
                                {categories.map((category) => (
                                    <TabsTrigger key={category} value={category}>
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    <div className="mt-8">
                        {categories.map((category) => (
                            <TabsContent key={category} value={category}>
                                <Card className="bg-secondary/30 border-0">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4">
                                            {(techSkills[category as keyof typeof techSkills]).map(skill => (
                                                <div key={skill} className="flex items-center gap-3 group">
                                                    <CheckCircle className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors flex-shrink-0" />
                                                    <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
