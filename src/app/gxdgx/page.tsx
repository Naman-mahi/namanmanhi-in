
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { format, parseISO } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, User, FileText, Loader2, Inbox } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user' | 'options';
    options?: string[];
};

type ChatSession = {
    id: number;
    sessionId: string;
    name: string;
    number: string;
    messages: Message[];
    createdAt: string;
    updatedAt?: string;
    source: 'Chatbot Lead';
};

type ContactSubmission = {
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

type Submission = ChatSession | ContactSubmission;

export default function AdminPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('chat');

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/contact');
                const { data } = await response.json();
                const sortedData = data.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setSubmissions(sortedData);
                if(sortedData.length > 0) {
                   const firstChat = sortedData.find(s => s.source === 'Chatbot Lead');
                   if (firstChat) {
                       setSelectedSubmission(firstChat);
                       setActiveTab('chat');
                   } else {
                       setSelectedSubmission(sortedData[0]);
                       setActiveTab('forms');
                   }
                }
            } catch (error) {
                console.error("Failed to fetch submissions:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredSubmissions = useMemo(() => {
        if (!searchTerm) return submissions;
        const term = searchTerm.toLowerCase();
        return submissions.filter(sub => {
            if (sub.source === 'Chatbot Lead') {
                return sub.number.includes(term) || sub.name.toLowerCase().includes(term) || sub.messages.some(m => m.text.toLowerCase().includes(term));
            }
            if (sub.source === 'Contact Form') {
                return sub.contact.includes(term) || sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term) || sub.message.toLowerCase().includes(term);
            }
            return false;
        });
    }, [submissions, searchTerm]);
    
    const { chatLeads, formSubmissions } = useMemo(() => ({
        chatLeads: filteredSubmissions.filter(s => s.source === 'Chatbot Lead') as ChatSession[],
        formSubmissions: filteredSubmissions.filter(s => s.source === 'Contact Form') as ContactSubmission[]
    }), [filteredSubmissions]);

    const handleSubmissionSelect = (submission: Submission) => {
        setSelectedSubmission(submission);
    }
    
    const SubmissionList = ({ items, type }: { items: Submission[], type: 'chat' | 'form' }) => (
        <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
                {!isLoading && items.length === 0 && <p className="text-muted-foreground text-center p-4">No {type === 'chat' ? 'chats' : 'forms'} found.</p>}
                {items.map(sub => {
                    const lastMessage = sub.source === 'Chatbot Lead' ? sub.messages.filter(m => m.sender === 'user').slice(-1)[0]?.text : sub.message;
                    return (
                        <div
                            key={sub.id}
                            onClick={() => handleSubmissionSelect(sub)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors border border-transparent ${selectedSubmission?.id === sub.id ? 'bg-primary/10 border-primary/20' : 'hover:bg-secondary'}`}
                        >
                            <div className="flex justify-between items-start">
                                <p className="font-semibold flex items-center gap-2 text-sm">
                                   {type === 'chat' ? <MessageSquare className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
                                   {sub.source === 'Chatbot Lead' ? sub.name : sub.fullName}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                    {format(parseISO(sub.createdAt), "MMM d")}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 pl-6 truncate">
                                {lastMessage}
                            </p>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    );

    const SubmissionDetails = () => {
        if (!selectedSubmission) {
            return (
                <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-8">
                    <Inbox className="w-16 h-16 text-muted-foreground/50 mb-4"/>
                    <h3 className="text-xl font-semibold">Select an item to view</h3>
                    <p className="text-muted-foreground">No submission selected. Please choose one from the list on the left.</p>
                </div>
            );
        }

        if (selectedSubmission.source === 'Chatbot Lead') {
            const session = selectedSubmission as ChatSession;
            return (
                 <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                         <h3 className="font-bold text-lg">{session.name}</h3>
                         <p className="text-sm text-muted-foreground">{session.number}</p>
                    </div>
                    <ScrollArea className="flex-grow">
                        <div className="p-4 space-y-4">
                            {session.messages.filter(msg => msg.sender !== 'options' && msg.text).map(msg => (
                                <ChatMessage key={msg.id} message={msg} onOptionSelect={() => {}} />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            );
        }

        if (selectedSubmission.source === 'Contact Form') {
            const form = selectedSubmission as ContactSubmission;
            const DetailItem = ({ label, value, className = '' }: { label: string, value: React.ReactNode, className?: string }) => (
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className={`text-base ${className}`}>{value}</p>
                </div>
            );
            return (
                 <div className="flex flex-col h-full">
                     <div className="p-4 border-b">
                         <h3 className="font-bold text-lg">{form.fullName}</h3>
                         <a href={`mailto:${form.email}`} className="text-sm text-primary hover:underline">{form.email}</a>
                    </div>
                    <ScrollArea className="flex-grow">
                        <div className="p-6 space-y-5">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DetailItem label="Contact No." value={form.contact} />
                                <DetailItem label="WhatsApp" value={form.whatsapp} />
                            </div>
                            <DetailItem label="Location" value={form.location} />
                            {form.budget && (
                                <DetailItem label="Project Budget" value={`$${new Intl.NumberFormat('en-US').format(form.budget)}`} className="font-semibold text-green-600" />
                            )}
                            <Separator />
                            <DetailItem label="Message" value={<p className="whitespace-pre-wrap">{form.message}</p>} />
                        </div>
                    </ScrollArea>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header variant="inline" />
            <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Review and manage customer interactions.</p>
                </div>

                <div className="border rounded-xl shadow-sm overflow-hidden grid lg:grid-cols-3">
                    <div className="lg:col-span-1 border-r flex flex-col">
                        <div className="p-4 border-b">
                             <Input
                                placeholder="Filter by name, number, email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
                            <TabsList className="m-2">
                                <TabsTrigger value="chat" className="flex-1 gap-2"><MessageSquare className="w-4 h-4" /> Chats ({chatLeads.length})</TabsTrigger>
                                <TabsTrigger value="forms" className="flex-1 gap-2"><FileText className="w-4 h-4" /> Forms ({formSubmissions.length})</TabsTrigger>
                            </TabsList>
                            {isLoading ? (
                                <div className="flex-grow flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <>
                                    <TabsContent value="chat" className="flex-grow h-0">
                                        <SubmissionList items={chatLeads} type='chat' />
                                    </TabsContent>
                                    <TabsContent value="forms" className="flex-grow h-0">
                                        <SubmissionList items={formSubmissions} type='form' />
                                    </TabsContent>
                                </>
                            )}
                       </Tabs>
                    </div>

                    <div className="lg:col-span-2">
                        <SubmissionDetails />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

    