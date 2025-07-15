"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface ChatMessageProps {
    message: { id: number; text: string; sender: 'bot' | 'user' | 'options', options?: string[] };
    onOptionSelect: (option: string) => void;
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
    const isBot = message.sender === 'bot';
    const isOptions = message.sender === 'options';

    const messageVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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

    return (
        <motion.div
            className={cn("flex items-end gap-2", isBot ? "justify-start" : "justify-end")}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    isBot
                        ? "bg-secondary text-secondary-foreground rounded-bl-none"
                        : "bg-primary text-primary-foreground rounded-br-none"
                )}
            >
                {message.text}
            </div>
        </motion.div>
    );
}
