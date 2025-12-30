// service-card.tsx
"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import type React from "react"
import { GermanyFlagSVG } from "../sections/offices-section"

// --- REVISED COMPONENT: Service-specific Animated Pattern (Thematic Match) ---

interface PatternProps {
    className?: string
    colorClass?: string
    initialRotation?: number
    duration?: number
    serviceId: string
}

// Service-specific Animated Pattern (Thematic Match Line Art Style)
const ServiceAbstractPattern: React.FC<PatternProps> = ({
    className = "",
    colorClass = "text-white",
    initialRotation = 0,
    duration = 80,
    serviceId,
}) => {
    const drawVariants = {
        hidden: { strokeDashoffset: 1 },
        visible: {
            strokeDashoffset: 0,
            transition: {
                duration: 1.2,
                ease: "easeOut",
            },
        },
    }

    let svgContent = null
    const strokeProps = {
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none",
        pathLength: 1,
    }


    if (serviceId === "software-development") {
        svgContent = (
            <>
                {/* Business requirements */}
                <motion.rect x="6" y="34" width="24" height="18" rx="2" {...strokeProps} variants={drawVariants} />
                <motion.line x1="10" y1="40" x2="26" y2="40" {...strokeProps} variants={drawVariants} />
                <motion.line x1="10" y1="45" x2="26" y2="45" {...strokeProps} variants={drawVariants} />

                {/* Development process */}
                <motion.rect x="38" y="30" width="24" height="26" rx="2" {...strokeProps} variants={drawVariants} />
                <motion.text x="44" y="45" fontSize="6" fill="currentColor">{"</>"}</motion.text>

                {/* Outputs */}
                <motion.rect x="72" y="26" width="20" height="14" rx="2" {...strokeProps} variants={drawVariants} />
                <motion.rect x="72" y="46" width="12" height="22" rx="2" {...strokeProps} variants={drawVariants} />

                {/* Flow arrows */}
                <motion.path d="M30 43 H38 M62 43 H72" {...strokeProps} variants={drawVariants} />
            </>
        )
    }

    else if (serviceId === "recruitment-staffing") {
        svgContent = (
            <>
                {/* Talent pool */}
                <motion.circle cx="18" cy="40" r="6" {...strokeProps} variants={drawVariants} />
                <motion.circle cx="18" cy="56" r="6" {...strokeProps} variants={drawVariants} />
                <motion.circle cx="30" cy="48" r="6" {...strokeProps} variants={drawVariants} />

                {/* Evaluation funnel */}
                <motion.path d="M42 30 H58 L54 66 H46 Z" {...strokeProps} variants={drawVariants} />

                {/* Organization */}
                <motion.rect x="68" y="44" width="24" height="20" rx="2" {...strokeProps} variants={drawVariants} />

                {/* Leader */}
                <motion.circle cx="80" cy="34" r="6" strokeWidth={3} {...strokeProps} variants={drawVariants} />

                {/* Flow */}
                <motion.path d="M30 48 H42 M58 48 H68" {...strokeProps} variants={drawVariants} />
            </>
        )
    }

    else if (serviceId === "it-training-certification") {
        svgContent = (
            <>
                {/* Learning */}
                <motion.rect x="6" y="44" width="22" height="18" rx="2" {...strokeProps} variants={drawVariants} />
                <motion.line x1="10" y1="50" x2="24" y2="50" {...strokeProps} variants={drawVariants} />

                {/* Certification */}
                <motion.circle cx="50" cy="50" r="10" {...strokeProps} variants={drawVariants} />
                <motion.path d="M46 50 L50 54 L56 46" {...strokeProps} variants={drawVariants} />

                {/* Career */}
                <motion.path d="M70 70 V40 H90" {...strokeProps} variants={drawVariants} />
                <motion.circle cx="90" cy="40" r="4" {...strokeProps} variants={drawVariants} />

                {/* Flow */}
                <motion.path d="M28 53 H40 M60 53 H70" {...strokeProps} variants={drawVariants} />
            </>
        )
    }

    else if (serviceId === "foreign-language") {
        svgContent = (
            <>
                {/* Person A */}
                <motion.circle cx="12" cy="42" r="4" {...strokeProps} variants={drawVariants} />
                <motion.path d="M12 46 V56" {...strokeProps} variants={drawVariants} />

                {/* Person B */}
                <motion.circle cx="88" cy="42" r="4" {...strokeProps} variants={drawVariants} />
                <motion.path d="M88 46 V56" {...strokeProps} variants={drawVariants} />

                {/* Language bridge */}
                <motion.path d="M20 42 C40 20 60 20 80 42" {...strokeProps} variants={drawVariants} />

                {/* Globe */}
                <motion.circle cx="50" cy="70" r="12" {...strokeProps} variants={drawVariants} />
                <motion.path d="M38 70 H62" {...strokeProps} variants={drawVariants} />
            </>
        )
    }

    else if (serviceId === "digital-marketing") {
        svgContent = (
            <>
                {/* Social & Ads (The Megaphone/Broadcast) */}
                <motion.path d="M10 50 L30 40 V60 Z" {...strokeProps} variants={drawVariants} />
                <motion.path d="M30 45 Q45 35 60 45" {...strokeProps} variants={drawVariants} />

                {/* Content/Video (The Play Button) */}
                <motion.rect x="65" y="35" width="25" height="18" rx="2" {...strokeProps} variants={drawVariants} />
                <motion.path d="M75 40 L82 44 L75 48 Z" {...strokeProps} variants={drawVariants} />

                {/* Growth Arrow */}
                <motion.path d="M10 80 Q50 80 85 20" {...strokeProps} variants={drawVariants} />
                <motion.path d="M75 22 L85 20 L83 30" {...strokeProps} variants={drawVariants} />
            </>
        )
    }

    else {
        svgContent = (
            <>
                <path d="M 10 10 L 90 90 M 10 90 L 90 10" {...strokeProps} />
                <circle cx="50" cy="50" r="20" {...strokeProps} />
            </>
        )
    }

    if (!svgContent) return null

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className={`absolute h-40 w-40 opacity-40 pointer-events-none ${className}`}
        >

            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={colorClass}
            >
                {svgContent}
            </svg>
        </motion.div>
    )
}

