// fileName: page.tsx
"use client"

import AboutSection from "@/components/sections/about-section"
import StatsSection from "@/components/sections/stats-section"
import ServicesSection from "@/components/sections/services-section"
import ProcessSection from "@/components/sections/process-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import Footer from "@/components/footer"
import OfficesSection from "@/components/sections/offices-section"
import LightRays from "@/components/LightRays"
import Loop from "@/components/sections/loop-section"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import CTA from "@/components/CTA"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyHeightClass = "h-screen";

  // 1. FRAMER MOTION SCROLL SETUP
  // Track scroll progress within the sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef, // Reference the container of the sticky section
    offset: ["start start", "end start"], // Start tracking when the container hits the top, stop when the container leaves the top
  })

  // 2. PARALLAX TRANSFORMATIONS
  // Map scrollYProgress (0 to 1) to desired animation values
  // Content moves up and fades out
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Background Accents move slightly slower/faster than content (more classic parallax)
  const leftAccentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rightAccentY = useTransform(scrollYProgress, [0, 1], [0, -50])


  // --- 1. Text Rotator Data (Unchanged) ---
  const rotatingTexts = [
    "Building Next-Gen Software Solutions.",
    "Connecting You with Global IT Talent.",
    "Your Partner for Digital Transformation.",
    "Expert IT Training & Certification.",
    "Foreign Language & Cultural Consulting.",
  ]

  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // --- 2. Text Rotator Logic (Unchanged) ---
  useEffect(() => {
    // Cycle through texts every 4 seconds
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === rotatingTexts.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // 4 seconds per slide
    return () => clearInterval(interval)
  }, [rotatingTexts.length])
  // -----------------------------

  // --- 4. NEW KEY HIGHLIGHTS DATA (from About.tsx & Services.tsx) ---
  const keyHighlights = [
    { title: "Staffing & Recruitment", icon: "👥" }, // From About/Services
    { title: "Software Development", icon: "💻" }, // From Services
    { title: "Results Driven", icon: "🏆" }, // From About/Services
    { title: "Global Network", icon: "🌐" }, // From About
  ]
  // -------------------------------------------------------------------

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

  // --- 3. Text Rotator Animation Variants (Unchanged) ---
  const rotatingTextVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.4, ease: "easeIn" } },
  }

  // --- 5. NEW ANIMATION VARIANTS FOR KEY HIGHLIGHTS ---
  const highlightItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }
  // ---------------------------------------------------


  return (
    <main className="w-full relative">
      {/* Apply ref to the sticky container and use motion.div */}
      <motion.div ref={containerRef} className={`w-full ${stickyHeightClass} bg-black sticky top-0 z-10`}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#99cc33"
          raysSpeed={1.8}
          lightSpread={1.5}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0.6}
          distortion={0.09}
        />
        <section className="absolute inset-0 w-full min-h-screen bg-black overflow-hidden flex flex-col">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-green-950/5 z-0" />

          {/* Left accent - HIDDEN ON MOBILE */}
          {!isMobile && (
            <motion.div
              style={{ y: leftAccentY }} // <--- PARALLAX ADDED
              className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 -ml-48 z-0"
              animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full border border-lime-500/20 blur-xl" />
              <div className="absolute inset-12 rounded-full border border-lime-500/10" />
            </motion.div>
          )}

          {/* Right accent - HIDDEN ON MOBILE */}
          {!isMobile && (
            <motion.div
              style={{ y: rightAccentY }} // <--- PARALLAX ADDED
              className="absolute right-0 top-1/3 w-1/2 h-1/2 -mr-52 z-0"
              animate={{ x: [30, -30, 30], y: [20, -20, 20] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="w-full h-full rounded-full border border-green-500/20 blur-xl" />
              <div className="absolute inset-16 rounded-full border border-green-500/10" />
            </motion.div>
          )}

          {/* Main content - Apply Parallax Transforms to this container */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }} // <--- PARALLAX ADDED
            className="relative z-10 flex-1 flex items-center justify-center w-full px-8 sm:px-6 lg:px-8 pt-10 sm:pt-20"
          >
            <motion.div
              className="w-full max-w-4xl text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Title (Unchanged) */}
              <motion.div variants={titleVariants} className="mb-8 ">
                <div className="flex items-center flex-wrap justify-center gap-2">
                  <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter">
                    ADWI
                  </h1>
                  <motion.h2
                    className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-lime-300 via-lime-400 to-green-400 bg-clip-text text-transparent leading-tight tracking-tighter"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Technologies
                  </motion.h2>
                </div>
                <p className="text-md text-gray-300 font-light tracking-wide">
                  Empowering Your Success Through
                </p>
              </motion.div>

              {/* Subtitle / Dynamic Text Rotator (Unchanged) */}
              <motion.div variants={subtitleVariants} className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">

                {/* DYNAMIC ROTATING TEXT */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex} // Key forces re-render/animation
                    variants={rotatingTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="h-8 sm:h-10 flex items-center justify-center my-12"
                  >
                    <p className="text-xl font-700 text-white inline-block px-2">
                      {rotatingTexts[currentTextIndex]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Value proposition (Unchanged) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="pt-6 flex items-center justify-center gap-4 sm:gap-6"
                >
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-lime-500 rounded-full" />
                  <p className="text-xs sm:text-md font-semibold text-lime-400 uppercase tracking-widest whitespace-nowrap">
                    Add Value To Your Business
                  </p>
                  <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-lime-500 rounded-full" />
                </motion.div>
              </motion.div>

              {/* --- NEW SECTION: KEY HIGHLIGHTS / VALUE PROPS --- */}
              <motion.div
                className="max-w-2xl mx-auto pt-3 border-t border-white/10"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-3">
                  {keyHighlights.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={highlightItemVariants}
                      style={{ originY: 0 }} // Ensures smooth animation start
                      className="flex flex-col items-center justify-center space-y-2 p-2 rounded-lg  transition-colors cursor-default"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <div className="text-2xl sm:text-3xl text-lime-400">
                        {item.icon}
                      </div>
                      <p className="text-xs font-medium text-gray-200 uppercase tracking-wider">
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* --- END NEW SECTION --- */}
            </motion.div>
          </motion.div>

          {/* Scroll indicator (Unchanged) - Can also be animated with parallax if desired */}
          <motion.div
            // Animation for Bouncing (y: [0, 8, 0]) and Fading (opacity: [1, 0.5, 1])
            animate={{
              y: [0, 10, 0], // Increased bounce height slightly
              opacity: [1, 0.6, 1], // Added opacity pulse
            }}
            transition={{
              duration: 2.2, // Slightly faster, more engaging transition
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="fixed bottom-0 left-0 right-0 z-50 pb-6 sm:pb-8 flex flex-col items-center gap-3"
          >
            {/* Subtly styled text */}
            <p className="text-sm  text-gray-300 font-medium tracking-widest uppercase">
              Explore Solutions
            </p>

            {/* NEW: Stylized Mouse Icon with Glow and Scroll Wheel Effect */}
            <motion.svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-lime-400" // Increased size and set color
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Mouse Body (Detailed structure) */}
              <rect
                x="7"
                y="4"
                width="10"
                height="16"
                rx="5"
                className="stroke-lime-500/50" // Base stroke for shadow effect
                strokeWidth="1.5"
                style={{ filter: 'blur(1px)' }}
              />
              <rect
                x="7"
                y="4"
                width="10"
                height="16"
                rx="5"
                className="stroke-lime-400" // Primary lime color
                strokeWidth="1.5"
              />

              {/* Scroll Wheel / Indicator */}
              <motion.line
                x1="12"
                y1="8"
                x2="12"
                y2="8" // Initial small line (the wheel)
                strokeLinecap="round"
                strokeWidth="2"
                className="stroke-lime-400"
                // Animation for the Scroll Wheel moving up and down
                animate={{
                  y1: [8, 14, 8], // Starting Y, Middle Y, Ending Y
                  y2: [10, 16, 10],
                }}
                transition={{
                  duration: 2, // Matches the main bounce but slightly offset
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.svg>
          </motion.div>
        </section>
      </motion.div>

      <div className="w-full relative z-20 bg-white dark:bg-black">
        <AboutSection />
        <StatsSection />
        <ServicesSection />
        <OfficesSection />
        <ProcessSection />
        {/* <Loop /> */}
        <TestimonialsSection />
        {/* <ContactSection /> */}
        <CTA />
      </div>

      <Footer />
    </main>
  )
}