"use client"

import type React from "react"

import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"

// --- NEW/REPLACED COMPONENT: MinimalAbstractPattern ---
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

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
}

const Mail = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const Phone = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MapPin = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  return (
    <>
      <main className="w-full">
        {/* Hero */}
        <section className="py-12 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
          {/* --- Advanced Pattern Instances --- */}
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
          {/* ---------------------------------- */}
          <div className="container mx-auto max-w-6xl relative z-10"> {/* Added z-10 for text visibility */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                      >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                          Get in <span className="text-accent">Touch</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                          Have questions or need our services? We'd love to hear from you. Reach out and let's explore how ADWI
                can help your business succeed.
                        </p>
                      </motion.div>
                    </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Contact Information</h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Reach out to us through any of these channels.
                  </p>
                </div>

                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "adwitechnologies@gmail.com",
                    href: "mailto:adwitechnologies@gmail.com",
                  },
                  { icon: Phone, label: "Phone", value: "+91 7720077514 / +91 7720077515", href: "tel:+917720077514" },
                  { icon: MapPin, label: "Location", value: "D4/A/801, Rahul Park, Warje, Pune - 411058", href: "#" },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: false, margin: "-50px" }}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors text-accent">
                      <item.icon />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                onSubmit={handleSubmit}
                className="lg:col-span-2 space-y-4 md:space-y-5 p-6 md:p-8 bg-card border border-border rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />

                <textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-12 md:py-16 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={itemVariants}
              // Added transition for the map loading effect
              className={`w-full h-56 md:h-64 bg-card rounded-lg overflow-hidden border border-border shadow-sm relative transition-all duration-500`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6841482843486!2d73.8369869!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cf2c2c2c2c2d%3A0x3c3c3c3c3c3c3c3c!2sWarje%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ADWI Technologies Location"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}