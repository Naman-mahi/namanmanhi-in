
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatbotIcon } from "./chatbot-icon";
import { ChatWindow } from "./chat-window";
import { useIsMobile } from "@/hooks/use-mobile";
import toast from 'react-hot-toast';
import type { Message } from '@/lib/types';
import { getChatbotResponse } from "@/ai/flows/chatbot-flow";

const predefinedQuestions = [
    { question: "What services do you offer?" },
    { question: "How can I hire a developer?" },
    { question: "What is your pricing?" },
];

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
let messageIdCounter = 0;

const generateUniqueId = () => {
    return `${Date.now()}-${messageIdCounter++}`;
};

const generateSessionId = () => {
    return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState<'collecting' | 'chatting'>('collecting');
    const [userDetails, setUserDetails] = useState({ name: '', number: '' });
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const isMobile = useIsMobile();
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

    const addMessage = useCallback((message: Omit<Message, 'id'>) => {
        setMessages(prev => {
            const newMessages = [...prev, { ...message, id: generateUniqueId() }];
            return newMessages;
        });
    }, []);

    const fetchLatestMessages = useCallback(async () => {
        if (!sessionId || step !== 'chatting') return;
        
        try {
            const response = await fetch('/api/contact?source=chat');
            const { data } = await response.json();
            const currentSession = data.find((s: any) => s.sessionId === sessionId);
            
            if (currentSession && currentSession.messages.length > messages.length) {
                // Filter out messages that are already present to avoid duplicates
                const newMessages = currentSession.messages.filter((msg: Message) => !messages.find(m => m.id === msg.id));
                if (newMessages.length > 0) {
                    setMessages(prev => [...prev, ...newMessages]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch latest messages:", error);
        }
    }, [sessionId, messages, step]);


     useEffect(() => {
        if (isOpen && step === 'chatting') {
            const intervalId = setInterval(fetchLatestMessages, 5000); // Poll every 5 seconds
            return () => clearInterval(intervalId);
        }
    }, [isOpen, step, fetchLatestMessages]);

    const initializeChat = useCallback((clearStorage = false) => {
        if (clearStorage && typeof window !== 'undefined') {
            localStorage.removeItem('chatbotState');
        }
        const initialMessage = { id: generateUniqueId(), text: "Welcome to NamanMahi.in! Before we start, could you please tell me your name?", sender: 'bot' as const };
        setMessages([initialMessage]);
        setStep('collecting');
        setUserDetails({ name: '', number: '' });
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        
        if (typeof window !== 'undefined') {
            const initialState = {
                messages: [initialMessage],
                step: 'collecting',
                userDetails: { name: '', number: '' },
                sessionId: newSessionId,
            };
            localStorage.setItem('chatbotState', JSON.stringify(initialState));
        }

    }, []);
    
    const saveChatState = useCallback((currentState: object) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('chatbotState', JSON.stringify(currentState));
            } catch (error) {
                console.error("Failed to save chat state to localStorage", error);
            }
        }
    }, []);
    
    const saveChatToDatabase = async (chatData: { name: string; number: string, source: string, sessionId: string, messages: typeof messages }) => {
        if (!chatData.sessionId) return;
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chatData),
            });
            if (!response.ok) {
                throw new Error("Failed to save chat to database");
            }
        } catch (error) {
            console.error("Could not save chat to database:", error);
            toast.error("There was a problem syncing your chat.");
        }
    };

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsOpen(prev => {
                if (prev) {
                    addMessage({ text: "It looks like you've been inactive for a while. Let's start over.", sender: 'bot' });
                    initializeChat(true); // Clear storage on inactivity timeout
                }
                return prev;
            });
        }, INACTIVITY_TIMEOUT);
    }, [initializeChat, addMessage]);
    
    useEffect(() => {
        if (isOpen) {
            resetInactivityTimer();
        } else if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [isOpen, resetInactivityTimer]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedState = localStorage.getItem('chatbotState');
                if (savedState) {
                    const { messages: savedMessages, step: savedStep, userDetails: savedUserDetails, sessionId: savedSessionId } = JSON.parse(savedState);
                    if (savedMessages && savedMessages.length > 0 && savedSessionId) {
                        setMessages(savedMessages);
                        setStep(savedStep);
                        setUserDetails(savedUserDetails);
                        setSessionId(savedSessionId);
                    } else {
                        initializeChat();
                    }
                } else {
                    initializeChat();
                }
            } catch (error) {
                console.error("Failed to parse chatbot state from localStorage", error);
                initializeChat();
            }
        }
    }, [initializeChat]);
    
    useEffect(() => {
        if (messages.length > 0 && sessionId) {
             const stateToSave = { messages, step, userDetails, sessionId };
             saveChatState(stateToSave);
             resetInactivityTimer();
             if (userDetails.name && userDetails.number) {
                saveChatToDatabase({
                    source: 'Chatbot Lead',
                    name: userDetails.name,
                    number: userDetails.number,
                    sessionId,
                    messages
                });
             }
        }
    }, [messages, step, userDetails, sessionId, saveChatState, resetInactivityTimer]);
    
    const handleSendMessage = (text: string) => {
        addMessage({ text, sender: 'user' });

        if (step === 'collecting') {
            if (!userDetails.name) {
                setUserDetails(prev => ({ ...prev, name: text }));
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    addMessage({ text: `Thanks, ${text}! What's your contact number?`, sender: 'bot' });
                }, 1000);
            } else {
                const updatedUserDetails = { ...userDetails, number: text };
                setUserDetails(updatedUserDetails);
                setIsTyping(true);
                
                setTimeout(() => {
                    setIsTyping(false);
                    const welcomeText = `Great! How can I help you today, ${userDetails.name}? You can ask me about our services, pricing, or how to hire developers.`;
                    addMessage({ text: welcomeText, sender: 'bot' });
                    addMessage({ text: 'You can choose from the options below or type your own question.', sender: 'bot' });
                    addMessage({ text: '', sender: 'options', options: predefinedQuestions.map(q => q.question) });
                    setStep('chatting');
                }, 1000);
            }
        } else {
            handleUserQuery(text);
        }
    };
    
    const handleOptionSelect = (option: string) => {
        addMessage({ text: option, sender: 'user' });
        handleUserQuery(option);
    };

    const handleUserQuery = async (query: string) => {
        setIsTyping(true);

        try {
            const history = messages.slice(-5).map(m => `${m.sender}: ${m.text}`);
            const response = await getChatbotResponse({ query, history });

            if (response.answer) {
                 addMessage({ text: response.answer, sender: 'bot' });
            } else {
                addMessage({ text: "I'm sorry, I'm not sure how to answer that. Is there anything else I can help with?", sender: 'bot' });
            }

        } catch(error) {
             console.error("Error getting chatbot response:", error);
             addMessage({ text: "Sorry, I'm having a little trouble right now. Please try again in a moment.", sender: 'bot' });
        } finally {
            setIsTyping(false);
        }
    }
    
    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="z-50 relative">
            <ChatbotIcon isOpen={isOpen} onClick={toggleOpen} />
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        onOptionSelect={handleOptionSelect}
                        onClose={toggleOpen}
                        isTyping={isTyping}
                        isMobile={isMobile}
                        step={step}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
