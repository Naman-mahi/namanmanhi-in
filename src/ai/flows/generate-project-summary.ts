// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates a stylized summary card for past projects using AI.
 *
 * - generateProjectSummary - A function that handles the generation of project summaries.
 * - GenerateProjectSummaryInput - The input type for the generateProjectSummary function.
 * - GenerateProjectSummaryOutput - The return type for the generateProjectSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectSummaryInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  techStack: z.string().describe('The tech stack used in the project.'),
  industry: z.string().describe('The industry the project belongs to.'),
  results: z.string().describe('The results achieved by the project.'),
});
export type GenerateProjectSummaryInput = z.infer<typeof GenerateProjectSummaryInputSchema>;

const GenerateProjectSummaryOutputSchema = z.object({
  summary: z.string().describe('A stylized summary of the project.'),
});
export type GenerateProjectSummaryOutput = z.infer<typeof GenerateProjectSummaryOutputSchema>;

export async function generateProjectSummary(input: GenerateProjectSummaryInput): Promise<GenerateProjectSummaryOutput> {
  return generateProjectSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectSummaryPrompt',
  input: {schema: GenerateProjectSummaryInputSchema},
  output: {schema: GenerateProjectSummaryOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling success stories for a company's past projects.

  Based on the information provided, create a stylized summary of the project that highlights its key achievements and impact.

  Project Name: {{{projectName}}}
  Tech Stack: {{{techStack}}}
  Industry: {{{industry}}}
  Results: {{{results}}}

  Write a summary in a card format. Focus on making it concise, impactful, and suitable for showcasing on a website.`,
});

const generateProjectSummaryFlow = ai.defineFlow(
  {
    name: 'generateProjectSummaryFlow',
    inputSchema: GenerateProjectSummaryInputSchema,
    outputSchema: GenerateProjectSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
