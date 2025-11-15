"use client"

import { motion } from "framer-motion"

interface FeatureListSectionProps {
  title: string
  subtitle: string
  features: string[]
  backgroundColor?: "background" | "card"
}

const CheckIcon = () => (
  <motion.svg
    className="w-6 h-6 text-accent flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={{ scale: 0, rotate: -180 }}
    whileInView={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  </motion.svg>
)

export default function FeatureListSection({
  title,
  subtitle,
  features,
  backgroundColor = "card",
}: FeatureListSectionProps) {
  const bgClass = backgroundColor === "card" ? "bg-card/30" : "bg-background"

  return (
    <section className={`py-16 md:py-28 px-4 ${bgClass} relative overflow-hidden`}>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/3 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl -z-10" />

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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ x: 8, y: -2 }}
              className="group"
            >
              <div className="relative overflow-hidden p-6 bg-gradient-to-br from-background to-card/40 rounded-xl border border-border/50 hover:border-accent/60 transition-all duration-300 shadow-sm hover:shadow-lg h-full">
                {/* Hover gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Content */}
                <div className="relative z-10 flex gap-4 items-start">
                  <CheckIcon />
                  <span 
                    className="text-sm md:text-base font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed flex-1" 
                    dangerouslySetInnerHTML={{ __html: feature }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
