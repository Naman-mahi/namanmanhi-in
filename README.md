
# NamanMahi.in - Full-Stack Corporate & Services Portal

This is a modern, full-stack web application designed to serve as the corporate and service portal for NamanMahi.in, a technology solutions provider. The website showcases the company's services, expertise, and thought leadership through a blog. It includes features for lead generation, customer interaction via a powerful AI chatbot, and a comprehensive admin panel for content and lead management.

For detailed project documentation, please see the `/docs` directory.

---

## Key Features

- **Corporate Website**: A professional, multi-page website including Home, About Us, Hire Developers, and Contact pages.
- **Service Showcase**: Detailed sections highlighting the company's expertise in AI/ML, Blockchain, Web/Mobile Development, and more.
- **Blog Platform**: A fully functional blog with a public-facing listing and article pages, and a backend for creating, editing, and deleting posts.
- **Lead Generation**: Multiple channels for capturing customer leads, including a detailed contact form and a quote request form.
- **AI Chatbot**: An intelligent, Genkit-powered chatbot to answer user queries, capture lead information (name, number), and store conversation history.
- **Admin Panel**: A secure, password-protected backend (`/gxdgx`) for:
    - Managing blog content with a rich text editor.
    - Reviewing and managing leads from both contact forms and the chatbot.
    - Replying to chat leads directly from the admin interface.
- **Customizable Theming**: A dynamic theme customizer allowing for real-time changes to the site's color scheme and mode (light/dark).
- **SEO Optimized**: Built with Search Engine Optimization best practices, including page-specific metadata, Open Graph tags, and Twitter Cards.

---

## Technology Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Artificial Intelligence**: [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Deployment**: Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) and includes a guide for VPS deployment.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js**: Version 20.x or later.
- **npm** or **yarn**.
- **MongoDB**: A running instance of MongoDB (local or cloud-based like MongoDB Atlas).

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Naman-mahi/namanmanhi-in.git
    cd namanmanhi-in
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

### Environment Configuration

1.  **Create an Environment File**:
    Create a `.env` file in the root of the project. You can copy the structure from the example below.

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
    NEXT_PUBLIC_SITE_URL="http://localhost:9002"
    ```

### Running the Application

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

2.  **Access the Site**:
    - The public website will be available at [http://localhost:9002](http://localhost:9002).
    - The admin panel is at [http://localhost:9002/gxdgx](http://localhost:9002/gxdgx). You will be prompted for the username and password you set in your `.env` file.
