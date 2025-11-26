"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // --- START OF REMOVED HOME PAGE LOGIC ---

  // // Determine Initial State Based on Page Path
  // const isHomePage = pathname === "/" // REMOVED: This is no longer needed
  // const isInitialDarkBg = isHomePage // REMOVED: This is no longer needed

  // LOGO SOURCE LOGIC: Always show the dark logo, regardless of initial state.
  // The 'showLightLogo' logic is removed, and 'showDarkLogo' is simplified.
  const showDarkLogo = true // Always show dark logo
  // const showLightLogo = false // Always false

  // Initial text color when not scrolled: ALWAYS default to dark background text
  const initialTextColor = "text-foreground/80" // Previously: isInitialDarkBg ? "text-white/80" : "text-foreground/80"

  // --- END OF REMOVED HOME PAGE LOGIC ---

  // Scroll effect (UNCHANGED)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll and handle outside click (UNCHANGED)
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPaddingRight = document.body.style.paddingRight

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen && !(event.target as HTMLElement).closest("button")) {
          setIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = "hidden"

      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)

      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPaddingRight
    }
  }, [isOpen])

  const navLinks = [
    // { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  const linkVariants = {
    hover: { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 300 } },
    initial: { scale: 1, y: 0 }
  }

  // --- Dynamic Color Variables (MODIFIED TO REMOVE isInitialDarkBg LOGIC) ---
  // Always use dark text/colors when not scrolled, matching the new "white header" look.
  const dynamicTextColor = hasScrolled ? "text-foreground" : initialTextColor

  const menuHoverBg = hasScrolled
    ? "hover:bg-secondary/50"
    : "hover:bg-secondary/50" // Previously checked isInitialDarkBg

  const buttonBgColor = hasScrolled
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "bg-primary text-primary-foreground hover:bg-primary/90" // Previously checked isInitialDarkBg

  const iconColor = hasScrolled ? "text-foreground" : "text-foreground" // Previously checked isInitialDarkBg


  return (
    <header
      className="fixed top-0 z-50 w-full p-4 md:p-6 transition-all duration-300 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className={`h-14 md:h-16 flex items-center justify-between px-4 md:px-6 rounded-[2rem] transition-all duration-500 border border-transparent pointer-events-auto
            ${
            // NEW LOGIC: Always use the white, glassy-effect header style.
            // We'll use the 'scrolled' appearance for consistency, slightly modified.
            "bg-card/70 backdrop-blur-xl shadow-xl border-border/50"
            }`}
          initial={false}
        >
          {/* Logo/Brand Link */}
          <Link href="/" className="block">
            <div className="relative h-8 w-40 md:h-10 md:w-48 cursor-pointer">

              {/* Dark Logo (Always visible as per request) */}
              <Image
                src="/adwi_logo.png"
                alt="ADWI Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 40vw, 20vw"
                className={`transition-opacity duration-500 opacity-100`} // Always opacity-100
                priority
              />

              {/* White Logo (REMOVED: Keeping the tag but setting opacity to 0) */}
              <Image
                src="/adwi_logo_white.png"
                alt="ADWI Logo White"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 40vw, 20vw"
                className={`absolute top-0 left-0 transition-opacity duration-500 opacity-0`} // Always opacity-0
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={linkVariants}
                whileHover="hover"
                initial="initial"
              >
                <Link
                  href={link.href}
                  // Text color logic simplified
                  className={`text-sm py-2 px-3 rounded-xl transition-colors duration-300 ${dynamicTextColor} ${menuHoverBg}
                    ${isActive(link.href)
                      ? hasScrolled
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-foreground font-semibold underline underline-offset-4 decoration-primary" // Simplified active state
                      : ""
                    }
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Animated 'Get Quote' Button (Color logic simplified) */}
            <motion.a
              href="/contact"
              className={`flex items-center text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-lg ml-4 ${buttonBgColor}`}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
              <ArrowUpRight size={16} className="ml-1" />
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle & Icon (Color logic simplified) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors ${hasScrolled ? "hover:bg-secondary" : "hover:bg-secondary"}`}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            <motion.div
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={iconColor}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu (UNCHANGED: Keeps dark background for contrast) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-[calc(100vw-2rem)] mt-2 bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
          >
            <div className="p-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm p-3 rounded-lg transition-all font-medium ${isActive(link.href)
                      ? "bg-primary/10 text-primary-foreground shadow-md"
                      : "text-white hover:bg-white/10"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <motion.a
                href="/contact"
                className="w-full text-center px-4 py-2 bg-primary/30 text-primary-foreground rounded-lg font-semibold transition-all mt-4 text-sm shadow-md"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Quote
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}