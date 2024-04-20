import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import '@/styles/globals.css';

import App from '@/components/layout/app';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import { siteConfig } from '@/constant/config';
import ScrollTop from '@/components/util/scrollTop';
import BubbleChatButton from '@/components/chat/bubbleChatButton';

const inter = Inter({ subsets: ['latin'] });
// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/ldp-2.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/ldp-2.jpg`],
    // creator: '@th_clarence',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Suspense>{/* <Analytics /> */}</Suspense>
        <App>
          <Header />
          <main className='min-h-screen w-full mb-8'>{children}</main>
          <div className='flex-grow'></div>
          <BubbleChatButton />
          <ScrollTop top={200} />
          <Footer />
        </App>
      </body>
    </html>
  );
}
