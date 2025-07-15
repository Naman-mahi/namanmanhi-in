
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SubmissionList } from '@/components/admin/submission-list';
import { SubmissionDetails } from '@/components/admin/submission-details';
import { Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Submission } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdminPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const { toast } = useToast();
    const isMobile = useIsMobile();

    const fetchData = async () => {
        if (!isLoading) setIsRefreshing(true);
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
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Optional: Poll for new data periodically
        const intervalId = setInterval(fetchData, 30000); // Poll every 30 seconds
        return () => clearInterval(intervalId);
    }, []);

    const filteredSubmissions = useMemo(() => {
        const term = searchTerm.toLowerCase();
        const chatSubmissions = submissions.filter(s => s.source === 'Chatbot Lead');
        const formSubmissions = submissions.filter(s => s.source === 'Contact Form');

        const filterLogic = (sub: Submission) => {
            if (sub.source === 'Chatbot Lead') {
                return sub.name.toLowerCase().includes(term) || sub.number.includes(term) || sub.messages.some(m => m.text.toLowerCase().includes(term));
            }
            if (sub.source === 'Contact Form') {
                return sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term) || sub.contact.includes(term) || sub.message.toLowerCase().includes(term);
            }
            return false;
        };

        if (activeTab === 'chat') return chatSubmissions.filter(filterLogic);
        if (activeTab === 'forms') return formSubmissions.filter(filterLogic);
        
        return [];
    }, [submissions, searchTerm, activeTab]);

    useEffect(() => {
        if (filteredSubmissions.length > 0) {
             const currentSelectionExists = filteredSubmissions.some(s => s.id === selectedSubmission?.id);
             if (!currentSelectionExists && !isMobile) {
                setSelectedSubmission(filteredSubmissions[0]);
             }
        } else {
            setSelectedSubmission(null);
        }
    }, [filteredSubmissions, selectedSubmission, isMobile]);

    const handleReplySubmit = async (replyText: string) => {
        if (!selectedSubmission || selectedSubmission.source !== 'Chatbot Lead') return;

        const session = selectedSubmission;
        const newAdminMessage = {
            id: `admin-${Date.now()}`,
            text: replyText,
            sender: 'bot' as const, // 'bot' represents the business/admin side
        };
        
        const updatedMessages = [...session.messages, newAdminMessage];
        const updatedSession = { ...session, messages: updatedMessages, updatedAt: new Date().toISOString() };

        // Optimistic UI update
        setSelectedSubmission(updatedSession);
        setSubmissions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...updatedSession, source: 'Chatbot Lead' }), // ensure source is passed
            });

            if (!response.ok) throw new Error("Failed to save message");
            
            toast({
                title: "Reply Sent!",
                description: "Your message has been saved to the chat log.",
            });
            // Optionally, refetch to confirm, but optimistic update handles the view
            // await fetchData(); 
        } catch (error) {
             console.error("Failed to send reply:", error);
             toast({ title: "Error", description: "Could not send reply.", variant: "destructive" });
             // Revert optimistic update on failure
             setSelectedSubmission(session);
             setSubmissions(prev => prev.map(s => s.id === session.id ? session : s));
        }
    };
    
    const showDetails = isMobile ? !!selectedSubmission : true;
    const showList = isMobile ? !selectedSubmission : true;

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header variant="inline" />
            <main className="flex-grow flex flex-col container mx-auto px-4 py-8 mt-16">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold">Admin Panel</h1>
                        <p className="text-muted-foreground">Review and manage customer interactions.</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => fetchData()} disabled={isRefreshing}>
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <div className="border rounded-xl shadow-sm overflow-hidden flex-grow flex flex-col lg:grid lg:grid-cols-3 min-h-[calc(100vh-280px)]">
                    {isLoading ? (
                         <div className="flex-grow flex items-center justify-center p-8 col-span-3">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            <div className={cn("lg:col-span-1 border-r flex-col h-full lg:flex", { 'hidden': !showList })}>
                                <SubmissionList
                                    searchTerm={searchTerm}
                                    onSearchTermChange={setSearchTerm}
                                    activeTab={activeTab}
                                    onTabChange={(tab) => {
                                        setActiveTab(tab);
                                        setSelectedSubmission(null);
                                    }}
                                    submissions={filteredSubmissions}
                                    selectedSubmission={selectedSubmission}
                                    onSubmissionSelect={setSelectedSubmission}
                                />
                            </div>
                            <div className={cn("lg:col-span-2 h-full lg:flex flex-col", { 'hidden': !showDetails })}>
                                {isMobile && selectedSubmission && (
                                     <Button variant="ghost" onClick={() => setSelectedSubmission(null)} className="mb-2">
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
                                    </Button>
                                )}
                                <SubmissionDetails
                                    submission={selectedSubmission}
                                    onReplySubmit={handleReplySubmit}
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
