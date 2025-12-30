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

    <>
      <Banner />
      <div className="w-full relative z-20 bg-white dark:bg-black">
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <OfficesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTA />
      </div>
      <Footer />
    </>
  )
}

export default page