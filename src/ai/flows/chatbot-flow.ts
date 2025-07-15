
'use server';
/**
 * @fileoverview A simple chatbot AI flow.
 *
 * - getChatbotResponse - A function that handles chatbot responses.
 * - ChatbotInput - The input type for the getChatbotResponse function.
 * - ChatbotOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  query: z.string().describe("The user's question or message."),
  history: z.array(z.string()).describe("The recent conversation history."),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  answer: z.string().describe("The chatbot's response to the user's query."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a friendly and helpful chatbot for a company called NamanMahi.in.
Your goal is to answer user questions about the company.

Keep your answers concise and helpful.

Here is some context about the company you can use to answer questions.
- Services: We offer a wide range of services including AI & ML, Blockchain, Web Development, Mobile Apps, Game Development, E-commerce, IoT, and Salesforce solutions. You can see a full list on our [Services section](/).
- Hiring Developers: You can hire developers on an hourly, monthly, or quarterly basis. For more details, users should visit the [Hire Developers page](/hire-developers).
- Pricing: Our pricing is flexible. For detailed information, check the 'Pricing' section on our [Hire Developers page](/hire-developers).
- Location: Our main office is at 123 Tech Avenue, Silicon Valley, CA. We serve clients globally.
- Technologies: We specialize in React, Next.js, Node.js, Python for AI/ML, Swift/Kotlin for mobile, and Solidity for Blockchain. A full list is on the [Hire Developers page](/hire-developers).
- Experience: We have over 20 years of experience and a team of over 700 developers.

When you mention a specific page, use markdown format for links, like [Hire Developers page](/hire-developers).

If you don't know the answer to a question, politely say so. For example: "I'm sorry, I'm not sure how to answer that. Is there anything else I can help with?".

Here is the conversation history:
{{#each history}}
{{this}}
{{/each}}

Here is the user's latest query:
{{query}}
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