// --- ServiceCard Component (Used to render the pattern) ---

interface ServiceCardProps {
    service: {
        mailText: string
        mail: any
        id: string
        title: string
        description: string
        icon?: string
        imageSrc?: string
        heroDescription?: string
        details?: Array<{ icon?: string; name?: string; title?: string; description?: string; level?: string }>
        features?: string[]
        methodologies?: Array<{ icon: string; title: string; description: string }>
        benefits?: string[]
    }
    isExpanded: boolean
    onToggle: () => void
    index: number
}

const UKFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#012169" />
        <path d="M0 0 L100 100 M100 0 L0 100" stroke="#fff" strokeWidth="20" />
        <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C8102E" strokeWidth="12" />
        <path d="M50 0 V100 M0 50 H100" stroke="#fff" strokeWidth="28" />
        <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="20" />
    </svg>
);

const FranceFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="33.3" height="100" fill="#002395" />
        <rect x="33.3" width="33.4" height="100" fill="#fff" />
        <rect x="66.7" width="33.3" height="100" fill="#ED2939" />
    </svg>
);

const SpainFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="25" fill="#AA151B" />
        <rect y="25" width="100" height="50" fill="#F1BF00" />
        <rect y="75" width="100" height="25" fill="#AA151B" />
        <circle cx="25" cy="50" r="8" fill="#AA151B" opacity="0.5" /> {/* Simplified Crest */}
    </svg>
);

const JapanFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#fff" />
        <circle cx="50" cy="50" r="30" fill="#BC002D" />
    </svg>
);

const ChinaFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#EE1C25" />
        <path d="M15 25 L18 35 L28 35 L20 42 L23 52 L15 45 L7 52 L10 42 L2 35 L12 35 Z" fill="#FFFF00" /> {/* Main Star */}
    </svg>
);

const KoreaFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="100" height="100" fill="#fff" />
        <circle cx="50" cy="50" r="25" fill="#CD2E3A" />
        <path d="M25 50 A25 25 0 0 1 75 50" fill="#0047A0" />
    </svg>
);

const ItalyFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="33.3" height="100" fill="#009246" />
        <rect x="33.3" width="33.4" height="100" fill="#fff" />
        <rect x="66.7" width="33.3" height="100" fill="#ce2b37" />
    </svg>
);

const PortugalFlagSVG = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <rect width="40" height="100" fill="#006600" />
        <rect x="40" width="60" height="100" fill="#FF0000" />
        <circle cx="40" cy="50" r="15" fill="#FFFF00" opacity="0.6" />
    </svg>
);

const CourseFlagItem = ({ name, icon }: { name: string; icon: string }) => {
    const flagMap: { [key: string]: React.ElementType } = {
        English: UKFlagSVG,
        German: GermanyFlagSVG,
        French: FranceFlagSVG,
        Spanish: SpainFlagSVG,
        Japanese: JapanFlagSVG,
        Chinese: ChinaFlagSVG,
        Korean: KoreaFlagSVG,
        Italian: ItalyFlagSVG,
        Portuguese: PortugalFlagSVG,
    };

    const FlagComponent = flagMap[name];

    return (
        <div className="flex flex-col items-center gap-2 sm:gap-4 w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] p-2 py-1 group sm:m-2">
            <div className="w-full aspect-[3/2] overflow-hidden rounded-sm shadow-md transition-transform group-hover:scale-105">
                {FlagComponent ? (
                    <FlagComponent className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-2xl">
                        {icon}
                    </div>
                )}
            </div>

            <span className="text-muted-foreground font-semibold text-xs tracking-wide text-center">
                {name}
            </span>
        </div>
    );
};


export function ServiceCard({ service, isExpanded, index }: ServiceCardProps) {
    const isForeignLanguage = service.id === "foreign-language"

    const patternProps = {
        serviceId: service.id,
        initialRotation: index * 40,
        duration: 80 + (index * 10),
        colorClass: "text-white",
        className: "top-10 right-20 translate-x-1/4 -translate-y-1/4",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            id={service.id}
            className="border border-border rounded-xl overflow-hidden shadow-lg scroll-mt-24 relative"
        >

            {/* Header Area: The pattern is placed here */}
            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start bg-accent/45 relative overflow-hidden">

                {/* ✨ Thematic, Animated White SVG Pattern ✨ */}
                <ServiceAbstractPattern
                    {...patternProps}
                    key={service.id}
                />

                {/* Text Content Column */}
                <div className="md:col-span-2 relative z-10">
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

            {isExpanded && (
                <div className="p-4 sm:p-8 bg-background/40 space-y-6 border-t border-border">
                    {/* Details Grid */}
                    {service.details && (
                        <div>
                            <h4 className="text-md font-bold text-accent mb-6 border-b border-accent/30 pb-2">
                                {isForeignLanguage ? "COURSES" : "Key Offerings"}
                            </h4>

                            {isForeignLanguage ? (
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-1 sm:p-2">
                                    {service.details.map((detail, idx) => (
                                        <CourseFlagItem
                                            key={idx}
                                            name={detail.name || detail.title || ""}
                                            icon={detail.icon || ""}
                                        />
                                    ))}
                                </div>

                            ) : (
                                /* Original Grid for other services */
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {service.details.map((detail, idx) => (
                                        <div key={idx} className="p-4 rounded-lg border border-border/50 bg-card hover:shadow-xl transition-all">
                                            <div className="flex items-start gap-2">
                                                <div className="text-xl mb-2 text-primary shrink-0">
                                                    {detail.icon || "•"}
                                                </div>
                                                <h5 className="font-semibold text-foreground text-sm pt-1">
                                                    {detail.title || detail.name}
                                                </h5>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                {detail.description || detail.level}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                    href={`mailto:${service.mail.replace(/<[^>]*>?/gm, '')}`}
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