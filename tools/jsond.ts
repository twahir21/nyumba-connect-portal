import { PHONE, URL_LINK } from "./url.const"

export const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${URL_LINK}/#organization`,
        "name": "Nyumba Connect",
        "url": `${URL_LINK}`,
        "logo": `${URL_LINK}/logo.png`,
        "sameAs": [
          "https://twitter.com/nyumbaconnect", // Adjust with real social links
          "https://linkedin.com/company/nyumbaconnect"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": `${PHONE}`,
          "contactType": "customer service",
          "email": "huduma@nyumba-connect.co.tz",
          "areaServed": "TZ",
          "availableLanguage": ["Swahili", "English"]
        }
      },
      {
        "@type": "WebApplication",
        "@id": `${URL_LINK}/#webapp`,
        "name": "Nyumba Connect Platform",
        "url": `${URL_LINK}`,
        "applicationCategory": "RealEstateApplication",
        "operatingSystem": "Android, iOS, Web",
        "description": "Modern digital real estate and student housing platform connecting tenants with Dalalis and property owners in Tanzania.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "TZS"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${URL_LINK}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Nyumba Connect?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nyumba Connect bridges the gap between students, real estate agents (Dalalis), and property owners. It helps discover, connect, and secure ideal student accommodations effortlessly."
            }
          },
          {
            "@type": "Question",
            "name": "Are the house listings verified?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All properties on Nyumba Connect are verified to ensure maximum safety, security, and absolute structural authenticity for students."
            }
          }
        ]
      }
    ]
  };