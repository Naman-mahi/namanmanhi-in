
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  contact: z.string().min(1, { message: "Contact number is required." }),
  whatsapp: z.string().min(1, { message: "WhatsApp number is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  budget: z.number().min(1000).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  file: z.any().refine(file => file, { message: "File attachment is required." }),
});

export function ContactForm() {
    const [budget, setBudget] = useState(10000);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            contact: "",
            whatsapp: "",
            location: "",
            budget: 10000,
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(values);
        setIsSubmitting(false);

        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        form.reset();
        setBudget(10000);
    }

    return (
        <section id="contact-form" className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <Card className="max-w-4xl mx-auto bg-card shadow-xl overflow-hidden rounded-2xl border-0">
                    <CardHeader className="p-6 md:p-8 text-center bg-card-foreground text-background">
                        <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
                        <CardDescription className="text-muted/80">Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="john.doe@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact No.</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="whatsapp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>WhatsApp</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="Enter WhatsApp No." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input placeholder="City, Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <div className="flex justify-between items-center mb-2">
                                                <FormLabel>Project Budget (Optional)</FormLabel>
                                                <span className="font-semibold text-primary">${new Intl.NumberFormat('en-US').format(budget)}</span>
                                            </div>
                                            <FormControl>
                                                <Slider
                                                    min={1000}
                                                    max={100000}
                                                    step={1000}
                                                    defaultValue={[field.value || 10000]}
                                                    onValueChange={(value) => {
                                                        field.onChange(value[0]);
                                                        setBudget(value[0]);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Attach File</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    id="file" 
                                                    type="file" 
                                                    className="file:text-primary"
                                                    onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                                                />
                                            </FormControl>
                                            <p className="text-xs text-muted-foreground">Max file size: 20MB</p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe your project or inquiry..." rows={5} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="md:col-span-2 flex flex-col items-center mt-4">
                                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                    <p className="text-xs text-muted-foreground mt-4">We sign an NDA for all our projects.</p>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
