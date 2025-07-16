
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";

type BlogPost = {
    _id: string;
    slug: string;
    title: string;
    author: string;
    date: string;
    tags: string[];
    image: string;
    imageHint?: string;
    excerpt: string;
    content: string;
};

export function BlogSection() {
    const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecentBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const { data } = await res.json();
                // API already sorts by date, so we can just take the first 3
                setRecentBlogs(data.slice(0, 3)); 
            } catch (error) {
                console.error("Failed to fetch recent blogs", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecentBlogs();
    }, []);

    return (
        <section className="py-20 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">From Our Blog</h2>
                    <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                        Explore the latest insights in technology, development, and business from our team of experts.
                    </p>
                </div>

                 {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentBlogs.map((blog) => (
                           <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}

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
