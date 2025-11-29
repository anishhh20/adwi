import { motion } from "framer-motion"

const CTA = () => {
  return (
    <section
      className="relative py-20 md:py-32 px-4 overflow-hidden" // Increased vertical padding
    >
      {/* Fixed Background Layer for Parallax Effect */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/services.jpg')" }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black opacity-45"></div> {/* Increased opacity for better contrast */}
      </div>

      {/* Content Container */}
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white/90 mb-3 leading-tight">
            Ready to <span className="text-accent">Partner</span> With Us?
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mt-4">
            Let's explore how ADWI can help your business thrive with innovative solutions and dedicated support.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.1, y: -2 }} // More pronounced hover lift
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-block px-6 py-2 mt-4 bg-accent text-accent-foreground rounded-full font-bold text-md transition-all shadow-2xl hover:bg-accent/90" // Enhanced button styling
          >
            Get in Touch Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA