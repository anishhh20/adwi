"use client"

import { motion } from "framer-motion"

// Performance-optimized particle effect for hero sections
export function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Gradient border effect - unique visual element
interface GradientBorderProps {
  children: React.ReactNode
  className?: string
}

export function GradientBorder({ children, className = "" }: GradientBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ boxShadow: "0 0 30px rgba(105, 179, 0, 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="relative bg-background rounded-xl">{children}</div>
    </motion.div>
  )
}

// Staggered list animation
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Parallax scroll effect hook
import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function useParallaxScroll(offset = 50) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  return { ref, y }
}

// Hover lift effect - reusable variant
export const hoverLiftVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}
