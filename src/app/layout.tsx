import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme-provider';
import { CursorFollower } from '@/components/ui/cursor-follower';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { Chatbot } from '@/components/chatbot/chatbot';
import { ThemeCustomizer } from '@/components/theme-customizer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.namanmahi.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NamanMahi.in - Innovative Digital Solutions',
    template: '%s | NamanMahi.in',
  },
  description: 'NamanMahi.in specializes in Blockchain, AI/ML, Metaverse, and Web/Mobile development to build the future of digital experiences. Hire dedicated developers for your next project.',
  keywords: [
    'hire developers', 'web development', 'mobile app development', 'blockchain', 'ai/ml', 'metaverse', 'iot', 'salesforce', 'ecommerce solutions', 'game development', 'dedicated development team', 'it consulting'
  ],
  authors: [{ name: 'NamanMahi.in', url: SITE_URL }],
  creator: 'NamanMahi.in',
  publisher: 'NamanMahi.in',
  
  openGraph: {
    title: 'NamanMahi.in - Innovative Digital Solutions',
    description: 'NamanMahi.in specializes in Blockchain, AI/ML, Metaverse, and Web/Mobile development. Hire dedicated developers to build the future.',
    url: SITE_URL,
    siteName: 'NamanMahi.in',
    images: [
      {
        url: '/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'NamanMahi.in Logo and Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'NamanMahi.in - Innovative Digital Solutions',
    description: 'Specializing in Blockchain, AI/ML, Metaverse, and Web/Mobile development. Hire dedicated developers for your next project.',
    // creator: '@your_twitter_handle', // Add your twitter handle
    images: ['/twitter-og-image.png'], // Must be an absolute URL
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: '/',
  },

  // Add verification tags if you have them
  // verification: {
  //   google: 'your-google-verification-code',
  //   bing: 'your-bing-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}


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
