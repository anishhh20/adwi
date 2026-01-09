"use client"

import type React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChinaFlagSVG, FranceFlagSVG, ItalyFlagSVG, JapanFlagSVG, KoreaFlagSVG, PortugalFlagSVG, SpainFlagSVG, UKFlagSVG } from "./services/service-card"
import { GermanyFlagSVG } from "./sections/offices-section"

// ============= MINIMALIST SVG COMPONENTS =============

// Software Development - Clean Terminal with floating nodes
const SoftwareSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const rotateX = useTransform(mouseY, [-200, 200], [8, -8])
    const rotateY = useTransform(mouseX, [-200, 200], [-8, 8])

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="w-full h-full flex items-center justify-center"
        >
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                    <linearGradient id="termGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(78 100% 42%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 55%)" />
                    </linearGradient>
                    <filter id="glow1">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Subtle grid background */}
                <g opacity="0.05">
                    {[...Array(8)].map((_, i) => (
                        <line key={`h${i}`} x1="50" y1={80 + i * 35} x2="350" y2={80 + i * 35} stroke="hsl(78 100% 42%)" strokeWidth="0.5" />
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <line key={`v${i}`} x1={80 + i * 35} y1="50" x2={80 + i * 35} y2="350" stroke="hsl(78 100% 42%)" strokeWidth="0.5" />
                    ))}
                </g>

                {/* Main terminal window */}
                <motion.g filter="url(#glow1)">
                    <rect x="70" y="90" width="260" height="180" rx="12" fill="hsl(220 20% 8%)" stroke="hsl(220 15% 20%)" strokeWidth="1" />
                    <rect x="70" y="90" width="260" height="32" rx="12" fill="hsl(220 20% 10%)" />
                    <circle cx="92" cy="106" r="5" fill="hsl(0 70% 55%)" />
                    <circle cx="110" cy="106" r="5" fill="hsl(45 90% 55%)" />
                    <circle cx="128" cy="106" r="5" fill="hsl(120 70% 45%)" />
                </motion.g>

                {/* Animated code lines */}
                {[0, 1, 2, 3].map((i) => (
                    <motion.rect
                        key={i}
                        x="90"
                        y={140 + i * 28}
                        height="8"
                        rx="4"
                        fill="url(#termGrad)"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: [60, 120, 80, 160][i], opacity: 0.8 }}
                        transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
                    />
                ))}

                {/* Floating tech nodes */}
                {[
                    { x: 340, y: 100, label: "</>" },
                    { x: 350, y: 200, label: "{ }" },
                    { x: 340, y: 300, label: "AI" },
                ].map((node, i) => (
                    <motion.g
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                    >
                        <circle cx={node.x} cy={node.y} r="24" fill="hsl(220 20% 8%)" stroke="hsl(78 100% 42%)" strokeWidth="1.5" />
                        <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(78 100% 42%)">{node.label}</text>
                    </motion.g>
                ))}

                {/* Connection dots */}
                {[{ x: 60, y: 180 }, { x: 200, y: 320 }, { x: 280, y: 60 }].map((dot, i) => (
                    <motion.circle
                        key={i}
                        cx={dot.x}
                        cy={dot.y}
                        r="4"
                        fill="hsl(78 100% 42%)"
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                ))}
            </svg>
        </motion.div>
    )
}

// Recruitment - Clean radar design
const RecruitmentSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const x = useTransform(mouseX, [-200, 200], [-15, 15])
    const y = useTransform(mouseY, [-200, 200], [-15, 15])

    return (
        <motion.div style={{ x, y }} className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                    <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(78 100% 42%)" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>

                {/* Radar circles */}
                {[140, 100, 60, 25].map((r, i) => (
                    <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="hsl(78 100% 42%)" strokeWidth="0.5" opacity={0.15 + i * 0.08} />
                ))}

                {/* Cross lines */}
                <line x1="60" y1="200" x2="340" y2="200" stroke="hsl(78 100% 42%)" strokeWidth="0.5" opacity="0.1" />
                <line x1="200" y1="60" x2="200" y2="340" stroke="hsl(78 100% 42%)" strokeWidth="0.5" opacity="0.1" />

                {/* Radar sweep */}
                <motion.g
                    style={{ transformOrigin: "200px 200px" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M200 200 L200 60 A140 140 0 0 1 300 120 Z" fill="url(#radarGlow)" />
                </motion.g>

                {/* Candidate nodes */}
                {[0, 72, 144, 216, 288].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180
                    const cx = 200 + Math.cos(rad) * 110
                    const cy = 200 + Math.sin(rad) * 110
                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <circle cx={cx} cy={cy} r="18" fill="hsl(220 20% 8%)" stroke="hsl(78 100% 42%)" strokeWidth="1.5" />
                            <circle cx={cx} cy={cy - 4} r="5" fill="hsl(78 100% 42%)" />
                            <path d={`M${cx - 8} ${cy + 10} Q${cx} ${cy + 2} ${cx + 8} ${cy + 10}`} fill="none" stroke="hsl(78 100% 42%)" strokeWidth="1.5" strokeLinecap="round" />
                        </motion.g>
                    )
                })}

                {/* Center hub */}
                <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <circle cx="200" cy="200" r="30" fill="hsl(78 100% 42%)" />
                    <circle cx="200" cy="200" r="22" fill="hsl(220 20% 8%)" />
                    <path d="M190 200 L210 200 M200 190 L200 210" stroke="hsl(78 100% 42%)" strokeWidth="2" strokeLinecap="round" />
                </motion.g>

                {/* Pulse rings */}
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={i}
                        cx="200"
                        cy="200"
                        r="30"
                        fill="none"
                        stroke="hsl(78 100% 42%)"
                        strokeWidth="1"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 4.5, opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                    />
                ))}
            </svg>
        </motion.div>
    )
}

