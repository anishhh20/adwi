"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { RocketIcon } from "lucide-react"

// --- Icons (Keeping original icons and adding new ones) ---
// Note: Using existing icons where appropriate and keeping original names for consistency.

// Software Development (CodeIcon)
const CodeIcon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
)

// Recruitment & Staffing (UsersIcon)
const UsersIcon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

// IT Training and Certification (Graduation Cap Icon - using a new icon)
const GraduationCapIcon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6.91 16.27A10 10 0 0 1 12 16c2.47 0 4.75-.82 6.09-2.27" />
    <path d="M12 2v20" />
  </svg>
)

// Foreign Language (Book Open Icon - using a new icon)
const BookOpenIcon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 13.5c.3 1.8 1.4 3.4 3.3 4.4L12 22l6.7-4.1c1.9-1.1 3-2.7 3.3-4.4M2 13.5V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.5M2 13.5c0-3 3-5 10-5s10 2 10 5M12 5V2" />
  </svg>
)

// CheckCircleIcon for details list
const CheckCircleIcon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M9 11l3 3L22 4" />
  </svg>
)

interface Service {
  id: string
  title: string
  subtitle: string
  IconComponent: React.FC<{ className?: string }>
  description: string
  details: string[]
}

// --- Updated Services Array ---
const services: Service[] = [
  {
    id: "software",
    title: "Software Development",
    subtitle: "Niche, Essential, and Easy-to-Integrate Services",
    IconComponent: CodeIcon,
    description:
      "We deliver niche, essential, and easy-to-integrate services that empower businesses to thrive in the digital age. We are your strategic partners, not just service providers .",
    details: [
      "Custom Software Development ",
      "Web Design & Development ",
      "Mobile App & Application Development ",
      "End-to-End Software Development Methodologies ",
      "Automation-Driven Product Solutions ",
      "2D & 3D Animation Services ",
      "Content Management Website Solutions ",
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment and Staffing",
    subtitle: "Empowering Organizations with Proven Leadership Talent",
    IconComponent: UsersIcon,
    description:
      "We specialize in identifying and placing experienced, high-impact leaders who drive immediate results and long-term transformation. Our candidates are proven performers ready to elevate your organization.",
    details: [
      "Identifying and Placing Experienced, High-Impact Leaders ",
      "Understanding Your Business Goals and Strategic Direction ",
      "Focusing on Leadership Competencies Essential for Success ",
      "Analyzing Market Position and Competitive Landscape ",
      "Understanding Your Unique Organizational Culture ",
      "Ensuring Long-term Satisfaction and Retention ",
    ],
  },
  {
    id: "training",
    title: "IT Training and Certification",
    subtitle: "Fast-Track Your Career in the IT Industry!",
    IconComponent: GraduationCapIcon,
    description:
      "Certification is your gateway to success for both technical and leadership positions. Invest in your future with our industry-recognized certification programs.",
    details: [
      "Project Management (PMP, PRINCE2) ",
      "Information Security (CISA, CISM, CRISC) ",
      "IT Service Management (ITIL) ",
      "Cloud & Infrastructure (AWS, Azure, VMware) ",
      "Software Testing (ISTQB) ",
      "Enterprise Architecture (TOGAF) ",
      "Networking & Systems (Cisco, Oracle) ",
    ],
  },
  {
    id: "language",
    title: "Foreign Language",
    subtitle: "Unlock Global Opportunities with Foreign Language Training!",
    IconComponent: BookOpenIcon,
    description:
      "Learning a foreign language is a gateway to personal and professional growth in today’s interconnected world. We recognize the rising demand for multilingual professionals in India and beyond.",
    details: [
      "Comprehensive Training in English ",
      "Comprehensive Training in German ",
      "Comprehensive Training in French ",
      "Comprehensive Training in Japanese ",
      "Comprehensive Training in Spanish ",
      "Boosting Career and Enabling Study Abroad Opportunities ",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing and Promotions",
    subtitle: "Elevate Your Brand with Data-Driven and Cinematic Storytelling",
    IconComponent: RocketIcon, // Assuming a RocketIcon or MegaphoneIcon exists in your library
    description:
      "We combine strategic digital marketing with high-end cinematic production to build your brand’s presence and drive measurable growth. From social management to conceptual short films, we create content that resonates.",
    details: [
      "Strategic Social Media Management & Growth",
      "High-Converting Landing Page Design & Creation",
      "Engaging Post & Viral Reel Creation",
      "ROI-Focused Paid Ads Management (Meta, Google, LinkedIn)",
      "Professional Documentary Storytelling",
      "Cinematic Conceptual Videos & Short Films",
    ],
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState("software")
  const [autoPlay, setAutoPlay] = useState(true)
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const currentService = services.find((s) => s.id === activeService)
  const shouldAutoPlay = autoPlay && inView

  useEffect(() => {
    if (!shouldAutoPlay) return

    const timer = setInterval(() => {
      setActiveService((prev) => {
        const currentIdx = services.findIndex((s) => s.id === prev)
        return services[(currentIdx + 1) % services.length].id
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [shouldAutoPlay])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
  }

  return (
    <section id="services" ref={sectionRef} className="py-10 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Comprehensive <span className="text-accent">Solutions</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            High-impact IT and staffing services designed to accelerate your growth.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 mb-6"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {services.map((service) => {
            const isActive = activeService === service.id
            return (
              <motion.button
                key={service.id}
                variants={cardVariants}
                onClick={() => setActiveService(service.id)}
                className="relative p-3 rounded-lg transition-all duration-300 text-left z-10 text-xs"
                whileHover={{ y: -2 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-service-pill"
                    className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg z-0"
                  />
                )}

                <div className={`relative z-10`}>
                  <service.IconComponent
                    className={`h-3 w-3 md:h-4 md:w-4 mb-1 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                  <h3
                    className={`text-xs font-bold mb-0.5 transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-[10px] transition-colors duration-300 ${isActive ? "text-primary/70" : "text-muted-foreground"
                      }`}
                  >
                    {service.subtitle}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Service Details */}
        <AnimatePresence mode="wait">
          {currentService && (
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                {/* Left */}
                <div className="md:col-span-2">
                  <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{currentService.title}</h3>
                  <p className="text-xs md:text-sm text-foreground mb-3 leading-relaxed border-l-4 border-accent pl-3">
                    {currentService.description}
                  </p>
                  {/* <motion.button
                    className="px-4 py-2 bg-accent text-white/95 rounded-lg font-semibold text-xs hover:opacity-90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Consultation
                  </motion.button> */}
                </div>

                {/* Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {currentService.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * idx + 0.4 }}
                      className="flex items-start gap-2 p-2.5 bg-background rounded-md border border-border/70 hover:border-primary/50 transition-colors"
                    >
                      <CheckCircleIcon className="flex-shrink-0 h-3 w-3 mt-0.5 text-accent" />
                      <span className="text-foreground font-medium text-xs">{detail}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}