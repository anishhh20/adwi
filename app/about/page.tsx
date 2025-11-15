"use client"

import Footer from "@/components/footer"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type React from "react"
import CTA from "@/components/CTA"

// --- NEW COMPONENT: MinimalAbstractPattern ---
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
// ---------------------------------------------


// CheckIcon component wrapped in motion.div for animation control
const MotionCheckIcon = ({ className, initialColor = "text-muted-foreground/50", activeColor = "text-primary" }: { className?: string, initialColor?: string, activeColor?: string }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className}`}
    initial={{ opacity: 0.6, scale: 0.8, color: initialColor }}
    variants={{
        initial: { opacity: 0.6, scale: 0.8, color: initialColor },
        hovered: { 
            opacity: 1, 
            scale: 1, 
            color: activeColor,
            transition: { 
                type: "spring", 
                stiffness: 700, 
                damping: 30 
            }
        }
    }}
  >
    <path d="M20 6L9 17l-5-5" />
  </motion.svg>
)

export default function AboutPage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // Container variant for stagger
  const listContainerVariants = {
    hovered: {
      transition: {
        staggerChildren: 0.08, // Stagger delay between items
      },
    },
  }
  
  // Item variant for individual checkmark animation
  const checkmarkItemVariants = {
    initial: { opacity: 1 }, // Retain the initial state for the list item itself
    hovered: { opacity: 1 },
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  // --- Data for simplified section rendering ---
  const keyPrinciples = [
    {
      title: "Our Philosophy",
      content:
        "We treat your business as our own. We believe in listening and understanding your needs before developing, deploying, and continuing to support your success.",
      icon: "🎯",
    },
    {
      title: "Our Approach",
      content:
        "Industry-leading technology combined with proven methodologies. We maintain open dialogue with clients throughout every stage, ensuring expectations are met.",
      icon: "🚀",
    },
    {
      title: "Our Commitment",
      content:
        "The bottom line is always determined by results. We focus on delivering measurable outcomes and ensuring smooth transitions with comprehensive support.",
      icon: "💎",
    },
  ]
  
  const coreServices = [
    { title: "Software Development", icon: "💻", href: "/services/software-development" },
    { title: "Recruitment & Staffing", icon: "👥", href: "/services/recruitment-staffing" },
    { title: "IT Training & Certification", icon: "🎓", href: "/services/it-training" },
    { title: "Foreign Language", icon: "🌐", href: "/services/foreign-language" },
  ]
  
  const aboutSections = [
    {
      icon: "🔍",
      title: "What We Do",
      items: [
        "We connect clients with top-tier talent across industries.",
        "We open doors for candidates to access exceptional career opportunities.",
        "We understand the critical importance of matching the right person to the right role.",
      ]
    },
    {
      icon: "💡",
      title: "How We Work",
      items: [
        "We leverage industry-leading technology and a robust India-wide and global network of offices.",
        "Our approach is results-driven, ensuring measurable impact for every client.",
        "Our extensive staffing network enables us to fulfill urgent and specialized hiring needs with speed and precision.",
      ]
    },
    {
      icon: "🤝",
      title: "Why Choose Us",
      items: [
        "Proven expertise in workforce solutions",
        "Personalized service with a partnership mindset",
        "Agile and scalable recruitment strategies",
      ]
    },
  ]
  // ---------------------------------------------


  return (
    <>
      <main className="w-full">
        {/* Hero - Minimized and Aesthetic */}
        <section className="py-16 md:py-32 px-4 bg-gradient-to-br from-primary/15 via-background to-accent/5 relative overflow-hidden">
          
          {/* --- Advanced Pattern Instances --- */}
          {/* Top-Right Pattern (Accent color accent) */}
          <MinimalAbstractPattern
            className="top-0 right-0 translate-x-1/2 -translate-y-1/2"
            colorClass="text-accent/50"
            initialRotation={20}
          />
          {/* Bottom-Left Pattern (Primary color accent) */}
          <MinimalAbstractPattern
            className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
            colorClass="text-primary/50"
            initialRotation={-30}
          />
          {/* ---------------------------------- */}

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Simplified H1 */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-4 leading-tight">
                Add <span className="text-accent">Value</span> To Your Business
              </h1>
              {/* Stronger Subtext */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mt-6">
                ADWI Technologies – Empowering Talent, Driving Results. We treat your business as our own, built on a foundation of trust, innovation, and commitment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Story Section - Modularized Content */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> 
              
              {/* Image with Mouse Tracking */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative h-96 flex items-center justify-center rounded-3xl overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  style={{ rotateX, rotateY }}
                  src="/aboutMain.png"
                  alt="ADWI Team"
                  className="relative w-full h-full object-cover"
                  transition={{ type: "spring", stiffness: 80 }}
                />
              </motion.div>

              {/* Modular Content Section - ENHANCED */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Identity</h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  ADWI Technologies is a privately owned organization built on a foundation of trust, innovation, and commitment. We deliver tailored staffing solutions that align with your goals and values, treating your business as our own.
                </p>
              </motion.div>

            </div>

            {/* Grid for Modular Sections - ENHANCED: Individual Item Stagger on Hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aboutSections.map((section, sectionIdx) => (
                <motion.div
                  key={sectionIdx}
                  initial="initial"
                  whileInView="initial"
                  variants={checkmarkItemVariants} // Use item variants here only for inView animation, not for hover control
                  whileHover="hovered" // This will trigger the overall list variant
                  transition={{ duration: 0.5, delay: sectionIdx * 0.15 }}
                  viewport={{ once: false, margin: "-50px" }}
                  // ENHANCED HOVER EFFECT ON CARD
                  className="p-5 bg-card rounded-xl border border-border space-y-3 shadow-lg transition-all duration-300 relative group" // Added 'group'
                >
                  <motion.h3 
                      className="text-lg font-bold text-foreground flex flex-col items-start gap-2"
                  >
                    {/* ENHANCED ICON EFFECT */}
                    <motion.span 
                        className="text-4xl text-accent p-2 rounded-lg bg-accent/10"
                        // Hover on the parent card will trigger this
                        variants={{
                            initial: { scale: 1, rotate: 0 },
                            hovered: { scale: 1.15, rotate: 5 } // Icon scale and subtle rotation
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        {section.icon}
                    </motion.span>
                      {section.title}
                  </motion.h3>
                  
                  {/* Motion List Container for Stagger Effect */}
                  <motion.div 
                    className="space-y-2 pt-2"
                    variants={listContainerVariants} // Apply stagger children here
                  >
                    {section.items.map((item, itemIdx) => (
                      <motion.div 
                        key={itemIdx} 
                        className="flex gap-2 text-sm text-muted-foreground items-start"
                        variants={checkmarkItemVariants} // Use item variants here only to allow stagger
                      >
                        {/* Check Icon with Animation */}
                        <MotionCheckIcon 
                            className="w-4 h-4 mt-1 flex-shrink-0" 
                            initialColor="text-muted-foreground/50"
                            activeColor="text-primary"
                            // The parent `whileHover="hovered"` will propagate the "hovered" state to this component via stagger
                        />
                        <span className="leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values - Horizontal Aesthetic Layout - ENHANCED Hover */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Guiding Principles</h2>
            <div className="flex flex-col md:flex-row gap-6"> 
              {keyPrinciples.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ 
                    translateY: -8, // More noticeable lift
                    boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.15)",
                    borderColor: "var(--color-primary)" // Assuming your primary color is defined
                  }}
                  className="flex-1 p-8 bg-background rounded-xl border border-border shadow-lg hover:border-primary/50 transition-all text-center"
                >
                  <motion.div 
                    className="text-5xl mb-4 leading-none"
                    whileHover={{ scale: 1.2, rotate: [-10, 10, -10, 0] }} // This array caused the error
                    // FIX: Changed to tween transition to allow multi-keyframe array rotation
                    transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
                  >
                    {item.icon}
                  </motion.div> 
                  <h3 className="text-xl font-bold text-foreground mb-3 border-b border-accent/30 pb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats (Retained) */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Impact</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[{ number: "Global", label: "Network" }, { number: "1000s", label: "Candidates Placed" }, { number: "Trusted", label: "By Industry" }, { number: "Results", label: "Driven" },].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ scale: 1.05, borderColor: "var(--color-accent)" }} // Subtle stat hover
                  className="text-center p-6 bg-card rounded-xl border border-border shadow-md hover:border-accent/50 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview - Aesthetic Card Grid */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
              <p className="text-base text-muted-foreground mt-2">Comprehensive solutions for your business needs.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {coreServices.map((service, idx) => (
                <motion.a
                  href={service.href}
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: -6, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} // Lift and shadow on hover
                  className="p-6 bg-background border border-border hover:border-accent/50 rounded-xl text-center transition-all cursor-pointer shadow-lg"
                >
                  <div className="text-5xl mb-4">{service.icon}</div> 
                  <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
              <CTA />

      </main>
      <Footer />
    </>
  )
}