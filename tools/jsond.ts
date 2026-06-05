export const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nyumbaconnect.com/#organization",
        "name": "Nyumba Connect",
        "url": "https://nyumbaconnect.com",
        "logo": "https://nyumbaconnect.com/logo.png",
        "sameAs": [
          "https://twitter.com/nyumbaconnect", // Adjust with real social links
          "https://linkedin.com/company/nyumbaconnect"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+255-123-456-789",
          "contactType": "customer service",
          "email": "hello@nyumbaconnect.com",
          "areaServed": "TZ",
          "availableLanguage": ["Swahili", "English"]
        }
      },
      {
        "@type": "WebApplication",
        "@id": "https://nyumbaconnect.com/#webapp",
        "name": "Nyumba Connect Platform",
        "url": "https://nyumbaconnect.com",
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
        "@id": "https://nyumbaconnect.com/#faq",
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