"use client"

import Footer from "@/components/footer"
import { motion, useMotionValue, useTransform } from "framer-motion"
import type React from "react"
import CTA from "@/components/CTA"

// --- NEW COMPONENT: MinimalAbstractPattern ---
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
// ---------------------------------------------


const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function AboutPage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

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

  return (
    <>
      <main className="w-full">
        {/* Hero */}
        <section className="py-16 md:py-28 px-4 bg-gradient-to-br from-primary/15 via-background to-accent/5 relative overflow-hidden">
          
          {/* --- Advanced Pattern Instances --- */}
          {/* Top-Right Pattern (Accent color accent) */}
          <MinimalAbstractPattern
            className="top-0 right-0 translate-x-1/2 -translate-y-1/2"
            colorClass="text-accent/50"
            initialRotation={20}
          />
          {/* Bottom-Left Pattern (Primary color accent) */}
          <MinimalAbstractPattern
            className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
            colorClass="text-primary/50"
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
                About <span className="text-accent">ADWI Technologies</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A privately owned company that believes in itself. We treat your business as our own, providing
                exceptional IT solutions, expert recruitment, and staffing services with a focus on results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Story Section */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image with Mouse Tracking */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative h-72 md:h-96 flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Removed commented-out BlobSVGPattern code */}
                <motion.img
                  style={{ rotateX, rotateY }}
                  src="/aboutMain.png"
                  alt="ADWI Team"
                  className="relative w-full h-full object-cover rounded-2xl md:rounded-3xl "
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Story</h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    ADWI Technologies is a privately owned company committed to treating your business as our own. We
                    operate an India and global-wide network of offices with very good network of staffing subordinates
                    for fulfilling immediate client requirements.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    We believe in finding the right person for the right job. Using industry-leading technology and
                    proven methodologies, we deliver results that matter. Our bottom line is always determined by
                    measurable results and client satisfaction.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">What We Offer</h3>
                  <div className="space-y-2">
                    {[
                      "Software Development & Solutions",
                      "Recruitment & Staffing Services",
                      "2D & 3D Animation Services",
                      "CSR Activities & Impact Programs",
                    ].map((service, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        viewport={{ once: false, margin: "-50px" }}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-accent font-bold">•</span>
                        <span>{service}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
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
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 md:py-24 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Impact</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { number: "Global", label: "Network" },
                { number: "1000s", label: "Candidates Placed" },
                { number: "Trusted", label: "By Industry" },
                { number: "Results", label: "Driven" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  className="text-center p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 md:py-24 px-4 bg-card/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, margin: "-100px" }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
              <p className="text-base text-muted-foreground mt-2">Comprehensive solutions for your business needs.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { title: "Software Development", icon: "💻", href: "/services/software-development" },
                { title: "Recruitment & Staffing", icon: "👥", href: "/services/recruitment-staffing" },
                { title: "2D/3D Animation", icon: "🎬", href: "/services/2d-3d-animation" },
                { title: "CSR Activities", icon: "❤️", href: "/services/csr-activities" },
              ].map((service, idx) => (
                <motion.a
                  href={service.href}
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: -4 }}
                  className="p-5 md:p-6 bg-background border border-border hover:border-primary/50 rounded-xl text-center transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-base md:text-lg font-bold text-foreground">{service.title}</h3>
                </motion.a>
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