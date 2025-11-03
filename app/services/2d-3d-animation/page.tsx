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

export default function Animation2D3DPage() {
  const services = [
    {
      title: "2D Animation",
      description: "Engaging 2D animations for explainer videos, marketing content, and storytelling.",
      icon: "🎨",
    },
    {
      title: "3D Visualization",
      description: "High-quality 3D renderings for product showcases and architectural designs.",
      icon: "🏗️",
    },
    {
      title: "Motion Graphics",
      description: "Dynamic motion graphics for branding, presentations, and digital content.",
      icon: "✨",
    },
    {
      title: "Character Animation",
      description: "Professional character animation bringing your characters to life.",
      icon: "🎭",
    },
    {
      title: "Visual Effects",
      description: "Cutting-edge VFX for commercials, films, and digital experiences.",
      icon: "🎬",
    },
    {
      title: "Post-Production",
      description: "Professional editing, color grading, and sound design services.",
      icon: "🎵",
    },
  ]

  const advantages = [
    "Professional animation team with expertise",
    "State-of-the-art animation technology",
    "End-to-end production support",
    "Custom concept development",
    "Multiple revision rounds included",
    "Timely delivery and professionalism",
  ]

  const tools = ["Blender & Maya", "Cinema 4D", "After Effects", "Premiere Pro", "Unreal Engine", "Motion Capture"]

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
                  Animation & Creative
                </motion.div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
                Compelling <span className="text-accent">Animation Solutions</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional 2D and 3D animation services bringing your ideas to life. We specialize in creating
                compelling visual content that engages audiences and communicates your message effectively.
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
                Comprehensive 2D and 3D animation solutions for all your creative needs.
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

        {/* Key Advantages */}
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
              <p className="text-base text-muted-foreground">Excellence in every frame, every project, every time.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {advantages.map((advantage, idx) => (
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
                  <span className="text-sm md:text-base font-medium text-foreground">{advantage}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Tools & Technologies</h2>
              <p className="text-base text-muted-foreground">
                Industry-leading software and tools for premium quality output.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tools.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="p-4 bg-card border border-border hover:border-accent/50 rounded-lg text-center font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
                <CTA />


        {/* Related Services Section */}
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
              <p className="text-base text-muted-foreground">Discover our comprehensive solution offerings</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Software Development",
                  desc: "End-to-end software solutions and innovative technology",
                  link: "/services/software-development",
                },
                {
                  title: "Recruitment & Staffing",
                  desc: "Connect with top-tier talent and skilled professionals",
                  link: "/services/recruitment-staffing",
                },
                {
                  title: "CSR Activities",
                  desc: "Making meaningful social responsibility impact",
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
