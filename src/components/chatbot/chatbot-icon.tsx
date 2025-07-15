"use client";

import { MessageSquare, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatbotIconProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ChatbotIcon({ isOpen, onClick }: ChatbotIconProps) {
    return (
        <div className="fixed bottom-6 right-6 z-[999]">
            <motion.div
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <Button
                    onClick={onClick}
                    size="icon"
                    className="w-16 h-16 rounded-full shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                    <motion.div
                        key={isOpen ? "x" : "message"}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: 'absolute' }}
                    >
                        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                    </motion.div>
                </Button>
            </motion.div>
        </div>
    );
}
