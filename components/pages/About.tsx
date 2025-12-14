"use client"

import Footer from "@/components/footer"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type React from "react"
import CTA from "@/components/CTA"
import { MinimalAbstractPattern } from "@/components/minimal-abstract-pattern"

const MotionCheckIcon = ({
  className,
  initialColor = "text-muted-foreground/50",
  activeColor = "text-primary",
}: {
  className?: string
  initialColor?: string
  activeColor?: string
}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className}`}
    initial={{ opacity: 0.6, scale: 0.8, color: initialColor }}
    variants={{
      initial: { opacity: 0.6, scale: 0.8, color: initialColor },
      hovered: {
        opacity: 1,
        scale: 1,
        color: activeColor,
        transition: {
          type: "spring",
          stiffness: 700,
          damping: 30,
        },
      },
    }}
  >
    <path d="M20 6L9 17l-5-5" />
  </motion.svg>
)

export default function AboutPage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const listContainerVariants = {
    hovered: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const checkmarkItemVariants = {
    initial: { opacity: 1 },
    hovered: { opacity: 1 },
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const keyPrinciples = [
    {
      title: "Our Philosophy",
      content:
        "We treat your business as our own. We believe in listening and understanding your needs before developing, deploying, and continuing to support your success.",
      icon: "🎯",
    },
    {
      title: "Our Approach",
      content:
        "Industry-leading technology combined with proven methodologies. We maintain open dialogue with clients throughout every stage, ensuring expectations are met.",
      icon: "🚀",
    },
    {
      title: "Our Commitment",
      content:
        "The bottom line is always determined by results. We focus on delivering measurable outcomes and ensuring smooth transitions with comprehensive support.",
      icon: "💎",
    },
  ]

  const coreServices = [
    { title: "Software Development", icon: "💻", href: "/services/#software-development" },
    { title: "Recruitment & Staffing", icon: "👥", href: "/services/#recruitment-staffing" },
    { title: "IT Training & Certification", icon: "🎓", href: "/services/#it-training" },
    { title: "Foreign Language", icon: "🌐", href: "/services/#foreign-language" },
  ]

  const aboutSections = [
    {
      icon: "🔍",
      title: "What We Do",
      items: [
        "We connect clients with top-tier talent across industries.",
        "We open doors for candidates to access exceptional career opportunities.",
        "We understand the critical importance of matching the right person to the right role.",
      ],
    },
    {
      icon: "💡",
      title: "How We Work",
      items: [
        "We leverage industry-leading technology and a robust India-wide and global network of offices.",
        "Our approach is results-driven, ensuring measurable impact for every client.",
        "Our extensive staffing network enables us to fulfill urgent and specialized hiring needs with speed and precision.",
      ],
    },
    {
      icon: "🤝",
      title: "Why Choose Us",
      items: [
        "Proven expertise in workforce solutions",
        "Personalized service with a partnership mindset",
        "Agile and scalable recruitment strategies",
      ],
    },
  ]

  return (
    <>
      <main className="w-full bg-linear-to-br from-accent/15 via-background to-primary/5">
        <section className="py-12 md:py-20 px-4 bg-linear-to-br from-card to-accent/10 relative overflow-hidden">
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight">
                Add <span className="text-accent">Value</span> To Your Business
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mt-4">
                ADWI Technologies – Empowering Talent, Driving Results. We treat your business as our own, built on a
                foundation of trust, innovation, and commitment.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative h-80 flex items-center justify-center rounded-2xl overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  style={{ rotateX, rotateY }}
                  src="/abt.png"
                  alt="ADWI Team"
                  className="relative w-full h-full object-cover"
                  transition={{ type: "spring", stiffness: 80 }}
                />
              </motion.div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Our <span className="text-accent"> Core Identity</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ADWI Technologies is a privately owned organization built on a foundation of trust, innovation, and
                  commitment. We deliver tailored staffing solutions that align with your goals and values, treating
                  your business as our own.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aboutSections.map((section, sectionIdx) => (
                <motion.div
                  key={sectionIdx}
                  initial="initial"
                  whileInView="initial"
                  variants={checkmarkItemVariants}
                  whileHover="hovered"
                  transition={{ duration: 0.5, delay: sectionIdx * 0.15 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="p-4 bg-card rounded-lg border border-border space-y-3 shadow-lg transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Faded Background Icon (using section.icon) */}
                  <motion.div
                    className="absolute text-[6rem] opacity-10 text-accent/50 pointer-events-none bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 rotate-6"
                    initial={{ scale: 0.9, rotate: 6 }}
                    whileHover={{ scale: 1.05, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {section.icon}
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-foreground flex flex-col items-start gap-2">
                      <motion.span
                        className="text-3xl text-accent p-2 rounded-lg bg-accent/10"
                        variants={{
                          initial: { scale: 1, rotate: 0 },
                          hovered: { scale: 1.15, rotate: 5 },
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {section.icon}
                      </motion.span>
                      {section.title}
                    </h3>

                    <motion.div className="space-y-2 pt-2" variants={listContainerVariants}>
                      {section.items.map((item, itemIdx) => (
                        <motion.div
                          key={itemIdx}
                          className="flex gap-2 text-xs md:text-sm text-muted-foreground items-start"
                          variants={checkmarkItemVariants}
                        >
                          <MotionCheckIcon
                            className="w-3 h-3 mt-1 flex-shrink-0"
                            initialColor="text-muted-foreground/50"
                            activeColor="text-primary"
                          />
                          <span className="leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16 px-4">
          <div className="container mx-auto space-y-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl text-center md:text-3xl font-bold text-primary">
                Our <span className="text-accent">Guiding Principles</span>
              </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-5">
              {keyPrinciples.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{
                    translateY: -6,
                    boxShadow: "0 10px 20px -6px rgba(0, 0, 0, 0.1)",
                  }}
                  className="flex-1 p-6 rounded-lg border border-border shadow-md hover:border-primary/50 transition-all text-center relative overflow-hidden"
                >
                  {/* Faded Background Icon */}
                  <motion.div
                    className="absolute text-[8rem] opacity-5 text-accent/50 pointer-events-none top-0 right-0 transform translate-x-1/4 -translate-y-1/4"
                    initial={{ scale: 0.9, rotate: 0 }}
                    // You can add a subtle animation on hover to the background icon as well
                    whileHover={{ scale: 1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  {/* Original content - ensure it has a higher z-index if needed, or rely on default flow */}
                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl mb-3 leading-none"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-lg font-bold text-foreground mb-2 border-b border-accent/30 pb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl text-center md:text-3xl font-bold text-primary">
                Our <span className="text-accent">Impact</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { number: "Global", label: "Network" },
                { number: "1000s", label: "Candidates" },
                { number: "Trusted", label: "By Industry" },
                { number: "Results", label: "Driven" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-card/40 rounded-lg border border-border shadow-md hover:border-accent/50 transition-all relative overflow-hidden"
                >
                  {/* Faded Background Icon (using a generic diamond icon) */}
                  <motion.div
                    className="absolute text-7xl opacity-25 text-primary/40 pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    💎
                  </motion.div>
                  <div className="relative z-10">
                    <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.number}</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Our <span className="text-accent">Services</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comprehensive solutions for your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {coreServices.map((service, idx) => (
                <motion.a
                  href={service.href}
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: -4 }}
                  className="p-4 border border-border hover:border-accent/50 rounded-lg text-center transition-all cursor-pointer shadow-md"
                >
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-sm font-bold text-foreground">{service.title}</h3>
                </motion.a>
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
