import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "ADWI Technologies - Software Development & Staffing",
  description:
    "ADWI Technologies provides software development, recruitment & staffing, animation services, and CSR activities.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
      <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
