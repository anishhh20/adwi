"use client"

import { motion } from "framer-motion"

interface ServiceHeroProps {
  badge: string
  title: string
  titleHighlight: string
  description: string
  ctaText: string
  ctaHref: string
}

export default function ServiceHeroSection({
  badge,
  title,
  titleHighlight,
  description,
  ctaText,
  ctaHref,
}: ServiceHeroProps) {
  return (
    <section className="py-16 md:py-32 px-4 bg-gradient-to-br from-primary/8 via-background to-accent/5 relative overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl"
        animate={{
          y: [0, 30, -20, 0],
          x: [0, 15, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      />
      <motion.div
        className="absolute bottom-0 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          y: [0, -25, 15, 0],
          x: [0, -20, 10, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ willChange: "transform" }}
      />

      {/* Additional decorative element */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-8"
          >
            <div className="px-6 py-3 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full border border-accent/40 text-accent text-sm font-semibold hover:from-accent/30 hover:to-primary/30 transition-colors duration-300">
              ✨ {badge}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-8 leading-tight"
          >
            {title} <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse">
              {titleHighlight}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.a
              href={ctaHref}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-xl font-semibold shadow-lg shadow-accent/40 hover:shadow-accent/60 transition-all duration-300 relative group overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent/50 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                {ctaText}
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
