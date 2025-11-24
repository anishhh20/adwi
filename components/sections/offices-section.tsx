"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Phone, Mail, Globe, ArrowRight } from 'lucide-react'
import GlareHover from "../GlareHover"

const officeLocations = [
  {
    city: "Pune, India (HQ)",
    address: "D4/A/801, Rahul Park, Warje, Pune, India, Maharashtra 411014",
    phone: "+91 7720077514",
    email: "adwitechnologies@gmail.com",
    country: "🇮🇳",
  },
  {
    city: "Mumbai, India",
    address: "Vidyavihar East, Mumbai, 400077.",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇮🇳",
  },
  {
    city: "Dubai, UAE",
    address: "M1010 Al Wadi Building, Sheikh Zayed Road, Dubai, United Arab Emirates",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇦🇪",
  },
  {
    city: "Germany",
    address: "Steglitzer damm, 12169 Berlin, Germany",
    phone: "",
    email: "adwitechnologies@gmail.com",
    country: "🇩🇪",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function OfficeCard({ office, index }: { office: (typeof officeLocations)[0], index: number }) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ]
  const color = colors[index]

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group relative">
      <GlareHover
        glareColor="#000000"
        glareOpacity={0.1}
        glareAngle={-30}
        glareSize={300}
        transitionDuration={800}
        playOnce={false}
        width="100%"
        height="100%"
        background="transparent" // Will be overridden by child div's gradient
        borderRadius="1rem" // 2xl is 1rem (16px)
        borderColor="transparent" // Border is applied to the child div
        className="!p-0 !border-0" // Remove default GlareHover padding/border
      >
        {/* The original card content is now the child of GlareHover */}
        <div className="relative border border-primary/20 rounded-2xl p-6 md:p-8 h-full group-hover:border-primary/50 transition-all duration-300 shadow-xl w-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-2xl mb-2">{office.country}</div>
              <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{office.city}</h3>
            </div>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-white`}
            >
              <Globe className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div className="flex items-start gap-3 text-sm group-hover:translate-x-1 transition-transform">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
              <span className="text-muted-foreground leading-relaxed">{office.address}</span>
            </motion.div>

            <motion.a href={`tel:${office.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group-hover:translate-x-1">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{office.phone}</span>
            </motion.a>

            <motion.a href={`mailto:${office.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors group-hover:translate-x-1">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground truncate">{office.email}</span>
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-background rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </GlareHover>
    </motion.div>
  )
}

export default function OfficesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="offices" ref={ref} className="relative py-20 md:py-32 px-4 bg-background overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-2 md:mb-3">
            Our Global <span className="text-accent">Offices</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                        A network of strategic locations to deliver high-impact IT and staffing services across the globe.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {officeLocations.map((office, idx) => (
            <OfficeCard key={office.city} office={office} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}