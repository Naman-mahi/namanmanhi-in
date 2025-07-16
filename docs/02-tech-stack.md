# 2. Technology Stack

This project leverages a modern, robust, and scalable technology stack centered around TypeScript, Next.js, and the React ecosystem.

## Core Framework

- **Next.js**: A React framework for building full-stack web applications. We utilize the App Router for improved routing, Server Components for performance, and Server Actions for data mutations.
- **React**: The core library for building the user interface with a component-based architecture.
- **TypeScript**: Provides static typing for the entire codebase, improving code quality, maintainability, and developer experience.

## Frontend & UI

- **Tailwind CSS**: A utility-first CSS framework for rapid and consistent styling.
- **ShadCN UI**: A collection of beautifully designed, reusable UI components built on top of Radix UI and Tailwind CSS. This provides the foundation for elements like buttons, cards, forms, and dialogs.
- **Framer Motion**: Used for creating fluid animations and transitions throughout the application.
- **Lucide React**: Provides a comprehensive library of clean and consistent icons.

## Backend & Database

- **Next.js API Routes**: Used to create serverless API endpoints for handling tasks like saving contact form submissions and fetching blog data.
- **MongoDB**: A NoSQL database used as the primary data store for the application. It holds collections for blog posts, contact form leads, and chatbot sessions.
- **`mongodb` Driver**: The official Node.js driver for interacting with the MongoDB database.

## Artificial Intelligence

- **Genkit (v1.x)**: The exclusive toolkit used for all Generative AI functionality.
    - **`ai.defineFlow`**: To create structured AI workflows.
    - **`ai.definePrompt`**: To define prompts with typed inputs and outputs for interacting with LLMs.
    - **Models**: Utilizes Google's Gemini family of models via the `@genkit-ai/googleai` plugin for chatbot responses.

## Authentication

- **Basic Authentication**: A simple yet effective username/password authentication mechanism is implemented using a Next.js Middleware to protect the admin panel (`/gxdgx`). Credentials are required to be stored in environment variables.

## Deployment & Environment

- **Firebase App Hosting**: The target deployment platform, configured via `apphosting.yaml`.
- **Environment Variables**: The application uses a `.env` file to manage sensitive information and environment-specific configurations (e.g., database URI, admin credentials).
