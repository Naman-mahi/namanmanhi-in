
"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Tags, Rss, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

export default function BlogsPage() {
    const [blogData, setBlogData] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const { data } = await res.json();
                setBlogData(data);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const allTags = useMemo(() => {
        if (isLoading) return [];
        const tags = new Set<string>();
        blogData.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, [blogData, isLoading]);

    const filteredBlogs = useMemo(() => {
        if (isLoading) return [];
        return blogData
            .filter(blog => {
                if (!selectedTag) return true;
                return blog.tags.includes(selectedTag);
            })
            .filter(blog => {
                if (!searchTerm) return true;
                return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
            });
    }, [searchTerm, selectedTag, blogData, isLoading]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTag]);

    const paginatedBlogs = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;
        return filteredBlogs.slice(startIndex, endIndex);
    }, [filteredBlogs, currentPage]);

    const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

    const FilterSidebar = () => (
        <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <Card className="p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search articles..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <Separator />

                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Tags className="h-5 w-5 text-primary" />
                        Filter by Tag
                    </h3>
                    <div className="flex flex-col items-start gap-2">
                         <Button
                            variant={!selectedTag ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedTag(null)}
                        >
                           All Topics
                        </Button>
                        {allTags.map(tag => (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );

    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />

            <main>
                <section className="pt-24 pb-12 bg-secondary/30">
                    <div className="container mx-auto px-4 text-center">
                         <p className="text-primary font-semibold flex items-center justify-center gap-2"><Rss className="h-5 w-5"/> Our Blog</p>
                        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Insights and Ideas</h1>
                        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                            Explore articles on technology, development, and innovation from our team of experts.
                        </p>
                    </div>
                </section>

                <section className="py-16 lg:py-20">
                    <div className="px-4 sm:px-6 lg:px-8 grid lg:grid-cols-4 gap-12">
                        
                        <FilterSidebar />

                        <div className="lg:col-span-3">
                             {isLoading ? (
                                <div className="flex justify-center items-center min-h-[500px]">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                             ) : (
                                <>
                                    <motion.div
                                        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[500px]"
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <AnimatePresence>
                                            {paginatedBlogs.map((blog) => (
                                                <motion.div key={blog._id} variants={itemVariants} exit="exit" layout>
                                                    <BlogCard blog={blog} />
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>

                                    {filteredBlogs.length === 0 && (
                                        <div className="text-center py-16 flex flex-col items-center justify-center min-h-[500px]">
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
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
