import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll
} from "framer-motion";
import { useRouter } from "next/navigation";

interface Slide {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType | null;
    badge?: string;
    highlight?: string;
    svg?: (mouseX: any, mouseY: any) => JSX.Element;
}

const slides: Slide[] = [
    {
        title: "ADWI Technologies",
        subtitle: "Add Value To Your Business",
        description: "Custom software, strategic staffing, expert training & digital marketing solutions",
        icon: null,
    },
];

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Parallax Logic ---
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Background moves slower (parallax) - adjusted values for depth
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    // Content moves slightly faster in opposite direction or stays tighter
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    const opacityScroll = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Mouse tracking state for SVG interaction
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
        mouseY.set(clientY - top - height / 2);
    };

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const slide = slides[currentSlide];
    const IconComponent = slide.icon;
    const isSvgSlide = !!slide.svg;

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-black"
            onMouseMove={isSvgSlide ? handleMouseMove : undefined}
            onMouseLeave={isSvgSlide ? () => { mouseX.set(0); mouseY.set(0); } : undefined}
        >
            {/* PARALLAX BACKGROUND LAYER */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="./home.jpg"
                    alt="Technology background"
                    className="h-full w-full object-cover scale-110" // scale-110 prevents white edges during scroll
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </motion.div>

            {/* CONTENT LAYER */}
            <motion.div
                style={{ y: yText, opacity: opacityScroll }}
                className="relative z-10 flex min-h-screen items-center"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            className={`grid ${isSvgSlide ? 'lg:grid-cols-2 gap-8 items-center' : 'grid-cols-1'}`}
                        >
                            <div className="relative">
                                {/* Text Content Container */}
                                <div className="inline-block bg-accent/90 backdrop-blur-md px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-8">
                                    <div className="flex flex-col items-start gap-4">

                                        {isSvgSlide && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-accent/50">
                                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                <p className="text-xs font-semibold tracking-widest uppercase text-white/80">
                                                    {slide.badge}
                                                </p>
                                            </div>
                                        )}

                                        <div>
                                            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                                {slide.title}
                                                {slide.highlight && <span className="text-accent"> {slide.highlight}</span>}
                                            </h1>
                                            {!isSvgSlide && (
                                                <p className="mt-2 text-md font-light text-white/90 sm:text-lg">
                                                    {slide.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-8 max-w-xl text-md font-light text-white/80 sm:text-lg">
                                    {slide.description}
                                </p>

                                <div className="mt-10 flex flex-wrap gap-4">
                                    <button
                                        onClick={() => router.push("/services")}
                                        className="cursor-pointer group relative overflow-hidden rounded-lg bg-accent p-3 text-sm font-medium text-white transition-all hover:brightness-110"
                                    >
                                        Explore Services
                                    </button>
                                </div>

                                {/* Indicators */}
                                {/* <div className="mt-12 flex gap-3">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? "w-12 bg-accent" : "w-3 bg-white/30"
                                                }`}
                                        />
                                    ))}
                                </div> */}
                            </div>

                            {/* SVG Column */}
                            {isSvgSlide && slide.svg && (
                                <div className="relative w-full aspect-square max-w-[450px] mx-auto lg:mx-0">
                                    <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full" />
                                    <div className="relative z-10">
                                        {slide.svg(springX, springY)}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Scroll Indicator (Fades out on scroll) */}
            <motion.div
                style={{ opacity: opacityScroll }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                onClick={() => {
                    const aboutSection = document.getElementById("about");
                    if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: "smooth" });
                    }
                }}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-black/20 backdrop-blur-sm">
                    <ChevronDown className="h-5 w-5 text-white animate-bounce" />
                </div>
            </motion.div>

        </motion.section>
    );
};

export default HeroBanner;