"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

export default function SoftwareDevelopmentPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  const services = [
    {
      title: "Customized Software Services",
      description: "Tailored applications built for your unique business requirements and workflows.",
      icon: "⚙️",
    },
    {
      title: "Web Designing & Hosting",
      description: "Modern, responsive web applications using cutting-edge technologies and frameworks.",
      icon: "🌐",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps delivering exceptional user experiences.",
      icon: "📱",
    },
    {
      title: "Application Development",
      description: "Robust enterprise applications with scalable architecture and secure design.",
      icon: "💾",
    },
    {
      title: "2D & 3D Animation",
      description: "Professional 2D and 3D animation services for engaging visual content.",
      icon: "🎬",
    },
    {
      title: "Content Management Websites",
      description: "Easy-to-manage CMS platforms for dynamic content and continuous updates.",
      icon: "📚",
    },
  ]

  const features = [
    "End-to-end development lifecycle",
    "Easy, niche, and essential services",
    "24/7 support & maintenance",
    "Custom solutions tailored to needs",
    "Focus on automation",
    "Listen & understand before developing",
  ]

  const methodologies = [
    "End-to-End Software Development",
    "Agile & Iterative Approach",
    "Continuous Integration",
    "Quality Assurance & Testing",
    "Security & Compliance First",
    "Scalable Architecture Design",
  ]

  return (
    <>
      <main className="w-full" ref={ref}>
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
                  Software Development
                </motion.div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                Modern IT <span className="text-accent">Solutions</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                End-to-end software development specializing in cloud, mobile, and web services. We listen and
                understand your needs before we develop, deploy, and continue supporting with a focus on automation and
                innovation.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold transition-all"
              >
                Start Your Project
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
                Comprehensive software development services tailored to your needs.
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

        {/* Key Features */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why Choose Us</h2>
              <p className="text-base text-muted-foreground">
                Experience excellence in software development with our proven expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature, idx) => (
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
                  <span className="text-sm md:text-base font-medium text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Methodologies */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Development Approach</h2>
              <p className="text-base text-muted-foreground">
                We believe in listening, understanding, and delivering exceptional results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {methodologies.map((methodology, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="p-4 bg-card border border-border hover:border-accent/50 rounded-lg text-center font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {methodology}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
               <CTA />


        {/* Related Services */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Our Other Services</h2>
              <p className="text-base text-muted-foreground">Check out our comprehensive service offerings</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Recruitment & Staffing",
                  desc: "Access top-tier talent with our expert recruitment solutions",
                  link: "/services/recruitment-staffing",
                },
                {
                  title: "2D/3D Animation",
                  desc: "Compelling animation solutions for engaging visual content",
                  link: "/services/2d-3d-animation",
                },
                {
                  title: "CSR Activities",
                  desc: "Corporate social responsibility programs making a difference",
                  link: "/services/csr-activities",
                },
              ].map((service, idx) => (
                <motion.a
                  key={idx}
                  href={service.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                  className="p-6 bg-gradient-to-br from-card to-card/50 border border-border hover:border-accent/50 rounded-xl transition-all group"
                >
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                  <div className="mt-4 inline-block text-accent font-semibold group-hover:translate-x-1 transition-transform">
                    Learn More →
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
