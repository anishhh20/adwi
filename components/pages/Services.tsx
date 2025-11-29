"use client"

import type React from "react"

import Footer from "@/components/footer"
import Header from "@/components/header"
import CTA from "@/components/CTA"
import AnimatedVectorPattern from "@/components/services/animated-vector-pattern"
import { ServiceWithStickyText } from "@/components/services/service-with-sticky-text"
import { allServicesData } from "@/lib/services-data"
import { motion } from "framer-motion"

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
  const rotation = initialRotation % 360

  const patternVariants = {
    animate: {
      rotate: [rotation, 360 + rotation],
      x: [0, 8, -8, 0],
      y: [0, -5, 5, 0],
      pathOffset: [0, 0.5, 1, 0.5, 0],
      transition: {
        rotate: {
          duration: 90,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
        x: {
          duration: 12,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
        y: {
          duration: 16,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        },
        pathOffset: {
          duration: 20,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        },
      },
    },
  }

  return (
    <motion.div
      variants={patternVariants}
      animate="animate"
      className={`absolute h-48 w-48 md:h-72 md:w-72 opacity-20 pointer-events-none ${className}`}
      style={{ transformOrigin: "50% 50%" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={colorClass}
      >
        <path
          d="M 10 10 L 90 90 M 10 90 L 90 10 M 50 10 V 90 M 10 50 H 90"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="100"
          style={{ pathLength: 1, pathOffset: 0 }}
        />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="20" y="20" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  )
}

export default function ServicesPage() {
  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "50+ talented professionals with years of experience across multiple domains.",
      icon: "🚀",
    },
    {
      title: "Proven Results",
      description: "1000+ successful projects delivered worldwide with a 98% client retention rate.",
      icon: "🏆",
    },
    {
      title: "24/7 Support",
      description: "Dedicated support team always ready to assist you around the clock, globally.",
      icon: "📞",
    },
  ]

  return (
    <>
      <Header />
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary/15 via-background to-accent/5 relative overflow-hidden">
          <MinimalAbstractPattern
            className="top-0 right-0 translate-x-1/2 -translate-y-1/2"
            colorClass="text-accent/50"
            initialRotation={20}
          />
          <MinimalAbstractPattern
            className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
            colorClass="text-primary/50"
            initialRotation={-30}
          />

          <div className="container mx-auto max-w-5xl relative z-10 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-3 leading-tight">
                Our <span className="text-accent">Services</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mt-4">
                Comprehensive IT solutions and staffing designed to accelerate your growth. See how we can transform
                your business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-28 px-4 bg-card/30 relative overflow-hidden">
          <AnimatedVectorPattern
            className="top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-64 md:h-64"
            colorClass="text-accent/40"
            initialRotation={20}
            duration={120}
          />
          <AnimatedVectorPattern
            className="bottom-10 left-10 md:bottom-20 md:left-20 w-48 h-48 md:w-64 md:h-64"
            colorClass="text-primary/30"
            initialRotation={-40}
            duration={150}
          />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Why Choose <span className="text-accent">ADWI</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Industry-leading expertise with a proven track record of success and client satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-background rounded-xl border border-border hover:border-accent/50 transition-all shadow-lg group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-2xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-extrabold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section with Sticky Text */}
        <section id="services" className="py-16 md:py-28 px-4 bg-background relative">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Our Comprehensive <span className="text-accent">Services</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tailored solutions designed to drive innovation and accelerate your business growth. All our offerings
                are detailed below.
              </p>
            </div>

            <div className="space-y-12 md:space-y-16 lg:space-y-20">
              {allServicesData.map((service, index) => (
                <ServiceWithStickyText key={service.id} service={service} index={index} isExpanded={true} />
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
