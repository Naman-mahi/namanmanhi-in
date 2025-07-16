
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import blogData from '@/data/blogs.json';
import { BlogCard } from "@/components/blog/blog-card";

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
                       <BlogCard key={blog.id} blog={blog} />
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
