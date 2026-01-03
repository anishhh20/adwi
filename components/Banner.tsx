"use client"

import type React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Enhanced Software Development SVG - Terminal with code, floating tech icons
const ModernSoftwareSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const rotateX = useTransform(mouseY, [-250, 250], [12, -12])
    const rotateY = useTransform(mouseX, [-250, 250], [-12, 12])

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="w-full h-full flex items-center justify-center cursor-pointer"
        >
            <svg viewBox="0 0 700 700" className="w-full h-full">
                <defs>
                    <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(78 100% 35%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 50%)" />
                    </linearGradient>
                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(210 11% 10%)" />
                        <stop offset="100%" stopColor="hsl(210 11% 15%)" />
                    </linearGradient>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="terminalShadow">
                        <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="hsl(210 11% 13%)" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Background glow */}
                <motion.circle
                    cx="350" cy="350" r="280"
                    fill="url(#codeGrad)" opacity="0.05"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Main Terminal Window */}
                <motion.g filter="url(#terminalShadow)">
                    <rect x="80" y="120" width="450" height="340" rx="16" fill="url(#screenGrad)" />
                    <rect x="80" y="120" width="450" height="50" rx="16" fill="hsl(210 11% 8%)" />
                    {/* Close minimize maximize buttons */}
                    <circle cx="115" cy="145" r="8" fill="hsl(0 70% 55%)" />
                    <circle cx="145" cy="145" r="8" fill="hsl(45 90% 55%)" />
                    <circle cx="175" cy="145" r="8" fill="hsl(120 70% 45%)" />
                    {/* Terminal title */}
                    <text x="305" y="150" textAnchor="middle" fontSize="14" fill="hsl(210 11% 50%)" fontFamily="monospace">~/projects/innovation</text>
                </motion.g>

                {/* Animated Code Lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.g key={i}>
                        {/* Line number */}
                        <text x="105" y={200 + i * 38} fontSize="12" fill="hsl(210 11% 40%)" fontFamily="monospace">{i + 1}</text>
                        {/* Code line */}
                        <motion.rect
                            x="130" y={188 + i * 38}
                            height="10" rx="2"
                            fill="url(#codeGrad)"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: [80, 200, 140, 280, 120, 180][i], opacity: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
                        />
                        {/* Secondary code elements */}
                        {i % 2 === 0 && (
                            <motion.rect
                                x={160 + [80, 200, 140, 280, 120, 180][i]}
                                y={188 + i * 38}
                                height="10" rx="2"
                                fill="hsl(78 60% 60%)"
                                opacity="0.5"
                                initial={{ width: 0 }}
                                animate={{ width: 40 + i * 10 }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                            />
                        )}
                    </motion.g>
                ))}

                {/* Cursor blink */}
                <motion.rect
                    x="130" y={188 + 6 * 38} width="8" height="14"
                    fill="hsl(78 100% 35%)"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Floating Tech Nodes */}
                {[
                    { x: 580, y: 150, label: "TS", color: "hsl(211 60% 48%)" },
                    { x: 600, y: 280, label: "⚛", color: "hsl(193 95% 68%)" },
                    { x: 570, y: 400, label: "🔧", color: "hsl(78 100% 35%)" },
                    { x: 620, y: 500, label: "API", color: "hsl(280 60% 55%)" },
                ].map((node, i) => (
                    <motion.g
                        key={i}
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                        <circle cx={node.x} cy={node.y} r="35" fill="hsl(210 11% 13%)" stroke={node.color} strokeWidth="2" filter="url(#softGlow)" />
                        <text x={node.x} y={node.y + 6} textAnchor="middle" fontSize="18" fill={node.color} fontWeight="bold">{node.label}</text>
                    </motion.g>
                ))}

                {/* Connection lines */}
                {[150, 280, 400].map((y, i) => (
                    <motion.path
                        key={i}
                        d={`M530 ${170 + i * 80} Q560 ${y} 580 ${y}`}
                        fill="none" stroke="hsl(78 100% 35%)" strokeWidth="1" strokeDasharray="4,4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, delay: i * 0.3 }}
                    />
                ))}

                {/* Binary rain effect */}
                {[40, 60, 650, 670].map((x, i) => (
                    <motion.g key={i}>
                        {[0, 1, 2, 3, 4].map((j) => (
                            <motion.text
                                key={j}
                                x={x} y={100 + j * 120}
                                fontSize="10" fill="hsl(78 100% 35%)" opacity="0.2"
                                animate={{ y: [100 + j * 120, 200 + j * 120], opacity: [0.3, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: j * 0.4 + i * 0.2 }}
                            >
                                {Math.random() > 0.5 ? "1" : "0"}
                            </motion.text>
                        ))}
                    </motion.g>
                ))}
            </svg>
        </motion.div>
    )
}

