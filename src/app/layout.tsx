import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme-provider';
import { CursorFollower } from '@/components/ui/cursor-follower';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ThemeCustomizer } from '@/components/theme-customizer';


export const metadata: Metadata = {
  title: 'NamanMahi.in - Innovative Digital Solutions',
  description: 'NamanMahi.in specializes in Blockchain, AI/ML, Metaverse, and Web/Mobile development to build the future of digital experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <Toaster position="top-right" />
          <CursorFollower />
          {children}
          <BackToTopButton />
          <Chatbot />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
