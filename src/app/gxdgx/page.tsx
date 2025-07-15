
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SubmissionList } from '@/components/admin/submission-list';
import { SubmissionDetails } from '@/components/admin/submission-details';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Submission } from '@/lib/types';

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
            
            // Re-select or select first item after data refresh
            if (selectedSubmission) {
                const refreshedSubmission = sortedData.find((s: Submission) => s.id === selectedSubmission.id);
                setSelectedSubmission(refreshedSubmission || null);
            } else if (sortedData.length > 0) {
               const firstItem = sortedData.find((s: Submission) => (s.source === 'Chatbot Lead' && activeTab === 'chat') || (s.source === 'Contact Form' && activeTab === 'forms'));
               setSelectedSubmission(firstItem || sortedData[0]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredSubmissions = useMemo(() => {
        if (!searchTerm) return submissions;
        const term = searchTerm.toLowerCase();
        return submissions.filter(sub => {
            if (sub.source === 'Chatbot Lead') {
                return sub.name.toLowerCase().includes(term) || sub.number.includes(term) || sub.messages.some(m => m.text.toLowerCase().includes(term));
            }
            if (sub.source === 'Contact Form') {
                return sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term) || sub.contact.includes(term) || sub.message.toLowerCase().includes(term);
            }
            return false;
        });
    }, [submissions, searchTerm]);
    
    const { chatLeads, formSubmissions } = useMemo(() => ({
        chatLeads: filteredSubmissions.filter(s => s.source === 'Chatbot Lead'),
        formSubmissions: filteredSubmissions.filter(s => s.source === 'Contact Form')
    }), [filteredSubmissions]);

    const handleReplySubmit = async (replyText: string) => {
        if (!selectedSubmission || selectedSubmission.source !== 'Chatbot Lead') return;

        const session = selectedSubmission;
        const newAdminMessage = {
            id: `admin-${Date.now()}`,
            text: replyText,
            sender: 'bot' as const, // Admin messages are styled like the bot
        };
        
        const updatedMessages = [...session.messages, newAdminMessage];
        const updatedSession = { ...session, messages: updatedMessages, updatedAt: new Date().toISOString() };

        // Optimistically update UI
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
            await fetchData(); // Refresh data to ensure consistency

        } catch (error) {
             console.error("Failed to send reply:", error);
             toast({ title: "Error", description: "Could not send reply.", variant: "destructive" });
             // Revert optimistic update on failure
             setSelectedSubmission(session);
             setSubmissions(prev => prev.map(s => s.id === session.id ? session : s));
        }
    };
    
    useEffect(() => {
        const firstItemInTab = activeTab === 'chat' ? chatLeads[0] : formSubmissions[0];
        if(!selectedSubmission || selectedSubmission.source === (activeTab === 'chat' ? 'Contact Form' : 'Chatbot Lead')){
             setSelectedSubmission(firstItemInTab || null);
        }
    }, [activeTab, chatLeads, formSubmissions, selectedSubmission]);

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header variant="inline" />
            <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">Admin Panel</h1>
                    <p className="text-muted-foreground">Review and manage customer interactions.</p>
                </div>

                <div className="border rounded-xl shadow-sm overflow-hidden h-[calc(100vh-250px)] grid lg:grid-cols-3">
                    <div className="lg:col-span-1 border-r flex flex-col h-full">
                       {isLoading ? (
                            <div className="flex-grow flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <SubmissionList
                                searchTerm={searchTerm}
                                onSearchTermChange={setSearchTerm}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                chatLeads={chatLeads}
                                formSubmissions={formSubmissions}
                                selectedSubmission={selectedSubmission}
                                onSubmissionSelect={setSelectedSubmission}
                            />
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