// Training - Progress ladder
const TrainingSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const y = useTransform(mouseY, [-200, 200], [-12, 12])

    const levels = [
        { progress: 100, label: "Basic" },
        { progress: 85, label: "Intermediate" },
        { progress: 60, label: "Advanced" },
        { progress: 30, label: "Expert" },
    ]

    return (
        <motion.div style={{ y }} className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(78 100% 42%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 55%)" />
                    </linearGradient>
                </defs>

                {/* Vertical connecting line */}
                <motion.line
                    x1="80"
                    y1="70"
                    x2="80"
                    y2="340"
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {levels.map((level, i) => (
                    <motion.g
                        key={i}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        {/* Level circle */}
                        <circle
                            cx="80"
                            cy={100 + i * 70}
                            r="14"
                            fill={level.progress === 100 ? "hsl(78 100% 42%)" : "hsl(220 20% 8%)"}
                            stroke="hsl(78 100% 42%)"
                            strokeWidth="2"
                        />
                        <text x="80" y={105 + i * 70} textAnchor="middle" fontSize="10" fontWeight="600" fill={level.progress === 100 ? "hsl(220 20% 4%)" : "hsl(78 100% 42%)"}>{4 - i}</text>

                        {/* Progress bar background */}
                        <rect x="110" y={92 + i * 70} width="200" height="16" rx="8" fill="hsl(220 15% 12%)" />

                        {/* Progress fill */}
                        <motion.rect
                            x="110"
                            y={92 + i * 70}
                            height="16"
                            rx="8"
                            fill="url(#progressGrad)"
                            initial={{ width: 0 }}
                            animate={{ width: level.progress * 2 }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
                        />

                        {/* Label */}
                        <text x="110" y={85 + i * 70} fontSize="11" fontWeight="500" fill="hsl(0 0% 70%)">{level.label}</text>
                        <text x="320" y={105 + i * 70} textAnchor="end" fontSize="11" fontWeight="600" fill="hsl(78 100% 42%)">{level.progress}%</text>
                    </motion.g>
                ))}

                {/* Stats at bottom */}
                <g>
                    {[
                        { value: "240+", label: "Hours" },
                        { value: "12", label: "Modules" },
                        { value: "4", label: "Certs" },
                    ].map((stat, i) => (
                        <g key={i} transform={`translate(${110 + i * 90}, 355)`}>
                            <text x="0" y="0" fontSize="16" fontWeight="700" fill="hsl(78 100% 42%)">{stat.value}</text>
                            <text x="0" y="15" fontSize="9" fill="hsl(220 10% 50%)">{stat.label}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </motion.div>
    )
}

// Language - Globe with connections
const LanguageSVG = ({
    mouseX,
    mouseY,
}: {
    mouseX: any
    mouseY: any
}) => {
    const rotateX = useTransform(mouseY, [-200, 200], [6, -6])
    const rotateY = useTransform(mouseX, [-200, 200], [-6, 6])

    const centerX = 200
    const centerY = 200
    const radius = 140

    const languages = [
        { name: "English", Icon: UKFlagSVG },
        { name: "German", Icon: GermanyFlagSVG },
        { name: "French", Icon: FranceFlagSVG },
        { name: "Spanish", Icon: SpainFlagSVG },
        { name: "Japanese", Icon: JapanFlagSVG },
        { name: "Chinese", Icon: ChinaFlagSVG },
        { name: "Korean", Icon: KoreaFlagSVG },
        { name: "Italian", Icon: ItalyFlagSVG },
        { name: "Portuguese", Icon: PortugalFlagSVG },
    ]

    const positionedLanguages = languages.map((lang, index) => {
        const angle =
            (index / languages.length) * Math.PI * 2 - Math.PI / 2

        return {
            ...lang,
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
        }
    })

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="w-full h-full flex items-center justify-center"
        >
            <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                    <radialGradient id="globeGrad" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="hsl(220 15% 18%)" />
                        <stop offset="100%" stopColor="hsl(220 20% 8%)" />
                    </radialGradient>
                </defs>

                {/* Globe */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r="100"
                    fill="url(#globeGrad)"
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="1.5"
                />

                {/* Meridians */}
                <ellipse
                    cx={centerX}
                    cy={centerY}
                    rx="100"
                    ry="40"
                    fill="none"
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="0.5"
                    opacity="0.3"
                />
                <ellipse
                    cx={centerX}
                    cy={centerY}
                    rx="40"
                    ry="100"
                    fill="none"
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="0.5"
                    opacity="0.3"
                />
                <line
                    x1={centerX - 100}
                    y1={centerY}
                    x2={centerX + 100}
                    y2={centerY}
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="0.5"
                    opacity="0.3"
                />
                <line
                    x1={centerX}
                    y1={centerY - 100}
                    x2={centerX}
                    y2={centerY + 100}
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="0.5"
                    opacity="0.3"
                />

                {/* Connections */}
                {positionedLanguages.map((lang, i) => (
                    <motion.line
                        key={`line-${lang.name}`}
                        x1={centerX}
                        y1={centerY}
                        x2={lang.x}
                        y2={lang.y}
                        stroke="hsl(78 100% 42%)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, delay: i * 0.15 }}
                    />
                ))}

                {/* Language Nodes */}
                {positionedLanguages.map((lang, i) => (
                    <motion.g
                        key={lang.name}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.12 }}
                    >
                        <circle
                            cx={lang.x}
                            cy={lang.y}
                            r="22"
                            fill="hsl(220 20% 8%)"
                            stroke="hsl(78 100% 42%)"
                            strokeWidth="1.5"
                        />

                        {/* Flag SVG */}
                        <foreignObject
                            x={lang.x - 12}
                            y={lang.y - 12}
                            width="24"
                            height="24"
                        >
                            <lang.Icon />
                        </foreignObject>

                        {/* Pulse */}
                        <motion.circle
                            cx={lang.x}
                            cy={lang.y}
                            r="22"
                            fill="none"
                            stroke="hsl(78 100% 42%)"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    </motion.g>
                ))}

                {/* Globe Glow */}
                <motion.circle
                    cx={centerX}
                    cy={centerY}
                    r="110"
                    fill="none"
                    stroke="hsl(78 100% 42%)"
                    strokeWidth="0.5"
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </svg>
        </motion.div>
    )
}

// Marketing - Growth chart
const MarketingSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const rotate = useTransform(mouseX, [-200, 200], [-5, 5])

    const dataPoints = [
        { x: 60, y: 280 },
        { x: 120, y: 240 },
        { x: 180, y: 260 },
        { x: 240, y: 180 },
        { x: 300, y: 140 },
        { x: 360, y: 80 },
    ]

    return (
        <motion.div style={{ rotate }} className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full h-full">
                <defs>
                    <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(78 100% 42%)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(78 100% 42%)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(78 100% 42%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 55%)" />
                    </linearGradient>
                </defs>

                {/* Grid */}
                <g opacity="0.08">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line key={`h${i}`} x1="40" y1={80 + i * 50} x2="380" y2={80 + i * 50} stroke="hsl(78 100% 42%)" strokeWidth="0.5" />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line key={`v${i}`} x1={60 + i * 60} y1="60" x2={60 + i * 60} y2="300" stroke="hsl(78 100% 42%)" strokeWidth="0.5" />
                    ))}
                </g>

                {/* Area fill */}
                <motion.path
                    d="M60,280 L120,240 L180,260 L240,180 L300,140 L360,80 V300 H60 Z"
                    fill="url(#areaFill)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Main line */}
                <motion.path
                    d="M60,280 L120,240 L180,260 L240,180 L300,140 L360,80"
                    fill="none"
                    stroke="url(#lineStroke)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />

                {/* Data points */}
                {dataPoints.map((point, i) => (
                    <motion.g key={i}>
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="8"
                            fill="hsl(220 20% 8%)"
                            stroke="hsl(78 100% 42%)"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        />
                        <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="hsl(78 100% 42%)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                        />
                    </motion.g>
                ))}

                {/* Growth badge */}
                <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <circle cx="360" cy="80" r="28" fill="hsl(78 100% 42%)" />
                    <text x="360" y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(220 20% 4%)">↑ 78%</text>
                    <text x="360" y="90" textAnchor="middle" fontSize="8" fill="hsl(220 20% 4%)" opacity="0.8">Growth</text>
                </motion.g>

                {/* Labels */}
                <text x="40" y="320" fontSize="10" fill="hsl(220 10% 50%)">Jan</text>
                <text x="340" y="320" fontSize="10" fill="hsl(220 10% 50%)">Jun</text>
            </svg>
        </motion.div>
    )
}

