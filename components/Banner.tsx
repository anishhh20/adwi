"use client"

import { motion, AnimatePresence, useSpring } from "framer-motion"
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
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const rotatingTexts = [
        "Building Next-Gen Software Solutions.",
        "Connecting You with Global IT Talent.",
        "Your Partner for Digital Transformation.",
        "Expert IT Training & Certification.",
        "Foreign Language & Cultural Consulting.",
    ]

    const carouselCards = [
        {
            title: "Add Value To Your Business",
            description: "Our multi-disciplinary approach ensures you get the best of technology, talent, and training.",
            tags: ["Software", "Recruitment", "IT Training"],
            icon: "🚀",
            stat: "Since 2024",
            statLabel: "Global Impact",
        },
        {
            title: "Scale With Global Talent",
            description: "Access a worldwide pool of IT professionals vetted for excellence and cultural fit.",
            tags: ["Staffing", "Remote", "Expertise"],
            icon: "🌍",
            stat: "500+",
            statLabel: "Experts Placed",
        },
        {
            title: "Master New Technologies",
            description: "Future-proof your team with specialized training programs in cloud, AI, and development.",
            tags: ["Upskilling", "Cloud", "AI/ML"],
            icon: "💡",
            stat: "98%",
            statLabel: "Success Rate",
        },
    ]

    const keyHighlights = [
        { title: "Software Development", icon: "💻" },
        { title: "Recruitment & Staffing", icon: "👥" },
        { title: "IT Training", icon: "🏆" },
        { title: "Foreign Language Courses", icon: "🌐" },
        { title: "Digital Marketing", icon: "🚀" },
    ]

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (bannerRef.current) {
                const rect = bannerRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                setMousePosition({ x, y })
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2)
                const getVector = (cornerX: number, cornerY: number) => {
                    const dist = Math.sqrt((cornerX - x) ** 2 + (cornerY - y) ** 2)
                    const influence = Math.max(0, 1 - dist / maxDistance)
                    return {
                        x: ((cornerX - x) / rect.width) * -30 * influence,
                        y: ((cornerY - y) / rect.height) * -30 * influence,
                    }
                }
                setCornerVectors({
                    topLeft: getVector(0, 0),
                    topRight: getVector(rect.width, 0),
                    bottomLeft: getVector(0, rect.height),
                    bottomRight: getVector(rect.width, rect.height),
                })
            }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev === rotatingTexts.length - 1 ? 0 : prev + 1))
        }, 4000)
        const cardInterval = setInterval(() => {
            setDirection(1)
            setCurrentCardIndex((prev) => (prev === carouselCards.length - 1 ? 0 : prev + 1))
        }, 5000)
        return () => {
            clearInterval(textInterval)
            clearInterval(cardInterval)
        }
    }, [])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    return (
        <motion.div
            ref={containerRef}
            className="w-full min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-24 sm:py-24 md:py-28 lg:py-24"
        >
            {/* Background Decorative Elements */}
            <div ref={bannerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-white/20 to-background opacity-40" />

                {/* SVG Corner Graphics - Responsive sizing */}
                <motion.svg className="absolute top-0 left-0 w-40 h-40 md:w-80 md:h-80 overflow-visible opacity-10" viewBox="0 0 200 200" style={{ x: cornerVectors.topLeft.x, y: cornerVectors.topLeft.y }}>
                    <path d="M 0 0 L 100 0 L 100 20 L 20 20 L 20 100 L 0 100 Z" fill="var(--accent)" className="opacity-25" />
                </motion.svg>

                <motion.svg className="absolute top-0 right-0 w-40 h-40 md:w-80 md:h-80 overflow-visible opacity-10" viewBox="0 0 200 200" style={{ x: cornerVectors.topRight.x, y: cornerVectors.topRight.y }}>
                    <path d="M 200 0 L 100 0 L 100 20 L 180 20 L 180 100 L 200 100 Z" fill="var(--accent)" className="opacity-25" />
                </motion.svg>

                {/* Background Text Labels */}
                <motion.div className="absolute bottom-10 left-5 md:left-10 text-6xl md:text-9xl font-black text-foreground/[0.015] select-none" style={{ rotate: -15 }}>ADWI</motion.div>
                <motion.div className="absolute top-1/4 right-5 md:right-20 text-5xl md:text-7xl font-black text-accent/[0.015] select-none" style={{ rotate: 25 }}>TECHNOLOGIES</motion.div>

                {/* Dot Grid */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg width="100%" height="100%"><defs><pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="var(--accent)" /></pattern></defs><rect width="100%" height="100%" fill="url(#dotGrid)" /></svg>
                </div>
            </div>

            <section className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left Content Column */}
                    <motion.div
                        className="lg:col-span-7"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-4">
                            <div className="flex flex-wrap items-baseline gap-x-3">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight">ADWI</h1>
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent tracking-tight">Technologies</h2>
                            </div>
                            <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-2 opacity-80">
                                Empowering Your Success Through
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-6 min-h-[3rem] flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTextIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="relative"
                                >
                                    <p className="text-lg md:text-xl lg:text-2xl font-black text-foreground/90 leading-tight">
                                        {rotatingTexts[currentTextIndex]}
                                    </p>
                                    <motion.div className="absolute -bottom-2 left-0 h-0.5 bg-accent/30" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4, ease: "linear" }} />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 md:gap-4">
                            {keyHighlights.map((item) => (
                                <motion.div
                                    key={item.title}
                                    variants={itemVariants}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/30 border border-black/[0.03] hover:border-accent/20 hover:bg-white/60 transition-all shadow-sm group cursor-default"
                                >
                                    <span className="text-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">{item.icon}</span>
                                    <span className="text-[9px] md:text-[10px] font-black text-foreground/60 leading-tight uppercase tracking-widest text-center">{item.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Card Column */}
                    <motion.div
                        className="lg:col-span-5 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="relative group max-w-md mx-auto lg:max-w-none">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentCardIndex}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="relative bg-white/70 backdrop-blur-3xl border border-white/50 p-8 md:p-10 rounded-[2.5rem] shadow-xl space-y-6 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl">{carouselCards[currentCardIndex].icon}</span>
                                        <div className="text-right">
                                            <div className="text-lg font-black text-accent">{carouselCards[currentCardIndex].stat}</div>
                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{carouselCards[currentCardIndex].statLabel}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-xl md:text-2xl font-black text-foreground leading-tight">{carouselCards[currentCardIndex].title}</h3>
                                        <p className="text-xs text-foreground/70 leading-relaxed font-medium">{carouselCards[currentCardIndex].description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {carouselCards[currentCardIndex].tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 text-[9px] font-bold bg-accent/10 text-accent rounded-full uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        {carouselCards.map((_, idx) => (
                                            <button key={idx} onClick={() => { setDirection(idx > currentCardIndex ? 1 : -1); setCurrentCardIndex(idx); }} className={`h-1.5 rounded-full transition-all ${idx === currentCardIndex ? "w-8 bg-accent" : "w-1.5 bg-accent/20"}`} />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}