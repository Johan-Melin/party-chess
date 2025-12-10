import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Party Chess",
  description: "Play chess with friends in real-time. No sign-up required.",
  openGraph: {
    title: "Party Chess - Play Online with Friends",
    description: "Play chess with friends in real-time. No sign-up required.",
    url: "https://party-chess.vercel.app/",
    siteName: "Party Chess",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: 'Party Chess - Play Online with Friends',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Party Chess - Play Online with Friends',
    description: 'Play chess with friends in real-time. No sign-up required.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://party-chess.vercel.app/'), 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
