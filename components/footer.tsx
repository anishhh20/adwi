"use client"

import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    // Increased vertical padding for a more substantial look
    <footer className="bg-primary/80 text-primary-foreground relative overflow-hidden pt-8 sm:pt-16">
      <div className="absolute inset-0 opacity-10">
        {/* Adjusted blur and position for better visual interest */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[100px] opacity-70" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-[100px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          // MODIFIED: Changed grid-cols-1 to grid-cols-2 for smallest screens
          className="pb-8 md:pb-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-x-8 gap-y-8 border-b border-primary-foreground/20"
        >
          {/* Brand Column - Occupies more space on small screens */}
          <motion.div 
            variants={itemVariants} 
            // MODIFIED: col-span-1 to col-span-2 to ensure it spans full width on mobile
            className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-10 h-10 bg-accent text-primary rounded-lg flex items-center justify-center font-extrabold text-base shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }} // Slight rotation added for flair
              >
                A
              </motion.div>
              <span className="font-extrabold text-base md:text-xl tracking-wider">ADWI</span>
            </Link>
            <p className="text-xs md:text-sm leading-relaxed text-primary-foreground/70 max-w-xs">
              Privately owned company specializing in IT solutions, recruitment & staffing, and CSR activities.
            </p>
          </motion.div>

          {/* Quick Links (Now in a row with Services on mobile) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-bold text-sm md:text-base text-white border-b border-accent/30 pb-1 w-fit">Quick Links</h4>
            <ul className="space-y-3 text-xs md:text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services (Now in a row with Quick Links on mobile) */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-bold text-sm md:text-base text-white border-b border-accent/30 pb-1 w-fit">Key Services</h4>
            <ul className="space-y-3 text-xs md:text-sm">
              {[
                { label: "Software Dev", href: "/services/software-development" },
                { label: "Recruitment", href: "/services/recruitment-staffing" },
                { label: "2D/3D Animation", href: "/services/2d-3d-animation" },
                { label: "CSR Activities", href: "/services/csr-activities" },
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Occupies more space and aligns better on large screens */}
          <motion.div 
            variants={itemVariants} 
            // MODIFIED: col-span-1 to col-span-2 to ensure it spans full width on mobile
            className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 space-y-4"
          >
            <h4 className="font-bold text-sm md:text-base text-white border-b border-accent/30 pb-1 w-fit">Reach Us</h4>
            <div className="space-y-3 text-xs md:text-sm">
              <p className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>D4/A/801, Rahul Park, Warje, <br />Pune - 411058, India</span>
              </p>
              <a
                href="tel:+917720077514"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
              >
                <Phone size={16} className="text-accent flex-shrink-0 group-hover:scale-105 transition-transform" />
                +91 7720077514
              </a>
              <a
                href="mailto:adwitechnologies@gmail.com"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors break-all group"
              >
                <Mail size={16} className="text-accent flex-shrink-0 group-hover:scale-105 transition-transform" />
                adwitechnologies@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-primary-foreground/60"
          >
            &copy; {currentYear} ADWI Technologies. All rights reserved. | Crafted with &hearts;
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/adwi-technologies?report%2Esuccess=KJ_KkFGTDCfMt-A7wV3Fn9Yvgwr02Kd6AZHGx4bQCDiP6-2rfP2oxyVoEQiPrcAQ7Bf", label: "LinkedIn" },
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Facebook, href: "https://www.facebook.com/people/ADWI-Technologies/100068307975578/?ref=aymt_homepage_panel#", label: "Facebook" },
              { Icon: Mail, href: "mailto:adwitechnologies@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }, idx) => (
              <motion.a
                key={idx}
                target="_blank"
                href={href}
                // Increased size and more defined hover
                className="w-9 h-9 bg-primary-foreground/15 hover:bg-accent hover:text-primary rounded-full flex items-center justify-center transition-all shadow-lg"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}