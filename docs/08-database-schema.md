# 8. Database Schema

The application uses MongoDB as its database, managed through the official `mongodb` npm package. The connection logic is centralized in `src/lib/mongodb.ts`.

All data is stored in a single database, configured by the `MONGODB_DB` environment variable. The data is organized into the following collections:

---

### 1. `blogs`

Stores all content for blog posts.

- **Collection Name**: `blogs`
- **Managed By**: `/api/blogs/route.ts`
- **Schema**:
  ```typescript
  {
    _id: ObjectId,       // Unique identifier for the post
    slug: string,        // URL-friendly identifier (e.g., "my-first-post")
    title: string,       // The title of the blog post
    author: string,      // The name of the author
    date: string,        // ISO 8601 date string for when the post was created/published
    tags: string[],      // An array of tags for categorization
    image: string,       // URL for the post's featured image
    imageHint: string,   // (Optional) AI hint for the image
    excerpt: string,     // A short summary or introduction to the post
    content: string      // The full content of the post, stored as an HTML string
  }
  ```

---

### 2. `contactForms`

Stores all submissions from the main contact/quote forms.

- **Collection Name**: `contactForms`
- **Managed By**: `/api/contact/route.ts`
- **Schema**:
  ```typescript
  {
    _id: ObjectId,       // Unique identifier for the submission
    source: "Contact Form", // Static value to identify the origin
    fullName: string,
    email: string,
    contact: string,
    whatsapp: string,
    location: string,
    budget: number,        // (Optional) The project budget selected by the user
    message: string,
    status: "New" | "Contacted" | "In Progress" | "Closed", // Lead status, managed in the admin panel
    notes: string,         // (Optional) Internal notes added by an admin
    createdAt: string,     // ISO 8601 date string for when the form was submitted
    updatedAt: string      // (Optional) ISO 8601 date string for the last update
  }
  ```

---

### 3. `chatLeads`

Stores all conversations and lead information captured by the AI chatbot.

- **Collection Name**: `chatLeads`
- **Managed By**: `/api/contact/route.ts`
- **Schema**:
  ```typescript
  {
    _id: ObjectId,       // Unique identifier for the chat session
    source: "Chatbot Lead", // Static value to identify the origin
    sessionId: string,     // A unique ID generated for each chat session on the client
    name: string,          // User's name collected by the chatbot
    number: string,        // User's contact number collected by the chatbot
    messages: [            // An array of all messages in the conversation
      {
        id: string,        // Unique ID for the message
        text: string,      // The content of the message
        sender: "bot" | "user" | "options", // Who sent the message
        options?: string[] // (Optional) For option-based bot responses
      }
    ],
    createdAt: string,     // ISO 8601 date string for when the session started
    updatedAt: string      // (Optional) ISO 8601 date string for the last message
  }
  ```
