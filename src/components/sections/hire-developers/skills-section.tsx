import { CheckCircle } from 'lucide-react';

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

export function SkillsSection() {
    return (
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
    );
}
