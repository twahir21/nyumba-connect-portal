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
  title: "Nyumba Connect | Pata Nyumba au Hostel Bora ya Wanafunzi Tanzania",
  description: "Nyumba Connect inakutanisha wanafunzi, wamiliki wa nyumba, na madalali nchini Tanzania. Tafuta, wasiliana, na lipia malazi yaliyothibitishwa kwa wanafunzi kwa urahisi.",
  keywords: [
    "Nyumba Connect",
    "hostel za wanafunzi Tanzania",
    "hostel Dar es Salaam",
    "tafuta hostel za wanafunzi",
    "app ya dalali Tanzania",
    "malazi ya chuo",
    "hostel za UDSM",
    "hostel za IFM",
    "panga chumba Dar es Salaam",
    "nyumba zilizothibitishwa dalali",
    "vyumba vya kupanga wanafunzi",
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
  authors: [{ name: "Timu ya Nyumba Connect" }],
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
    title: "Nyumba Connect | Pata Hostel ya Wanafunzi kwa Urahisi",
    description: "Tafuta na uweke nafasi ya hostel au chumba chako cha chuo kwa urahisi. Tunawaunganisha wanafunzi, madalali, na wamiliki wa nyumba Tanzania.",
    url: "https://nyumba-connect.co.tz",
    siteName: "Nyumba Connect",
    images: [
      {
        url: "/og-image.png", // Weka picha ya kuvutia (1200x630) kwenye folder la /public
        width: 1200,
        height: 630,
        alt: "Mwonekano wa Nyumba Connect - Ramani ya Hostel na Chat",
      },
    ],
    locale: "sw_TZ", // Imebadilishwa kwenda Kiswahili cha Tanzania
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyumba Connect | Kupata Hostel Imekuwa Rahisi",
    description: "Inawaunganisha wanafunzi, madalali, na wamiliki wa nyumba Tanzania. Pata malazi yaliyothibitishwa leo.",
    images: ["/og-image.png"],
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
      lang="sw" // Imebadilishwa kutoka 'en' kwenda 'sw'
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