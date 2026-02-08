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
    default: "Panes — Clean, modern UI components",
    template: "%s — Panes",
  },
  description:
    "Open-source copy-paste UI components for React. Browse, preview, and install with the shadcn CLI.",
  metadataBase: new URL("https://panes.so"),
  openGraph: {
    title: "Panes — Clean, modern UI components",
    description:
      "Open-source copy-paste UI components for React. Browse, preview, and install with the shadcn CLI.",
    url: "https://panes.so",
    siteName: "Panes",
    locale: "en_US",
    type: "website",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Panes — Clean, modern UI components" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panes — Clean, modern UI components",
    description:
      "Open-source copy-paste UI components for React. Browse, preview, and install with the shadcn CLI.",
    images: ["/og.png"],
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
