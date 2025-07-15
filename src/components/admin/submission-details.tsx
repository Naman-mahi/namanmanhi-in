
'use client';

import type { Submission, ChatSession, ContactSubmission } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { Inbox, Loader2, Send, Save, User, Mail, Phone, MapPin, DollarSign, MessageSquare, StickyNote } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface SubmissionDetailsProps {
  submission: Submission | null;
  onReplySubmit: (replyText: string) => Promise<void>;
  onSubmissionUpdate: () => Promise<void>;
}

const DetailItem = ({ icon: Icon, label, value, className = '' }: { icon: React.ElementType, label: string, value: React.ReactNode, className?: string }) => (
    <div className="flex items-start gap-4">
        <Icon className="h-5 w-5 text-muted-foreground mt-1" />
        <div className={`flex-1 ${className}`}>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <div className="text-base text-foreground">{value}</div>
        </div>
    </div>
);

const FormDetails = ({ form, onUpdate }: { form: ContactSubmission, onUpdate: () => void }) => {
    const [status, setStatus] = useState(form.status || 'New');
    const [notes, setNotes] = useState(form.notes || '');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setStatus(form.status || 'New');
        setNotes(form.notes || '');
    }, [form]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, status, notes, source: 'Contact Form' }),
            });

            if (!response.ok) throw new Error('Failed to save details');
            
            toast({ title: "Success", description: "Submission details have been updated." });
            await onUpdate(); // Refetch data in parent
        } catch (error) {
            console.error("Failed to save:", error);
            toast({ title: "Error", description: "Could not save details.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

     return (
         <div className="flex flex-col h-full bg-background">
             <div className="p-4 border-b flex-shrink-0 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg">{form.fullName}</h3>
                    <p className="text-sm text-muted-foreground">Submitted on {format(new Date(form.createdAt), "PPP")}</p>
                </div>
                 <Button onClick={handleSave} disabled={isSaving} size="sm">
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save
                </Button>
            </div>
            <ScrollArea className="flex-grow">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <DetailItem icon={User} label="Full Name" value={form.fullName} />
                        <DetailItem icon={Mail} label="Email" value={<a href={`mailto:${form.email}`} className="text-primary hover:underline">{form.email}</a>} />
                        <DetailItem icon={Phone} label="Contact No." value={form.contact} />
                        <DetailItem icon={Phone} label="WhatsApp" value={form.whatsapp} />
                        <DetailItem icon={MapPin} label="Location" value={form.location} />
                        {form.budget && (
                            <DetailItem icon={DollarSign} label="Project Budget" value={`$${new Intl.NumberFormat('en-US').format(form.budget)}`} />
                        )}
                    </div>
                    <Separator />
                    <DetailItem icon={MessageSquare} label="Message" value={<p className="whitespace-pre-wrap">{form.message}</p>} />
                    <Separator />
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Lead Status</p>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Set status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Contacted">Contacted</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2"><StickyNote className="w-4 h-4"/> Internal Notes</p>
                            <Textarea 
                                placeholder="Add notes about this lead..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={5}
                            />
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

const ChatDetails = ({ session, onReplySubmit }: { session: ChatSession, onReplySubmit: (text: string) => Promise<void> }) => {
    const [reply, setReply] = useState("");
    const [isSending, setIsSending] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (viewportRef.current) {
            viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
    }, [session.messages]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || isSending) return;

        setIsSending(true);
        try {
            await onReplySubmit(reply);
            setReply('');
        } catch (error) {
            // Error is handled in the parent component
        } finally {
            setIsSending(false);
        }
    };

    return (
         <div className="flex flex-col h-full bg-background">
            <div className="p-4 border-b flex-shrink-0">
                 <h3 className="font-bold text-lg">{session.name}</h3>
                 <p className="text-sm text-muted-foreground">{session.number}</p>
            </div>
            <div className="flex-grow h-0 bg-secondary/20">
              <ScrollArea className="h-full p-4" viewportRef={viewportRef}>
                  <div className="space-y-4">
                      {session.messages.filter(msg => msg.sender !== 'options' && msg.text).map(msg => (
                          <ChatMessage key={msg.id} message={msg} onOptionSelect={() => {}} perspective="admin" />
                      ))}
                  </div>
              </ScrollArea>
            </div>
            <div className="p-4 border-t bg-background flex-shrink-0">
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                    <Input
                        placeholder="Type your reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        disabled={isSending}
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" aria-label="Send reply" disabled={isSending || !reply.trim()}>
                        {isSending ? <Loader2 size={20} className="animate-spin"/> : <Send size={20} />}
                    </Button>
                </form>
            </div>
        </div>
    );
};


export function SubmissionDetails({ submission, onReplySubmit, onSubmissionUpdate }: SubmissionDetailsProps) {
  if (!submission) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-secondary/30">
        <Inbox className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold">Select an item to view</h3>
        <p className="text-muted-foreground">Please choose a submission from the list.</p>
      </div>
    );
  }

  if (submission.source === 'Chatbot Lead') {
    return <ChatDetails session={submission} onReplySubmit={onReplySubmit} />;
  }

  if (submission.source === 'Contact Form') {
    return <FormDetails form={submission} onUpdate={onSubmissionUpdate} />;
  }

  return null;
}
