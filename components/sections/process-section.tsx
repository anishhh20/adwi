"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
// Updated Icons for a more realistic workflow
import { Layout, GitBranch, Code, BarChart3, Rocket, Users, Target, Handshake, CheckCircle } from "lucide-react"

// --- 1. Revised Process Steps Data Structure for Alignment with ADWI Technologies ---
const processSteps = [
  {
    number: "01",
    title: "Understanding & Scoping",
    description: "Listen first to understand your goals, challenges, vision, and unique organizational culture. Deliverable: Clear Requirements & Strategic Direction.",
    icon: Target, // Represents defining the goal
  },
  {
    number: "02",
    title: "Tailored Strategy & Planning",
    description: "Design a personalized, agile, and scalable strategy. This involves solution architecture (Software) or identifying key leadership competencies (Staffing).",
    icon: GitBranch, // Represents branching/prototyping or strategic pathfinding
  },
  {
    number: "03",
    title: "Collaborative Implementation",
    description: "Develop the solution in iterative cycles (Software) or conduct transparent selection/placement (Staffing). Maintain open communication and rigorous quality checks.",
    icon: Handshake, // Represents collaboration and partnership
  },
  {
    number: "04",
    title: "Results & Ongoing Support",
    description: "Final implementation, launch, and validation. We ensure long-term satisfaction and retention, staying connected for continuous support and measurable impact.",
    icon: CheckCircle, // Represents completion and validation
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

// --- Process Card Component (Kept all styling and animations) ---
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
  // Determine a secondary, illustrative icon based on the step's primary icon/purpose
  let BackgroundIcon = Layout; // Default

  switch (step.title) {
    case "Understanding & Scoping":
      // Target/Goal
      BackgroundIcon = Target;
      break;
    case "Tailored Strategy & Planning":
      // Branching/Strategy
      BackgroundIcon = GitBranch;
      break;
    case "Collaborative Implementation":
      // Code/Development/Teamwork
      BackgroundIcon = Code;
      break;
    case "Results & Ongoing Support":
      // Rocket/Launch/Growth
      BackgroundIcon = Rocket;
      break;
    default:
      BackgroundIcon = Layout;
  }

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

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <BackgroundIcon className="w-48 h-48 text-primary/80 rotate-12 transition-transform duration-500 group-hover:rotate-0" />
        </div>

        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-mono font-extrabold mb-5 shadow-xl bg-accent text-accent-foreground border-4 border-accent/30 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <IconComponent className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300">{step.number}</span>
        </div>

        <h3 className="text-lg font-bold text-center mb-3 text-primary tracking-tight transition-colors group-hover:text-accent">{step.title}</h3>
        <p className="text-muted-foreground text-center text-sm leading-relaxed flex-grow">{step.description}</p>
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
    threshold: 0.10,
  })

  const lineDuration = 2.0
  const cardDelay = lineDuration - 0.2

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
    <section id="process" ref={ref} className="relative py-10 px-4 bg-background overflow-hidden">
      <BackgroundFlow />

      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Our <span className="text-accent">Strategic Partnership</span> Process
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We operate with a partnership mindset, listening first to align our personalized, agile strategies with your unique vision and goals for a measurable impact.
          </p>
        </div>

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