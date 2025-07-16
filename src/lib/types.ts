
import type { ObjectId } from 'mongodb';

export type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user' | 'options';
    options?: string[];
};

export type ChatSession = {
    _id?: ObjectId;
    sessionId: string;
    name: string;
    number: string;
    messages: Message[];
    createdAt: string;
    updatedAt?: string;
    source: 'Chatbot Lead';
};

export type ContactSubmission = {
    _id?: ObjectId;
    fullName: string;
    email: string;
    contact: string;
    whatsapp: string;
    location: string;
    budget?: number;
    message: string;
    createdAt: string;
    source: 'Contact Form';
    status?: 'New' | 'Contacted' | 'In Progress' | 'Closed';
    notes?: string;
    updatedAt?: string;
};

export type Submission = ChatSession | ContactSubmission;
