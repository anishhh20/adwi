"use client"

import Banner from '@/components/Banner'
import CTA from '@/components/CTA'
import Footer from '@/components/footer'
import AboutSection from '@/components/sections/about-section'
import OfficesSection from '@/components/sections/offices-section'
import ProcessSection from '@/components/sections/process-section'
import ServicesSection from '@/components/sections/services-section'
import StatsSection from '@/components/sections/stats-section'
import TestimonialsSection from '@/components/sections/testimonials-section'

const page = () => {
  return (
    <main className="relative bg-black">
      {/* The Banner remains relative/sticky internally */}
      <Banner />

      {/* This container acts as the 'curtain'. 
          - z-20 ensures it stays above the parallax background.
          - shadow-2xl adds depth as it scrolls over the banner.
      */}
      <div className="relative z-20 bg-white dark:bg-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <OfficesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTA />
      </div>

      <Footer />
    </main>
  )
}

export default page