// testimonials-section.tsx - Revised for Responsiveness
"use client"

import type React from "react"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

// ... (QuoteIcon, Testimonial interface, and testimonials array remain the same) ...
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 14.5C4 17.5376 6.46243 20 9.5 20H10C10.5523 20 11 19.5523 11 19V17C11 16.4477 10.5523 16 10 16H9.5C7.567 16 6 14.433 6 12.5C6 10.567 7.567 9 9.5 9H10C10.5523 9 11 8.55228 11 8V5C11 4.44772 10.5523 4 10 4H9.5C5.35786 4 2 7.35786 2 11.5V14.5H4ZM14 14.5C14 17.5376 16.4624 20 19.5 20H20C20.5523 20 21 19.5523 21 19V17C21 16.4477 20.5523 16 20 16H19.5C17.567 16 16 14.433 16 12.5C16 10.567 17.567 9 19.5 9H20C20.5523 9 21 8.55228 21 8V5C21 4.44772 20.5523 4 20 4H19.5C15.3579 4 12 7.35786 12 11.5V14.5H14Z" />
  </svg>
)

interface Testimonial {
  id: number
  name: string
  company: string
  message: string
  role: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Tech Ventures Ltd",
    message: "ADWI helped us find the perfect team members. Highly recommended!",
    role: "CEO",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "Digital Solutions Inc",
    message: "Outstanding software development services. Delivered on time and within budget.",
    role: "Project Manager",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Patel",
    company: "Creative Studio Pro",
    message: "The animation work was exceptional. Brought our vision to life perfectly.",
    role: "Creative Director",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Desai",
    company: "Global Enterprises",
    message: "ADWI's CSR strategy helped us make meaningful social impact.",
    role: "Director, CSR",
    rating: 5,
  },
]

