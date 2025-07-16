
'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, PlusCircle, Save, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format, parseISO } from 'date-fns';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

const blogFormSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  slug: z.string().min(2, { message: "Slug is required." }),
  author: z.string().min(2, { message: "Author name is required." }),
  image: z.string().url({ message: "Please enter a valid URL." }),
  imageHint: z.string().optional(),
  tags: z.string().min(1, { message: "Please enter at least one tag." }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
  date: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const BlogEditor = ({ post, onSave, onCancel }: { post: BlogPost | null, onSave: (post: BlogFormValues) => Promise<void>, onCancel: () => void }) => {
    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: post ? { ...post, tags: post.tags.join(', ') } : {
            title: '',
            slug: '',
            author: '',
            image: '',
            imageHint: '',
            tags: '',
            excerpt: '',
            content: '',
        },
    });

    useEffect(() => {
        form.reset(post ? { ...post, tags: post.tags.join(', ') } : {
            title: '',
            slug: '',
            author: '',
            image: '',
            imageHint: '',
            tags: '',
            excerpt: '',
            content: '',
        });
    }, [post, form]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        form.setValue('title', title, { shouldValidate: true });
        form.setValue('slug', slug, { shouldValidate: true });
    };

    const onSubmit = async (data: BlogFormValues) => {
        const toastId = toast.loading(post?._id ? 'Updating post...' : 'Creating post...');
        try {
            await onSave(data);
            toast.success('Post saved successfully!', { id: toastId });
        } catch (error) {
            toast.error('Failed to save post.', { id: toastId });
        }
    };
    
    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
                 <div className="flex justify-between items-center">
                    <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {post?._id ? 'Update Post' : 'Create Post'}
                    </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Blog Title" {...field} onChange={handleTitleChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="blog-slug-will-be-here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="imageHint"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Image AI Hint (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 'robot brain'" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="Technology, AI, Business (comma-separated)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short summary of the blog post..." {...field} rows={3}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Main content (HTML is supported)..." {...field} rows={15}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blogs');
            const { data } = await response.json();
            setPosts(data || []);
        } catch (error) {
            console.error("Failed to fetch blog posts:", error);
            toast.error("Failed to load blog posts.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const handleSavePost = async (formData: BlogFormValues) => {
        const postToSave = {
            ...formData,
            _id: selectedPost?._id, // Keep original ID if editing
            date: selectedPost?._id ? (selectedPost.date || new Date().toISOString()) : new Date().toISOString(), // Keep original date or set new one
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        };

        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postToSave),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            const errorMessage = errorData.message || "Failed to save post";
            if (errorData.errors) {
                const specificErrors = errorData.errors.map((e: any) => e.message).join('\n');
                toast.error(`${errorMessage}:\n${specificErrors}`);
            } else {
                toast.error(errorMessage);
            }
            throw new Error(errorMessage);
        }
        
        await fetchPosts();
        setIsEditing(false);
        setSelectedPost(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="bg-secondary/30 min-h-screen">
            <Header variant="inline" />
            <main className="container mx-auto px-4 py-8 mt-16">
                 <h1 className="text-4xl font-bold mb-6">Blog Management</h1>
                 <Card className="bg-card">
                    <CardContent className="p-6">
                        {isEditing ? (
                             <BlogEditor 
                                post={selectedPost} 
                                onSave={handleSavePost}
                                onCancel={() => { setIsEditing(false); setSelectedPost(null); }}
                            />
                        ) : (
                            <div>
                                <div className="flex justify-end mb-4">
                                    <Button onClick={() => { setSelectedPost(null); setIsEditing(true); }}>
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
                                    </Button>
                                </div>
                                <div className="border rounded-lg">
                                    <div className="divide-y">
                                        {posts.map(post => (
                                            <div key={post._id} className="p-4 flex justify-between items-center hover:bg-secondary/50">
                                                <div>
                                                    <h3 className="font-semibold">{post.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        By {post.author} on {format(parseISO(post.date), "PPP")}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                     <Button variant="ghost" size="icon" onClick={() => { setSelectedPost(post); setIsEditing(true); }}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {posts.length === 0 && (
                                        <p className="p-4 text-center text-muted-foreground">No blog posts found. Add one to get started!</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                 </Card>
            </main>
            <Footer />
        </div>
    );
}
