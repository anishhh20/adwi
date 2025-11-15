"use client"

import { motion } from "framer-motion"

interface AnimatedVectorPatternProps {
  className?: string
  colorClass?: string
  initialRotation?: number
  duration?: number
}

export default function AnimatedVectorPattern({
  className = "",
  colorClass = "text-primary/30",
  initialRotation = 0,
  duration = 90,
}: AnimatedVectorPatternProps) {
  return (
    <motion.div
      animate={{
        rotate: [initialRotation, 360 + initialRotation],
        x: [0, 8, -8, 0],
        y: [0, -5, 5, 0],
      }}
      transition={{
        rotate: {
          duration,
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
      }}
      className={`absolute opacity-15 pointer-events-none ${className}`}
      style={{ willChange: "transform" }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={colorClass}>
        {/* Geometric Grid Pattern */}
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
        
        {/* Radial Lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x = 100 + 85 * Math.cos(rad)
          const y = 100 + 85 * Math.sin(rad)
          return (
            <line key={angle} x1="100" y1="100" x2={x} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.4" />
          )
        })}
        
        {/* Central Element */}
        <rect x="85" y="85" width="30" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    </motion.div>
  )
}
