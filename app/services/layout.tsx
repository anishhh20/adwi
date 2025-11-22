import type React from "react"
import { Metadata } from "next"
import Script from "next/script";

export const metadata : Metadata = {
  metadataBase: new URL("https://www.adwitechnologies.com/"),

  title: "Services  | ADWI Technologies",
  description:
    "Explore ADWI Technologies services including software development, recruitment and staffing, IT training certifications, and foreign language training. Trusted solutions for your business and career growth.",

  keywords: [
    "ADWI Technologies Services",
    "Software Development",
    "Recruitment and Staffing",
    "IT Training",
    "Foreign Language Training",
    "Custom Software Solutions",
    "Hiring Solutions India",
    "IT Certification Programs",
    "Web Development Company Pune"
  ],

  authors: [{ name: "ADWI Technologies", url: "https://www.adwitechnologies.com/" }],

  alternates: {
    canonical: "https://www.adwitechnologies.com/services",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },

  openGraph: {
    title: "Our Services — ADWI Technologies",
    description:
      "ADWI Technologies delivers Software Development, Staffing, IT Training, and Foreign Language Training services to empower your business and career.",
    url: "https://www.adwitechnologies.com/services",
    siteName: "ADWI Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.adwitechnologies.com/og-services.png",
        width: 1200,
        height: 630,
        alt: "ADWI Technologies Services Page"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "ADWI Technologies Services",
    description:
      "Explore our Software Development, Staffing Solutions, IT Training & Foreign Language programs.",
    images: ["https://www.adwitechnologies.com/og-services.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      <head>
        <Script id="services-org-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ADWI Technologies",
  "url": "https://www.adwitechnologies.com/",
  "logo": "https://www.adwitechnologies.com/adwi_logo.png",
  "description": "ADWI Technologies provides software development, staffing, IT training and foreign language programs.",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+91 7720077514",
    "contactType": "customer support",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }]
}
`}
</Script>
<Script id="services-website-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ADWI Technologies",
  "url": "https://www.adwitechnologies.com/"
}
`}
</Script>

<Script id="services-webpage-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "ADWI Technologies Services",
  "url": "https://www.adwitechnologies.com/services",
  "description": "Explore our software development, recruitment, IT training and foreign language services.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.adwitechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.adwitechnologies.com/services" }
    ]
  }
}
`}
</Script>

<Script id="schema-software-development" type="application/ld+json">
{`
{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"Software Development",
  "provider":{"@type":"Organization","name":"ADWI Technologies"},
  "serviceType":"Custom Software Solutions",
  "areaServed":"Worldwide"
}
`}
</Script>


<Script id="schema-staffing" type="application/ld+json">
{`
{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"Recruitment & Staffing",
  "provider":{"@type":"Organization","name":"ADWI Technologies"},
  "serviceType":"Hiring & Workforce Solutions",
  "areaServed":"India, Global"
}
`}
</Script>

<Script id="schema-it-training" type="application/ld+json">
{`
{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"IT Training & Certification",
  "provider":{"@type":"Organization","name":"ADWI Technologies"},
  "serviceType":"Technical & Management Certifications",
  "areaServed":"Worldwide"
}
`}
</Script>

<Script id="schema-language-training" type="application/ld+json">
{`
{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"Foreign Language Training",
  "provider":{"@type":"Organization","name":"ADWI Technologies"},
  "serviceType":"Professional Language Courses",
  "areaServed":"India, Global"
}
`}
</Script>


      </head>
      
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