// Enhanced Recruitment SVG - Radar with detailed candidates
const ModernRecruitmentSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const x = useTransform(mouseX, [-250, 250], [-20, 20])
    const y = useTransform(mouseY, [-250, 250], [-20, 20])

    const candidates = [
        { angle: 0, name: "Executive", skill: "Leadership", level: 95 },
        { angle: 72, name: "Developer", skill: "Technical", level: 88 },
        { angle: 144, name: "Designer", skill: "Creative", level: 92 },
        { angle: 216, name: "Analyst", skill: "Strategic", level: 85 },
        { angle: 288, name: "Manager", skill: "Operations", level: 90 },
    ]

    return (
        <motion.div style={{ x, y }} className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 700 700" className="w-full h-full">
                <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(78 100% 35%)" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="hsl(78 100% 35%)" stopOpacity="0" />
                    </radialGradient>
                    <filter id="candidateGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Radar background circles */}
                {[280, 220, 160, 100, 50].map((r, i) => (
                    <circle key={i} cx="350" cy="350" r={r} fill="none" stroke="hsl(78 100% 35%)" strokeWidth="1" opacity={0.1 + i * 0.05} />
                ))}

                {/* Radar grid lines */}
                {[0, 45, 90, 135].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180
                    return (
                        <line
                            key={i}
                            x1={350 - Math.cos(rad) * 280}
                            y1={350 - Math.sin(rad) * 280}
                            x2={350 + Math.cos(rad) * 280}
                            y2={350 + Math.sin(rad) * 280}
                            stroke="hsl(78 100% 35%)" strokeWidth="1" opacity="0.1"
                        />
                    )
                })}

                {/* Radar sweep animation */}
                <motion.g
                    style={{ transformOrigin: "350px 350px" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M350 350 L350 70 A280 280 0 0 1 550 180 Z" fill="url(#radarGrad)" />
                </motion.g>

                {/* Multiple pulse rings */}
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={i}
                        cx="350" cy="350" r="280"
                        fill="none" stroke="hsl(78 100% 35%)" strokeWidth="2"
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
                    />
                ))}

                {/* Candidate nodes with detailed info */}
                {candidates.map((candidate, i) => {
                    const rad = (candidate.angle * Math.PI) / 180
                    const cx = 350 + Math.cos(rad) * 220
                    const cy = 350 + Math.sin(rad) * 220
                    return (
                        <motion.g
                            key={i}
                            whileHover={{ scale: 1.15 }}
                            filter="url(#candidateGlow)"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            {/* Outer ring */}
                            <circle cx={cx} cy={cy} r="45" fill="hsl(210 11% 13%)" stroke="hsl(78 100% 35%)" strokeWidth="2" />
                            {/* Progress arc */}
                            <motion.circle
                                cx={cx} cy={cy} r="40"
                                fill="none" stroke="hsl(78 100% 35%)" strokeWidth="4"
                                strokeDasharray={`${candidate.level * 2.5} 250`}
                                strokeLinecap="round"
                                style={{ transformOrigin: `${cx}px ${cy}px`, rotate: -90 }}
                                initial={{ strokeDasharray: "0 250" }}
                                animate={{ strokeDasharray: `${candidate.level * 2.5} 250` }}
                                transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                            />
                            {/* Person icon */}
                            <circle cx={cx} cy={cy - 8} r="10" fill="hsl(78 100% 35%)" />
                            <path d={`M${cx - 15} ${cy + 20} Q${cx} ${cy - 5} ${cx + 15} ${cy + 20}`} fill="none" stroke="hsl(78 100% 35%)" strokeWidth="3" strokeLinecap="round" />
                            {/* Label */}
                            <text x={cx} y={cy + 60} textAnchor="middle" fontSize="11" fill="hsl(78 100% 35%)" fontWeight="bold">{candidate.name}</text>
                            <text x={cx} y={cy + 75} textAnchor="middle" fontSize="9" fill="hsl(210 11% 50%)">{candidate.skill}</text>
                        </motion.g>
                    )
                })}

                {/* Center hub */}
                <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <circle cx="350" cy="350" r="60" fill="hsl(78 100% 35%)" />
                    <circle cx="350" cy="350" r="50" fill="hsl(210 11% 13%)" />
                    <path d="M330 350 L370 350 M350 330 L350 370" stroke="hsl(78 100% 35%)" strokeWidth="4" strokeLinecap="round" />
                    <text x="350" y="395" textAnchor="middle" fontSize="10" fill="hsl(210 11% 50%)" fontWeight="bold">TALENT HUB</text>
                </motion.g>

                {/* Data points scattered */}
                {[...Array(20)].map((_, i) => {
                    const angle = Math.random() * 360
                    const distance = 80 + Math.random() * 180
                    const rad = (angle * Math.PI) / 180
                    return (
                        <motion.circle
                            key={i}
                            cx={350 + Math.cos(rad) * distance}
                            cy={350 + Math.sin(rad) * distance}
                            r="3"
                            fill="hsl(78 100% 35%)"
                            opacity="0.3"
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                        />
                    )
                })}
            </svg>
        </motion.div>
    )
}

