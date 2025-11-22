import type React from "react"
import { Metadata } from "next"
import Script from "next/script";

export const metadata: Metadata = {

  metadataBase: new URL("https://www.adwitechnologies.com/"),

  title: "About Us | ADWI Technologies",
  description:
    "Learn about ADWI Technologies, a trusted provider of software development, staffing, IT training, and foreign language programs. Built on trust, innovation, and commitment to client success.",

  keywords: [
    "About ADWI Technologies",
    "ADWI Technologies Company Info",
    "Software Development Company Pune",
    "Recruitment and Staffing Experts",
    "IT Training Institute",
    "About Our Company",
    "ADWI Leadership",
    "Tech Company in Pune",
  ],

  authors: [{ name: "ADWI Technologies", url: "https://www.adwitechnologies.com/" }],

  alternates: {
    canonical: "https://www.adwitechnologies.com/about",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "About ADWI Technologies — Who We Are & What We Do",
    description:
      "ADWI Technologies is a privately owned IT and staffing organization delivering software development, recruitment, IT training, and foreign language solutions.",
    url: "https://www.adwitechnologies.com/about",
    siteName: "ADWI Technologies",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.adwitechnologies.com/og-about.png",
        width: 1200,
        height: 630,
        alt: "ADWI Technologies About Page",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About ADWI Technologies",
    description:
      "Learn more about our mission, values, leadership, and commitment to digital innovation and talent excellence.",
    images: ["https://www.adwitechnologies.com/og-about.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      <head>
        <Script id="about-org-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ADWI Technologies",
  "url": "https://www.adwitechnologies.com/",
  "logo": "https://www.adwitechnologies.com/adwi_logo.png",
  "description": "ADWI Technologies delivers software development, staffing, IT training, and foreign language solutions.",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+91 7720077514",
    "contactType": "customer support",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  }],
  "sameAs": [
    "https://www.facebook.com/adwitechnologies",
    "https://www.linkedin.com/company/adwi-technologies"
  ]
}
`}
</Script>

<Script id="about-website-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ADWI Technologies",
  "url": "https://www.adwitechnologies.com/"
}
`}
</Script>

<Script id="about-webpage-schema" type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About ADWI Technologies",
  "url": "https://www.adwitechnologies.com/about",
  "description": "Learn about ADWI Technologies and our commitment to empowering clients with digital innovation and talent solutions.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.adwitechnologies.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://www.adwitechnologies.com/about"
      }
    ]
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
