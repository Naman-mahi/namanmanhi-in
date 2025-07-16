
"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import blogData from '@/data/blogs.json';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import { Card } from "@/components/ui/card";

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

const POSTS_PER_PAGE = 6;

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
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
                return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [searchTerm, selectedTag]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTag]);

    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return filteredBlogs.slice(startIndex, endIndex);
    }, [filteredBlogs, currentPage]);

    const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

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
                        <Card className="mb-12 p-6 bg-card rounded-2xl shadow-lg border">
                            <div className="grid md:grid-cols-3 gap-6 items-center">
                                <div className="md:col-span-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Search articles..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                     <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                        {allTags.map(tag => (
                                            <Button
                                                key={tag}
                                                variant={selectedTag === tag || (tag === 'All' && !selectedTag) ? "default" : "outline"}
                                                onClick={() => setSelectedTag(tag === 'All' ? null : tag)}
                                                className="rounded-full text-sm"
                                                size="sm"
                                            >
                                                {tag}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {paginatedBlogs.map((blog) => (
                                    <motion.div key={blog.id} variants={itemVariants} exit="exit" layout>
                                        <BlogCard blog={blog} />
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

                        {totalPages > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-4">
                                <Button 
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" />
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button 
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
