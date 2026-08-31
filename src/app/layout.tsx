import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'LamViec360 — Vietnam\'s Modern Career Platform',
  description: 'Find your next career move with full salary transparency, AI-powered matching, and 48,000+ verified jobs from Vietnam\'s top employers.',
  icons: {
    icon: [
      { url: 'https://lamviec360.vercel.app/favicon.ico', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    title: 'LamViec360 — Career Platform',
    description: 'Vietnam\'s modern career operating system with real salaries and AI matching.',
    images: [{ url: '/assets/images/lamviec-logo-none-1788163277157.png', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${fraunces.variable}`}>
      <body className={plusJakarta.className}>
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Flamviec3605089back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}