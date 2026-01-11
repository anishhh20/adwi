"use client"
import { motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PatternProps {
    className?: string;
    colorClass?: string;
    initialRotation?: number;
}

export const MinimalAbstractPattern: React.FC<PatternProps> = ({
    className = "",
    colorClass = "text-primary/20",
    initialRotation = 0,
}) => {
    const rotation = initialRotation % 360;

    return (
        <motion.div
            animate={{
                rotate: [rotation, 360 + rotation],
                x: [0, 8, -8, 0],
                y: [0, -5, 5, 0],
            }}
            transition={{
                rotate: {
                    duration: 90,
                    ease: "linear" as const,
                    repeat: Infinity,
                },
                x: {
                    duration: 12,
                    ease: "easeInOut" as const,
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                },
                y: {
                    duration: 16,
                    ease: "easeInOut" as const,
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                },
            }}
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
    );
};


const NotFound = () => {

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const numberVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Abstract patterns */}
            <MinimalAbstractPattern
                className="top-10 left-10 md:top-20 md:left-20"
                initialRotation={0}
            />
            <MinimalAbstractPattern
                className="bottom-10 right-10 md:bottom-20 md:right-20"
                initialRotation={180}
            />
            <MinimalAbstractPattern
                className="top-1/4 right-1/4 hidden lg:block"
                initialRotation={90}
                colorClass="text-accent/15"
            />

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                className="relative z-10 text-center max-w-2xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 404 Number */}
                <motion.div
                    variants={numberVariants}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="mb-6 md:mb-8"
                >
                    <span className="text-4xl sm:text-4xl md:text-[4rem] lg:text-[6rem] font-bold text-accent leading-none tracking-tighter">
                        404
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4"
                >
                    Page Not Found
                </motion.h1>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-base text-muted-foreground mb-8 md:mb-10 max-w-md mx-auto leading-relaxed"
                >
                    Oops! The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto min-w-[160px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105"
                    >
                        <Link href="/">
                            <HomeIcon className="w-4 h-4 mr-2" />
                            Go Home
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto min-w-[160px] border-border hover:bg-secondary font-medium transition-all duration-300"
                    >
                        <Link href="/">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            Go Back
                        </Link>
                    </Button>
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 md:mt-16 flex items-center justify-center gap-3"
                >
                    <div className="h-px w-12 bg-border" />
                    <span className="text-sm text-muted-foreground">Error 404</span>
                    <div className="h-px w-12 bg-border" />
                </motion.div>
            </motion.div>

            {/* Bottom pattern accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
    );
};

// Icon components
const HomeIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
    </svg>
);

export default NotFound;
