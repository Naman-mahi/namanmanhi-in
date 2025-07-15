import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
    return (
        <section id="contact-form" className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-card shadow-lg">
                    <form className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="Enter Full Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="Enter E-mail" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact No.</Label>
                            <Input id="contact" type="tel" placeholder="Enter Contact No." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input id="whatsapp" type="tel" placeholder="Enter WhatsApp No." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skype">Skype</Label>
                            <Input id="skype" placeholder="Enter Skype Id" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Enter address / location" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="budget">Project Budget: $10,000</Label>
                            <Input id="budget" type="range" min="1000" max="100000" defaultValue="10000" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="file">Attach File (Max Size 20MB)</Label>
                            <Input id="file" type="file" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your Message" rows={5} />
                        </div>
                        <div className="md:col-span-2 flex flex-col items-center">
                            <Button type="submit" size="lg">Send Message</Button>
                            <p className="text-xs text-muted-foreground mt-4">We sign NDA for all our projects.</p>
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}
