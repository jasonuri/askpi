import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.askphi.ai"),
  title: {
    default: "AskPhi - Audience Intelligence Platform",
    template: "%s | AskPhi",
  },
  description:
    "AskPhi maps the behavioural forces behind audience decisions. Audience Intelligence Sprints powered by behavioural science and AI — decision triggers, motivations, and barriers in 72 hours.",
  openGraph: {
    type: "website",
    siteName: "AskPhi",
    locale: "en_US",
    url: "https://www.askphi.ai",
    title: "AskPhi - Audience Intelligence Platform",
    description:
      "AskPhi maps the behavioural forces behind audience decisions. Audience Intelligence Sprints powered by behavioural science and AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AskPhi - Audience Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hellouri_ai",
    creator: "@hellouri_ai",
    title: "AskPhi - Audience Intelligence Platform",
    description:
      "AskPhi maps the behavioural forces behind audience decisions. Audience Intelligence Sprints powered by behavioural science and AI.",
    images: ["/og-image.png"],
  },
  robots: "index, follow",
  authors: [{ name: "AskPhi" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
