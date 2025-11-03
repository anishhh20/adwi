"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollBlur, setScrollBlur] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollBlur(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // 1. Capture original body styles before modification
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

      // 2. FIX: Calculate scrollbar width and apply compensation padding
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

      // Prevent body scrolling
      document.body.style.overflow = "hidden"
      
      // Compensate for scrollbar disappearance to prevent layout shift
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`
      }
    }
    
    // 3. Cleanup function to restore original styles
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      
      // Restore original values
      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPaddingRight
    }
  }, [isOpen])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ]

  const isActive = (href: string) => {
    // Simple check: is the current path an exact match or does it start with the link?
    // Using a simple check for demonstration purposes
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrollBlur
          ? "bg-background/50 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-background/50 backdrop-blur-md"
      }`}
    >
            <div className="container mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xs md:text-sm text-primary group flex-shrink-0"
        >
          <motion.div
            className="w-6 h-6 md:w-7 md:h-7 bg-primary rounded-full flex items-center justify-center text-white font-extrabold text-xs"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            A
          </motion.div>
          <span className="hidden sm:inline transition-colors group-hover:text-accent">ADWI</span>

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary font-semibold" : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/contact"
            className="flex items-center text-sm font-semibold px-4 py-2 bg-primary text-primary-foreground rounded-full transition-all hover:bg-primary/90 shadow-md"
          >
            Get Quote
            <ArrowUpRight size={16} className="ml-1" />
          </a>
        </nav>

        {/* Mobile Menu Toggle & Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-2 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm p-3 rounded-lg transition-all font-medium ${
                    isActive(link.href)
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/contact"
                className="w-full text-center px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold transition-all mt-2 text-sm shadow-md"
                onClick={() => setIsOpen(false)}
              >
                Get Quote
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
