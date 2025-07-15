
"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";

interface ChatWindowProps {
    messages: { id: string; text: string; sender: 'bot' | 'user' | 'options'; options?: string[] }[];
    onSendMessage: (text: string) => void;
    onOptionSelect: (option: string) => void;
    onClose: () => void;
    isTyping: boolean;
    isMobile: boolean;
    step: 'collecting' | 'chatting';
}

export function ChatWindow({ messages, onSendMessage, onOptionSelect, onClose, isTyping, isMobile, step }: ChatWindowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [showInitialOptions, setShowInitialOptions] = useState(true);
    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
            setShowInitialOptions(false);
        }
    };
    
    const handleCallClick = () => {
        window.location.href = "tel:+15551234567";
        setShowInitialOptions(false);
    };

    const handleChatClick = () => {
        setShowInitialOptions(false);
    };

    const inputPlaceholder = step === 'collecting'
        ? (messages.some(m => m.text.includes("name")) ? "Enter your name..." : "Enter your number...")
        : "Type your message...";


    return (
        <motion.div
            initial={isMobile ? { y: "100%" } : { y: 50, opacity: 0 }}
            animate={isMobile ? { y: 0 } : { y: 0, opacity: 1 }}
            exit={isMobile ? { y: "100%" } : { y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 z-[999] w-full h-full sm:h-auto sm:max-h-[80vh] sm:w-[400px] sm:bottom-24 sm:right-6 flex flex-col bg-card shadow-2xl rounded-t-2xl sm:rounded-2xl border border-border overflow-hidden"
        >
            <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground border-b border-primary/50">
                <h3 className="font-bold text-lg">NamanMahi.in</h3>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-primary-foreground hover:bg-white/20 h-8 w-8">
                    <X size={20} />
                </Button>
            </header>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} onOptionSelect={onOptionSelect} />
                ))}
                {isTyping && <TypingIndicator />}
            </div>

            {showInitialOptions && step === 'collecting' && messages.length < 2 && (
                 <div className="p-4 border-t border-border bg-background/50">
                    <p className="text-center text-sm text-muted-foreground mb-3">Or choose an option:</p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={handleCallClick} variant="outline"><Phone className="mr-2 h-4 w-4" /> Call Us</Button>
                        <Button onClick={handleChatClick}><MessageSquare className="mr-2 h-4 w-4" /> Chat Now</Button>
                    </div>
                </div>
            )}
            
            <footer className="p-4 border-t border-border bg-background/50">
                {(!showInitialOptions || step !== 'collecting') && (
                    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                        <Input
                            type={step === 'collecting' && messages.some(m => m.text.includes("number")) ? "tel" : "text"}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={inputPlaceholder}
                            className="flex-1"
                            autoFocus
                        />
                        <Button type="submit" size="icon" aria-label="Send message">
                            <Send size={20} />
                        </Button>
                    </form>
                )}
                 <p className="text-center text-xs text-muted-foreground mt-3">
                    developed by NamanMahi.in ❤️
                 </p>
            </footer>
        </motion.div>
    );
}
