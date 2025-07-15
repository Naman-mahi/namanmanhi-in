"use client";
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSummaryAction } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2, Download } from 'lucide-react';

const formSchema = z.object({
  projectName: z.string().min(2, { message: 'Project name is required.' }),
  techStack: z.string().min(2, { message: 'Tech stack is required.' }),
  industry: z.string().min(2, { message: 'Industry is required.' }),
  results: z.string().min(10, { message: 'Please describe the results in at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function ProjectSummaryGenerator() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      techStack: '',
      industry: '',
      results: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    setSummary(null);
    startTransition(async () => {
      const result = await generateSummaryAction(values);
      if (result.success && result.data?.summary) {
        setSummary(result.data.summary);
      } else {
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };
  
  const handleDownload = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.getValues('projectName').replace(/\s+/g, '_')}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <section id="hire" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Wand2 className="h-8 w-8 text-primary"/>
                    <CardTitle className="text-2xl">AI Success Story Generator</CardTitle>
                </div>
                <CardDescription>
                  Enter your project details and let our AI craft a compelling summary for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Decentralized Finance App" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="techStack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tech Stack</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., React, Node.js, Solidity" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Fintech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="results"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Results</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the project's impact and achievements..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isPending} className="w-full">
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                      Generate Summary
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:sticky lg:top-24">
            <Card className="min-h-[400px]">
              <CardHeader>
                <CardTitle>Generated Summary</CardTitle>
                <CardDescription>Your project's success story will appear here.</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {summary && <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{summary}</div>}
              </CardContent>
              {summary && !isPending && (
                <CardFooter>
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Summary
                    </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
