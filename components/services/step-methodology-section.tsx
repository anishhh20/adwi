"use client"

import { motion } from "framer-motion"

interface Step {
  title: string
  description: string
  icon: string
}

interface StepMethodologySectionProps {
  title: string
  subtitle: string
  steps: Step[]
}

export default function StepMethodologySection({
  title,
  subtitle,
  steps,
}: StepMethodologySectionProps) {
  return (
    <section className="py-16 md:py-28 px-4 bg-card/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-base text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - visible on desktop only */}
          <motion.div
            className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="relative p-8 h-full bg-gradient-to-br from-background to-card/40 border border-border/60 hover:border-accent/80 rounded-2xl transition-all duration-500 shadow-md hover:shadow-2xl overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: idx * 0.12 + 0.2, type: "spring", stiffness: 150, damping: 12 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/60 rounded-xl flex items-center justify-center text-sm font-bold text-accent group-hover:from-accent/50 group-hover:to-accent/20 transition-colors duration-300"
                  >
                    {idx + 1}
                  </motion.div>

                  {/* Icon with enhanced animation */}
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 12, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-5xl mb-6 block group-hover:text-accent transition-colors duration-300 relative z-10"
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connecting dots for visual flow */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-4 top-16 w-8 h-1 bg-gradient-to-r from-accent/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.5 }}
                      viewport={{ once: true }}
                      style={{ originX: 0 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