const AnimatedPattern = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <motion.div
      className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"
      style={{
        background: `radial-gradient(circle, var(--tw-color-accent), transparent 70%)`,
      }}
      animate={{
        x: ["-50%", "10%", "-50%"],
        y: ["-30%", "20%", "-30%"],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 30,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  </motion.div>
)

const TestimonialCard = ({ testimonial, isActive, inView, starVariants, index }: {
  testimonial: Testimonial,
  isActive: boolean,
  inView: boolean,
  starVariants: any,
  index: number
}) => {
  const cardScale = isActive ? 1 : 0.9;
  const cardOpacity = isActive ? 1 : 0.45;
  const cardFilter = isActive ? "blur(0px)" : "blur(2px)";

  return (
    <motion.div
      style={{ scale: cardScale, opacity: cardOpacity, filter: cardFilter }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
      className={`
        w-4/5 max-w-md lg:w-[400px] shrink-0 transition-all duration-500 ease-out
        bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-xl mx-2 
        ${isActive ? 'z-10' : 'z-0 cursor-pointer'}
      `}
      key={testimonial.id * 100 + index}
    >
      <div className="grid grid-cols-1 gap-4 items-start">
        {/* Quote & Rating */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={starVariants}
                  initial="hidden"
                  animate={isActive && inView ? "visible" : "hidden"}
                >
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </div>
            <QuoteIcon className="h-7 w-7 text-accent/20 opacity-60" />
          </div>

          <p className={`text-white leading-snug italic grow ${isActive ? 'text-md font-semibold' : 'text-sm font-medium'}`}>
            "{testimonial.message}"
          </p>
        </div>

        {/* Author Info */}
        <div className="border-t border-white/30 pt-3 flex flex-row justify-between mx-auto gap-10 items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-12 h-12 bg-accent/20 rounded-full mb-2 flex items-center justify-center text-md font-extrabold text-accent ring-2 ring-accent/20"
          >
            {testimonial.name.charAt(0)}
          </motion.div>

          <div className="space-y-1">
            <p className="font-bold text-white text-sm leading-tight">{testimonial.name}</p>
            <p className="text-accent font-medium text-xs mt-0">{testimonial.role}</p>
            <p className="text-white/70 text-xs mt-0.5">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const autoScrollRef = useRef<NodeJS.Timeout>()
  const manualInteractionRef = useRef<NodeJS.Timeout>()
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const isInitialLoadRef = useRef(true) // Helper to track the very first render

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const REAL_COUNT = testimonials.length
  const CLONE_COUNT = REAL_COUNT
  const TOTAL_COUNT = REAL_COUNT + 2 * CLONE_COUNT
  const AUTO_SCROLL_DELAY = 6000
  const INTERACTION_PAUSE = 10000

  // ... (infiniteTestimonials and realIndex useMemo remain the same) ...
  const infiniteTestimonials = useMemo(() => {
    return [
      ...testimonials.slice(-CLONE_COUNT),
      ...testimonials,
      ...testimonials.slice(0, CLONE_COUNT),
    ]
  }, [])

  const realIndex = useMemo(() => (activeIndex - CLONE_COUNT) % REAL_COUNT, [activeIndex, CLONE_COUNT, REAL_COUNT])

  // --- Looping Logic ---
  useEffect(() => {
    // Skip looping logic on initial load when activeIndex is -1
    if (activeIndex === -1) return;

    if (activeIndex >= REAL_COUNT + CLONE_COUNT) {
      // Jump to the equivalent real-list index (start of the real list)
      // Use setTimeout to allow the current frame to render the transition before the jump
      setTimeout(() => setActiveIndex(CLONE_COUNT), 500);
    }
    else if (activeIndex < CLONE_COUNT) {
      // Jump to the equivalent real-list index (end of the real list)
      setTimeout(() => setActiveIndex(REAL_COUNT + CLONE_COUNT - 1), 500);
    }
  }, [activeIndex, REAL_COUNT, CLONE_COUNT])


  // --- Auto-Scroll Logic ---
  const startAutoScroll = useCallback(() => {
    if (manualInteractionRef.current) return

    if (autoScrollRef.current) {
      clearTimeout(autoScrollRef.current)
    }

    autoScrollRef.current = setTimeout(() => {
      setActiveIndex((prev) => prev + 1)
    }, AUTO_SCROLL_DELAY)
  }, [])

  const handleManualAction = useCallback(
    (newIndex: number) => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current)
      }
      if (manualInteractionRef.current) {
        clearTimeout(manualInteractionRef.current)
      }

      setActiveIndex(newIndex + CLONE_COUNT)

      manualInteractionRef.current = setTimeout(() => {
        manualInteractionRef.current = undefined
      }, INTERACTION_PAUSE)
    },
    [CLONE_COUNT],
  )

  useEffect(() => {
    // 🟢 CHANGE 2: On initial load, set the index to the first real card (CLONE_COUNT)
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false
      // Set the first actual card as active after a slight delay to ensure smooth start
      setTimeout(() => setActiveIndex(CLONE_COUNT), 100)
      return
    }

    // Only start auto-scroll if visible AND no manual interaction is currently paused
    if (inView && manualInteractionRef.current === undefined) {
      startAutoScroll()
    }

    return () => {
      if (autoScrollRef.current) {
        clearTimeout(autoScrollRef.current)
      }
    }
  }, [inView, activeIndex, startAutoScroll])

  const handleNext = () => setActiveIndex((prev) => prev + 1)
  const handlePrev = () => setActiveIndex((prev) => prev - 1)

  // --- Dynamic Centering Calculation (Remains the same, but handles -1 gracefully) ---
  const CAROUSEL_OFFSET = useMemo(() => {
    // If activeIndex is -1, center the starting position (CLONE_COUNT)
    const targetIndex = activeIndex === -1 ? CLONE_COUNT : activeIndex

    if (!carouselTrackRef.current) return '0px'

    const activeCard = carouselTrackRef.current.children[targetIndex] as HTMLElement | undefined
    if (!activeCard) return '0px'

    const cardWidth = activeCard.offsetWidth
    const cardMargin = 8
    const CARD_TOTAL_WIDTH = cardWidth + cardMargin * 2
    const CARD_HALF_WIDTH = cardWidth / 2

    // Use the targetIndex for calculation
    return `calc(50% - ${targetIndex * CARD_TOTAL_WIDTH}px - ${CARD_HALF_WIDTH}px)`
  }, [activeIndex, infiniteTestimonials.length])

  // --- Resize Observer to Recalculate Offset on Window Resize ---
  useEffect(() => {
    // Force a recalculation of the offset on resize events
    const handleResize = () => {
      // This forces the useMemo hook to re-run, recalculating CAROUSEL_OFFSET
      setActiveIndex(prev => prev)
    }

    // Set up a simple resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  const starVariants = {
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.08 + 0.3, type: "spring", stiffness: 450, damping: 20 },
    }),
    hidden: { opacity: 0, scale: 0.5 },
  }

  const headerVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hidden: { opacity: 0, y: 30 },
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{ "--tw-accent-color": "hsl(var(--accent))" } as React.CSSProperties}
      className="relative py-12 md:py-20 px-4 overflow-hidden"
    >
      {/* 2. Fixed Background Image Layer */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/paralled.png')" }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>

      {/* 3. The Animated Pattern and Content need to be above the image, so adjust 'z-index' */}
      <AnimatedPattern />

      <div className="container mx-auto max-w-5xl relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 md:mb-3 text-white">Trusted by <span className="text-accent">Industry Innovators</span></h2>
          <p className="text-sm md:text-base text-white/75 max-w-2xl mx-auto">
                        Hear from partners and clients who have experienced measurable results with ADWI.
          </p>
        </motion.div>

        {/* --- CAROUSEL CONTAINER --- */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={carouselTrackRef}
            className="flex py-6"
            animate={{ x: CAROUSEL_OFFSET }}
            transition={{
              // Transition should only run if activeIndex is valid (not -1)
              type: (activeIndex === -1 || activeIndex >= REAL_COUNT + CLONE_COUNT || activeIndex < CLONE_COUNT) ? false : "spring",
              stiffness: 300,
              damping: 35
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id * 100 + index}
                testimonial={testimonial}
                // 🟢 FIX: Only set isActive if activeIndex is a valid index
                isActive={index === activeIndex && activeIndex !== -1}
                inView={inView}
                starVariants={starVariants}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* --- Navigation Controls --- */}
        <div className="flex justify-center items-center mt-6">
          <motion.button
            onClick={handlePrev}
            className="p-2 bg-white/10 text-white rounded-full shadow-md hover:shadow-lg transition-all border border-white/30 mr-4 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </motion.button>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleManualAction(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${index === realIndex ? "bg-accent w-6 shadow-sm" : "bg-white/30 w-1.5 hover:bg-accent/40"
                  }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            className="p-2 bg-white/10 text-white rounded-full shadow-md hover:shadow-lg transition-all border border-white/30 ml-4 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}