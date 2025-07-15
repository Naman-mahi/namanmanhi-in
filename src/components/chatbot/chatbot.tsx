
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatbotIcon } from "./chatbot-icon";
import { ChatWindow } from "./chat-window";
import { useIsMobile } from "@/hooks/use-mobile";

const predefinedQuestions = [
    { question: "What services do you offer?", answer: "We offer a wide range of services including AI & ML, Blockchain, Web Development, Mobile Apps, Game Development, E-commerce, IoT, and Salesforce solutions. How can I help you with one of these?" },
    { question: "How can I hire a developer?", answer: "You can hire developers on an hourly, monthly, or quarterly basis. Please visit our 'Hire Developers' page or provide your details here, and our team will get in touch." },
    { question: "What is your pricing?", answer: "Our pricing is flexible. For detailed information, please check the 'Pricing' section on our 'Hire Developers' page. We can also provide a custom quote based on your project requirements." },
    { question: "Where are you located?", answer: "Our main office is located at 123 Tech Avenue, Silicon Valley, CA. We serve clients globally!" },
    { question: "What technologies do you use?", answer: "We specialize in a wide array of technologies, including React, Next.js, Node.js, Python for AI/ML, Swift/Kotlin for mobile, and Solidity for Blockchain. You can see a full list on our 'Hire Developers' page." },
    { question: "Can you tell me about your experience?", answer: "We have over 17 years of experience in the industry, with a team of over 700 developers. We have successfully completed hundreds of projects for clients across the globe." }
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number; text: string; sender: 'bot' | 'user' | 'options'; options?: string[] }[]>([]);
    const [step, setStep] = useState<'collecting' | 'chatting'>('collecting');
    const [userDetails, setUserDetails] = useState({ name: '', number: '' });
    const [isTyping, setIsTyping] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        // Load state from localStorage on initial render
        try {
            const savedState = localStorage.getItem('chatbotState');
            if (savedState) {
                const { messages: savedMessages, step: savedStep, userDetails: savedUserDetails } = JSON.parse(savedState);
                if (savedMessages && savedMessages.length > 0) {
                    setMessages(savedMessages);
                    setStep(savedStep);
                    setUserDetails(savedUserDetails);
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
    }, []);
    
    useEffect(() => {
        // Save state to localStorage whenever it changes
        if (messages.length > 0 && step !== 'collecting' && userDetails.name) {
             try {
                const stateToSave = { messages, step, userDetails };
                localStorage.setItem('chatbotState', JSON.stringify(stateToSave));
            } catch (error) {
                console.error("Failed to save chatbot state to localStorage", error);
            }
        }
    }, [messages, step, userDetails]);

    const initializeChat = () => {
        setMessages([{ id: 1, text: "Welcome to NamanMahi.in! Before we start, could you please tell me your name?", sender: 'bot' }]);
        setStep('collecting');
        setUserDetails({ name: '', number: '' });
    };

    const handleSendMessage = (text: string) => {
        const newUserMessage = { id: Date.now(), text, sender: 'user' as const };
        setMessages(prev => [...prev, newUserMessage]);

        if (step === 'collecting') {
            if (!userDetails.name) {
                setUserDetails(prev => ({ ...prev, name: text }));
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, { id: Date.now() + 1, text: `Thanks, ${text}! What's your contact number?`, sender: 'bot' }]);
                }, 1000);
            } else {
                setUserDetails(prev => ({ ...prev, number: text }));
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    const welcomeText = `Great! How can I help you today, ${userDetails.name}? You can ask me about our services, pricing, or how to hire developers.`;
                    setMessages(prev => [...prev, 
                        { id: Date.now() + 1, text: welcomeText, sender: 'bot' },
                        { id: Date.now() + 2, text: 'You can choose from the options below or type your own question.', sender: 'bot' },
                        { id: Date.now() + 3, text: '', sender: 'options', options: predefinedQuestions.map(q => q.question) }
                    ]);
                    setStep('chatting');
                }, 1000);
            }
        } else {
            // Handle chat logic
            handleUserQuery(text);
        }
    };
    
    const handleOptionSelect = (option: string) => {
        const userMessage = { id: Date.now(), text: option, sender: 'user' as const };
        setMessages(prev => [...prev, userMessage]);
        handleUserQuery(option);
    };

    const findBestMatch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        // Check for exact match first
        const exactMatch = predefinedQuestions.find(q => q.question.toLowerCase() === lowerCaseQuery);
        if (exactMatch) return exactMatch;

        // Keyword matching logic
        const queryWords = new Set(lowerCaseQuery.replace(/[?.,]/g, '').split(' '));
        
        predefinedQuestions.forEach(q => {
            const questionWords = new Set(q.question.toLowerCase().replace(/[?.,]/g, '').split(' '));
            let score = 0;
            queryWords.forEach(word => {
                if (questionWords.has(word)) {
                    score++;
                }
            });

            if (score > highestScore) {
                highestScore = score;
                bestMatch = q;
            }
        });
        
        return bestMatch;
    }

    const handleUserQuery = (query: string) => {
        setIsTyping(true);
        setTimeout(() => {
            const matchedQuestion = findBestMatch(query);
            let botResponse;

            if (matchedQuestion) {
                botResponse = matchedQuestion.answer;
            } else {
                 botResponse = "I'm sorry, I'm not sure how to answer that. You can ask me about our services, pricing, hiring developers, or our experience. You can also try one of the suggestions below.";
            }
            
            setIsTyping(false);
            setMessages(prev => [...prev, 
                { id: Date.now() + 1, text: botResponse, sender: 'bot' },
                { id: Date.now() + 2, text: 'Is there anything else I can help with?', sender: 'bot' },
                { id: Date.now() + 3, text: '', sender: 'options', options: predefinedQuestions.map(q => q.question) }
            ]);
        }, 1500);
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