// ENHANCED World Map SVG - Comprehensive with continents, language regions, connections
const ModernWorldMapSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const rotateX = useTransform(mouseY, [-250, 250], [8, -8])
    const rotateY = useTransform(mouseX, [-250, 250], [-8, 8])

    const languages = [
        { name: "English", info: "Global Business Language", icon: "🇬🇧", x: 135, y: 130, region: "North America", speakers: "1.5B" },
        { name: "German", info: "EU Economic Hub", icon: "🇩🇪", x: 335, y: 120, region: "Central Europe", speakers: "130M" },
        { name: "French", info: "Diplomatic Language", icon: "🇫🇷", x: 305, y: 145, region: "Western Europe", speakers: "280M" },
        { name: "Japanese", info: "N5 to N1 Certification", icon: "🇯🇵", x: 555, y: 155, region: "East Asia", speakers: "125M" },
        { name: "Spanish", info: "Latin American Markets", icon: "🇪🇸", x: 170, y: 255, region: "South America", speakers: "550M" },
        { name: "Chinese", info: "Mandarin Professional", icon: "🇨🇳", x: 500, y: 170, region: "East Asia", speakers: "1.1B" },
        { name: "Portuguese", info: "Brazilian Markets", icon: "🇧🇷", x: 220, y: 285, region: "South America", speakers: "260M" },
        { name: "Arabic", info: "MENA Region", icon: "🇸🇦", x: 380, y: 190, region: "Middle East", speakers: "420M" },
    ]

    const connections = [
        { from: { x: 135, y: 130 }, to: { x: 335, y: 120 }, color: "hsl(78 100% 35%)" },
        { from: { x: 335, y: 120 }, to: { x: 555, y: 155 }, color: "hsl(78 80% 45%)" },
        { from: { x: 170, y: 255 }, to: { x: 380, y: 190 }, color: "hsl(78 60% 55%)" },
        { from: { x: 500, y: 170 }, to: { x: 555, y: 155 }, color: "hsl(78 100% 35%)" },
        { from: { x: 135, y: 130 }, to: { x: 500, y: 170 }, color: "hsl(78 70% 50%)" },
    ]

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1200 }}
            className="w-full h-full flex items-center justify-center cursor-pointer"
        >
            <TooltipProvider>
                <svg viewBox="0 0 700 450" className="w-full h-full drop-shadow-2xl">
                    <defs>
                        <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="hsl(78 100% 35%)" stopOpacity="0.08" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(210 40% 96%)" />
                            <stop offset="100%" stopColor="hsl(210 30% 92%)" />
                        </linearGradient>
                        <linearGradient id="continentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(78 30% 85%)" />
                            <stop offset="100%" stopColor="hsl(78 20% 80%)" />
                        </linearGradient>
                        <filter id="landShadow">
                            <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="hsl(210 11% 13%)" floodOpacity="0.15" />
                        </filter>
                    </defs>

                    {/* Ocean background */}
                    <rect width="700" height="450" fill="url(#oceanGrad)" rx="20" />
                    <rect width="700" height="450" fill="url(#mapGlow)" rx="20" />

                    {/* Grid pattern */}
                    <g opacity="0.1">
                        {[...Array(15)].map((_, i) => (
                            <line key={`h${i}`} x1="0" y1={i * 30 + 15} x2="700" y2={i * 30 + 15} stroke="hsl(78 100% 35%)" strokeWidth="0.5" />
                        ))}
                        {[...Array(24)].map((_, i) => (
                            <line key={`v${i}`} x1={i * 30 + 10} y1="0" x2={i * 30 + 10} y2="450" stroke="hsl(78 100% 35%)" strokeWidth="0.5" />
                        ))}
                    </g>

                    {/* NORTH AMERICA - Detailed */}
                    <motion.path
                        d="M60,80 L90,60 L130,55 L170,60 L200,75 L215,65 L240,70 L250,90 L240,110 L220,125 L200,130 L180,150 L165,180 L170,210 L155,235 L140,245 L125,235 L110,210 L95,180 L80,150 L70,120 L60,100 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                    {/* Canada detail */}
                    <path d="M100,65 L120,55 L145,50 L165,55 L180,65 L165,75 L140,72 L115,75 Z" fill="hsl(78 25% 82%)" opacity="0.6" />

                    {/* SOUTH AMERICA - Detailed */}
                    <motion.path
                        d="M150,260 L175,250 L195,255 L220,260 L235,280 L230,310 L220,340 L200,365 L180,380 L165,375 L160,350 L155,320 L150,290 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                    />

                    {/* EUROPE - Detailed */}
                    <motion.path
                        d="M280,85 L300,80 L330,75 L360,80 L380,90 L390,105 L385,125 L370,140 L350,150 L330,155 L305,150 L285,140 L275,120 L278,100 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                    {/* Scandinavia */}
                    <path d="M320,60 L340,50 L355,55 L360,70 L350,80 L335,78 L325,72 Z" fill="hsl(78 25% 82%)" opacity="0.7" />
                    {/* UK */}
                    <path d="M275,95 L285,90 L290,100 L285,110 L275,105 Z" fill="hsl(78 30% 80%)" opacity="0.8" />

                    {/* AFRICA - Detailed */}
                    <motion.path
                        d="M300,165 L330,160 L365,170 L390,190 L405,220 L400,260 L385,300 L360,340 L330,360 L305,355 L290,320 L285,280 L290,240 L295,200 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                    {/* Madagascar */}
                    <path d="M410,290 L420,285 L425,310 L415,325 L408,310 Z" fill="hsl(78 25% 82%)" opacity="0.7" />

                    {/* ASIA - Detailed */}
                    <motion.path
                        d="M400,80 L450,70 L500,75 L550,85 L580,100 L590,130 L580,160 L560,180 L530,190 L500,195 L470,190 L440,180 L420,165 L410,140 L405,110 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    />
                    {/* Middle East */}
                    <path d="M370,160 L400,155 L420,165 L415,185 L395,195 L375,190 L365,175 Z" fill="hsl(78 25% 82%)" opacity="0.6" />
                    {/* India */}
                    <path d="M455,180 L480,175 L495,190 L490,220 L470,240 L455,230 L450,205 Z" fill="hsl(78 25% 82%)" opacity="0.6" />

                    {/* JAPAN - Detailed */}
                    <motion.path
                        d="M565,130 L575,125 L580,140 L578,160 L570,170 L562,165 L560,145 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* AUSTRALIA - Detailed */}
                    <motion.path
                        d="M520,280 L560,275 L600,285 L620,310 L615,345 L590,365 L550,370 L520,355 L510,325 L515,295 Z"
                        fill="url(#continentGrad)" stroke="hsl(78 40% 70%)" strokeWidth="1.5" filter="url(#landShadow)"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    />
                    {/* New Zealand */}
                    <path d="M640,350 L650,345 L655,360 L650,375 L642,368 Z" fill="hsl(78 25% 82%)" opacity="0.7" />

                    {/* INDONESIA */}
                    <path d="M510,230 L540,225 L570,230 L590,240 L580,255 L550,260 L520,255 L505,245 Z" fill="hsl(78 28% 83%)" stroke="hsl(78 40% 70%)" strokeWidth="1" opacity="0.9" />

                    {/* Animated connection arcs */}
                    {connections.map((conn, i) => (
                        <motion.path
                            key={i}
                            d={`M${conn.from.x},${conn.from.y} Q${(conn.from.x + conn.to.x) / 2},${Math.min(conn.from.y, conn.to.y) - 60} ${conn.to.x},${conn.to.y}`}
                            fill="none"
                            stroke={conn.color}
                            strokeWidth="1.5"
                            strokeDasharray="6,4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.5 }}
                            transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                        />
                    ))}

                    {/* Traveling data particles */}
                    {connections.map((conn, i) => (
                        <motion.circle
                            key={`particle${i}`}
                            r="4"
                            fill="hsl(78 100% 50%)"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                cx: [conn.from.x, (conn.from.x + conn.to.x) / 2, conn.to.x],
                                cy: [conn.from.y, Math.min(conn.from.y, conn.to.y) - 60, conn.to.y],
                            }}
                            transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, repeatDelay: 2 }}
                        />
                    ))}

                    {/* Language markers with enhanced tooltips */}
                    {languages.map((lang, i) => (
                        <Tooltip key={i}>
                            <TooltipTrigger asChild>
                                <motion.g
                                    whileHover={{ scale: 1.25 }}
                                    className="cursor-pointer"
                                >
                                    {/* Outer pulse ring */}
                                    <motion.circle
                                        cx={lang.x} cy={lang.y} r="18"
                                        fill="none" stroke="hsl(78 100% 35%)"
                                        initial={{ scale: 0.5, opacity: 1 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                                    />
                                    {/* Secondary pulse */}
                                    <motion.circle
                                        cx={lang.x} cy={lang.y} r="18"
                                        fill="none" stroke="hsl(78 80% 45%)"
                                        initial={{ scale: 0.5, opacity: 0.8 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 + 0.5 }}
                                    />
                                    {/* Main marker */}
                                    <circle cx={lang.x} cy={lang.y} r="8" fill="hsl(78 100% 35%)" />
                                    <circle cx={lang.x} cy={lang.y} r="4" fill="hsl(0 0% 100%)" />
                                    {/* Location pin */}
                                    <path
                                        d={`M${lang.x} ${lang.y - 8} L${lang.x - 6} ${lang.y - 22} A8,8 0 1,1 ${lang.x + 6} ${lang.y - 22} Z`}
                                        fill="hsl(210 11% 13%)"
                                        stroke="hsl(78 100% 35%)"
                                        strokeWidth="1.5"
                                    />
                                    <text x={lang.x} y={lang.y - 20} textAnchor="middle" fontSize="10">{lang.icon}</text>
                                </motion.g>
                            </TooltipTrigger>
                            <TooltipContent className="bg-foreground text-background border-primary p-3 max-w-[200px]">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{lang.icon}</span>
                                        <span className="font-bold text-sm">{lang.name}</span>
                                    </div>
                                    <p className="text-xs opacity-80">{lang.info}</p>
                                    <div className="flex justify-between text-xs pt-1 border-t border-primary/20 mt-1">
                                        <span className="opacity-60">{lang.region}</span>
                                        <span className="text-primary font-semibold">{lang.speakers}</span>
                                    </div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    ))}

                    {/* Legend */}
                    <g transform="translate(20, 380)">
                        <rect x="0" y="0" width="160" height="50" rx="8" fill="hsl(0 0% 100%)" stroke="hsl(78 100% 35%)" strokeWidth="1" opacity="0.9" />
                        <text x="10" y="18" fontSize="9" fill="hsl(210 11% 40%)" fontWeight="bold">LANGUAGE REGIONS</text>
                        <circle cx="20" cy="35" r="5" fill="hsl(78 100% 35%)" />
                        <text x="32" y="38" fontSize="8" fill="hsl(210 11% 50%)">Active Markets</text>
                        <line x1="85" y1="35" x2="110" y2="35" stroke="hsl(78 100% 35%)" strokeWidth="1.5" strokeDasharray="4,2" />
                        <text x="118" y="38" fontSize="8" fill="hsl(210 11% 50%)">Routes</text>
                    </g>

                    {/* Stats */}
                    <g transform="translate(540, 380)">
                        <rect x="0" y="0" width="140" height="50" rx="8" fill="hsl(0 0% 100%)" stroke="hsl(78 100% 35%)" strokeWidth="1" opacity="0.9" />
                        <text x="70" y="18" textAnchor="middle" fontSize="9" fill="hsl(210 11% 40%)" fontWeight="bold">GLOBAL REACH</text>
                        <text x="70" y="38" textAnchor="middle" fontSize="14" fill="hsl(78 100% 35%)" fontWeight="bold">8 Languages</text>
                    </g>
                </svg>
            </TooltipProvider>
        </motion.div>
    )
}

