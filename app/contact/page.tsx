"use client"

import type React from "react"
import Footer from "@/components/footer"
import { useState } from "react"
import { motion } from "framer-motion"
import { MinimalAbstractPattern } from "@/components/minimal-abstract-pattern"

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

interface ContactCardProps {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  idx: number
}

function ContactCard({ icon, label, value, href, idx }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ y: -2 }}
      className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all group cursor-pointer"
    >
      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors text-accent">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
    </motion.a>
  )
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [enquiryType, setEnquiryType] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const targetEmail = enquiryType === "Language_Enquiry" ? "fladwitechnologies@gmail.com" : "info@adwitechnologies.com"

    console.log("Form submission started...")
    console.log("Target Email:", targetEmail)

    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1500)
  }

  return (
    <>
      <main className="w-full">
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
                Contact <span className="text-accent">Us</span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mt-4">
                Have questions or need our services? We'd love to hear from you. Reach out and let's explore how ADWI
                can help your business succeed.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-16 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Column */}
              <div className="lg:col-span-2 space-y-4 p-5 bg-card border border-border rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-foreground mb-3">Course & Student Details</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="enquiryLanguage" className="text-xs font-medium text-foreground block mb-2">
                      Enquiry For*
                    </label>
                    <select
                      id="enquiryLanguage"
                      required
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">Select Enquiry</option>
                      <option value="Language_Enquiry">Enquiry For Language</option>
                      <option value="General_Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name*"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Contact Number*"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">Gender*</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="email"
                      placeholder="Email Address*"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <select
                      required
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">I Am a:*</option>
                      <option value="Student">Student</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Residential Address*"
                    rows={2}
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-xs focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />

                  <div className="flex items-start">
                    <input
                      id="agreement"
                      type="checkbox"
                      required
                      className="w-3 h-3 text-accent bg-background border-border rounded focus:ring-accent/50 mt-1"
                    />
                    <label htmlFor="agreement" className="ml-2 text-xs text-muted-foreground">
                      I hereby declare that the information given by me in this form is true, correct, and complete in
                      all respects.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold transition-all disabled:opacity-50 text-sm"
                  >
                    {loading ? "Submitting..." : submitted ? "Enrollment Submitted!" : "Submit"}
                  </motion.button>
                </form>
              </div>

              {/* Contact Info Column */}
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-foreground mb-4">Contact Information</h2>
                {[
                  {
                    icon: <MailIcon />,
                    label: "FL Section Email",
                    value: "fladwitechnologies@gmail.com",
                    href: "mailto:fladwitechnologies@gmail.com",
                  },
                  {
                    icon: <MailIcon />,
                    label: "General Email",
                    value: "info@adwitechnologies.com",
                    href: "mailto:info@adwitechnologies.com",
                  },
                  {
                    icon: <PhoneIcon />,
                    label: "Phone",
                    value: "+91 7720077514",
                    href: "tel:+917720077514",
                  },
                  {
                    icon: <MapPinIcon />,
                    label: "Location",
                    value: "Warje, Pune - 411058",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <ContactCard
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    href={item.href}
                    idx={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <div className="w-full h-48 bg-card rounded-lg overflow-hidden border border-border shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6841482843486!2d73.8369869!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2cf2c2c2c2c2d%3A0x3c3c3c3c3c3c3c3c!2sWarje%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
