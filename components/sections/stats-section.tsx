"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "../CountUp"

interface Stat {
  label: string
  value: number
  suffix: string
  duration: number
}

const stats: Stat[] = [
  {
    label: "Projects Delivered",
    value: 150,
    suffix: "+",
    duration: 2,
  },
  {
    label: "Happy Clients",
    value: 200,
    suffix: "+",
    duration: 2.5,
  },
  {
    label: "Team Members",
    value: 25,
    suffix: "+",
    duration: 2,
  },
  {
    label: "Recognitions",
    value: 1200,
    suffix: "+",
    duration: 2.5,
  },
]

const AnimatedCounter = ({ value, duration, suffix }: { value: number; duration: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (!inView) return

    let currentCount = 0
    // Calculate increment based on duration in seconds and 60 FPS
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      currentCount += increment
      if (currentCount >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentCount))
      }
    }, 1000 / 60) // Update every 1/60th of a second (60 FPS)

    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
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

  return (
    // Add relative positioning to the section to ensure the fixed background is contained and the content is above it
    <section id="stats" ref={ref} className="relative py-10 px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/paralled.png')" }} // <-- CHANGE THIS PATH TO YOUR IMAGE
      >
        {/* Optional: Add a dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content Container (Needs higher z-index to appear above the background) */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Our Track <span className="text-accent">Record</span>
          </h2>
          <p className="text-sm text-white/75 leading-relaxed">
            Proven expertise in delivering measurable results for our clients.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              // Increased text contrast by making background more solid for readability over the image
              className="text-center p-5 md:p-6 bg-white/5 backdrop-blur-lg rounded-lg border border-white/20 hover:border-white/50 transition-colors group shadow-lg"
              whileHover={{ y: -3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.15 + idx * 0.08, type: "spring", stiffness: 100 }}
                className="mb-3"
              >
                <p
                  className="text-lg sm:text-xl md:text-2xl font-bold text-accent"
                >
                  <CountUp
                    from={0}
                    to={stat.value}
                    separator=","
                    direction="up"
                    duration={1}
                  />+
                </p>
              </motion.div>
              <p className="text-white/80 text-xs md:text-sm font-medium mt-1">{stat.label}</p>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
