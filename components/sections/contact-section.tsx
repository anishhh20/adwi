"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Phone, Mail, MapPin, Send } from "lucide-react"
// 1. Import the image
import Image from 'next/image'; // Use next/image for optimized images

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // State to track if the map has loaded
  const [mapLoaded, setMapLoaded] = useState(false)

  // Use a higher threshold for a smoother "on load" feel
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      value: "Warje, Pune - 411058, India",
      isLink: false,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7720077514",
      href: "tel:+917720077514",
      isLink: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "adwitechnologies@gmail.com",
      href: "mailto:adwitechnologies@gmail.com",
      isLink: true,
    },
  ]

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Form submitted (simulated):", formData)
    // Simulating a real submission with a subtle delay before reset
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      alert("Message sent successfully! (Simulated)") // Added user feedback
    }, 500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

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

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  }

  // Custom class for the subtle background movement effect
  const MovingBackground = () => (
    <div
      className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(var(--tw-color-primary) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        animation: "move-bg 60s linear infinite",
      }}
    />
  )

  // Custom Gradient Button Component
  const GradientButton = ({ children, ...props }: any) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      // Key changes: relative, p-[2px] for border, inner div for background/content
      className="w-full relative p-0.5 rounded-xl font-bold transition-all text-lg shadow-md hover:shadow-lg overflow-hidden group"
      {...props}
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 rounded-[11px] bg-linear-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 animate-pulse-slow" />
      {/* Content Layer */}
      <div className="relative w-full flex items-center justify-center gap-3 px-8 py-3 bg-primary text-primary-foreground rounded-xl transition-all duration-300 group-hover:bg-primary/90 z-10">
        {children}
      </div>
    </motion.button>
  )

  return (
    <section
      id="contact"
      ref={ref}
      // Changed bg-gray-50 to a more subtle gray-100 for light mode for better contrast
      className="relative py-12 md:py-20 px-4 bg-background overflow-hidden"
    >
      {/* Subtle Moving Background Pattern */}
      <MovingBackground />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Let's Start a <span className="text-accent">Conversation</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ready to build something amazing? Send a message or contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left - Contact Information (1 column on mobile, 1 on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-1 space-y-4"
          >
            {/* 2. ADDED: Image integrated as a prominent block in the left column */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              // Set to hidden on small screens, shown only on large screens to save mobile space
              className="hidden lg:block w-full rounded-lg overflow-hidden"
            >
              <Image
                src="/contact.png"
                alt="3D illustration of a woman next to a large phone with a 'Let's Start a Conversation' chat bubble"
                className="w-full h-auto object-cover"
                layout="responsive"
                width={500}
                height={500}
                quality={100}
              />
            </motion.div>
            {/* END ADDED: Image Container */}

            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                // Modern Card Design with subtle shadow and strong hover effect
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="flex gap-3 p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-sm text-foreground mb-0.5">{info.label}</h3>
                    {info.isLink ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground text-xs hover:text-primary transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-xs">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right - Contact Form (2 columns on desktop) */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            // Elevated Form container design with Glassmorphism for dark mode
            className="lg:col-span-2 bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm"
          >
            <h3 className="text-lg md:text-xl font-extrabold text-foreground mb-4 md:mb-6">Send a Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name Input */}
              <motion.div variants={formItemVariants}>
                <label className="block text-foreground text-xs md:text-sm font-semibold mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // Modern Input Styling
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  placeholder="Your name"
                  required
                />
              </motion.div>
              {/* Email Input */}
              <motion.div variants={formItemVariants}>
                <label className="block text-foreground text-xs md:text-sm font-semibold mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  // Modern Input Styling
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>

            {/* Subject Input */}
            <motion.div variants={formItemVariants} className="mb-4">
              <label className="block text-foreground text-xs md:text-sm font-semibold mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                // Modern Input Styling
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                placeholder="Inquiry subject"
                required
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div variants={formItemVariants} className="mb-6">
              <label className="block text-foreground text-xs md:text-sm font-semibold mb-1.5">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                // Modern Textarea Styling
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm resize-none"
                placeholder="Your message..."
                rows={4}
                required
              />
            </motion.div>

            {/* Submit Button - Animated Gradient Border */}
            <GradientButton>
              <Send size={20} />
              Send Secure Message
            </GradientButton>

            {/* Map - Visually integrated with the contact section */}
            <motion.div
              variants={itemVariants}
              // Added transition for the map loading effect
              className={`w-full h-56 md:h-64 bg-card rounded-lg overflow-hidden border border-border shadow-sm relative transition-all duration-500 mt-6 ${!mapLoaded ? "blur-sm grayscale" : ""}`}
            >
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs z-20 bg-card/80">
                  Loading Map...
                </div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6841482843486!2d73.8369869!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cf2c2c2c2c2d%3A0x3c3c3c3c3c3c3c3c!2sWarje%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ADWI Technologies Location"
                onLoad={() => setMapLoaded(true)} // Set state when iframe loads
              />
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}