import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useScroll, useTransform } from "framer-motion";

// CARD DATA 🚀
const CARD_DATA = [
  { id: "software-development", title: "Software Development", href: "/services/software-development", icon: "💻", description: "Building custom web, mobile, and cloud applications tailored to your business needs." },
  { id: "recruitment-staffing", title: "Recruitment and Staffing", href: "/services/recruitment-staffing", icon: "🤝", description: "Strategic talent acquisition and staffing solutions for finding the best IT professionals." },
  { id: "it-training-certification", title: "IT Training and Certification", href: "/services/training-certification", icon: "🎓", description: "Industry-recognized training and certification programs to upskill your team." },
  { id: "foreign-language", title: "Foreign Language", href: "/services/foreign-language", icon: "🌍", description: "Professional courses in various foreign languages for business and personal growth." },
  { id: "digital-marketing", title: "Digital Marketing and Promotions", href: "/services/digital-marketing", icon: "🚀", description: "Driving growth through strategic social management, high-impact content, and cinematic storytelling." },
];

const SPRING_CONFIG = { type: "spring", stiffness: 150, damping: 20, mass: 1 };
const STACK_GAP_REM = 5;
const SCROLL_DURATION_VH = 120;
const TOTAL_SCROLL_VH = CARD_DATA.length * SCROLL_DURATION_VH;

// CARD VARIANTS (Less Animated)
const cardVariants = {
  active: {
    y: 0,
    height: "24rem",
    opacity: 1,
    zIndex: 50,
    transition: SPRING_CONFIG,
  },
  previous: (offsetCount) => ({
    y: `${offsetCount * -STACK_GAP_REM}rem`,
    height: "6rem",
    opacity: 1,
    zIndex: 10 - offsetCount,
    transition: SPRING_CONFIG,
  }),
  next: {
    y: "100vh",
    height: "0rem",
    opacity: 0,
    zIndex: 1,
    transition: SPRING_CONFIG,
  },
};

const contentVariants = {
  active: {
    opacity: 1,
    height: "auto",
    visibility: "visible",
    transition: { duration: 0.3, delay: 0.1 },
  },
  hidden: {
    opacity: 0,
    height: 0,
    visibility: "hidden",
    transition: { duration: 0.2 },
  },
};

// 🌟 FLOW TRACKING: SCROLL-CONNECTED SVG LINE COMPONENT (Optimized)
const ScrollLineSVG = ({ scrollContainerRef, activeIndex }) => {

  // Use scrollYProgress tied to the container, offset to align perfectly with the sticky center.
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    // Start drawing when the top of the container hits the center of the viewport (sticky point)
    offset: ["start center", "end center"],
  });

  const MAX_PATH_LENGTH = 1000;
  const animatedOffset = useTransform(scrollYProgress, [0, 1], [MAX_PATH_LENGTH, 0]);

  const numCards = CARD_DATA.length;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
    >
      <svg
        className="absolute top-1/2 " // Vertically center the SVG's drawing area
        style={{
          left: '50%',
          // Aligns the line to the left edge of the content column (max-w-4xl is ~896px)
          transform: 'translateX(calc(-50% - 350px))',
          height: `100%`, // SVG height spans the full scroll container height
          width: '50px',
          overflow: 'visible',
          zIndex: 10,
        }}
        viewBox={`0 0 10 ${numCards * 10}`}
      >
        {/* Static Base Line (Gray) */}
        <line x1="5" y1="0" x2="5" y2={numCards * 10} stroke="#e0e0e0" strokeWidth="1" />

        {/* Animated Drawing Line (Blue) - Flow Tracking */}
        <motion.line
          x1="5" x2="5" y1="0" y2={numCards * 10}
          stroke="#2563eb" strokeWidth="3" strokeLinecap="round"
          style={{
            strokeDasharray: MAX_PATH_LENGTH,
            strokeDashoffset: animatedOffset, // Draws from top to bottom on scroll
          }}
        />

        {/* Nodes (Circles) - Aligned with trigger points */}
        {CARD_DATA.map((_, index) => {
          const yPosition = index * 10;
          const isActive = index <= activeIndex;

          return (
            <motion.circle
              key={index}
              cx="5"
              cy={yPosition}
              // Animates size based on activation state
              animate={{ r: isActive ? 5 : 4 }}
              transition={{ duration: 0.2 }}
              fill={isActive ? "#2563eb" : "#a1a1a1"}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default function StackingCardComponent() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const stickyRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Observer logic: Triggers card state changes
  const observerRefs = CARD_DATA.map((_, index) => {
    const { ref, inView } = useInView({
      // Stable threshold for full-height triggers
      threshold: 0.5,
    });

    useEffect(() => {
      if (inView) setCurrentCardIndex(index);
    }, [inView, index]);

    return ref;
  });

  return (
    <div className="relative">

      {/* MAIN SCROLL AREA - Reference for scroll boundaries */}
      <div
        className="relative my-20"
        style={{ minHeight: `${TOTAL_SCROLL_VH}vh` }}
        ref={scrollContainerRef}
      >

        {/* FLOW TRACKING: SVG Timeline */}
        <ScrollLineSVG
          scrollContainerRef={scrollContainerRef}
          activeIndex={currentCardIndex}
        />

        {/* SCROLL TRIGGERS */}
        {CARD_DATA.map((_, index) => (
          <div
            key={`trigger-${index}`}
            ref={observerRefs[index]}
            className="absolute left-0 w-full pointer-events-none"
            style={{
              top: `${index * SCROLL_DURATION_VH}vh`,
              height: `${SCROLL_DURATION_VH}vh`, // Full height of section for stable threshold
              zIndex: -1,
            }}
          />
        ))}

        {/* STICKY CARD HOLDER (Centered) */}
        <div
          ref={stickyRef}
          className="sticky top-1/2 flex items-center justify-center w-full px-4 z-20 transform "
        >
          <div className="w-full max-w-4xl relative h-[28rem]">
            {CARD_DATA.map((card, index) => {
              const isActive = index === currentCardIndex;
              const isPrevious = index < currentCardIndex;

              const state = isActive ? "active" : isPrevious ? "previous" : "next";
              const offset = currentCardIndex - index;

              return (
                <motion.div
                  key={card.id}
                  className={`
                    absolute top-0 w-full p-8 rounded-3xl text-center shadow-xl border backdrop-blur-md transition-colors duration-300
                    ${isActive
                      ? "bg-white/95 border-blue-600/90 shadow-blue-500/30"
                      : isPrevious
                        ? "bg-gray-100/90 border-gray-300 shadow-lg"
                        : "bg-gray-200/60 border-gray-300/50 shadow-md"}
                  `}
                  variants={cardVariants}
                  animate={state}
                  custom={offset}
                >
                  {/* Header and Content */}
                  <div className="flex justify-center items-center gap-6">
                    <span className={`text-4xl transition-all duration-300`}>
                      {card.icon}
                    </span>
                    {!isActive && (
                      <p className="font-extrabold text-xl text-gray-800">
                        {card.title}
                      </p>
                    )}
                  </div>
                  <motion.div
                    variants={contentVariants}
                    animate={isActive ? "active" : "hidden"}
                    className="pt-6"
                    style={{ overflow: "hidden" }}
                  >
                    <h2 className="font-extrabold text-4xl sm:text-5xl mb-4 text-gray-900">
                      {card.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                      {card.description}
                    </p>
                    <a href={card.href} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 text-lg"
                      >
                        Learn More ✨
                      </motion.button>
                    </a>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}