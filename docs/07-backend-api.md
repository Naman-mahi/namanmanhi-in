# 7. Backend API Documentation

The backend is built using Next.js API Routes. All API logic resides within the `src/app/api` directory.

## General Principles

- **Serverless**: Each API route is a serverless function.
- **Validation**: Zod is used for robust request body and schema validation.
- **Database Interaction**: The `getDb()` function from `src/lib/mongodb.ts` is used to get a MongoDB client instance for database operations.
- **Error Handling**: `try...catch` blocks are used to handle potential errors and return appropriate HTTP status codes and messages.

---

## API Endpoints

### 1. Contact API

Manages submissions from both the main contact form and the AI chatbot.

- **Route File**: `src/app/api/contact/route.ts`

#### `POST /api/contact`

Saves or updates a contact lead. The request body must include a `source` field to distinguish between `'Contact Form'` and `'Chatbot Lead'`.

- **Request Body (`source: 'Contact Form'`)**:
  ```json
  {
    "source": "Contact Form",
    "fullName": "string",
    "email": "string",
    "contact": "string",
    "whatsapp": "string",
    "location": "string",
    "budget": "number" (optional),
    "message": "string"
  }
  ```
  This creates a new document in the `contactForms` collection.

- **Request Body (`source: 'Chatbot Lead'`)**:
  ```json
  {
    "source": "Chatbot Lead",
    "sessionId": "string",
    "name": "string",
    "number": "string",
    "messages": "Message[]"
  }
  ```
  This upserts a document in the `chatLeads` collection, matching by `sessionId`.

- **Responses**:
  - `201 Created`: On success.
  - `400 Bad Request`: On validation error.
  - `500 Internal Server Error`: On database or other server errors.

#### `GET /api/contact?source=<source>`

Fetches all leads from a specific source.

- **Query Parameters**:
  - `source`: Required. Can be `'chat'` or `'forms'`.
- **Responses**:
  - `200 OK`: Returns `{ "data": [...] }` with an array of leads.
  - `400 Bad Request`: If the `source` parameter is missing or invalid.
  - `500 Internal Server Error`: On database error.

---

### 2. Blogs API

Manages CRUD operations for blog posts.

- **Route File**: `src/app/api/blogs/route.ts`

#### `GET /api/blogs`

Fetches all blog posts, sorted by date in descending order.

- **Responses**:
  - `200 OK`: Returns `{ "data": [...] }` with an array of blog posts.
  - `500 Internal Server Error`: On database error.

#### `POST /api/blogs`

Creates a new blog post or updates an existing one.

- **Logic**:
  - If the request body includes a valid `_id`, the corresponding document in the `blogs` collection is updated.
  - If `_id` is not present, a new document is created.
- **Request Body**:
  ```json
  {
    "_id": "string" (optional, for updates),
    "slug": "string",
    "title": "string",
    "author": "string",
    "image": "string (url)",
    "tags": "string[] or string (comma-separated)",
    "excerpt": "string",
    "content": "string (html)"
  }
  ```
- **Responses**:
  - `201 Created`: On success.
  - `400 Bad Request`: On validation error.
  - `500 Internal Server Error`: On database error.

#### `DELETE /api/blogs?id=<id>`

Deletes a blog post by its `_id`.

- **Query Parameters**:
  - `id`: Required. The `_id` of the blog post to delete.
- **Responses**:
  - `200 OK`: On successful deletion.
  - `400 Bad Request`: If `id` is invalid.
  - `404 Not Found`: If no post with the given `id` exists.
  - `500 Internal Server Error`: On database error.
