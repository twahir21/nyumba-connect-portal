import type { Metadata } from "next";
import { Sour_Gummy } from "next/font/google";
import "./globals.css";
import { jsonLd } from "@/tools/jsond";

// 2. Configure a non-variable font (you must specify weights)
const sour = Sour_Gummy({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyumba-connect.co.tz"), 
  title: "Nyumba Connect | Find Your Perfect Student Home in Tanzania",
  description: "Nyumba Connect bridges the gap between students, property owners, and Dalalis in Tanzania. Discover, connect, and secure verified student accommodation effortlessly.",
  keywords: [
    "Nyumba Connect",
    "student housing Tanzania",
    "hostels in Dar es Salaam",
    "find student accommodation",
    "dalali app Tanzania",
    "university accommodation",
    "UDSM student housing",
    "IFM hostels",
    "rent room Dar es Salaam",
    "verified listings dalali"
  ],
  authors: [{ name: "Nyumba Connect Team" }],
  creator: "Nyumba Connect",
  publisher: "Nyumba Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nyumba Connect | Find Your Perfect Student Home with Ease",
    description: "Discover, connect, and secure your ideal student accommodation effortlessly. Connecting students, real estate agents (Dalalis), and property owners in Tanzania.",
    url: "https://nyumba-connect.co.tz",
    siteName: "Nyumba Connect",
    images: [
      {
        url: "/og-image.jpg", // Place an attractive preview image (1200x630) in your /public folder
        width: 1200,
        height: 630,
        alt: "Nyumba Connect Platform Preview - Student Housing Map & Chats",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyumba Connect | Student Housing Made Effortless",
    description: "Bridges the gap between students, Dalalis, and property owners in Tanzania. Find verified accommodation today.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sour.className} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