// ============= SLIDE DATA =============

const slides = [
    {
        badge: "Software Development",
        title: "Innovative",
        highlight: "Solutions",
        description: "Building robust, scalable software that empowers businesses to thrive in the digital landscape.",
        svg: (mouseX: any, mouseY: any) => <SoftwareSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Executive Recruitment",
        title: "Proven",
        highlight: "Leadership",
        description: "Identifying and placing high-impact leaders who drive immediate results and long-term success.",
        svg: (mouseX: any, mouseY: any) => <RecruitmentSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "IT Training",
        title: "Accelerate",
        highlight: "Your Career",
        description: "Industry-recognized certifications that fast-track your path to success in the IT industry.",
        svg: (mouseX: any, mouseY: any) => <TrainingSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Language Training",
        title: "Global",
        highlight: "Opportunities",
        description: "Comprehensive foreign language programs opening doors to international markets and careers.",
        svg: (mouseX: any, mouseY: any) => <LanguageSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Digital Marketing",
        title: "Elevate",
        highlight: "Your Brand",
        description: "Data-driven strategies and creative content that convert audiences into loyal customers.",
        svg: (mouseX: any, mouseY: any) => <MarketingSVG mouseX={mouseX} mouseY={mouseY} />,
    },
]

// ============= MAIN BANNER COMPONENT =============

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 80, damping: 25 })
    const springY = useSpring(mouseY, { stiffness: 80, damping: 25 })

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e
        const { width, height, left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left - width / 2)
        mouseY.set(clientY - top - height / 2)
    }

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection)
        setCurrent((prev) => (prev + newDirection + slides.length) % slides.length)
    }, [])

    useEffect(() => {
        if (isPaused || isDragging) return
        const timer = setInterval(() => paginate(1), 7000)
        return () => clearInterval(timer)
    }, [paginate, isPaused, isDragging])

    return (
        <section
            className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
                setIsPaused(false)
                mouseX.set(0)
                mouseY.set(0)
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" className="opacity-[0.02]">
                    <defs>
                        <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(78 100% 42%)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

            {/* ============= HEADER SPACE (for your external header) ============= */}
            <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-full" />

            {/* ============= MAIN CONTENT ============= */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8">
                <div className="max-w-7xl w-full mx-auto">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_, { offset }) => {
                                setIsDragging(false)
                                if (offset.x < -60) paginate(1)
                                else if (offset.x > 60) paginate(-1)
                            }}
                            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center"
                        >
                            {/* Left: Text content */}
                            <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6">
                                {/* Company branding - Always visible */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-1"
                                >
                                    <h2 className="font-display text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  font-bold tracking-tight text-foreground">
                                        ADWI <span className="text-accent">Technologies</span>
                                    </h2>
                                    <p className="text-sm sm:text-sm md:text-base lg:text-lg text-muted-foreground font-medium tracking-[0.2em] uppercase">
                                        Add Value To Your Business
                                    </p>
                                </motion.div>

                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-accent/10 border border-accent/20"
                                >
                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.12em] uppercase text-accent">
                                        {slides[current].badge}
                                    </span>
                                </motion.div>

                                {/* Hero title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-[1.1] text-foreground"
                                >
                                    {slides[current].title}{" "}
                                    <span className="text-accent">{slides[current].highlight}</span>
                                </motion.h1>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
                                >
                                    {slides[current].description}
                                </motion.p>
                            </div>

                            {/* Right: SVG graphic */}
                            <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent rounded-full blur-3xl opacity-50" />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative z-10 w-full h-full"
                                >
                                    {slides[current].svg(springX, springY)}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ============= NAVIGATION CONTROLS ============= */}
            <div className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Progress indicators */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1)
                                    setCurrent(idx)
                                }}
                                className={`relative h-1 sm:h-1.5 transition-all duration-500 rounded-full overflow-hidden cursor-pointer ${idx === current
                                    ? "w-10 sm:w-14 md:w-20 lg:w-24 bg-muted"
                                    : "w-2 sm:w-3 md:w-4 bg-muted/50 hover:bg-muted"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            >
                                {idx === current && (
                                    <motion.div
                                        className="absolute inset-0 bg-accent rounded-full"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 7, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Arrow navigation */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => paginate(-1)}
                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-border bg-card hover:border-accent hover:bg-accent hover:text-accent-foreground text-foreground transition-all flex items-center justify-center"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => paginate(1)}
                            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-border bg-card hover:border-accent hover:bg-accent hover:text-accent-foreground text-foreground transition-all flex items-center justify-center"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}