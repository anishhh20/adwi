"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion" // Added useMotionValue, useSpring, useTransform
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)
  
  // 1. New State for Mouse Tracking and Hover Status
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const slides = [
    {
      // Punch line & Core Value Slide
      title: "Add Value To Your Business",
      subtitle: "Technology & Talent Solutions | ADWI Technologies",
      image: "/ai-technology-lightbulb-brain (1).jpg",
      description: "We are a privately owned organization built on a foundation of trust and commitment, delivering tailored solutions that align with your goals and values.",
      link: "/",
      linkText: "Discover Our Story",
    },
    {
      // Software Development Service
      title: "Niche Software Development & Innovation",
      subtitle: "Your Strategic Partner in the Digital Age",
      image: "/animatedBanner.jpg",
      description: "We deliver niche, essential, and easy-to-integrate services, including Custom Software, Web/Mobile App Development, and Automation-Driven Solutions.",
      link: "/services/software-development",
      linkText: "Explore Software Services",
    },
    {
      // Recruitment and Staffing Service
      title: "Strategic Recruitment & Staffing",
      subtitle: "Empowering Organizations with Proven Leadership Talent",
      image: "/professional-team-collaboration.jpg",
      description: "We specialize in identifying and placing experienced, high-impact leaders who drive immediate results and long-term transformation.",
      link: "/services/recruitment-staffing",
      linkText: "Find Your Proven Performers",
    },
    {
      // IT Training and Certification Service
      title: "IT Certification: Fast-Track Your Career",
      subtitle: "Industry-Recognized Technical & Management Programs",
      image: "/corporate-social-responsibility.jpg",
      description: "Don’t let a lack of credentials hold you back. Enroll in programs like PMP, CISA, AWS, and ITIL to stand out in the competitive job market.",
      link: "/services/training-certification",
      linkText: "View All Certifications",
    },
    {
      // Foreign Language Service
      title: "Unlock Global Opportunities",
      subtitle: "Comprehensive Foreign Language Training",
      image: "/placeholder-foreign-language.jpg",
      description: "Language is the bridge to personal and professional growth. We offer training in English, German, French, Japanese, Spanish, and more.",
      link: "/services/foreign-language",
      linkText: "Become a Global Communicator",
    },
  ]

  // Fix: Added slides.length to dependency array for cleaner interval management
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length]) 

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      const progress = Math.min(scrollY / (heroHeight * 0.5), 1)
      setScrollProgress(progress)
      setShowOverlay(scrollY < heroHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // 2. Mouse Position Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left // X position within the element
    const y = e.clientY - rect.top  // Y position within the element
    setMousePosition({ x, y })
  }

  // 3. Transformation Calculations (The "Magic")
  // These functions normalize mouse position (0 to 1) and map it to a rotation degree
  const calculateRotation = useCallback((pos: number, dimension: number, maxDeg: number) => {
    // Normalize position: map pos (0 to dimension) to normalizedPos (-1 to 1)
    const normalizedPos = (pos / dimension) * 2 - 1
    // Apply a rotation, reversing the sign for Y-axis (to create the 'following' effect)
    return normalizedPos * maxDeg
  }, [])

  // 4. Framer Motion values for smooth transition
  const springConfig = { stiffness: 150, damping: 20 }
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // 5. Use useTransform to apply the calculated rotation
  // Max rotation angle (subtle effect)
  const maxRotation = 4

  const rotateX = useTransform(ySpring, (latestY) => 
    isHovering ? calculateRotation(latestY, window.innerHeight, maxRotation) : 0
  )
  const rotateY = useTransform(xSpring, (latestX) => 
    isHovering ? -calculateRotation(latestX, window.innerWidth, maxRotation) : 0
  )
  
  // Update motion values on mouse position change
  useEffect(() => {
      x.set(mousePosition.x);
      y.set(mousePosition.y);
  }, [mousePosition, x, y]);


  return (
    <section 
      id="home" 
      className="w-full h-screen md:min-h-screen overflow-hidden bg-primary relative"
      // 6. Integrate mouse handlers for the main container
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === activeSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          {/* Enhanced Overlay: Darker for better text contrast (Black theme from CSS) */}
          <div className="absolute inset-0 bg-black/50" /> 

          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-12 lg:p-16"
            // Ensure the content container has a perspective for the 3D effect
            style={{ perspective: '1000px' }} 
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: idx === activeSlide ? 1 : 0, y: idx === activeSlide ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl"
              // 7. Apply the mouse-driven rotation to the content block
              style={{ 
                rotateX: rotateX, 
                rotateY: rotateY, 
                transition: isHovering ? 'none' : 'transform 0.5s ease-out' // Transition back to 0 smoothly
              }}
            >
              {/* Added leading-tight for better line spacing on large titles */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3 text-balance leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              {/* Subtitle uses accent color (Lime Green) and drop shadow */}
              <p className="text-base sm:text-lg md:text-xl text-accent font-semibold mb-3 md:mb-4 drop-shadow-md">{slide.subtitle}</p>
              {/* Description uses white with high opacity */}
              <p className="text-sm sm:text-base text-white/90 mb-4 md:mb-6 max-w-xl drop-shadow-sm">{slide.description}</p>
              <motion.a 
                href={slide.link} 
                className="px-6 md:px-8 py-2.5 md:py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:opacity-90 transition-all text-sm md:text-base inline-block uppercase tracking-wider shadow-lg" // Enhanced button style
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slide.linkText || "Learn More"}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Scroll Fade Overlay */}
      {showOverlay && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 md:h-32 pointer-events-none"
          style={{
            // Adjusted gradient for stronger fade from the bottom
            background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 60%)",
            opacity: 1 - scrollProgress,
          }}
        />
      )}

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        {/* Navigation Button Styling */}
        <motion.button
          onClick={prevSlide}
          className="p-3 md:p-3.5 bg-black/30 hover:bg-black/50 rounded-full transition-colors backdrop-blur-sm shadow-lg"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="text-white" size={20} />
        </motion.button>

        {/* Indicator Dots - ISSUE FIX APPLIED HERE */}
        <div className="flex gap-2 items-center">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              // FIX/ENHANCEMENT: Ensures correct pill shape (w-7/w-9) for active and small dot for inactive, using ACCENT color.
              className={`rounded-full transition-all duration-300 ease-in-out ${idx === activeSlide 
                  ? "w-7 md:w-9 h-2 bg-accent" // Active: Wider pill, Green accent
                  : "w-2 h-2 bg-white/50 hover:bg-white/80" // Inactive: Small dot, white opacity
                }`}
              aria-label={`Go to slide ${idx + 1}`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
        
        {/* Navigation Button Styling */}
        <motion.button
          onClick={nextSlide}
          className="p-3 md:p-3.5 bg-black/30 hover:bg-black/50 rounded-full transition-colors backdrop-blur-sm shadow-lg"
          aria-label="Next slide"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="text-white" size={20} />
        </motion.button>
      </div>
    </section>
  )
}