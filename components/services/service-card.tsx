"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"

interface ServiceCardProps {
    service: {
        mailText: string
        mail: any
        id: string
        title: string
        description: string
        icon?: string
        imageSrc?: string // Added the new image property
        heroDescription?: string // Using heroDescription for the introductory text
        details?: Array<{ icon?: string; name?: string; title?: string; description?: string; level?: string }>
        features?: string[]
        methodologies?: Array<{ icon: string; title: string; description: string }>
        benefits?: string[]
    }
    isExpanded: boolean
    onToggle: () => void
    index: number
}

export function ServiceCard({ service, isExpanded }: ServiceCardProps) {
    // Determine if the current card is the Foreign Language service
    const isForeignLanguage = service.id === "foreign-language"

    // We assume isExpanded is always true from page.tsx
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            id={service.id}
            className="border border-border rounded-xl overflow-hidden  shadow-lg scroll-mt-24" // Enhanced base style
        >
            {/* New Prominent Header Area with Image */}
            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start bg-accent/45">
                {/* Text Content Column */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                        {service.icon && <span className="text-2xl sm:text-3xl">{service.icon}</span>}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                            {service.title}
                        </h3>
                    </div>

                    <p className="text-sm sm:text-md text-muted-foreground font-medium mb-4">{service.description}</p>

                    {/* Hero Description as a strong introductory statement */}
                    {service.heroDescription && (
                        <p className="text-xs sm:text-sm font-semibold text-foreground/80 border-l-4 border-accent pl-3 italic">
                            {service.heroDescription}
                        </p>
                    )}
                </div>
            </div>

            {/* Detailed Sections Area (Always visible) */}
            {isExpanded && (
                <div className="p-4 sm:p-8 bg-background/40 space-y-6 border-t border-border">
                    {/* Details Grid */}
                    {service.details && (
                        <div>
                            <h4 className="text-md font-bold text-accent mb-4 border-b border-accent/30 pb-2">
                                {isForeignLanguage ? "Languages Offered & Proficiency Levels" : "Key Offerings"}
                            </h4>

                            {/* Conditional Grid Layout */}
                            <div className={`grid gap-4 ${isForeignLanguage ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-3"}`}>
                                {service.details.map((detail, idx) => (
                                    <div
                                        key={idx}
                                        // Make the card position relative to hold the absolute background
                                        className={`p-4 rounded-lg border border-border/50 transition-all duration-300 relative overflow-hidden group ${isForeignLanguage
                                            ? "bg-primary/5 hover:bg-primary/10 shadow-md hover:shadow-lg"
                                            : "bg-card hover:shadow-xl"
                                            }`}
                                    >

                                        {/* ✨ ABSOLUTE FADED FLAG BACKGROUND (Foreign Language Only) ✨ */}
                                        {isForeignLanguage && detail.icon && (
                                            <div
                                                className="absolute inset-0 flex justify-end items-end p-2 opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                                            >
                                                <span className="text-[8rem] leading-none select-none pointer-events-none transform translate-x-4 translate-y-4">
                                                    {detail.icon}
                                                </span>
                                            </div>
                                        )}

                                        {/* Content Wrapper to ensure text is above the faded background */}
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-2">
                                                {/* Prominent Flag/Icon */}
                                                <div className={`${isForeignLanguage ? "text-3xl sm:text-4xl" : "text-xl"} mb-2 text-primary flex-shrink-0`}>
                                                    {detail.icon || detail.name?.split(" ")[0] || "•"}
                                                </div>

                                                {/* Language Name (Title) */}
                                                <h5 className="font-semibold text-foreground text-sm pt-1">
                                                    {detail.title || detail.name}
                                                </h5>
                                            </div>

                                            {/* Proficiency Level (Description) */}
                                            <p className="text-xs text-muted-foreground mt-1  leading-relaxed">
                                                {isForeignLanguage
                                                    ? `Proficiency: ${detail.level}`
                                                    : detail.description || detail.level}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features Section */}
                    {service.features && (
                        <div>
                            <h4 className="text-md font-bold text-accent mb-4 border-b border-accent/30 pb-2">Why Partner With Us</h4>
                            <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-foreground">
                                        <span className="text-md text-accent font-bold flex-shrink-0 mt-[-2px]">✔</span>
                                        <span dangerouslySetInnerHTML={{ __html: feature }} className="text-xs" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Methodologies Section */}
                    {service.methodologies && (
                        <div>
                            <h4 className="text-md font-bold text-accent mb-4 border-b border-accent/30 pb-2">Our Development Approach</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.methodologies.map((method, idx) => (
                                    <div key={idx} className="p-4 bg-card rounded-lg border border-border/50 transition-shadow hover:shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="text-xl mb-2 text-primary">{method.icon}</div>
                                            <h5 className="font-semibold text-foreground text-sm">{method.title}</h5>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits Section */}
                    {service.benefits && (
                        <div>
                            <h4 className="text-md font-bold text-accent mb-4 border-b border-accent/30 pb-2">
                                {service.id === "it-training-certification" ? "Your Training Advantage" : "The ADWI Advantage"}
                            </h4>
                            <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                {service.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-foreground">
                                        <span className="text-md text-accent font-bold flex-shrink-0 mt-[-2px]">✔</span>
                                        <span dangerouslySetInnerHTML={{ __html: benefit }} className="text-xs" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Contact Mail */}
                    {service.mail && (
                        <div >
                            <h4 className="text-md font-bold text-accent mb-4 border-b border-accent/30 pb-2">
                                {service.mailText || "Ready to Start? Send Us a Mail:"}
                            </h4>

                            <div className="flex items-center gap-4">
                                {/* Stylish Icon Container */}
                                <span className="flex-shrink-0 p-2 rounded-full bg-accent/10 text-accent transition-colors duration-300">
                                    <Mail className="w-4 h-4" />
                                </span>

                                {/* Email Link (Clickable and prominent) */}
                                <a
                                    href={`mailto:${service.mail.replace(/<[^>]*>?/gm, '')}`} // Clean HTML tags for the href
                                    className="text-sm font-semibold text-accent hover:text-black/80 transition-colors duration-300 hover:underline underline-offset-4"
                                    dangerouslySetInnerHTML={{ __html: service.mail }}
                                />

                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}