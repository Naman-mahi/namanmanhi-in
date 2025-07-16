
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        // Ensure this runs only on the client where window is defined
        setUrl(window.location.origin + `/blogs/${slug}`);
    }, [slug]);

    if (!url) {
        return null; // Don't render on the server
    }

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share this post:
            </h3>
            <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                        <Twitter className="w-5 h-5" />
                    </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                        <Facebook className="w-5 h-5" />
                    </a>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" onClick={handleCopyLink} aria-label="Copy link">
                    <LinkIcon className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
