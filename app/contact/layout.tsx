import type React from "react"
import { Metadata } from "next"
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adwitechnologies.com/"),

  title: "Contact | ADWI Technologies",
  description:
    "Get in touch with ADWI Technologies for software development, staffing, IT training and language learning services. Contact our Pune, Dubai and Germany offices for business inquiries.",

  keywords: [
    "Contact ADWI Technologies",
    "ADWI Technologies Pune",
    "ADWI Contact",
    "IT Company Contact Pune",
    "Recruitment Agency Pune",
    "Software Development Company Contact",
    "Staffing Solutions Contact",
  ],

  authors: [{ name: "ADWI Technologies", url: "https://www.adwitechnologies.com/" }],

  alternates: {
    canonical: "https://www.adwitechnologies.com/contact",
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
    title: "Contact ADWI Technologies",
    description:
      "Reach out to ADWI Technologies for business inquiries, collaborations, staffing needs or IT services.",
    url: "https://www.adwitechnologies.com/contact",
    siteName: "ADWI Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.adwitechnologies.com/og-contact.png",
        width: 1200,
        height: 630,
        alt: "Contact ADWI Technologies"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact ADWI Technologies",
    description:
      "Contact our Pune, Dubai and Germany offices for IT, staffing, training and development inquiries.",
    images: ["https://www.adwitechnologies.com/og-contact.png"]
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
        <Script id="contact-org-schema" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ADWI Technologies",
  "url": "https://www.adwitechnologies.com/",
  "logo": "https://www.adwitechnologies.com/adwi_logo.png",
  "email": "adwitechnologies@gmail.com",
  "telephone": "+91 7720077514",
  "sameAs": [
    "https://www.facebook.com/adwitechnologies",
    "https://www.linkedin.com/company/adwi-technologies"
  ]
}
`}
        </Script>

        <Script id="contact-webpage-schema" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Contact ADWI Technologies",
  "url": "https://www.adwitechnologies.com/contact",
  "description": "Contact ADWI Technologies for inquiries, partnerships and service requests.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.adwitechnologies.com/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.adwitechnologies.com/contact" }
    ]
  }
}
`}
        </Script>


        <Script id="contact-localbusiness-pune" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ADWI Technologies - Pune Office",
  "image": "https://www.adwitechnologies.com/adwi_logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bavdhan",
    "addressLocality": "Pune",
    "postalCode": "411058",
    "addressCountry": "IN"
  },
  "telephone": "+91 7720077514",
  "email": "adwitechnologies@gmail.com",
  "openingHours": "Mo-Fr 10:00-18:00"
}
`}
        </Script>

        <Script id="contact-localbusiness-dubai" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ADWI Technologies - Dubai Office",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AE"
  }
}
`}
        </Script>

        <Script id="contact-localbusiness-germany" type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ADWI Technologies - Germany Office",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "DE"
  }
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
