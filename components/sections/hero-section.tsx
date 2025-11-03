"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showOverlay, setShowOverlay] = useState(true)

  const slides = [
    {
      title: "Add Value To Your Business",
      subtitle: "Technology & Talent Solutions",
      image: "/ai-technology-lightbulb-brain (1).jpg",
      description: "Transform your business with cutting-edge IT solutions, expert staffing, and creative services.",
    },
    {
      title: "Expert Recruitment & Staffing",
      subtitle: "Right Talent for Your Team",
      image: "/professional-team-collaboration.jpg",
      description: "Find experienced professionals who make immediate and significant impact on your organization.",
    },
    {
      title: "Creative Animation & Design",
      subtitle: "2D & 3D Animation Services",
      image: "/animatedBanner.jpg",
      description: "Transform your vision into compelling visual stories with professional 2D and 3D animations.",
    },
    {
      title: "CSR Activities & Impact",
      subtitle: "Corporate Social Responsibility",
      image: "/corporate-social-responsibility.jpg",
      description: "Building sustainable practices and meaningful social impact for a better tomorrow.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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

  return (
    <section id="home" className="w-full h-screen md:min-h-screen overflow-hidden bg-primary relative">
      {slides.map((slide, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: idx === activeSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: idx === activeSlide ? 1 : 0, y: idx === activeSlide ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3 text-balance">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-accent font-semibold mb-3 md:mb-4">{slide.subtitle}</p>
              <p className="text-sm sm:text-base text-white/85 mb-4 md:mb-6 max-w-xl">{slide.description}</p>
              <motion.button
                className="px-5 md:px-6 py-2 md:py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-sm md:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {showOverlay && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-20 md:h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0) 60%)",
            opacity: 1 - scrollProgress,
          }}
        />
      )}

      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
        <motion.button
          onClick={prevSlide}
          className="p-2 md:p-2.5 bg-white/15 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronLeft className="text-white" size={18} />
        </motion.button>
        <div className="flex gap-1.5 md:gap-2 items-center">
          {slides.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`rounded-full transition-all ${idx === activeSlide ? "w-6 md:w-8 h-2 bg-accent" : "w-2 h-2 bg-white/30"}`}
              aria-label={`Go to slide ${idx + 1}`}
              whileHover={{ scale: 1.15 }}
            />
          ))}
        </div>
        <motion.button
          onClick={nextSlide}
          className="p-2 md:p-2.5 bg-white/15 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next slide"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronRight className="text-white" size={18} />
        </motion.button>
      </div>
    </section>
  )
}
