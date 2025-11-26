"use client"

import { motion } from "framer-motion"

interface ServiceCardProps {
    service: {
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
}

export function ServiceCard({ service, isExpanded }: ServiceCardProps) {
    
    // We assume isExpanded is always true from page.tsx
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            id={service.id}
            className="border border-border rounded-xl overflow-hidden bg-card shadow-lg scroll-mt-38" // Enhanced base style
        >
            {/* New Prominent Header Area with Image */}
            <div  className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start bg-accent/5 "> 
                
                {/* Text Content Column */}
                <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                        {service.icon && <span className="text-4xl">{service.icon}</span>}
                        <h3 className="text-3xl font-extrabold text-foreground">
                            {service.title}
                        </h3>
                    </div>
                    
                    <p className="text-lg text-muted-foreground font-medium mb-4">{service.description}</p>
                    
                    {/* Hero Description as a strong introductory statement */}
                    {service.heroDescription && (
                        <p className="text-base font-semibold text-foreground/80 border-l-4 border-accent pl-3 italic">
                            {service.heroDescription}
                        </p>
                    )}
                </div>

                {/* Image Column */}
                <div className="md:col-span-1 flex justify-center items-center">
                    {service.imageSrc && (
                        <div className="w-full h-40 md:h-52 rounded-lg overflow-hidden border border-border/50 shadow-md">
                            {/* Placeholder for the Image Component (Assuming a simple img tag or Next.js Image) */}
                            {/* NOTE: You will need to ensure this path is correct and the image exists or use a proper Image component */}
                            <img 
                                src={service.imageSrc} 
                                alt={`Hero image for ${service.title}`} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Sections Area (Always visible) */}
            {isExpanded && (
                <div className="p-8 bg-background/50 space-y-10 border-t border-border"> 
                    {/* Details Grid */}
                    {service.details && (
                        <div>
                            <h4 className="text-xl font-bold text-accent mb-4 border-b border-accent/30 pb-2">Key Offerings</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
                                {service.details.map((detail, idx) => (
                                    <div key={idx} className="p-4 bg-card rounded-lg border border-border/50 transition-shadow hover:shadow-lg"> 
                                        <div className="text-2xl mb-2 text-primary">{detail.icon || detail.name?.split(" ")[0] || "•"}</div>
                                        <h5 className="font-semibold text-foreground text-base">{detail.title || detail.name}</h5>
                                        <p className="text-sm text-muted-foreground mt-1">{detail.description || detail.level}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features Section */}
                    {service.features && (
                        <div>
                            <h4 className="text-xl font-bold text-accent mb-4 border-b border-accent/30 pb-2">Why Partner With Us</h4>
                            <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8"> 
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-foreground">
                                        <span className="text-lg text-accent font-bold flex-shrink-0 mt-[-2px]">✔</span>
                                        <span dangerouslySetInnerHTML={{ __html: feature }} className="text-sm" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Methodologies Section */}
                    {service.methodologies && (
                        <div>
                            <h4 className="text-xl font-bold text-accent mb-4 border-b border-accent/30 pb-2">Our Development Approach</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                                {service.methodologies.map((method, idx) => (
                                    <div key={idx} className="p-4 bg-card rounded-lg border border-border/50 transition-shadow hover:shadow-lg">
                                        <div className="text-2xl mb-2 text-primary">{method.icon}</div>
                                        <h5 className="font-semibold text-foreground text-base">{method.title}</h5>
                                        <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Benefits Section */}
                    {service.benefits && (
                        <div>
                            <h4 className="text-xl font-bold text-accent mb-4 border-b border-accent/30 pb-2">
                                {service.id === "it-training-certification" ? "Your Training Advantage" : "The ADWI Advantage"}
                            </h4>
                            <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-x-8"> 
                                {service.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-foreground">
                                        <span className="text-lg text-accent font-bold flex-shrink-0 mt-[-2px]">✔</span>
                                        <span dangerouslySetInnerHTML={{ __html: benefit }} className="text-sm" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    )
}