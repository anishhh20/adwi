"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

export default function CSRActivitiesPage() {
  const services = [
    {
      title: "CSR Strategy Development",
      description: "Formation of CSR committee and developing policies aligned with your values.",
      icon: "📋",
    },
    {
      title: "Community Projects",
      description: "Impactful initiatives creating positive change in local and global communities.",
      icon: "🌍",
    },
    {
      title: "NGO Partnerships",
      description: "Strategic partnerships with NGOs as implementation partners.",
      icon: "🤝",
    },
    {
      title: "Project Development",
      description: "Project identification and development synced with CSR policy.",
      icon: "📈",
    },
    {
      title: "Implementation & Monitoring",
      description: "Implementation guidelines and monitoring & evaluation systems.",
      icon: "👥",
    },
    {
      title: "Audit & Assessment",
      description: "Audit and impact assessment of CSR projects and initiatives.",
      icon: "✅",
    },
  ]

  const activities = [
    "Formation of CSR Committee",
    "CSR Policy Development",
    "CSR Team Building",
    "Projects Identification & Development",
    "Implementation Guidelines Setup",
    "NGO Partnership Selection",
    "Audit & Impact Assessment",
    "Customized Training Programs",
  ]

  const benefits = [
    "Measurable Social Impact",
    "Board Director Training",
    "Community Welfare",
    "Sustainable Practices",
    "Stakeholder Engagement",
    "Transparent Reporting",
  ]

  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <section className="py-16 md:py-28 px-4 bg-gradient-to-br from-primary/15 via-background to-accent/5 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div
            className="absolute bottom-0 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block mb-4">
                <motion.div className="px-4 py-2 bg-accent/20 rounded-full border border-accent/40 text-accent text-sm font-semibold">
                  Corporate Social Responsibility
                </motion.div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                Make Real <span className="text-accent">Social Impact</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Build meaningful corporate social responsibility programs. From CSR committee formation and policy
                development to project identification and NGO partnerships, we help you create lasting positive impact
                while strengthening your organization.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold transition-all"
              >
                Start Your CSR Journey
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
              <p className="text-base text-muted-foreground">
                Comprehensive CSR solutions creating lasting positive impact.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 rounded-xl transition-all group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our CSR Activities</h2>
              <p className="text-base text-muted-foreground">
                Comprehensive approach covering all aspects of corporate social responsibility.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activities.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="flex gap-3 items-start p-4 bg-background rounded-lg border border-border/50 hover:border-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckIcon />
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground">{activity}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CSR Benefits */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why CSR Matters</h2>
              <p className="text-base text-muted-foreground">
                Strategic CSR initiatives creating value for society and your organization.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="p-4 bg-card border border-border hover:border-accent/50 rounded-lg text-center font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {benefit}
                </motion.div>
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
