"use client"

import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import StatsSection from "@/components/sections/stats-section"
import ServicesSection from "@/components/sections/services-section"
import ProcessSection from "@/components/sections/process-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import OfficesSection from "@/components/sections/offices-section"

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <OfficesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
