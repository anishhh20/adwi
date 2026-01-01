"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Banner() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cornerVectors, setCornerVectors] = useState({
        topLeft: { x: 0, y: 0 },
        topRight: { x: 0, y: 0 },
        bottomLeft: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 },
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const bannerRef = useRef<HTMLDivElement>(null)
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const rotatingTexts = [
        "Building Software Solutions.",
        "Connecting You with Global IT Talent.",
        "Your Partner for Digital Transformation.",
        "Expert IT Training & Certification.",
        "Foreign Language & Cultural Consulting.",
    ]

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const contentY = useTransform(scrollYProgress, [0, 1], [0, -150])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (bannerRef.current) {
                const rect = bannerRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top

                setMousePosition({ x, y })

                // Calculate influence on corner vectors
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2)

                // Top-left corner vector
                const tlDistance = Math.sqrt(x ** 2 + y ** 2)
                const tlInfluence = Math.max(0, 1 - tlDistance / maxDistance)
                setCornerVectors((prev) => ({
                    ...prev,
                    topLeft: {
                        x: (x / rect.width) * 30 * tlInfluence,
                        y: (y / rect.height) * 30 * tlInfluence,
                    },
                }))

                // Top-right corner vector
                const trDistance = Math.sqrt((rect.width - x) ** 2 + y ** 2)
                const trInfluence = Math.max(0, 1 - trDistance / maxDistance)
                setCornerVectors((prev) => ({
                    ...prev,
                    topRight: {
                        x: ((rect.width - x) / rect.width) * 30 * trInfluence,
                        y: (y / rect.height) * 30 * trInfluence,
                    },
                }))

                // Bottom-left corner vector
                const blDistance = Math.sqrt(x ** 2 + (rect.height - y) ** 2)
                const blInfluence = Math.max(0, 1 - blDistance / maxDistance)
                setCornerVectors((prev) => ({
                    ...prev,
                    bottomLeft: {
                        x: (x / rect.width) * 30 * blInfluence,
                        y: ((rect.height - y) / rect.height) * 30 * blInfluence,
                    },
                }))

                // Bottom-right corner vector
                const brDistance = Math.sqrt((rect.width - x) ** 2 + (rect.height - y) ** 2)
                const brInfluence = Math.max(0, 1 - brDistance / maxDistance)
                setCornerVectors((prev) => ({
                    ...prev,
                    bottomRight: {
                        x: ((rect.width - x) / rect.width) * 30 * brInfluence,
                        y: ((rect.height - y) / rect.height) * 30 * brInfluence,
                    },
                }))
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev === rotatingTexts.length - 1 ? 0 : prev + 1))
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    }

    const titleVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    }

    const subtitleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    }

    const rotatingTextVariants = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
    }

    const highlightItemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.92 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.08,
            },
        }),
    }

    const keyHighlights = [
        { title: "Software Development", icon: "💻" },
        { title: "Recruitment & Staffing", icon: "👥" },
        { title: "IT Training", icon: "🏆" },
        { title: "Foreign Language Courses", icon: "🌐" },
        { title: "Digital Marketing", icon: "🚀" },
    ]

    return (
        <motion.div ref={containerRef} className="w-full h-screen bg-background sticky top-0 z-10 overflow-hidden">
            <div ref={bannerRef} className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-white to-background" />
                <div className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-transparent opacity-60" />

                <motion.svg
                    className="absolute inset-0 w-full h-full opacity-[0.03]"
                    preserveAspectRatio="none"
                    animate={{ opacity: [0.03, 0.05, 0.03] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                >
                    <defs>
                        {/* Fine dotted pattern */}
                        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="1" fill="currentColor" />
                        </pattern>
                        {/* Diagonal lines pattern */}
                        <pattern
                            id="diagonalLines"
                            width="30"
                            height="30"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <line x1="0" y1="0" x2="0" y2="30" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        {/* Mesh gradient effect */}
                        <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#69b300" stopOpacity="0.08" />
                            <stop offset="50%" stopColor="#69b300" stopOpacity="0.02" />
                            <stop offset="100%" stopColor="#69b300" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#meshGradient)" />
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </motion.svg>

                <motion.div
                    className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-accent/6 blur-3xl"
                    animate={{
                        y: [0, 60, 0],
                        x: [0, 40, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 right-20 w-96 h-96 rounded-full bg-accent/7 blur-3xl"
                    animate={{
                        y: [0, -70, 0],
                        x: [0, -50, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-accent/4 blur-3xl"
                    animate={{
                        y: [0, 40, 0],
                        x: [0, -30, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                {/* Top-left corner vector */}
                <motion.svg
                    className="absolute top-0 left-0 w-40 h-40 overflow-visible"
                    viewBox="0 0 160 160"
                    preserveAspectRatio="none"
                    style={{
                        x: cornerVectors.topLeft.x,
                        y: cornerVectors.topLeft.y,
                    }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <defs>
                        <linearGradient id="cornerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#69b300" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#69b300" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0 0 Q 40 0, 60 20 Q 80 40, 100 60 Q 120 80, 140 100"
                        stroke="url(#cornerGrad1)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="0" r="6" fill="#69b300" opacity="0.4" />
                </motion.svg>

                {/* Top-right corner vector */}
                <motion.svg
                    className="absolute top-0 right-0 w-40 h-40 overflow-visible"
                    viewBox="0 0 160 160"
                    preserveAspectRatio="none"
                    style={{
                        x: -cornerVectors.topRight.x,
                        y: cornerVectors.topRight.y,
                    }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <defs>
                        <linearGradient id="cornerGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#69b300" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#69b300" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 160 0 Q 120 0, 100 20 Q 80 40, 60 60 Q 40 80, 20 100"
                        stroke="url(#cornerGrad2)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="160" cy="0" r="6" fill="#69b300" opacity="0.4" />
                </motion.svg>

                {/* Bottom-left corner vector */}
                <motion.svg
                    className="absolute bottom-0 left-0 w-40 h-40 overflow-visible"
                    viewBox="0 0 160 160"
                    preserveAspectRatio="none"
                    style={{
                        x: cornerVectors.bottomLeft.x,
                        y: -cornerVectors.bottomLeft.y,
                    }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <defs>
                        <linearGradient id="cornerGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#69b300" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#69b300" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0 160 Q 40 160, 60 140 Q 80 120, 100 100 Q 120 80, 140 60"
                        stroke="url(#cornerGrad3)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="0" cy="160" r="6" fill="#69b300" opacity="0.4" />
                </motion.svg>

                {/* Bottom-right corner vector */}
                <motion.svg
                    className="absolute bottom-0 right-0 w-40 h-40 overflow-visible"
                    viewBox="0 0 160 160"
                    preserveAspectRatio="none"
                    style={{
                        x: -cornerVectors.bottomRight.x,
                        y: -cornerVectors.bottomRight.y,
                    }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <defs>
                        <linearGradient id="cornerGrad4" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#69b300" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#69b300" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 160 160 Q 120 160, 100 140 Q 80 120, 60 100 Q 40 80, 20 60"
                        stroke="url(#cornerGrad4)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="160" cy="160" r="6" fill="#69b300" opacity="0.4" />
                </motion.svg>

                <motion.div
                    className="absolute w-px h-80 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 pointer-events-none blur-sm shadow-xl"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y - 160,
                        boxShadow: `0 0 20px rgba(105, 179, 0, 0.4)`,
                    }}
                    transition={{ type: "tween", duration: 0.2 }}
                />

                <motion.div
                    className="absolute w-96 h-96 rounded-full pointer-events-none"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                        background: "radial-gradient(circle, rgba(105, 179, 0, 0.08) 0%, transparent 70%)",
                    }}
                    transition={{ type: "tween", duration: 0.3 }}
                />
            </div>

            {/* Main content */}
            <section className="absolute inset-0 w-full h-full flex flex-col">
                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="relative z-10 flex-1 flex items-center justify-center w-full px-6 sm:px-8 lg:px-12"
                >
                    <motion.div
                        className="w-full max-w-5xl text-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        {/* Main title */}
                        <motion.div variants={titleVariants} className="mb-6 sm:mb-8">
                            <div className="flex items-center flex-wrap justify-center gap-3">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tighter">
                                    ADWI
                                </h1>
                                <motion.h2
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-accent via-accent to-green-500 bg-clip-text text-transparent leading-tight tracking-tighter"
                                    animate={{ opacity: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    Technologies
                                </motion.h2>
                            </div>
                            <p className="text-base text-muted-foreground font-light tracking-wide">
                                Empowering Your Success Through
                            </p>
                        </motion.div>

                        {/* Rotating text section */}
                        <motion.div variants={subtitleVariants} className="space-y-6 sm:space-y-8 mb-10 sm:mb-14">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTextIndex}
                                    variants={rotatingTextVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="h-10 sm:h-14 flex items-center justify-center"
                                >
                                    <p className="text-md sm:text-lg md:text-xl font-bold text-foreground px-4">
                                        {rotatingTexts[currentTextIndex]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Value proposition with animated lines */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="flex items-center justify-center gap-4 sm:gap-6 pt-8"
                            >
                                <motion.div
                                    className="h-0.5 w-8 sm:w-12 bg-gradient-to-r from-transparent to-accent"
                                    animate={{ width: ["2rem", "3rem", "2rem"] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                                />
                                <p className="text-xs sm:text-sm font-semibold text-accent uppercase tracking-widest whitespace-nowrap">
                                    Add Value To Your Business
                                </p>
                                <motion.div
                                    className="h-0.5 w-8 sm:w-12 bg-gradient-to-l from-transparent to-accent"
                                    animate={{ width: ["2rem", "3rem", "2rem"] }}
                                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Key highlights grid */}
                        <motion.div
                            className="max-w-3xl mx-auto pt-6 border-t border-border/30"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isLoaded ? "visible" : "hidden"}
                        >
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 sm:pt-8">
                                {keyHighlights.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={highlightItemVariants}
                                        custom={index}
                                        whileHover={{
                                            scale: 1.08,
                                            backgroundColor: "var(--card)",
                                            boxShadow: "0 8px 24px rgba(105, 179, 0, 0.12)",
                                        }}
                                        className="flex flex-col items-center justify-center space-y-2 p-3 sm:p-4 rounded-lg bg-card/40 hover:bg-card/70 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-border/20 hover:border-accent/30"
                                    >
                                        <div className="text-xl sm:text-2xl md:text-3xl">{item.icon}</div>
                                        <p className="text-xs font-600 text-foreground/75 uppercase text-center">
                                            {item.title}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{
                        y: [0, 12, 0],
                        opacity: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 2.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    className="absolute bottom-0 left-0 right-0 z-50 pb-8 sm:pb-12 flex flex-col items-center gap-3"
                >
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium tracking-widest uppercase">
                        Explore Solutions
                    </p>

                    <motion.svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="7" y="4" width="10" height="16" rx="5" className="stroke-accent/40" strokeWidth="1.5" />
                        <rect x="7" y="4" width="10" height="16" rx="5" className="stroke-accent" strokeWidth="1.5" />
                        <motion.line
                            x1="12"
                            y1="8"
                            x2="12"
                            y2="8"
                            strokeLinecap="round"
                            strokeWidth="2"
                            className="stroke-accent"
                            animate={{
                                y1: [8, 14, 8],
                                y2: [10, 16, 10],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.svg>
                </motion.div>
            </section>
        </motion.div>
    )
}
