
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

interface ChatMessageProps {
    message: { id: string; text: string; sender: 'bot' | 'user' | 'options', options?: string[] };
    onOptionSelect: (option: string) => void;
    perspective?: 'user' | 'admin';
}

export function ChatMessage({ message, onOptionSelect, perspective = 'user' }: ChatMessageProps) {
    const isBot = message.sender === 'bot';
    const isUser = message.sender === 'user';
    const isOptions = message.sender === 'options';

    const messageVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };
    
    const renderTextWithLinks = (text: string) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = text.split(linkRegex);

        return parts.map((part, index) => {
            if (index % 3 === 1) {
                // This is the link text
                const linkText = part;
                const linkUrl = parts[index + 1];
                return (
                    <Link href={linkUrl} key={index} className="text-primary underline hover:opacity-80">
                        {linkText}
                    </Link>
                );
            } else if (index % 3 === 2) {
                // This is the link URL, which we've already used
                return null;
            } else {
                // This is a regular text part
                return part;
            }
        });
    };

    if (isOptions) {
        return (
             <motion.div 
                className="flex flex-col items-start"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-wrap gap-2 justify-start">
                    {message.options?.map((option, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            onClick={() => onOptionSelect(option)}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
            </motion.div>
        );
    }

    const alignmentClass = perspective === 'user' 
        ? (isBot ? "justify-start" : "justify-end")
        : (isUser ? "justify-start" : "justify-end");
        
    const bubbleClass = perspective === 'user'
        ? (isBot ? "bg-secondary text-secondary-foreground rounded-bl-none" : "bg-primary text-primary-foreground rounded-br-none")
        : (isUser ? "bg-secondary text-secondary-foreground rounded-bl-none" : "bg-primary text-primary-foreground rounded-br-none");


    return (
        <motion.div
            className={cn("flex items-end gap-2", alignmentClass)}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    bubbleClass
                )}
            >
                {isBot ? renderTextWithLinks(message.text) : message.text}
            </div>
        </motion.div>
    );
}
