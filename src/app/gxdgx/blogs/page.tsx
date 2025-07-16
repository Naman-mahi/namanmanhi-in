
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
    id: number;
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

const emptyPost: Omit<BlogPost, 'id' | 'date' | 'tags'> & { tags: string } = {
    slug: '',
    title: '',
    author: '',
    image: '',
    imageHint: '',
    excerpt: '',
    content: '',
};

const BlogEditor = ({ post, onSave, onCancel }: { post: BlogPost | null, onSave: (post: Omit<BlogPost, 'id'>) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState(post ? { ...post, tags: post.tags.join(', ') } : { ...emptyPost, slug: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(post ? { ...post, tags: post.tags.join(', ') } : { ...emptyPost, slug: '' });
    }, [post]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        setFormData(prev => ({ ...prev, title, slug }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const toastId = toast.loading(post?.id ? 'Updating post...' : 'Creating post...');
        
        try {
            await onSave(formData);
            toast.success('Post saved successfully!', { id: toastId });
        } catch (error) {
            toast.error('Failed to save post.', { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
             <div className="flex justify-between items-center">
                <Button type="button" variant="ghost" onClick={onCancel}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
                </Button>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {post?.id ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Input name="title" value={formData.title} onChange={handleTitleChange} placeholder="Blog Title" required className="md:col-span-2"/>
                <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="blog-slug" required />
                <Input name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" required />
                <Input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL (e.g., https://placehold.co/600x400.png)" required className="md:col-span-2"/>
                <Input name="imageHint" value={formData.imageHint} onChange={handleChange} placeholder="Image AI Hint (e.g. 'robot brain')" className="md:col-span-2" />
                <Input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" required className="md:col-span-2"/>
                <Textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Excerpt..." required rows={3} className="md:col-span-2" />
                <Textarea name="content" value={formData.content} onChange={handleChange} placeholder="Main Content (HTML supported)..." required rows={15} className="md:col-span-2" />
            </div>
        </form>
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
    
    const handleSavePost = async (formData: Omit<BlogPost, 'id'>) => {
        const postToSave = {
            ...formData,
            id: selectedPost?.id, // Keep original ID if editing
            date: selectedPost?.id ? formData.date : new Date().toISOString(), // Keep original date or set new one
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        };

        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postToSave),
        });

        if (!response.ok) {
            throw new Error("Failed to save post");
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
                                            <div key={post.id} className="p-4 flex justify-between items-center hover:bg-secondary/50">
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
