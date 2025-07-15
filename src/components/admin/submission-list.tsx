
'use client';

import type { Submission } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface SubmissionListProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  submissions: Submission[];
  selectedSubmission: Submission | null;
  onSubmissionSelect: (submission: Submission) => void;
}

const SubmissionListItem = ({ submission, isSelected, onSelect }: { submission: Submission; isSelected: boolean; onSelect: (sub: Submission) => void }) => {
  const title = submission.source === 'Chatbot Lead' ? submission.name : submission.fullName;
  const lastMessage = submission.source === 'Chatbot Lead' ? submission.messages.filter(m => m.text).slice(-1)[0]?.text : submission.message;
  const Icon = submission.source === 'Chatbot Lead' ? MessageSquare : FileText;

  return (
    <div
      onClick={() => onSelect(submission)}
      className={`p-3 rounded-lg cursor-pointer transition-colors border border-transparent ${isSelected ? 'bg-primary/10 border-primary/20' : 'hover:bg-secondary'}`}
    >
      <div className="flex justify-between items-start">
        <p className="font-semibold flex items-center gap-2 text-sm truncate">
          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="truncate">{title}</span>
        </p>
        <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
          {format(parseISO(submission.createdAt), "MMM d")}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 pl-6 truncate">
        {lastMessage}
      </p>
    </div>
  );
};

export function SubmissionList({
  searchTerm,
  onSearchTermChange,
  activeTab,
  onTabChange,
  submissions,
  selectedSubmission,
  onSubmissionSelect,
}: SubmissionListProps) {
  const chatLeadsCount = submissions.filter(s => s.source === 'Chatbot Lead').length;
  const formSubmissionsCount = submissions.filter(s => s.source === 'Contact Form').length;
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Input
          placeholder="Filter submissions..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-grow flex flex-col">
        <TabsList className="m-2 grid grid-cols-2">
          <TabsTrigger value="chat" className="gap-2">
            <MessageSquare className="w-4 h-4" /> Chats ({chatLeadsCount})
          </TabsTrigger>
          <TabsTrigger value="forms" className="gap-2">
            <FileText className="w-4 h-4" /> Forms ({formSubmissionsCount})
          </TabsTrigger>
        </TabsList>
        <div className="flex-grow h-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
              {submissions.length === 0 ? (
                <p className="text-muted-foreground text-center p-4">No submissions found.</p>
              ) : (
                submissions.map(sub => (
                  <SubmissionListItem
                    key={sub.id}
                    submission={sub}
                    isSelected={selectedSubmission?.id === sub.id}
                    onSelect={onSubmissionSelect}
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
}
