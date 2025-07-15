
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
import { MessageSquare, User, FileText } from 'lucide-react';

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

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/contact');
                const { data } = await response.json();
                setSubmissions(data.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
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
        return submissions.filter(sub => {
            const term = searchTerm.toLowerCase();
            if (sub.source === 'Chatbot Lead') {
                return sub.number.includes(term) || sub.name.toLowerCase().includes(term);
            }
            if (sub.source === 'Contact Form') {
                return sub.contact.includes(term) || sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term);
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

    const renderSubmissionList = (items: Submission[], type: 'chat' | 'form') => (
        <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
                {isLoading && <p className="text-muted-foreground text-center">Loading...</p>}
                {!isLoading && items.length === 0 && <p className="text-muted-foreground text-center">No submissions found.</p>}
                {items.map(sub => (
                    <div
                        key={sub.id}
                        onClick={() => handleSubmissionSelect(sub)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedSubmission?.id === sub.id ? 'bg-primary/10' : 'hover:bg-secondary'}`}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-semibold flex items-center gap-2">
                               {type === 'chat' ? <MessageSquare className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-primary" />}
                               {sub.source === 'Chatbot Lead' ? sub.name : sub.fullName}
                            </p>
                            <Badge variant="outline">{sub.source === 'Chatbot Lead' ? sub.number : sub.contact}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 pl-6">
                            {format(parseISO(sub.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
    
    const renderSubmissionDetails = () => {
        if (!selectedSubmission) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Select a submission from the left to view details.</p>
                </div>
            );
        }

        if (selectedSubmission.source === 'Chatbot Lead') {
            const session = selectedSubmission as ChatSession;
            return (
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                        {session.messages.filter(msg => msg.sender !== 'options').map(msg => (
                            <ChatMessage key={msg.id} message={msg} onOptionSelect={() => {}} />
                        ))}
                    </div>
                </ScrollArea>
            );
        }

        if (selectedSubmission.source === 'Contact Form') {
            const form = selectedSubmission as ContactSubmission;
            return (
                <ScrollArea className="h-full">
                    <div className="p-6 space-y-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                            <p className="text-lg">{form.fullName}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p className="text-lg text-primary">{form.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Contact No.</p>
                                <p className="text-lg">{form.contact}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">WhatsApp</p>
                                <p className="text-lg">{form.whatsapp}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                            <p className="text-lg">{form.location}</p>
                        </div>
                        {form.budget && (
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Project Budget</p>
                                <p className="text-lg font-semibold text-green-600">${new Intl.NumberFormat('en-US').format(form.budget)}</p>
                            </div>
                        )}
                        <div className="space-y-1 pt-2 border-t mt-4">
                            <p className="text-sm font-medium text-muted-foreground">Message</p>
                            <p className="text-base whitespace-pre-wrap">{form.message}</p>
                        </div>
                    </div>
                </ScrollArea>
            );
        }
        return null;
    };

    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />
            <main className="container mx-auto px-4 py-8 mt-20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Review and manage customer interactions.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
                    <Card className="md:col-span-1 flex flex-col">
                        <CardHeader>
                            <CardTitle>Submissions</CardTitle>
                             <Input
                                placeholder="Filter by name, number, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mt-2"
                            />
                        </CardHeader>
                        <CardContent className="flex-grow p-0">
                           <Tabs defaultValue="chat" className="h-full flex flex-col">
                                <TabsList className="mx-4">
                                    <TabsTrigger value="chat" className="flex-1 gap-2"><MessageSquare className="w-4 h-4" /> Chats ({chatLeads.length})</TabsTrigger>
                                    <TabsTrigger value="forms" className="flex-1 gap-2"><FileText className="w-4 h-4" /> Forms ({formSubmissions.length})</TabsTrigger>
                                </TabsList>
                                <TabsContent value="chat" className="flex-grow">
                                    {renderSubmissionList(chatLeads, 'chat')}
                                </TabsContent>
                                <TabsContent value="forms" className="flex-grow">
                                    {renderSubmissionList(formSubmissions, 'form')}
                                </TabsContent>
                           </Tabs>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 flex flex-col">
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                            <CardDescription>
                                {selectedSubmission?.source === 'Chatbot Lead' ? `Chat with ${selectedSubmission.name}` : selectedSubmission?.source === 'Contact Form' ? `Form from ${selectedSubmission.fullName}` : 'No submission selected'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-0">
                            {renderSubmissionDetails()}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
