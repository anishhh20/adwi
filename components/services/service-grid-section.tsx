"use client"

import { motion } from "framer-motion"

interface GridItem {
  title: string
  description: string
  icon: string
}

interface ServiceGridSectionProps {
  title: string
  subtitle: string
  items: GridItem[]
  variant?: "3-col" | "2-col"
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function ServiceGridSection({
  title,
  subtitle,
  items,
  variant = "3-col",
}: ServiceGridSectionProps) {
  const gridClass = variant === "3-col" 
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1 md:grid-cols-2"

  return (
    <section className="py-16 md:py-28 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
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

        {/* Grid Items */}
        <motion.div
          className={`grid ${gridClass} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <div className="relative overflow-hidden p-8 h-full bg-gradient-to-br from-card via-background to-card/50 border border-border/60 hover:border-accent/80 rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Animated border glow effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-accent/40 to-primary/40 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500 -z-10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.5 }}
                />

                {/* Icon with enhanced animation */}
                <motion.div
                  initial={{ scale: 1, rotate: 0, y: 0 }}
                  whileHover={{ scale: 1.25, rotate: 12, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-5xl mb-6 group-hover:text-accent transition-colors duration-300 inline-block"
                >
                  {item.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    whileHover={{ opacity: 1, x: 4 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-accent font-semibold mt-6 text-sm"
                  >
                    <span>Learn more</span>
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
