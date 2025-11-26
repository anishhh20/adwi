"use client"

import type React from "react"
import { motion } from "framer-motion"

interface PatternProps {
    className?: string
    colorClass?: string
    initialRotation?: number
}

export const MinimalAbstractPattern: React.FC<PatternProps> = ({
    className = "",
    colorClass = "text-primary/30",
    initialRotation = 0,
}) => {
    const rotation = initialRotation % 360

    const patternVariants = {
        animate: {
            rotate: [rotation, 360 + rotation],
            x: [0, 8, -8, 0],
            y: [0, -5, 5, 0],
            transition: {
                rotate: {
                    duration: 90,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                },
                x: {
                    duration: 12,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                },
                y: {
                    duration: 16,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse" as const,
                },
            },
        },
    }

    return (
        <motion.div
            variants={patternVariants}
            animate="animate"
            className={`absolute h-48 w-48 md:h-72 md:w-72 opacity-20 pointer-events-none ${className}`}
            style={{ transformOrigin: "50% 50%" }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={colorClass}
            >
                <path
                    d="M 10 10 L 90 90 M 10 90 L 90 10 M 50 10 V 90 M 10 50 H 90"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeDasharray="100"
                />
                <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <rect x="20" y="20" width="60" height="60" rx="5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
        </motion.div>
    )
}
