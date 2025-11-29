"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Mail, Globe } from 'lucide-react'
import GlareHover from "../GlareHover"

const officeLocations = [
  {
    city: "Pune, India (HQ)",
    address: "Warje, Pune, India, Maharashtra 411014",
    phone: "+91 7720077514",
    email: "info@adwitechnologies.com",
    country: "🇮🇳",
  },
  {
    city: "Mumbai, India",
    address: "Vidyavihar East, Mumbai, 400077.",
    phone: "",
    email: "info@adwitechnologies.com",
    country: "🇮🇳",
  },
  {
    city: "Dubai, UAE",
    address: "M1010 Al Wadi Building, Sheikh Zayed Road, Dubai, United Arab Emirates",
    phone: "",
    email: "info@adwitechnologies.com",
    country: "🇦🇪",
  },
  {
    city: "Germany",
    address: "Steglitzer damm, 12169 Berlin, Germany",
    phone: "",
    email: "info@adwitechnologies.com",
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

export function OfficeCard({ office, index }: { office: (typeof officeLocations)[0], index: number }) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ]
  const color = colors[index]

  const primaryColorClass = color.split(' ')[0].replace('from-', 'text-'); // e.g., 'from-blue-500' -> 'text-blue-500'

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
          <div
            className={`absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 select-none opacity-[0.03] text-[10rem] md:text-[12rem] z-0 pointer-events-none font-extrabold ${primaryColorClass}`}
            style={{
              lineHeight: '1',
            }}
          >
            {office.country}
          </div>

          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-xl mb-2">{office.country}</div>
              <h3 className="text-sm md:text-base font-bold text-foreground">{office.city}</h3>
            </div>
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-white`}
            >
              <Globe className="w-4 h-4" />
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div className="flex items-start gap-3 text-xs group-hover:translate-x-1 transition-transform">
              <MapPin className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground ">{office.address}</span>
            </motion.div>

            {/* <motion.a href={`tel:${office.phone}`} className="flex items-center gap-3 text-xs hover:text-primary transition-colors group-hover:translate-x-1">
              <Phone className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{office.phone}</span>
            </motion.a> */}

            <motion.a href={`mailto:${office.email}`} className="flex items-center gap-3 text-xs hover:text-primary transition-colors group-hover:translate-x-1">
              <Mail className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-muted-foreground truncate">{office.email}</span>
            </motion.a>
          </div>
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
    <section id="offices" ref={ref} className="relative py-8 md:py-10 px-4 bg-background overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Our Global <span className="text-accent">Offices</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A network of strategic locations to deliver high-impact IT and staffing services across the globe.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10" // Added margin bottom for spacing
        >
          {officeLocations.map((office, idx) => (
            <OfficeCard key={office.city} office={office} index={idx} />
          ))}
        </motion.div>

        {/* ✨ MODIFICATION: Centering Container and Button Width ✨ */}
        <div className="flex justify-center mt-8">
          <motion.a
            href="/contact"
            className="px-4 py-2 bg-accent flex items-center justify-center text-white/95 rounded-lg font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }} // Increased hover scale slightly
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </div>
    </section>
  )
}