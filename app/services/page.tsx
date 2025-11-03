// Enhanced page.tsx
"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"
import DesktopCarousel from "@/components/DesktopCarousel"
import { useRef } from "react" // Import useRef
import CTA from "@/components/CTA"

// --- NEW COMPONENT: MinimalAbstractPattern (Vector Pattern) ---
interface PatternProps {
  className?: string
  colorClass?: string
  initialRotation?: number
}

const MinimalAbstractPattern: React.FC<PatternProps> = ({
  className = "",
  colorClass = "text-primary/30",
  initialRotation = 0,
}) => {
  const rotation = initialRotation % 360 // Ensure initial rotation is valid

  const patternVariants = {
    animate: {
      rotate: [rotation, 360 + rotation], // Subtle 360 rotation loop
      x: [0, 8, -8, 0],    // Subtle horizontal sway
      y: [0, -5, 5, 0],    // Subtle vertical float
      pathOffset: [0, 0.5, 1, 0.5, 0], // Advanced 'drawing' effect
      transition: {
        rotate: {
          duration: 90,
          ease: "linear",
          repeat: Infinity,
        },
        x: {
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        y: {
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        pathOffset: {
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    },
  }

  return (
    <motion.div
      variants={patternVariants}
      animate="animate"
      className={`absolute h-48 w-48 md:h-72 md:w-72 opacity-20 pointer-events-none ${className}`}
      style={{ transformOrigin: '50% 50%' }}
    >
      {/* Abstract Grid/Line SVG for a modern look */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
        <path
          d="M 10 10 L 90 90 M 10 90 L 90 10 M 50 10 V 90 M 10 50 H 90"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="100" // Required for path animation
          // Framer motion uses 'style' to apply animated properties
          style={{ pathLength: 1, pathOffset: 0 }} 
        />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="20" y="20" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  )
}
// ------------------------------------------------------------------

// 1. ENHANCED ServiceCard with complex hover animation and better theme utilization
// From the enhanced page.tsx
const ServiceCard = ({ service, idx }: { service: any; idx: number }) => (
  <motion.a
    href={service.href}
    // Initial entrance animation
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: idx * 0.1 }}

    // Enhanced hover for a 'lift' and 'shadow' effect
    whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(var(--color-primary-rgb), 0.2)" }}

    className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/80 transition-all h-80 duration-500 will-change-transform"
  >
    {/* Background gradient overlay - now more vibrant on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Animated icon background - adds subtle movement */}
    <motion.div
      initial={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.4 }}
      className="absolute -top-12 -right-12 w-48 h-48 bg-accent/15 rounded-full blur-3xl transition-colors duration-500"
    />

    <div className="relative p-8 h-full flex flex-col justify-between">
      <div>
        {/* Icon Container - Larger and changes color on hover */}
        <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/40 transition-colors duration-300">
          <div className="text-2xl">{service.icon}</div>
        </div>

        {/* Title - Bold and uses primary color on hover */}
        <h2 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
          {service.title}
        </h2>

        <p className="text-base text-muted-foreground line-clamp-3">{service.description}</p>
      </div>

      {/* Footer link - Uses primary color for emphasis */}
      <div className="flex items-center gap-2 text-primary font-bold text-base mt-4">
        Explore <motion.span whileHover={{ x: 6 }} className="transition-transform duration-300">→ </motion.span>
      </div>
    </div>
  </motion.a>
)

// 2. STICKY/PARALLAX IMPLEMENTATION FOR "WHY CHOOSE US" SECTION
const WhyChooseUsItem = ({ item, idx }: { item: { title: string; desc: string }; idx: number }) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: idx * 0.2 }} // Increased delay and duration for a more staggered effect
    viewport={{ once: true, margin: "-100px" }} // Changed to once: true for single appearance
    className="p-8 bg-background rounded-2xl border-2 border-border hover:border-accent/70 transition-all duration-500 text-center shadow-lg hover:shadow-xl" // Enhanced styling
  >
    <motion.div
      initial={{ rotate: -10 }}
      whileInView={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: idx * 0.2 }}
      className="text-4xl mb-4 text-accent" // Icon emphasis
    >
      {/* Using a better icon than a checkmark for visual interest */}
      {idx === 0 && "🚀"}
      {idx === 1 && "🏆"}
      {idx === 2 && "📞"}
    </motion.div>
    <h3 className="font-extrabold text-xl text-foreground mb-2">{item.title}</h3>
    <p className="text-sm text-muted-foreground">{item.desc}</p>
  </motion.div>
);