// Enhanced Training SVG - Skills progression with modules
const ModernTrainingSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const y = useTransform(mouseY, [-250, 250], [-20, 20])

    const levels = [
        { name: "Foundation", progress: 100, modules: 8, icon: "📚" },
        { name: "Intermediate", progress: 85, modules: 12, icon: "⚡" },
        { name: "Advanced", progress: 60, modules: 10, icon: "🎯" },
        { name: "Expert", progress: 35, modules: 6, icon: "🏆" },
    ]

    return (
        <motion.div
            style={{ y }}
            className="w-full h-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            <svg viewBox="0 0 700 700" className="w-full h-full">
                <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(78 100% 35%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 55%)" />
                    </linearGradient>
                    <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(210 20% 92%)" />
                        <stop offset="100%" stopColor="hsl(210 20% 88%)" />
                    </linearGradient>
                    <filter id="progressShadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="hsl(78 100% 35%)" floodOpacity="0.25" />
                    </filter>
                </defs>

                {/* Background decorative elements */}
                <motion.circle
                    cx="600" cy="150" r="100"
                    fill="hsl(78 100% 35%)" opacity="0.05"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.circle
                    cx="100" cy="550" r="80"
                    fill="hsl(78 100% 35%)" opacity="0.03"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />

                {/* Main title */}
                <text x="350" y="70" textAnchor="middle" fontSize="24" fill="hsl(210 11% 13%)" fontWeight="bold">Learning Path</text>
                <motion.rect
                    x="280" y="80" width="140" height="3" rx="1.5"
                    fill="url(#progressGrad)"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Connecting vertical line */}
                <motion.line
                    x1="100" y1="150" x2="100" y2="580"
                    stroke="hsl(78 100% 35%)" strokeWidth="3" strokeDasharray="8,8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />

                {levels.map((level, i) => (
                    <motion.g
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2, type: "spring" }}
                    >
                        {/* Level indicator circle */}
                        <motion.circle
                            cx="100" cy={170 + i * 110}
                            r="20"
                            fill={level.progress === 100 ? "hsl(78 100% 35%)" : "hsl(0 0% 100%)"}
                            stroke="hsl(78 100% 35%)" strokeWidth="3"
                            whileHover={{ scale: 1.2 }}
                        />
                        <text x="100" y={176 + i * 110} textAnchor="middle" fontSize="16">{level.icon}</text>

                        {/* Progress card */}
                        <motion.rect
                            x="140" y={130 + i * 110}
                            width="500" height="80" rx="16"
                            fill="hsl(0 0% 100%)"
                            stroke="hsl(210 20% 90%)" strokeWidth="1"
                            filter="url(#progressShadow)"
                            whileHover={{ x: 8, boxShadow: "0 8px 30px rgba(105, 179, 0, 0.2)" }}
                        />

                        {/* Progress track */}
                        <rect
                            x="160" y={165 + i * 110}
                            width="400" height="12" rx="6"
                            fill="url(#trackGrad)"
                        />

                        {/* Filled progress */}
                        <motion.rect
                            x="160" y={165 + i * 110}
                            height="12" rx="6"
                            fill="url(#progressGrad)"
                            initial={{ width: 0 }}
                            animate={{ width: level.progress * 4 }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                        />

                        {/* Progress percentage */}
                        <motion.text
                            x={580} y={175 + i * 110}
                            fontSize="14" fontWeight="bold" fill="hsl(78 100% 35%)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i * 0.2 }}
                        >
                            {level.progress}%
                        </motion.text>

                        {/* Level name and info */}
                        <text x="160" y={155 + i * 110} fontSize="14" fontWeight="bold" fill="hsl(210 11% 13%)">{level.name}</text>
                        <text x="160" y={195 + i * 110} fontSize="11" fill="hsl(210 11% 50%)">{level.modules} modules • Hands-on projects</text>

                        {/* Status badge */}
                        <rect
                            x="560" y={140 + i * 110}
                            width="65" height="22" rx="11"
                            fill={level.progress === 100 ? "hsl(78 100% 35%)" : "hsl(78 40% 90%)"}
                        />
                        <text
                            x="592" y={155 + i * 110}
                            textAnchor="middle" fontSize="9" fontWeight="bold"
                            fill={level.progress === 100 ? "hsl(0 0% 100%)" : "hsl(78 100% 30%)"}
                        >
                            {level.progress === 100 ? "COMPLETE" : "IN PROGRESS"}
                        </text>
                    </motion.g>
                ))}

                {/* Bottom stats */}
                <g transform="translate(350, 620)">
                    {[
                        { label: "Total Hours", value: "240+" },
                        { label: "Certifications", value: "4" },
                        { label: "Projects", value: "12" },
                    ].map((stat, i) => (
                        <g key={i} transform={`translate(${(i - 1) * 150}, 0)`}>
                            <text x="0" y="0" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(78 100% 35%)">{stat.value}</text>
                            <text x="0" y="20" textAnchor="middle" fontSize="10" fill="hsl(210 11% 50%)">{stat.label}</text>
                        </g>
                    ))}
                </g>
            </svg>
        </motion.div>
    )
}

