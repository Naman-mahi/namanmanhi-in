# 9. Genkit AI Flows

This project uses **Genkit** for all its Generative AI capabilities. The core AI logic is encapsulated in "flows," which are structured, server-side functions that interact with AI models.

## Setup

- **Initialization**: The Genkit `ai` singleton is initialized in `src/ai/genkit.ts`. This file configures the necessary plugins, such as `@genkit-ai/googleai` for accessing Google's models.
- **`'use server'`**: All files containing Genkit flows must include the `'use server';` directive at the top, as they are intended to be called from client components but execute on the server.

## Chatbot Flow

The primary AI feature is the chatbot. Its logic is defined in `src/ai/flows/chatbot-flow.ts`.

### File Structure and Exports

- `ChatbotInputSchema` & `ChatbotInput`: Zod schema and TypeScript type for the flow's input.
- `ChatbotOutputSchema` & `ChatbotOutput`: Zod schema and TypeScript type for the flow's output.
- `getChatbotResponse(input: ChatbotInput): Promise<ChatbotOutput>`: The main exported function that client components call to interact with the chatbot.

### Core Components

1.  **`ai.definePrompt`**:
    A prompt template named `chatbotPrompt` is defined.
    - **Input/Output**: It uses the Zod schemas to enforce structured inputs and outputs. The model is instructed to generate a response that fits the `ChatbotOutputSchema`.
    - **Prompt Text**: The prompt is written in Handlebars templating language (`{{...}}`). It includes instructions for the AI, context about the company, the conversation history (`{{#each history}}`), and the user's latest query (`{{query}}`). This provides the model with all the necessary information to generate a relevant response.

2.  **`ai.defineFlow`**:
    A flow named `chatbotFlow` is defined.
    - **Schema**: It's strongly typed using the input and output Zod schemas.
    - **Logic**: The flow is straightforward: it receives the input, passes it to the `chatbotPrompt`, and returns the model's output.

3.  **Exported Wrapper Function**:
    The `getChatbotResponse` function serves as a clean, async wrapper around the `chatbotFlow`. This is the function that the chatbot UI component (`src/chatbot/chatbot.tsx`) imports and calls.

### How it Connects to the UI

1.  The chatbot component in `src/chatbot/chatbot.tsx` collects the user's message.
2.  It calls `getChatbotResponse`, passing an object containing the user's `query` and the recent `history` of messages.
3.  Because `chatbot-flow.ts` has the `'use server'` directive, Next.js handles this as a Server Action/RPC call. The function executes on the server.
4.  On the server, the `chatbotFlow` runs, calls the Gemini model via Genkit, and gets a response.
5.  The response (the chatbot's answer) is returned as a promise to the client component.
6.  The UI then updates to display the chatbot's answer.
