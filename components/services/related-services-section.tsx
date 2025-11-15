"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface RelatedService {
  title: string
  description: string
  link: string
}

interface RelatedServicesSectionProps {
  services: RelatedService[]
}

export default function RelatedServicesSection({ services }: RelatedServicesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 md:py-28 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Our Other Services</h2>
          <p className="text-base text-muted-foreground">Discover what else we can offer your business</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link href={service.link}>
                <motion.div
                  whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}
                  className="group h-full p-8 bg-gradient-to-br from-card via-background to-card/40 border border-border/60 hover:border-accent/80 rounded-2xl transition-all duration-500 cursor-pointer relative overflow-hidden shadow-md hover:shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/8 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-0.5 bg-gradient-to-r from-accent/30 to-primary/30 rounded-2xl opacity-0 group-hover:opacity-40 blur transition-opacity duration-500 -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.4 }}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 0 }}
                      whileHover={{ opacity: 1, x: 4 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-accent font-semibold text-sm mt-6"
                    >
                      <span>Learn More</span>
                      <motion.span
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