// Enhanced Marketing SVG - Growth metrics with campaign visuals
const ModernMarketingSVG = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
    const rotate = useTransform(mouseX, [-250, 250], [-8, 8])

    const dataPoints = [
        { x: 100, y: 380 },
        { x: 180, y: 320 },
        { x: 260, y: 350 },
        { x: 340, y: 250 },
        { x: 420, y: 200 },
        { x: 500, y: 120 },
        { x: 580, y: 80 },
    ]

    return (
        <motion.div style={{ rotate }} className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 700 600" className="w-full h-full">
                <defs>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(78 100% 35%)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(78 100% 35%)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(78 100% 35%)" />
                        <stop offset="100%" stopColor="hsl(78 80% 50%)" />
                    </linearGradient>
                    <filter id="chartGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Grid background */}
                <g opacity="0.1">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line key={`h${i}`} x1="80" y1={80 + i * 70} x2="620" y2={80 + i * 70} stroke="hsl(210 11% 13%)" strokeWidth="1" />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <line key={`v${i}`} x1={100 + i * 80} y1="60" x2={100 + i * 80} y2="420" stroke="hsl(210 11% 13%)" strokeWidth="1" />
                    ))}
                </g>

                {/* Y-axis labels */}
                {["100%", "80%", "60%", "40%", "20%", "0%"].map((label, i) => (
                    <text key={i} x="65" y={85 + i * 70} textAnchor="end" fontSize="10" fill="hsl(210 11% 50%)">{label}</text>
                ))}

                {/* X-axis labels */}
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((label, i) => (
                    <text key={i} x={100 + i * 80} y="450" textAnchor="middle" fontSize="10" fill="hsl(210 11% 50%)">{label}</text>
                ))}

                {/* Area fill */}
                <motion.path
                    d={`M100,380 L180,320 L260,350 L340,250 L420,200 L500,120 L580,80 V420 H100 Z`}
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Main growth line */}
                <motion.path
                    d={`M100,380 C140,350 140,350 180,320 S220,360 260,350 S300,270 340,250 S380,220 420,200 S460,150 500,120 S540,90 580,80`}
                    fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round"
                    filter="url(#chartGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />

                {/* Data points with hover effect */}
                {dataPoints.map((point, i) => (
                    <motion.g key={i}>
                        <motion.circle
                            cx={point.x} cy={point.y} r="12"
                            fill="hsl(0 0% 100%)" stroke="hsl(78 100% 35%)" strokeWidth="3"
                            whileHover={{ scale: 1.3 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        />
                        <motion.circle
                            cx={point.x} cy={point.y} r="5"
                            fill="hsl(78 100% 35%)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                        />
                    </motion.g>
                ))}

                {/* Milestone annotation */}
                <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <line x1="500" y1="120" x2="500" y2="50" stroke="hsl(78 100% 35%)" strokeWidth="1" strokeDasharray="4,4" />
                    <rect x="440" y="20" width="120" height="35" rx="8" fill="hsl(78 100% 35%)" />
                    <text x="500" y="43" textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(0 0% 100%)">🚀 Peak ROI</text>
                </motion.g>

                {/* Campaign cards */}
                {[
                    { icon: "📱", label: "Social", value: "+340%", x: 100 },
                    { icon: "📧", label: "Email", value: "+180%", x: 250 },
                    { icon: "🎯", label: "PPC", value: "+420%", x: 400 },
                    { icon: "📊", label: "SEO", value: "+290%", x: 550 },
                ].map((card, i) => (
                    <motion.g
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.15 }}
                    >
                        <rect x={card.x} y="490" width="100" height="70" rx="12" fill="hsl(0 0% 100%)" stroke="hsl(210 20% 90%)" strokeWidth="1" />
                        <text x={card.x + 50} y="515" textAnchor="middle" fontSize="20">{card.icon}</text>
                        <text x={card.x + 50} y="535" textAnchor="middle" fontSize="11" fill="hsl(210 11% 50%)">{card.label}</text>
                        <text x={card.x + 50} y="552" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(78 100% 35%)">{card.value}</text>
                    </motion.g>
                ))}

                {/* Growth indicator */}
                <motion.g
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <circle cx="620" cy="80" r="35" fill="hsl(78 100% 35%)" />
                    <text x="620" y="75" textAnchor="middle" fontSize="14" fontWeight="bold" fill="hsl(0 0% 100%)">↑ 78%</text>
                    <text x="620" y="92" textAnchor="middle" fontSize="9" fill="hsl(0 0% 100%)" opacity="0.8">Growth</text>
                </motion.g>
            </svg>
        </motion.div>
    )
}

