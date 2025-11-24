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
import LightRays from "@/components/LightRays"
import Loop from "@/components/sections/loop-section"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const stickyHeightClass = "h-screen"; 
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }
  return (
    <main className="w-full relative"> {/* Add relative for the subsequent absolute positioning to work if needed, though 'sticky' is the key */}
      <div className={`w-full ${stickyHeightClass} bg-black sticky top-0 z-10`}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#99cc33" // Uses your accent/primary green color
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      
        {/* 2. Header Banner Text Overlay - Centered and Styled */}
        {/* The banner content is inside the sticky container, so it also sticks. */}
        {/* <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
          <div className="max-w-6xl">
            <h1 className="
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-extrabold text-center 
              leading-none tracking-tighter 
              text-white dark:text-foreground 
              drop-shadow-xl [text-shadow:0_0_15px_rgba(255,255,255,0.2)]
              mb-4
            ">
              <span className="
                inline-block 
                animate-fade-in-up 
                delay-150
              ">
                ADWI Technologies
              </span>
            </h1>
            
            <p className="
              text-xl sm:text-2xl md:text-3xl lg:text-4xl 
              font-bold text-center
              tracking-wide
              text-gray-300 dark:text-gray-400
              animate-fade-in-up 
              delay-300
              
            ">
              Add&nbsp;
              <span className="
                font-bold 
                text-accent dark:text-primary 
                drop-shadow-lg [text-shadow:0_0_5px_var(--accent)]
              tracking-wide
                inline-block
              ">
                Value
              </span>
              &nbsp;To Your Business
            </p>
          </div>
        </div> */}

      <section ref={containerRef} className="absolute inset-0 w-full min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-green-950/5 z-0" />

      {/* Left accent - hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 -ml-40 z-0"
          animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full border border-lime-500/20 blur-xl" />
          <div className="absolute inset-12 rounded-full border border-lime-500/10" />
        </motion.div>
      )}

      {/* Right accent - hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute right-0 top-1/3 w-96 h-96 -mr-48 z-0"
          animate={{ x: [30, -30, 30], y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full border border-green-500/20 blur-xl" />
          <div className="absolute inset-16 rounded-full border border-green-500/10" />
        </motion.div>
      )}

      {/* Main content - properly centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-8 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Title */}
          <motion.div variants={titleVariants} className="mb-6 sm:mb-8 md:mb-10 flex items-center justify-center gap-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
              ADWI
            </h1>
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-lime-300 via-lime-400 to-green-400 bg-clip-text text-transparent leading-tight tracking-tighter"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Technologies
            </motion.h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={subtitleVariants} className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <div className="space-y-2">
              <p className="text-md sm:text-lg md:text-xl text-gray-300 font-light tracking-wide">
                Empowering Your Success Through
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Strategic Talent & Innovation</p>
            </div>

            {/* Value proposition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center justify-center gap-2 sm:gap-3"
            >
              <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-lime-500 rounded-full" />
              <p className="text-xs sm:text-sm font-semibold text-lime-400 uppercase tracking-widest whitespace-nowrap">
                Add Value To Your Business
              </p>
              <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-lime-500 rounded-full" />
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={buttonVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="w-full sm:w-auto px-8 py-3 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 border-2 border-lime-500/50 hover:border-lime-500 text-lime-400 font-bold rounded-lg transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        className="relative z-10 pb-6 sm:pb-8 flex flex-col items-center gap-2"
      >
        <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">Scroll to explore</p>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
      </div>
      
      <div className="w-full relative z-20 bg-white dark:bg-black"> {/* Added a solid background to cover the sticky section as it scrolls */}
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <OfficesSection />
        <ProcessSection />
        <Loop />
        <TestimonialsSection />
        <ContactSection />
      </div>
      
      {/* Footer can be outside the main scrolling container or inside, depending on if you want it to scroll over or stop at the end of the scrollable content. */}
      <Footer />
    </main>
  )
}