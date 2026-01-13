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

  const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]

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

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  const linkVariants = {
    hover: { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 300 } },
    initial: { scale: 1, y: 0 }
  }

  const dynamicTextColor = "text-foreground/80"

  const menuHoverBg = "hover:bg-white/10"


  return (
    <header
      className="fixed top-0 z-50 w-full transition-all duration-300 pointer-events-none"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className={`h-14 md:h-16 flex items-center justify-between px-4 md:px-6 rounded-4xl transition-all duration-500 border pointer-events-auto bg-white shadow-xl`}
          initial={false}
        >
          {/* Logo/Brand Link */}
          <Link href="/" className="block">
            <div className="relative h-11 w-30 md:h-13 md:w-40 cursor-pointer">
              {/* Dark Logo */}
              <Image
                src="/adwi_logo.png"
                alt="ADWI Logo"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 40vw, 20vw"
                className={`transition-opacity duration-500 opacity-100`}
                priority
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
                  className={`text-sm py-2 px-3 rounded-xl transition-colors duration-300 ${dynamicTextColor} ${menuHoverBg}
                    ${isActive(link.href) ? "text-black font-semibold underline underline-offset-4 decoration-black" : ""}
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Animated 'Get Quote' Button */}
            <motion.a
              href="/contact"
              className="px-4 py-2 bg-accent flex items-center justify-center text-white/95 rounded-xl font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Quote
              <ArrowUpRight size={16} className="ml-1" />
            </motion.a>
          </nav>

          {/* Mobile Menu Toggle & Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors hover:bg-secondary`}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            <motion.div
              key={isOpen ? "x" : "menu"}
              initial={{ rotate: isOpen ? -90 : 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-black"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu (CORRECTED: White background with dark text) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-[calc(100vw-2rem)] mt-2 bg-white border border-border/50 rounded-xl overflow-hidden shadow-lg pointer-events-auto z-100"
          >
            <div className="p-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  // Dark text on white background
                  className={`text-sm p-3 rounded-lg transition-all font-medium 
                    ${isActive(link.href)
                      ? "text-black font-semibold underline underline-offset-4 decoration-black"
                      : "text-foreground/80 hover:bg-secondary"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <motion.a
                href="/contact"
                className="w-full text-center px-4 py-2 bg-accent text-white/95 rounded-lg font-semibold transition-all mt-4 text-sm shadow-md"
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