
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar } from "lucide-react";

type Blog = {
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

interface BlogCardProps {
    blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
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
    );
}
