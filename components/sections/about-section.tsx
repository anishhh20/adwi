"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const AbstractCheckIcon = ({ className }: { className?: string }) => (
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

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section id="about" ref={ref} className="py-8 md:py-12 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Image */}
          <motion.img
            variants={itemVariants}
            src="/about.png"
            alt="ADWI Team"
            className="w-full h-auto object-cover rounded-lg"
          />

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                About <span className="text-accent">ADWI Technologies</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A privately owned company that believes in itself. We treat your business as our own, providing access
                to top-tier candidates and employment opportunities through industry-leading technology and a global
                network.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {[
                { title: "Expert Network", description: "India and global-wide network with proven candidates." },
                { title: "Results-Driven", description: "Bottom line always determined by measurable results." },
                { title: "Partnership Approach", description: "We treat your business as our own priority." },
              ].map(({ title, description }, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex gap-2 p-2 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-accent-foreground">
                      <AbstractCheckIcon className="h-4 w-4 stroke-2" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-foreground">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
