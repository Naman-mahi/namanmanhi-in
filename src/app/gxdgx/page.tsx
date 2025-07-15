
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SubmissionList } from '@/components/admin/submission-list';
import { SubmissionDetails } from '@/components/admin/submission-details';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Submission } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('chat');
    const { toast } = useToast();

    const fetchData = async () => {
        if (!isLoading) setIsLoading(true);
        try {
            const response = await fetch('/api/contact');
            const { data } = await response.json();
            const sortedData = data.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setSubmissions(sortedData);
            
            if (selectedSubmission) {
                const refreshedSubmission = sortedData.find((s: Submission) => s.id === selectedSubmission.id);
                setSelectedSubmission(refreshedSubmission || null);
            }
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
            toast({
                title: "Error",
                description: "Failed to load submission data.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredSubmissions = useMemo(() => {
        const term = searchTerm.toLowerCase();
        const filtered = submissions.filter(sub => {
            if (sub.source === 'Chatbot Lead') {
                return sub.name.toLowerCase().includes(term) || sub.number.includes(term) || sub.messages.some(m => m.text.toLowerCase().includes(term));
            }
            if (sub.source === 'Contact Form') {
                return sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term) || sub.contact.includes(term) || sub.message.toLowerCase().includes(term);
            }
            return false;
        });
        
        return filtered.filter(s => (activeTab === 'chat' && s.source === 'Chatbot Lead') || (activeTab === 'forms' && s.source === 'Contact Form'));
    }, [submissions, searchTerm, activeTab]);

    useEffect(() => {
        // Auto-select the first item in the list when the tab changes or on initial load
        if (filteredSubmissions.length > 0 && !filteredSubmissions.some(s => s.id === selectedSubmission?.id)) {
            setSelectedSubmission(filteredSubmissions[0]);
        } else if (filteredSubmissions.length === 0) {
            setSelectedSubmission(null);
        }
    }, [filteredSubmissions, selectedSubmission]);

    const handleReplySubmit = async (replyText: string) => {
        if (!selectedSubmission || selectedSubmission.source !== 'Chatbot Lead') return;

        const session = selectedSubmission;
        const newAdminMessage = {
            id: `admin-${Date.now()}`,
            text: replyText,
            sender: 'bot' as const,
        };
        
        const updatedMessages = [...session.messages, newAdminMessage];
        const updatedSession = { ...session, messages: updatedMessages, updatedAt: new Date().toISOString() };

        setSelectedSubmission(updatedSession);
        setSubmissions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSession),
            });

            if (!response.ok) throw new Error("Failed to save message");
            
            toast({
                title: "Reply Sent!",
                description: "Your message has been saved to the chat log.",
            });
            await fetchData();
        } catch (error) {
             console.error("Failed to send reply:", error);
             toast({ title: "Error", description: "Could not send reply.", variant: "destructive" });
             setSelectedSubmission(session);
             setSubmissions(prev => prev.map(s => s.id === session.id ? session : s));
        }
    };
    
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header variant="inline" />
            <main className="flex-grow flex flex-col container mx-auto px-4 py-8 mt-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Review and manage customer interactions.</p>
                </div>

                <div className="border rounded-xl shadow-sm overflow-hidden flex-grow flex flex-col lg:grid lg:grid-cols-3">
                    <div className="lg:col-span-1 border-r flex-col h-full lg:flex">
                       {isLoading ? (
                            <div className="flex-grow flex items-center justify-center p-8">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <SubmissionList
                                    searchTerm={searchTerm}
                                    onSearchTermChange={setSearchTerm}
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                    submissions={filteredSubmissions}
                                    selectedSubmission={selectedSubmission}
                                    onSubmissionSelect={setSelectedSubmission}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-2 h-full hidden lg:flex flex-col">
                        <SubmissionDetails
                            submission={selectedSubmission}
                            onReplySubmit={handleReplySubmit}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
