"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import BlobSVGPattern from "@/components/blob-svg-pattern"
import type React from "react"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.17, 0.55, 0.55, 1] },
    },
  }

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.12 + 0.3,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" ref={ref} className="py-12 md:py-24 px-4 bg-background overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-[50%_50%] lg:grid-cols-[40%_60%] gap-8 md:gap-16 items-center"
        >
          {/* <motion.div
            variants={itemVariants}
            className="relative w-full h-96 md:h-96 flex items-center justify-center order-2 md:order-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          > */}
          {/* <div className="absolute inset-0 scale-110">
              <BlobSVGPattern mouseTracking={true} />
            </div> */}

          <motion.img
            style={{ rotateX, rotateY }}
            src="/about.png"
            alt="ADWI Team"
            className="relative w-full h-full object-cover rounded-2xl md:rounded-3xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          {/* </motion.div> */}

          <motion.div variants={itemVariants} className="space-y-5 md:space-y-6 order-1 md:order-2">
            <motion.div variants={itemVariants} className="mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-3 md:mb-4 leading-tight">
                About <span className="text-accent">ADWI Technologies</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                A privately owned company that believes in itself. We treat your business as our own, providing access
                to top-tier candidates and employment opportunities through industry-leading technology and a global
                network. Our bottom line is always determined by results.
              </p>
            </motion.div>

            <div className="space-y-3 md:space-y-4">
              {[
                { title: "Expert Network", description: "India and global-wide network with proven candidates." },
                { title: "Results-Driven", description: "Bottom line always determined by measurable results." },
                { title: "Partnership Approach", description: "We treat your business as our own priority." },
              ].map(({ title, description }, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={featureItemVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex gap-3 p-3 md:p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all hover:bg-primary/5"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground shadow-md">
                      <AbstractCheckIcon className="h-5 w-5 stroke-2" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-foreground mb-0.5">{title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
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
