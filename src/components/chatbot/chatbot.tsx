
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatbotIcon } from "./chatbot-icon";
import { ChatWindow } from "./chat-window";
import { useIsMobile } from "@/hooks/use-mobile";
// import { getChatbotResponse } from "@/ai/flows/chatbot-flow";

const predefinedQuestions = [
    { question: "What services do you offer?", answer: "We offer a wide range of services including AI & ML, Blockchain, Web Development, Mobile Apps, and more. You can see a full list on our [Services section](/)." },
    { question: "How can I hire a developer?", answer: "You can hire developers on an hourly, monthly, or quarterly basis. Please visit our [Hire Developers page](/hire-developers) or provide your details here, and our team will get in touch." },
    { question: "What is your pricing?", answer: "Our pricing is flexible. For detailed information, please check the 'Pricing' section on our [Hire Developers page](/hire-developers). We can also provide a custom quote based on your project requirements." },
    { question: "Where are you located?", answer: "Our main office is located at 123 Tech Avenue, Silicon Valley, CA. We serve clients globally!" },
    { question: "What technologies do you use?", answer: "We specialize in a wide array of technologies, including React, Next.js, Node.js, Python for AI/ML, Swift/Kotlin for mobile, and Solidity for Blockchain. You can see a full list on our [Hire Developers page](/hire-developers)." },
    { question: "Can you tell me about your experience?", answer: "We have over 20 years of experience in the industry, with a team of over 700 developers. We have successfully completed hundreds of projects for clients across the globe." }
];

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
let messageIdCounter = 0;

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: string; text: string; sender: 'bot' | 'user' | 'options'; options?: string[] }[]>([]);
    const [step, setStep] = useState<'collecting' | 'chatting'>('collecting');
    const [userDetails, setUserDetails] = useState({ name: '', number: '' });
    const [isTyping, setIsTyping] = useState(false);
    const [lastQuestion, setLastQuestion] = useState('');
    const isMobile = useIsMobile();
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

    const initializeChat = useCallback(() => {
        setMessages([{ id: '1', text: "Welcome to NamanMahi.in! Before we start, could you please tell me your name?", sender: 'bot' }]);
        setStep('collecting');
        setUserDetails({ name: '', number: '' });
        setLastQuestion('');
        localStorage.removeItem('chatbotState');
    }, []);

    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
            setIsOpen(prev => {
                if (prev) {
                    initializeChat();
                    addMessage({ text: "It looks like you've been inactive for a while. Let's start over. What is your name?", sender: 'bot' });
                }
                return prev;
            });
        }, INACTIVITY_TIMEOUT);
    }, [initializeChat]);

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
        // Load state from localStorage on initial render
        try {
            const savedState = localStorage.getItem('chatbotState');
            if (savedState) {
                const { messages: savedMessages, step: savedStep, userDetails: savedUserDetails, lastQuestion: savedLastQuestion } = JSON.parse(savedState);
                if (savedMessages && savedMessages.length > 0) {
                    setMessages(savedMessages);
                    setStep(savedStep);
                    setUserDetails(savedUserDetails);
                    setLastQuestion(savedLastQuestion || '');
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
    }, [initializeChat]);
    
    useEffect(() => {
        // Save state to localStorage whenever it changes
        if (messages.length > 0 && step !== 'collecting' && userDetails.name) {
             try {
                const stateToSave = { messages, step, userDetails, lastQuestion };
                localStorage.setItem('chatbotState', JSON.stringify(stateToSave));
                resetInactivityTimer();
            } catch (error) {
                console.error("Failed to save chatbot state to localStorage", error);
            }
        }
    }, [messages, step, userDetails, lastQuestion, resetInactivityTimer]);
    
    const generateUniqueId = () => {
        return `${Date.now()}-${messageIdCounter++}`;
    };

    const addMessage = (message: Omit<typeof messages[0], 'id'>) => {
        setMessages(prev => [...prev, { ...message, id: generateUniqueId() }]);
    }
    
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
                setUserDetails(prev => ({ ...prev, number: text }));
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
            setLastQuestion(text);
            handleUserQuery(text);
        }
    };
    
    const handleOptionSelect = (option: string) => {
        addMessage({ text: option, sender: 'user' });
        setLastQuestion(option);
        handleUserQuery(option);
    };

    const handleUserQuery = async (query: string) => {
        setIsTyping(true);
        // Look for a predefined answer first
        const predefined = predefinedQuestions.find(p => p.question.toLowerCase() === query.toLowerCase());

        setTimeout(() => {
            if (predefined) {
                addMessage({ text: predefined.answer, sender: 'bot' });
            } else {
                // Fallback to Genkit (currently commented out)
                addMessage({ text: "I'm sorry, I'm not sure how to answer that. Is there anything else I can help with?", sender: 'bot' });
            }

            // Always show options for next steps
            const filteredQuestions = predefinedQuestions.filter(q => q.question.toLowerCase() !== query.toLowerCase());
            addMessage({ text: 'What else can I help you with?', sender: 'bot' });
            addMessage({ 
                text: '', 
                sender: 'options', 
                options: filteredQuestions.map(q => q.question) 
            });

            setIsTyping(false);
        }, 1000);
        
        /*
        // Genkit implementation is commented out as requested
        try {
            const botResponse = await getChatbotResponse({ query, history: messages.slice(-5).map(m => `${m.sender}: ${m.text}`) });
            addMessage({ text: botResponse.answer, sender: 'bot' });
            
            if (botResponse.answer.includes("anything else")) {
                 addMessage({ 
                    text: 'Is there anything else I can help with?', 
                    sender: 'bot' 
                });
                const filteredQuestions = predefinedQuestions.filter(q => q.question.toLowerCase() !== query.toLowerCase());
                addMessage({ 
                    text: '', 
                    sender: 'options', 
                    options: filteredQuestions.map(q => q.question) 
                });
            } else {
                addMessage({ text: 'What else can I help you with?', sender: 'bot' });
                 const filteredQuestions = predefinedQuestions.filter(q => q.question.toLowerCase() !== query.toLowerCase());
                addMessage({ 
                    text: '', 
                    sender: 'options', 
                    options: filteredQuestions.map(q => q.question) 
                });
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            addMessage({
                text: "I'm sorry, I'm having a little trouble right now. Please try again in a moment.",
                sender: 'bot'
            });
        } finally {
            setIsTyping(false);
        }
        */
    }
    
    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
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
        </>
    );
}
