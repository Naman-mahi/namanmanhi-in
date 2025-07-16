
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SubmissionList } from '@/components/admin/submission-list';
import { SubmissionDetails } from '@/components/admin/submission-details';
import { Loader2, ArrowLeft, RefreshCw, FileText, MessageSquare, CheckCircle, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Submission, ContactSubmission, ChatSession } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: React.ElementType, color: string }) => (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export default function AdminPage() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const isMobile = useIsMobile();

    const fetchData = async () => {
        if (!isLoading) setIsRefreshing(true);
        try {
            const [chatResponse, formsResponse] = await Promise.all([
                fetch('/api/contact?source=chat'),
                fetch('/api/contact?source=forms')
            ]);
            
            const { data: chatData } = await chatResponse.json();
            const { data: formsData } = await formsResponse.json();

            const combinedData = [...(chatData || []), ...(formsData || [])];

            const sortedData = combinedData.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
            setSubmissions(sortedData);
            
            if (selectedSubmission) {
                const refreshedSubmission = sortedData.find((s: Submission) => s._id === selectedSubmission._id);
                setSelectedSubmission(refreshedSubmission || null);
            }
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
            toast.error("Failed to load submission data.");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 30000); 
        return () => clearInterval(intervalId);
    }, []);
    
    const formSubmissions = useMemo(() => submissions.filter(s => s.source === 'Contact Form') as ContactSubmission[], [submissions]);

    const stats = useMemo(() => {
        return {
            new: formSubmissions.filter(s => s.status === 'New').length,
            contacted: formSubmissions.filter(s => s.status === 'Contacted').length,
            inProgress: formSubmissions.filter(s => s.status === 'In Progress').length,
            closed: formSubmissions.filter(s => s.status === 'Closed').length,
        }
    }, [formSubmissions]);

    const filteredSubmissions = useMemo(() => {
        const term = searchTerm.toLowerCase();

        const filterLogic = (sub: Submission) => {
            if (term === '') return true;
            if (sub.source === 'Chatbot Lead') {
                return sub.name.toLowerCase().includes(term) || sub.number.includes(term) || sub.messages.some(m => m.text.toLowerCase().includes(term));
            }
            if (sub.source === 'Contact Form') {
                return sub.fullName.toLowerCase().includes(term) || sub.email.toLowerCase().includes(term) || sub.contact.includes(term) || sub.message.toLowerCase().includes(term);
            }
            return false;
        };
        
        const sourceFilter = (sub: Submission) => {
             if (activeTab === 'chat') return sub.source === 'Chatbot Lead';
             if (activeTab === 'forms') return sub.source === 'Contact Form';
             return false;
        };

        return submissions.filter(sourceFilter).filter(filterLogic);
    }, [submissions, searchTerm, activeTab]);

    useEffect(() => {
        if (filteredSubmissions.length > 0) {
             const currentSelectionExists = filteredSubmissions.some(s => s._id === selectedSubmission?._id);
             if (!currentSelectionExists && !isMobile) {
                setSelectedSubmission(filteredSubmissions[0]);
             }
        } else {
            setSelectedSubmission(null);
        }
    }, [filteredSubmissions, selectedSubmission, isMobile]);

    const handleReplySubmit = async (replyText: string) => {
        if (!selectedSubmission || selectedSubmission.source !== 'Chatbot Lead') return;

        const session = selectedSubmission as ChatSession;
        const newAdminMessage = {
            id: `admin-${Date.now()}`,
            text: replyText,
            sender: 'bot' as const, // 'bot' represents the business/admin side
        };
        
        const updatedMessages = [...session.messages, newAdminMessage];
        const updatedSession = { ...session, messages: updatedMessages, updatedAt: new Date().toISOString() };

        // Optimistic UI update
        setSelectedSubmission(updatedSession);
        setSubmissions(prev => prev.map(s => s._id === updatedSession._id ? updatedSession : s));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...updatedSession, source: 'Chatbot Lead' }),
            });

            if (!response.ok) throw new Error("Failed to save message");
            
            toast.success("Reply Sent!");
            await fetchData();
        } catch (error) {
             console.error("Failed to send reply:", error);
             toast.error("Could not send reply.");
             // Revert optimistic update on failure
             setSelectedSubmission(session);
             setSubmissions(prev => prev.map(s => s._id === session._id ? session : s));
        }
    };
    
    const showDetails = isMobile ? !!selectedSubmission : true;
    const showList = isMobile ? !selectedSubmission : true;

    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">
            <Header variant="inline" />
            <main className="flex-grow flex flex-col container mx-auto px-4 py-8 mt-16">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold">Admin Panel</h1>
                        <p className="text-muted-foreground">Review and manage customer interactions.</p>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => fetchData()} disabled={isRefreshing}>
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard title="New Leads" value={stats.new} icon={FileText} color="text-blue-500" />
                    <StatCard title="Contacted" value={stats.contacted} icon={MailOpen} color="text-yellow-500" />
                    <StatCard title="In Progress" value={stats.inProgress} icon={MessageSquare} color="text-orange-500" />
                    <StatCard title="Closed" value={stats.closed} icon={CheckCircle} color="text-green-500" />
                </div>

                <div className="border rounded-xl shadow-sm overflow-hidden flex-grow flex flex-col lg:grid lg:grid-cols-3 h-full lg:h-[calc(100vh-350px)]">
                    {isLoading ? (
                         <div className="flex-grow flex items-center justify-center p-8 col-span-3">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            <div className={cn("lg:col-span-1 border-r flex flex-col h-full", { 'hidden lg:flex': !showList })}>
                                <SubmissionList
                                    submissions={submissions}
                                    filteredSubmissions={filteredSubmissions}
                                    selectedSubmission={selectedSubmission}
                                    onSubmissionSelect={setSelectedSubmission}
                                    searchTerm={searchTerm}
                                    onSearchTermChange={setSearchTerm}
                                    activeTab={activeTab}
                                    onTabChange={(tab) => {
                                        if (tab === 'blogs') {
                                            router.push('/gxdgx/blogs');
                                            return;
                                        }
                                        setActiveTab(tab);
                                        const firstInTab = submissions.find(s => (tab === 'chat' && s.source === 'Chatbot Lead') || (tab === 'forms' && s.source === 'Contact Form'));
                                        if (!isMobile) {
                                            setSelectedSubmission(firstInTab || null);
                                        } else {
                                            setSelectedSubmission(null);
                                        }
                                    }}
                                />
                            </div>
                            <div className={cn("lg:col-span-2 h-full flex flex-col", { 'hidden lg:flex': !showDetails })}>
                                {isMobile && selectedSubmission && (
                                     <Button variant="ghost" onClick={() => setSelectedSubmission(null)} className="mb-2">
                                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
                                    </Button>
                                )}
                                <SubmissionDetails
                                    submission={selectedSubmission}
                                    onReplySubmit={handleReplySubmit}
                                    onSubmissionUpdate={fetchData}
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
