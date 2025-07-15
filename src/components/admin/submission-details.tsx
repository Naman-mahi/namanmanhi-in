
'use client';

import type { Submission, ChatSession, ContactSubmission } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChatMessage } from '@/components/chatbot/chat-message';
import { Inbox, Loader2, Send } from 'lucide-react';

interface SubmissionDetailsProps {
  submission: Submission | null;
  onReplySubmit: (replyText: string) => Promise<void>;
}

const DetailItem = ({ label, value, className = '' }: { label: string, value: React.ReactNode, className?: string }) => (
    <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className={`text-base ${className}`}>{value}</div>
    </div>
);

const FormDetails = ({ form }: { form: ContactSubmission }) => (
     <div className="flex flex-col h-full">
         <div className="p-4 border-b flex-shrink-0">
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

const ChatDetails = ({ session, onReplySubmit }: { session: ChatSession, onReplySubmit: (text: string) => Promise<void> }) => {
    const [reply, setReply] = useState("");
    const [isSending, setIsSending] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
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
              <ScrollArea className="h-full p-4" viewportRef={scrollAreaRef}>
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


export function SubmissionDetails({ submission, onReplySubmit }: SubmissionDetailsProps) {
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
    return <FormDetails form={submission} />;
  }

  return null;
}