export default function ServicesPage() {
  const services = [
    {
      id: "software-development",
      title: "Software Development",
      href: "/services/software-development",
      icon: "💻",
      description: "Custom applications, web, mobile, and cloud solutions built with cutting-edge technology.",
    },
    {
      id: "recruitment-staffing",
      title: "Recruitment & Staffing",
      href: "/services/recruitment-staffing",
      icon: "👥",
      description: "Strategic talent acquisition and staffing solutions for businesses of all sizes.",
    },
    {
      id: "2d-3d-animation",
      title: "2D/3D Animation",
      href: "/services/2d-3d-animation",
      icon: "🎬",
      description: "Engaging animations and visual content that bring your brand story to life.",
    },
    {
      id: "csr-activities",
      title: "CSR Activities",
      href: "/services/csr-activities",
      icon: "❤️",
      description: "Corporate social responsibility initiatives creating positive community impact.",
    },
  ]

  const whyChooseUsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: whyChooseUsRef, offset: ["start end", "end start"] });

  // Use the scroll progress to transform the scale of the title to create a "sticky/zoom" effect
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [1, 1.05]);

  return (
    <>
      <Header />

      <main className="w-full">
        {/* Hero Section - Minor animation refinement */}
        <section className="py-20 md:py-36 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5 relative overflow-hidden">
          
          {/* --- ADVANCED ANIMATED VECTOR PATTERNS --- */}
          {/* Top-Right Pattern (Primary color accent) */}
          <MinimalAbstractPattern
            className="top-0 right-0 translate-x-1/2 -translate-y-1/2"
            colorClass="text-primary/50"
            initialRotation={20}
          />
          {/* Bottom-Left Pattern (Accent color accent) */}
          <MinimalAbstractPattern
            className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
            colorClass="text-accent/50"
            initialRotation={-30}
          />
          {/* ----------------------------------------- */}

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Larger initial y-offset
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }} // Spring physics
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                Our <span className="text-accent">Services</span>
              </h1>
             <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive IT solutions and staffing services designed to accelerate your growth and deliver
                measurable results. Discover how we can transform your business.
              </p>
            </motion.div>
          </div>
        </section>

        <DesktopCarousel />

        {/* Services Grid - Using ServiceCard with enhanced hovers */}
        <section className="py-16 md:py-28 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <ServiceCard key={service.id} service={service} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Enhanced Why Choose Us Section with Scroll-driven Sticky/Scale effect */}
        <section className="py-16 md:py-28 px-4 bg-card/50" ref={whyChooseUsRef}>
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
                  <motion.span style={{ scale }}>Why Choose ADWI</motion.span> {/* Applied scale transform */}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Industry-leading expertise with a proven track record of success and client satisfaction.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Expert Team", desc: "50+ talented professionals with years of experience across multiple domains." },
                { title: "Proven Results", desc: "1000+ successful projects delivered worldwide with a 98% client retention rate." },
                { title: "24/7 Support", desc: "Dedicated support team always ready to assist you around the clock, globally." },
              ].map((item, idx) => (
                <WhyChooseUsItem key={idx} item={item} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Fixed background for Parallax effect remains */}
              <CTA />

      </main>
      <Footer />
    </>
  )
}