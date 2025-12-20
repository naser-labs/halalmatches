import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'HalalMatches - Dignified Muslim Matrimony',
  description: 'A global Muslim matrimonial platform for adults seeking marriage through structured introductions with strong Islamic boundaries. Privacy-first, no dating.',
  keywords: 'muslim matrimony, halal marriage, islamic matchmaking, muslim marriage, wali, nikah',
  authors: [{ name: 'HalalMatches' }],
  openGraph: {
    title: 'HalalMatches - Dignified Muslim Matrimony',
    description: 'Find your spouse the halal way. Structured introductions, wali workflows, privacy-first.',
    url: 'https://halalmatches.com',
    siteName: 'HalalMatches',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HalalMatches - Dignified Muslim Matrimony',
    description: 'Find your spouse the halal way. Structured introductions, wali workflows, privacy-first.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
