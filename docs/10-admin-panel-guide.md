# 10. Admin Panel Guide

The application includes a secure admin panel located at the `/gxdgx` route. This panel is the central hub for managing the website's content and reviewing customer leads.

## Accessing the Admin Panel

- **URL**: Navigate to `http://<your-site-url>/gxdgx`.
- **Authentication**: You will be prompted by your browser to enter a username and password. These credentials must match the `ADMIN_USERNAME` and `ADMIN_PASSWORD` values set in your `.env` file. Access is controlled by `src/middleware.ts`.

## Features

The admin panel is a single-page application with a tab-based interface for different management tasks.

### 1. Dashboard (Default View)

The default view provides an overview of leads from contact forms, categorized by status.

- **Stat Cards**: At the top, you'll find cards showing the count of leads with "New," "Contacted," "In Progress," and "Closed" statuses.
- **Lead Lists**: The main area is split into two columns:
    - **Left Column (Submission List)**: A searchable and filterable list of all incoming leads.
    - **Right Column (Submission Details)**: A detailed view of the selected lead.

### 2. Managing Leads

You can switch between two types of leads using the tabs at the top of the list: **Chats** and **Forms**.

#### Chat Leads

- **View Conversations**: Select a chat lead to see the full conversation history between the user and the chatbot.
- **Reply to Users**: At the bottom of the conversation view, there is a reply box. You can type a message and send it directly to the user. The user will see your reply in their chatbot window the next time they open it or when it polls for new messages.

#### Form Submissions

- **View Details**: Select a form submission to see all the information the user provided, including their name, contact details, budget, and message.
- **Update Status**: You can change the status of a lead (e.g., from "New" to "Contacted") using the dropdown menu.
- **Add Notes**: There is a textarea for adding internal notes about the lead. This is useful for tracking progress and communication.
- **Saving Changes**: After updating the status or adding notes, click the "Save" button to persist the changes.

### 3. Blog Management

- **Access**: Click the "Blogs" tab in the admin panel.
- **View Posts**: You will see a list of all existing blog posts.
- **Create a New Post**:
    1.  Click the "Add New Post" button.
    2.  This will open the blog editor form.
- **Edit an Existing Post**:
    1.  Click the "Edit" (pencil) icon next to the post you want to modify.
    2.  The post's content will load into the editor form.
- **The Blog Editor**:
    - **Fields**: Fill in the title, author, image URL, tags (comma-separated), and a short excerpt. The slug will be auto-generated from the title, but you can edit it.
    - **Content**: The main content area uses a **rich text editor**, allowing you to format text, add headings, lists, links, and more. It saves the content as HTML.
- **Delete a Post**:
    - Click the "Delete" (trash) icon. You will be asked to confirm the deletion. This action is permanent.
