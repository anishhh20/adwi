"use client"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { motion } from "framer-motion"
import ServiceHeroSection from "@/components/services/service-hero-section"
import ServiceGridSection from "@/components/services/service-grid-section"
import RelatedServicesSection from "@/components/services/related-services-section"
import AnimatedVectorPattern from "@/components/services/animated-vector-pattern"
import CTA from "@/components/CTA"

export default function ServicesPage() {
  const services = [
    {
      id: "software-development",
      title: "Software Development",
      href: "/services/software-development",
      icon: "💻",
      description: "Building custom web, mobile, and cloud applications tailored to your business needs.",
    },
    {
      id: "recruitment-staffing",
      title: "Recruitment and Staffing",
      href: "/services/recruitment-staffing",
      icon: "👥",
      description: "Strategic talent acquisition and staffing solutions for finding the best IT professionals.",
    },
    {
      id: "it-training-certification",
      title: "IT Training and Certification",
      href: "/services/training-certification",
      icon: "🎓",
      description: "Industry-recognized training and certification programs to upskill your team.",
    },
    {
      id: "foreign-language",
      title: "Foreign Language",
      href: "/services/foreign-language",
      icon: "🌍",
      description: "Professional courses in various foreign languages for business and personal growth.",
    },
  ]

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
        <ServiceHeroSection
          badge="Our Expertise"
          title="Our"
          titleHighlight="Services"
          description="Comprehensive IT solutions and staffing services designed to accelerate your growth and deliver measurable results. Discover how we can transform your business."
          ctaText="Explore Services"
          ctaHref="#services"
        />

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Why Choose ADWI</h2>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto">
                Industry-leading expertise with a proven track record of success and client satisfaction.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8 }}
                  className="p-8 bg-background rounded-xl border border-border hover:border-accent/50 transition-all shadow-lg group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    initial={{ scale: 0.8, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: idx * 0.15 + 0.2 }}
                    className="text-4xl mb-4 group-hover:scale-110 transition-transform"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="font-extrabold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section id="services" className="py-16 md:py-28 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Comprehensive Services</h2>
              <p className="text-base text-muted-foreground">
                Tailored solutions designed to drive innovation and accelerate your business growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) => (
                <motion.a
                  key={service.id}
                  href={service.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -12, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
                  className="group relative overflow-hidden p-8 h-80 bg-gradient-to-br from-card to-card/50 border border-border hover:border-accent/60 rounded-xl transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Icon with animation */}
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.2, rotate: 8 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl mb-4 group-hover:text-accent transition-colors duration-300"
                  >
                    {service.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-base text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-accent font-bold mt-6">
                      Explore
                      <motion.span
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />
      </main>
      <Footer />
    </>
  )
}
