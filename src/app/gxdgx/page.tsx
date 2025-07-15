
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { format, parseISO } from 'date-fns';

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
    source: string;
};

export default function AdminPage() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('/api/contact');
                const { data } = await response.json();
                const chatSessions = data.filter((item: any) => item.source === 'Chatbot Lead');
                setSessions(chatSessions.sort((a: ChatSession, b: ChatSession) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            } catch (error) {
                console.error("Failed to fetch chat sessions:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredSessions = sessions.filter(session =>
        session.number.includes(searchTerm) ||
        session.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSessionSelect = (session: ChatSession) => {
        setSelectedSession(session);
    }

    return (
        <div className="bg-background text-foreground">
            <Header variant="inline" />
            <main className="container mx-auto px-4 py-8 mt-20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Admin Chat Panel</h1>
                    <p className="text-muted-foreground">Review and manage user chat sessions.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 h-[calc(100vh-250px)]">
                    {/* Sessions List */}
                    <Card className="md:col-span-1 flex flex-col">
                        <CardHeader>
                            <CardTitle>Chat Sessions</CardTitle>
                            <CardDescription>Select a session to view the conversation.</CardDescription>
                             <Input
                                placeholder="Filter by name or number..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mt-2"
                            />
                        </CardHeader>
                        <CardContent className="flex-grow p-0">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-2">
                                    {isLoading && <p className="text-muted-foreground text-center">Loading sessions...</p>}
                                    {!isLoading && filteredSessions.length === 0 && <p className="text-muted-foreground text-center">No sessions found.</p>}
                                    {filteredSessions.map(session => (
                                        <div
                                            key={session.id}
                                            onClick={() => handleSessionSelect(session)}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedSession?.id === session.id ? 'bg-primary/10' : 'hover:bg-secondary'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold">{session.name}</p>
                                                <Badge variant="outline">{session.number}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {format(parseISO(session.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Chat View */}
                    <Card className="md:col-span-2 flex flex-col">
                        <CardHeader>
                            <CardTitle>Conversation</CardTitle>
                            <CardDescription>
                                {selectedSession ? `Chat with ${selectedSession.name}` : "No session selected"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-0">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-4">
                                {selectedSession ? (
                                    selectedSession.messages.filter(msg => msg.sender !== 'options').map(msg => (
                                        <ChatMessage key={msg.id} message={msg} onOptionSelect={() => {}} />
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-muted-foreground">Select a session from the left to view the chat.</p>
                                    </div>
                                )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
