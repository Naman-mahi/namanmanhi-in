
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
  chatLeads: Submission[];
  formSubmissions: Submission[];
  selectedSubmission: Submission | null;
  onSubmissionSelect: (submission: Submission) => void;
}

const SubmissionListItem = ({ submission, isSelected, onSelect }: { submission: Submission; isSelected: boolean; onSelect: (sub: Submission) => void }) => {
  const title = submission.source === 'Chatbot Lead' ? submission.name : submission.fullName;
  const contactInfo = submission.source === 'Chatbot Lead' ? submission.number : submission.email;
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
        <span className="text-xs text-muted-foreground flex-shrink-0">
          {format(parseISO(submission.createdAt), "MMM d")}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 pl-6 truncate">
        {contactInfo}
      </p>
    </div>
  );
};

export function SubmissionList({
  searchTerm,
  onSearchTermChange,
  activeTab,
  onTabChange,
  chatLeads,
  formSubmissions,
  selectedSubmission,
  onSubmissionSelect,
}: SubmissionListProps) {
  return (
    <>
      <div className="p-4 border-b">
        <Input
          placeholder="Filter by name, number, email..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
      </div>
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-grow flex flex-col">
        <TabsList className="m-2">
          <TabsTrigger value="chat" className="flex-1 gap-2">
            <MessageSquare className="w-4 h-4" /> Chats ({chatLeads.length})
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex-1 gap-2">
            <FileText className="w-4 h-4" /> Forms ({formSubmissions.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-grow h-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
              {chatLeads.length === 0 ? (
                <p className="text-muted-foreground text-center p-4">No chats found.</p>
              ) : (
                chatLeads.map(sub => (
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
        </TabsContent>
        <TabsContent value="forms" className="flex-grow h-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-1">
              {formSubmissions.length === 0 ? (
                <p className="text-muted-foreground text-center p-4">No forms found.</p>
              ) : (
                formSubmissions.map(sub => (
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
        </TabsContent>
      </Tabs>
    </>
  );
}
