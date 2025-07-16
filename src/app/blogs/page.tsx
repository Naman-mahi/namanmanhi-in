
"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import blogData from '@/data/blogs.json';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

type Blog = typeof blogData[0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        blogData.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags)];
    }, []);

    const filteredBlogs = useMemo(() => {
        return blogData
            .filter(blog => {
                if (!selectedTag || selectedTag === 'All') return true;
                return blog.tags.includes(selectedTag);
            })
            .filter(blog => {
                if (!searchTerm) return true;
                return blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchTerm, selectedTag]);

    if (!isClient) {
        return null; // Or a loading spinner
    }

    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Our Blog</h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            Insights, trends, and stories from the forefront of technology and innovation.
                        </p>
                    </div>
                </section>

                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                            <div className="relative w-full md:max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search articles..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {allTags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant={selectedTag === tag ? "default" : "outline"}
                                        onClick={() => setSelectedTag(tag === 'All' ? null : tag)}
                                        className="rounded-full"
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {filteredBlogs.map((blog) => (
                                    <motion.div key={blog.id} variants={itemVariants} exit="exit" layout>
                                        <Card className="bg-card group overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
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
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredBlogs.length === 0 && (
                            <div className="text-center py-16">
                                <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-2xl font-semibold">No Articles Found</h3>
                                <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
