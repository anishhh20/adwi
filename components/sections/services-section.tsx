"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

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

const CameraIcon = (props: { className?: string }) => (
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
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
)

const HeartIcon = (props: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

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

const services: Service[] = [
  {
    id: "software",
    title: "Software Development",
    subtitle: "End-to-End Solutions",
    IconComponent: CodeIcon,
    description:
      "Modern IT solutions specializing in cloud, mobile and web services. We provide customized software services, web designing, mobile app development, and application solutions with a focus on automation.",
    details: [
      "Customized Software Services",
      "Web Designing & Hosting",
      "Mobile App Development",
      "Application Development",
      "2D & 3D Animation",
      "Content Management Websites",
    ],
  },
  {
    id: "recruitment",
    title: "Recruitment & Staffing",
    subtitle: "Right Talent Solutions",
    IconComponent: UsersIcon,
    description:
      "Finding the most experienced and proven candidates who make immediate and significant impact. We invest in long-term relationships, understanding your business goals, culture, and competitive landscape.",
    details: [
      "Executive Search",
      "Permanent Placement",
      "Project Staffing",
      "Leadership Matching",
      "Candidate Vetting",
      "Talent Retention",
    ],
  },
  {
    id: "animation",
    title: "2D/3D Animation",
    subtitle: "Creative Excellence",
    IconComponent: CameraIcon,
    description:
      "Professional 2D and 3D animation services including explainer videos, motion graphics, and character animation. We bring your ideas to life with cutting-edge creative solutions.",
    details: [
      "2D Explainer Videos",
      "3D Visualizations",
      "Motion Graphics",
      "Character Animation",
      "Architectural Visualization",
      "Post-Production Services",
    ],
  },
  {
    id: "csr",
    title: "CSR Activities",
    subtitle: "Social Responsibility",
    IconComponent: HeartIcon,
    description:
      "Comprehensive Corporate Social Responsibility strategies including CSR committee formation, policy development, NGO partnerships, and impact assessment for sustainable community development.",
    details: [
      "CSR Policy Development",
      "Committee Orientation",
      "Project Identification",
      "NGO Partnerships",
      "Impact Assessment",
      "Compliance & Audit",
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
    <section id="services" ref={sectionRef} className="py-12 md:py-20 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-2 md:mb-3">
            Comprehensive <span className="text-accent">Solutions</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            High-impact IT and staffing services designed to accelerate your growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-8 md:mb-10"
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
                className="relative p-3 md:p-4 rounded-lg transition-all duration-300 text-left z-10 text-xs md:text-sm"
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
                    className={`h-5 w-5 md:h-6 md:w-6 mb-2 transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <h3
                    className={`text-xs md:text-sm font-bold mb-0.5 transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isActive ? "text-primary/70" : "text-muted-foreground"
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
              className="bg-card border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
                {/* Left */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-3">{currentService.title}</h3>
                  <p className="text-sm md:text-base text-foreground mb-4 leading-relaxed border-l-4 border-accent pl-3">
                    {currentService.description}
                  </p>
                  <motion.button
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Consultation
                  </motion.button>
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
                      <CheckCircleIcon className="flex-shrink-0 h-4 w-4 mt-0.5 text-accent" />
                      <span className="text-foreground font-medium text-xs md:text-sm">{detail}</span>
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
