# 3. Getting Started

This guide will walk you through setting up the project for local development.

## Prerequisites

- **Node.js**: Version 18.x or later.
- **npm**: Should be installed with Node.js.
- **MongoDB**: A running instance of MongoDB. This can be a local installation or a cloud-based service like MongoDB Atlas.

## Installation

1.  **Clone the Repository**:
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  **Install Dependencies**:
    Install all the required npm packages.
    ```bash
    npm install
    ```

## Environment Configuration

1.  **Create an Environment File**:
    Create a `.env` file in the root of the project by copying the example file if one exists, or creating it from scratch.

2.  **Add Environment Variables**:
    Open the `.env` file and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    # MongoDB Configuration
    MONGODB_URI="your_mongodb_connection_string"
    MONGODB_DB="your_database_name"

    # Admin Panel Credentials
    ADMIN_USERNAME="admin"
    ADMIN_PASSWORD="your_secure_password"

    # Google AI API Key (for Genkit)
    # Get your key from Google AI Studio: https://aistudio.google.com/app/apikey
    GOOGLE_API_KEY="your_google_api_key"

    # Site URL (for SEO meta tags)
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    ```
    - **`MONGODB_URI`**: Your full MongoDB connection string.
    - **`MONGODB_DB`**: The name of the database you want to use.
    - **`ADMIN_USERNAME` / `ADMIN_PASSWORD`**: Credentials for accessing the secure admin panel at `/gxdgx`.
    - **`GOOGLE_API_KEY`**: Required for the AI chatbot to function.
    - **`NEXT_PUBLIC_SITE_URL`**: The base URL of your application, used for generating absolute URLs in SEO tags.

## Running the Application

Once the dependencies are installed and the environment is configured, you can start the development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json` dev script).

- The public website is accessible at the root URL.
- The admin panel is accessible at [http://localhost:9002/gxdgx](http://localhost:9002/gxdgx). You will be prompted for the username and password you set in your `.env` file.
