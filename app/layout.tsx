import { Analytics } from "@vercel/analytics/next";
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
  title: {
    default: "Scenes — Polished UI scenes for SaaS",
    template: "%s — Scenes",
  },
  description:
    "Full-page, production-ready UI compositions for React. Browse, preview, and install with the shadcn CLI.",
  metadataBase: new URL("https://scenes.so"),
  openGraph: {
    title: "Scenes — Polished UI scenes for SaaS",
    description:
      "Full-page, production-ready UI compositions for React. Browse, preview, and install with the shadcn CLI.",
    url: "https://scenes.so",
    siteName: "Scenes",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Scenes — Polished UI scenes for SaaS" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scenes — Polished UI scenes for SaaS",
    description:
      "Full-page, production-ready UI compositions for React. Browse, preview, and install with the shadcn CLI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
