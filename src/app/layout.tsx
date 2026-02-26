import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.askphi.ai"),
  title: {
    default: "AskPhi - Customer Intelligence Platform",
    template: "%s | AskPhi",
  },
  description:
    "AskPhi decodes why buyers switch. Customer Intelligence Sprints powered by JTBD methodology and AI — map switching moments, decision forces, and commitment patterns.",
  openGraph: {
    type: "website",
    siteName: "AskPhi",
    locale: "en_US",
    url: "https://www.askphi.ai",
    title: "AskPhi - Customer Intelligence Platform",
    description:
      "AskPhi decodes why buyers switch. Customer Intelligence Sprints powered by JTBD methodology and AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AskPhi - Customer Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hellouri_ai",
    creator: "@hellouri_ai",
    title: "AskPhi - Customer Intelligence Platform",
    description:
      "AskPhi decodes why buyers switch. Customer Intelligence Sprints powered by JTBD methodology and AI.",
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
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
