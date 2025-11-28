// service-with-sticky-text.tsx
"use client"
import { motion } from "framer-motion"
import { ServiceCard } from "./service-card"

interface ServiceWithStickyTextProps {
    service: any
    index: number
    isExpanded?: boolean
}

export function ServiceWithStickyText({ service, index, isExpanded = true }: ServiceWithStickyTextProps) {
    const isEven = index % 2 === 0
    const isLeftLayout = isEven

    const headerStyle = service.imageSrc
        ? {
            backgroundImage: `url(${service.imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }
        : {};

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full py-8 md:py-16"
        >
            {/* ✨ MODIFIED IMAGE BACKGROUND LAYER - HIGHER OPACITY ✨ */}
            {service.imageSrc && (
                <div
                    // CRITICAL CHANGE: Increased opacity to 25% (or 30% for a stronger presence).
                    className="absolute inset-0 z-0 overflow-hidden rounded-xl opacity-10 md:opacity-8"
                    style={headerStyle}
                >
                    {/* MODIFIED Gradient Overlay: Fade to near transparency/light background
                       This ensures the image is visible while giving the card a slightly darker backdrop.
                    */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/70"></div>
                </div>
            )}


            <div
                // Main Content Grid - Still relative (z-10)
                className={`relative z-10 grid gap-6 md:gap-8 lg:gap-12 items-start ${isLeftLayout
                    ? "grid-cols-1 sm:grid-cols-[100px_1fr] lg:grid-cols-[140px_1fr]"
                    : "grid-cols-1 sm:grid-cols-[1fr_100px] lg:grid-cols-[1fr_140px]"
                    }`}
            >

                {/* Left Sticky Text (remains unchanged) */}
                {isLeftLayout && (
                    <div className="hidden sm:flex items-center justify-center h-full col-span-1">
                        <div className="sticky top-[122px] h-fit flex items-center justify-center">
                            <div
                                className="text-xl md:text-3xl lg:text-4xl font-extrabold text-primary/80 hover:text-primary transition-all duration-300 whitespace-nowrap tracking-[0.2em] drop-shadow-lg"
                                style={{
                                    writingMode: "vertical-rl",
                                    textOrientation: "mixed",
                                    transform: "rotate(180deg)",
                                    transformOrigin: "center",
                                }}
                                title={service.title}
                            >
                                {service.title.toUpperCase()}
                            </div>
                        </div>
                    </div>
                )}

                {/* Service Card */}
                <ServiceCard service={service} index={index} isExpanded={isExpanded} onToggle={() => { }} />

                {/* Right Sticky Text (remains unchanged) */}
                {!isLeftLayout && (
                    <div className="hidden sm:flex items-center justify-center h-full col-span-1">
                        <div className="sticky top-[122px] h-fit flex items-center justify-center">
                            <div
                                className="text-xl md:text-3xl lg:text-4xl font-extrabold text-primary/80 hover:text-primary transition-all duration-300 whitespace-nowrap tracking-[0.2em] drop-shadow-lg"
                                style={{
                                    writingMode: "vertical-lr",
                                    textOrientation: "mixed",
                                    transformOrigin: "center",
                                }}
                                title={service.title}
                            >
                                {service.title.toUpperCase()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}