
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import blogData from '@/data/blogs.json';

type Blog = typeof blogData[0];

export function BlogSection() {
    const recentBlogs = blogData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">From Our Blog</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        Explore the latest insights in technology, development, and business from our team of experts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentBlogs.map((blog) => (
                        <Card key={blog.id} className="bg-card group overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                            <CardHeader className="p-0">
                                <Link href={`/blogs/${blog.slug}`}>
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={blog.imageHint}
                                    />
                                </Link>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {blog.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                                <CardTitle className="mb-3 text-xl">
                                    <Link href={`/blogs/${blog.slug}`} className="hover:text-primary transition-colors">
                                        {blog.title}
                                    </Link>
                                </CardTitle>
                                <p className="text-muted-foreground text-sm mb-4">{blog.excerpt}</p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0 mt-auto bg-card border-t">
                                <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <span>{blog.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/blogs">
                            View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
