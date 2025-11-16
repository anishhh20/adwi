import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import "./globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ADWI Technologies - Software Development & Staffing",
  description:
    "ADWI Technologies provides software development, recruitment & staffing, animation services, and CSR activities.",
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
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

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00A86B" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="preload" href="/adwi_logo.jpg" as="image" />

        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ADWI Technologies",
              url: "https://www.adwitechnologies.com/",
              logo: "https://www.adwitechnologies.com/adwi_logo.jpg",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91 7720077514",
                  contactType: "customer support",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              sameAs: [
                "https://www.facebook.com/adwitechnologies",
                "https://www.linkedin.com/company/adwi-technologies",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ADWI Technologies",
              url: "https://www.adwitechnologies.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.adwitechnologies.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "ADWI Technologies Home",
              url: "https://www.adwitechnologies.com/",
              description:
                "ADWI Technologies provides software development, staffing, IT training, and foreign language training services.",
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.adwitechnologies.com/",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      
      <body className={`font-sans antialiased`}>
      <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
