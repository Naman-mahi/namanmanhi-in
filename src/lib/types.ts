
export type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user' | 'options';
    options?: string[];
};

export type ChatSession = {
    id: number;
    sessionId: string;
    name: string;
    number: string;
    messages: Message[];
    createdAt: string;
    updatedAt?: string;
    source: 'Chatbot Lead';
};

export type ContactSubmission = {
    id: number;
    fullName: string;
    email: string;
    contact: string;
    whatsapp: string;
    location: string;
    budget?: number;
    message: string;
    createdAt: string;
    source: 'Contact Form';
};

export type Submission = ChatSession | ContactSubmission;
