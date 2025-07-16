
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { ShareButtons } from "@/components/blog/share-buttons";

type Props = {
    params: {
        slug: string;
    }
}

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

export default function BlogPage({ params }: Props) {
    const { slug } = React.use(params as any as Promise<typeof params>) || params;
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('/api/blogs');
                const { data } = await res.json();
                const currentBlog = data.find((post: BlogPost) => post.slug === slug);
                if (currentBlog) {
                    setBlog(currentBlog);
                } else {
                    notFound();
                }
            } catch (error) {
                console.error("Failed to fetch blog post", error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!blog) {
        return notFound();
    }

    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />
            <main className="py-24">
                <article className="container mx-auto px-4 max-w-4xl">
                    <header className="mb-12 text-center">
                        <div className="flex justify-center gap-2 mb-4">
                            {blog.tags.map(tag => (
                                <Badge key={tag} variant="default">{tag}</Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">{blog.title}</h1>
                        <div className="flex justify-center items-center gap-6 text-muted-foreground text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </header>

                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={1200}
                        height={600}
                        className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl mb-12"
                        data-ai-hint={blog.imageHint}
                        priority
                    />

                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-3xl prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2"
                        dangerouslySetInnerHTML={{ __html: blog.content }} 
                    />

                    <Separator className="my-12" />

                    <ShareButtons title={blog.title} slug={blog.slug} />
                    
                    <Separator className="my-12" />
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="w-5 h-5" />
                        <span className="font-semibold">Tags:</span>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map(tag => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
