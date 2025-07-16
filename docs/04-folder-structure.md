# 4. Folder Structure

This document outlines the main directories and files in the project, explaining the purpose of each.

```
.
├── /docs/                # Project documentation files.
├── /node_modules/        # Project dependencies.
├── /patches/             # Patches for node modules (e.g., react-quill fix).
├── /public/              # Static assets (images, fonts, etc.).
├── /src/
│   ├── /ai/              # AI-related code using Genkit.
│   │   ├── /flows/       # Genkit flow definitions (e.g., chatbot logic).
│   │   └── genkit.ts     # Genkit singleton initialization.
│   ├── /app/             # Next.js App Router directory.
│   │   ├── /(main)/      # Route group for main site pages.
│   │   │   ├── /about/
│   │   │   ├── /blogs/
│   │   │   ├── /contact/
│   │   │   └── ... (other pages)
│   │   ├── /api/         # API routes.
│   │   ├── /gxdgx/       # Secure admin panel routes.
│   │   ├── globals.css   # Global styles and theme variables.
│   │   └── layout.tsx    # Root layout for the application.
│   ├── /components/      # Reusable React components.
│   │   ├── /admin/       # Components specific to the admin panel.
│   │   ├── /blog/        # Components for the blog feature.
│   │   ├── /chatbot/     # Components for the AI chatbot UI.
│   │   ├── /icons/       # Custom SVG icon components.
│   │   ├── /layout/      # Layout components (Header, Footer).
│   │   ├── /sections/    # Large, page-level section components.
│   │   └── /ui/          # Core UI components from ShadCN.
│   ├── /data/            # Static JSON data files (used for initial data).
│   ├── /hooks/           # Custom React hooks.
│   ├── /lib/             # Utility functions and libraries.
│   │   ├── mongodb.ts    # MongoDB connection logic.
│   │   ├── types.ts      # TypeScript type definitions.
│   │   └── utils.ts      # General utility functions (e.g., `cn` for classnames).
│   └── middleware.ts     # Next.js middleware (for admin auth).
├── .env                  # Environment variables (git-ignored).
├── next.config.ts        # Next.js configuration.
├── package.json          # Project dependencies and scripts.
├── tailwind.config.ts    # Tailwind CSS configuration.
└── tsconfig.json         # TypeScript configuration.
```

## Key Directories Explained

- **`src/app`**: This is the heart of the application, following the Next.js App Router conventions.
  - **Route Groups**: The `(main)` group is used to organize the primary pages of the site without affecting the URL structure.
  - **`/api`**: Contains all backend API endpoints. These are serverless functions that handle requests for data, form submissions, etc.
  - **`/gxdgx`**: A protected route for all admin-facing functionality. Access is controlled by `src/middleware.ts`.
- **`src/components`**: This directory is organized by feature or purpose.
  - **`/ui`**: Contains the base components provided by ShadCN (Button, Card, etc.). These should generally not be modified directly.
  - **`/sections`**: Contains larger components that make up entire sections of a page (e.g., `HeroSection`, `ServicesGrid`). These often compose smaller components from `/ui`.
- **`src/ai`**: All code related to Generative AI using Genkit is centralized here. This separates the AI logic from the UI and API layers.
- **`src/lib`**: A folder for shared libraries, utility functions, and type definitions. It helps keep the rest of the codebase clean and organized.
