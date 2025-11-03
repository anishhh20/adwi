"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
// Updated Icons for a more realistic workflow
import { Layout, GitBranch, Code, BarChart3, Rocket } from "lucide-react"

// --- 1. Revised Process Steps Data Structure for Realism & Productivity ---
const processSteps = [
  {
    number: "01",
    title: "Discovery & Planning",
    description: "Validate the business case, define success metrics (KPIs), map user stories, and establish the technical architecture. Deliverable: Project Scope & Sprint Backlog.",
    icon: Layout,
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Create wireframes, high-fidelity mockups, and interactive prototypes. Conduct user testing and integrate feedback before development begins.",
    icon: GitBranch, // Represents branching/prototyping before main development
  },
  {
    number: "03",
    title: "Agile Implementation",
    description: "Develop the solution in short, iterative sprints. Focus on clean, maintainable code, continuous integration (CI), and rigorous unit testing.",
    icon: Code,
  },
  {
    number: "04",
    title: "Launch & Validation",
    description: "Full system testing (QA), controlled deployment, and go-live. Monitor immediate post-launch performance against the defined KPIs and gather critical user data.",
    icon: Rocket,
  },
]

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.5,
}

// --- Background Animation (Kept as is) ---
const BackgroundFlow = () => (
  <motion.div
    className="absolute inset-0 opacity-[0.05] overflow-hidden pointer-events-none"
    initial={{ backgroundPosition: "0% 50%" }}
    animate={{ backgroundPosition: "100% 50%" }}
    transition={{
      duration: 120,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
    style={{
      backgroundImage: "linear-gradient(90deg, #003D82 0%, transparent 25%, transparent 75%, #FF9500 100%)",
      backgroundSize: "200% 200%",
    }}
  />
)

// --- Process Card Component (Minor description update for focus) ---
function ProcessCard({ step, isLast }: { step: (typeof processSteps)[0], isLast: boolean }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const IconComponent = step.icon;

  return (
    <motion.div variants={itemVariants} className="relative z-10 h-full">
      <motion.div
        className="bg-card/90 backdrop-blur-sm border-2 border-primary/10 rounded-2xl p-7 md:p-9 shadow-2xl transition-all h-full flex flex-col items-center text-center group ring-1 ring-primary/5 hover:border-accent/50"
        whileHover={{
          translateY: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(74, 144, 226, 0.4)",
        }}
        transition={spring}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-mono font-extrabold mb-5 shadow-xl bg-accent text-accent-foreground border-4 border-accent/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <IconComponent className="w-8 h-8 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">{step.number}</span>
        </div>

        <h3 className="text-2xl font-extrabold text-center mb-3 text-primary tracking-tight transition-colors group-hover:text-accent">{step.title}</h3>
        <p className="text-muted-foreground text-center text-base leading-relaxed flex-grow">{step.description}</p>
      </motion.div>

      {!isLast && (
        <div className="block lg:hidden absolute top-[calc(100%-1.5rem)] left-1/2 -translate-x-1/2 h-16 w-0.5 bg-gradient-to-b from-accent/70 to-transparent z-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}

      {!isLast && (
        <div className="block md:hidden absolute top-[calc(100%-2rem)] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          {/* Using BarChart3 to represent measurement and next step */}
          <BarChart3 className="w-6 h-6 rotate-90 text-accent/50" />
        </div>
      )}
    </motion.div>
  )
}

// --- Main Section Component (Updated Header) ---
export default function ProcessSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  const lineDuration = 2.5
  const cardDelay = lineDuration - 0.9

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: cardDelay,
      },
    },
  }

  return (
    <section id="process" ref={ref} className="relative py-20 md:py-32 px-4 bg-background overflow-hidden">
      <BackgroundFlow />

      <div className="container mx-auto max-w-7xl relative z-20">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-3 md:mb-4">
            Our <span className="text-accent">Agile, Result-Driven</span> Process
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We operate in iterative cycles with clear milestones, focusing on early validation and continuous delivery for maximum velocity and predictable outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative pt-8"
        >
          {/* Horizontal Connector Line with Animated SVG Path (Kept as is) */}
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 z-0">
            <svg width="100%" height="15" viewBox="0 0 1000 15" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4A90E2" />
                  <stop offset="33%" stopColor="#003D82" />
                  <stop offset="66%" stopColor="#87CEEB" />
                  <stop offset="100%" stopColor="#FF9500" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.path
                d="M 0 8 C 250 1 250 15 500 8 S 750 1 1000 8"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="15 8"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: lineDuration, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {processSteps.map((step, idx) => (
              <ProcessCard
                key={idx}
                step={step}
                isLast={idx === processSteps.length - 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}