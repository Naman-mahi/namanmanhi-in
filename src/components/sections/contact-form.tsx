"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function ContactForm() {
    const [budget, setBudget] = useState(10000);

    return (
        <section id="contact-form" className="py-20 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <Card className="max-w-4xl mx-auto bg-card shadow-lg overflow-hidden rounded-xl">
                    <CardHeader className="p-6 md:p-8 bg-secondary/30">
                        <CardTitle className="text-3xl">Get in Touch</CardTitle>
                        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <form className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact">Contact No.</Label>
                                <Input id="contact" type="tel" placeholder="+1 (555) 123-4567" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp</Label>
                                <Input id="whatsapp" type="tel" placeholder="Enter WhatsApp No." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="skype">Skype</Label>
                                <Input id="skype" placeholder="your.skype.id" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" placeholder="City, Country" />
                            </div>
                            <div className="md:col-span-2 space-y-3">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="budget">Project Budget</Label>
                                    <span className="font-semibold text-primary">${new Intl.NumberFormat('en-US').format(budget)}</span>
                                </div>
                                <Slider
                                    id="budget"
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    defaultValue={[budget]}
                                    onValueChange={(value) => setBudget(value[0])}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="file">Attach File</Label>
                                <Input id="file" type="file" className="file:text-primary"/>
                                <p className="text-xs text-muted-foreground">Max file size: 20MB</p>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Describe your project or inquiry..." rows={5} />
                            </div>
                            <div className="md:col-span-2 flex flex-col items-center mt-4">
                                <Button type="submit" size="lg" className="w-full md:w-auto">Send Message</Button>
                                <p className="text-xs text-muted-foreground mt-4">We sign an NDA for all our projects.</p>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
