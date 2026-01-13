"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MapPin, Mail, Globe } from 'lucide-react'
import GlareHover from "../GlareHover"

// --- RECTANGULAR FLAG SVGS (Assuming these are the ones from the previous step) ---

export const IndiaFlagSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    {/* Saffron band (Top third) */}
    <rect x="0" y="0" width="100" height="33.33" fill="#FF9933" />
    {/* White band (Middle third) */}
    <rect x="0" y="33.33" width="100" height="33.33" fill="#FFFFFF" />
    {/* Green band (Bottom third) */}
    <rect x="0" y="66.66" width="100" height="33.34" fill="#138808" />

    {/* Ashoka Chakra (Circle and Spokes) - Centered in the middle third */}
    <g transform="translate(50, 50)">
      {/* Chakra Circle */}
      <circle r="12" fill="none" stroke="#000080" strokeWidth="2" />
      {/* Chakra Center Dot */}
      <circle r="2" fill="#000080" />
      {/* Chakra Spokes (simplified 12 spokes for visibility) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2="10"
          y2="0"
          stroke="#000080"
          strokeWidth="1"
          transform={`rotate(${i * (360 / 12)})`}
        />
      ))}
    </g>
  </svg>
);

export const UAEFlagSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    {/* Vertical Red Stripe (Left) - Roughly 1/4th width */}
    <rect x="0" y="0" width="25" height="100" fill="#FF0000" />

    {/* Horizontal Green Stripe (Top) - Right side of the red stripe */}
    <rect x="25" y="0" width="75" height="33.33" fill="#00732F" />

    {/* Horizontal White Stripe (Middle) - Right side of the red stripe */}
    <rect x="25" y="33.33" width="75" height="33.34" fill="#FFFFFF" />

    {/* Horizontal Black Stripe (Bottom) - Right side of the red stripe */}
    <rect x="25" y="66.67" width="75" height="33.33" fill="#000000" />
  </svg>
);

export const GermanyFlagSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    {/* Black band (Top third) */}
    <rect x="0" y="0" width="100" height="33.33" fill="#000000" />
    {/* Red band (Middle third) */}
    <rect x="0" y="33.33" width="100" height="33.34" fill="#FF0000" />
    {/* Gold band (Bottom third) */}
    <rect x="0" y="66.67" width="100" height="33.33" fill="#FFCC00" />
  </svg>
);

export const USAFlagSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    {/* 13 Stripes (Red and White) */}
    {Array.from({ length: 13 }).map((_, i) => (
      <rect
        key={i}
        x="0"
        y={(100 / 13) * i}
        width="100%"
        height={100 / 13}
        fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
      />
    ))}

    {/* Blue Canton (Union) */}
    <rect x="0" y="0" width="45" height="53.8" fill="#3C3B6E" />

    {/* Simplified Stars (Grid of dots for clarity at small scales) */}
    <g fill="#FFFFFF">
      {Array.from({ length: 5 }).map((_, row) => (
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 7 + 5}
            cy={row * 10 + 7}
            r="1.2"
          />
        ))
      ))}
    </g>
  </svg>
);

// ------------------------------------

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
  {
    city: "USA",
    address: "Tracy, California, United States",
    phone: "",
    email: "info@adwitechnologies.com",
    country: "🇺🇸",
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

// ------------------------------------
// NEW COMPONENT: Icon for the spinning button
// ------------------------------------

const SmallFlagIcon = ({ countryCode }: { countryCode: string }) => {
  const flagMap: { [key: string]: React.ElementType } = {
    '🇮🇳': IndiaFlagSVG,
    '🇦🇪': UAEFlagSVG,
    '🇩🇪': GermanyFlagSVG,
    '🇺🇸': USAFlagSVG,
  };

  const FlagComponent = flagMap[countryCode];

  const className = "w-8 h-8";

  if (FlagComponent) {
    // Render the SVG
    return <FlagComponent className={className} />;
  }

  // Fallback to Globe icon if no SVG is mapped
  return <Globe className={className} />;
};


// ------------------------------------
// Existing FlagBackground for large subtle image
// ------------------------------------

const FlagBackground = ({ countryCode }: { countryCode: string }) => {
  const flagMap: { [key: string]: React.ElementType } = {
    '🇮🇳': IndiaFlagSVG,
    '🇦🇪': UAEFlagSVG,
    '🇩🇪': GermanyFlagSVG,
    '🇺🇸': USAFlagSVG,
  };

  const FlagComponent = flagMap[countryCode];

  if (!FlagComponent) {
    // Fallback if no SVG is available for the emoji (using the original large emoji text)
    return (
      <div
        className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 select-none opacity-[0.03] text-[10rem] md:text-[12rem] z-0 pointer-events-none font-extrabold text-muted-foreground"
        style={{ lineHeight: '1' }}
      >
        {countryCode}
      </div>
    );
  }

  // Render the SVG component with subtle styling
  return (
    <FlagComponent
      className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 select-none w-[12rem] h-[12rem] md:w-[15rem] md:h-[15rem] z-0 pointer-events-none opacity-[0.03] transition-opacity group-hover:opacity-[0.05]"
    />
  );
};


export function OfficeCard({ office, index }: { office: (typeof officeLocations)[0], index: number }) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ]
  const color = colors[index % colors.length] // Use modulo for safety if more offices are added

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
        background="transparent"
        borderRadius="1rem"
        borderColor="transparent"
        className="!p-0 !border-0"
      >
        {/* The original card content is now the child of GlareHover */}
        <div className="relative border border-primary/20 rounded-2xl p-6 md:p-8 h-full group-hover:border-primary/50 transition-all duration-300 shadow-xl w-full">

          {/* RENDER THE FLAG BACKGROUND */}
          <FlagBackground countryCode={office.country} />

          <div className="flex items-center justify-between mb-3">
            <div>
              {/* <div className="text-xl mb-2">{office.country}</div> */}
              <h3 className="text-sm md:text-base font-bold text-foreground">{office.city}</h3>
            </div>

            {/* ✨ MODIFICATION: Use the SmallFlagIcon component here ✨ */}
            <motion.div
              // whileHover={{ rotate: 180, scale: 1.1 }}
              className={`p-2.5 rounded-xl ${color} text-white`}
            >
              <SmallFlagIcon countryCode={office.country} />
            </motion.div>

          </div>

          <div className="space-y-3">
            <motion.div className="flex items-start gap-3 text-xs group-hover:translate-x-1 transition-transform">
              <MapPin className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground ">{office.address}</span>
            </motion.div>

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
    <section id="offices" ref={ref} className="relative py-10 px-4 bg-background overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Our <span className="text-accent">Offices</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A network of strategic locations to deliver high-impact IT and staffing services across the globe.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          // Use flex-wrap and justify-center to center the last row
          className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10"
        >
          {officeLocations.map((office, idx) => (
            <div
              key={office.city}
              // Set widths to mimic a 3-column layout on large screens (approx 30%)
              className="w-full md:w-[calc(45%-1rem)] lg:w-[calc(30%-1rem)]"
            >
              <OfficeCard office={office} index={idx} />
            </div>
          ))}
        </motion.div>

        {/* ✨ MODIFICATION: Centering Container and Button Width ✨ */}
        {/* <div className="flex justify-center mt-8">
          <motion.a
            href="/contact"
            className="px-4 py-2 bg-accent flex items-center justify-center text-white/95 rounded-lg font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }} // Increased hover scale slightly
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.a>
        </div> */}
      </div>
    </section>
  )
}