const slides = [
    {
        badge: "Software Development",
        heroTitle: "Collaborative",
        heroHighlight: "Innovation",
        heroDescription: "At our core, we deliver niche, essential, and easy-to-integrate services that empower businesses to thrive in the digital age. We're not just service providers—we're your strategic partners.",
        svg: (mouseX: any, mouseY: any) => <ModernSoftwareSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Executive Recruitment & Staffing",
        heroTitle: "Empowering Organizations with",
        heroHighlight: "Proven Leadership",
        heroDescription: "We specialize in identifying and placing experienced, high-impact leaders who drive immediate results and long-term transformation. Our candidates are not just qualified—they're proven performers ready to elevate your organization.",
        svg: (mouseX: any, mouseY: any) => <ModernRecruitmentSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "IT Training & Certification",
        heroTitle: "Fast-Track Your",
        heroHighlight: "Career in the IT Industry",
        heroDescription: "Whether you're aiming for a technical role or a leadership position, certification is your gateway to success. Don't let a lack of credentials hold you back—invest in your future today.",
        svg: (mouseX: any, mouseY: any) => <ModernTrainingSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Foreign Language Training",
        heroTitle: "Unlock",
        heroHighlight: "Global Opportunities",
        heroDescription: "Language is the bridge between thought and expression. We offer comprehensive training in key foreign languages—a gateway to personal and professional growth in today's interconnected world.",
        svg: (mouseX: any, mouseY: any) => <ModernWorldMapSVG mouseX={mouseX} mouseY={mouseY} />,
    },
    {
        badge: "Digital Marketing & Content",
        heroTitle: "Elevate Your",
        heroHighlight: "Brand Presence",
        heroDescription: "We combine data-driven marketing strategies with cinematic creativity to tell your brand's story. From paid ads to short films, we create digital experiences that convert.",
        svg: (mouseX: any, mouseY: any) => <ModernMarketingSVG mouseX={mouseX} mouseY={mouseY} />,
    },
]

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

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
        const timer = setInterval(() => paginate(1), 8000)
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
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%" className="stroke-foreground">
                    <defs>
                        <pattern id="banner-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#banner-grid)" />
                </svg>
            </div>

            {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-20 w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-4 sm:px-6 lg:px-12"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-foreground"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        ADWI <span className="text-primary">Technologies</span>
                    </motion.h2>
                    <motion.p
                        className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Add Value To Your Business
                    </motion.p>
                </div>
            </motion.div> */}

            <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 z-10">
                <div className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh] flex items-center py-4 sm:py-6 lg:py-8">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_, { offset }) => {
                                setIsDragging(false)
                                if (offset.x < -50) paginate(1)
                                else if (offset.x > 50) paginate(-1)
                            }}
                            className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12"
                        >
                            <div className="w-full lg:w-1/2 space-y-2 sm:space-y-3 md:space-y-3.5 lg:space-y-4 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 group cursor-pointer hover:bg-primary/15 hover:border-primary/40 transition-all"
                                >
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-xs font-black tracking-[0.15em] sm:tracking-[0.25em] uppercase text-primary">
                                        {slides[current].badge}
                                    </span>
                                </motion.div>

                                <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-[1] sm:leading-[0.95] text-foreground uppercase"
                                    >
                                        {slides[current].heroTitle}{" "}
                                        <span className="text-primary block sm:inline mt-1 sm:mt-0">{slides[current].heroHighlight}</span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-[10px] sm:text-xs md:text-sm lg:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
                                    >
                                        {slides[current].heroDescription}
                                    </motion.p>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 relative aspect-square max-w-[200px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[440px] xl:max-w-[500px] mx-auto lg:mx-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-40 blur-3xl rounded-full" />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className="relative z-10 w-full h-full group"
                                >
                                    {slides[current].svg(springX, springY)}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-6 lg:left-12 lg:right-12 flex items-center justify-between z-30 gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 items-center">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`h-0.5 sm:h-1 transition-all duration-700 rounded-full overflow-hidden cursor-pointer hover:bg-primary/30 ${idx === current ? "w-8 sm:w-12 md:w-16 lg:w-24 bg-foreground/10" : "w-2 sm:w-3 md:w-4 lg:w-6 bg-foreground/5"
                                    }`}
                            >
                                {idx === current && (
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 8, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
                        <motion.button
                            whileHover={{ scale: 1.08, backgroundColor: "hsl(78 100% 35%)" }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border border-foreground/10 hover:border-primary text-foreground hover:text-primary-foreground bg-background transition-all shadow-soft flex items-center justify-center"
                            onClick={() => paginate(-1)}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.08, backgroundColor: "hsl(78 100% 35%)" }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border border-foreground/10 hover:border-primary text-foreground hover:text-primary-foreground bg-background transition-all shadow-soft flex items-center justify-center"
                            onClick={() => paginate(1)}
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}
