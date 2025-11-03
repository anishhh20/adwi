import { motion } from "framer-motion"

const CTA = () => {
  return (
     <section
          className="relative py-20 md:py-32 px-4 overflow-hidden" // Increased vertical padding
        >
          {/* Fixed Background Layer for Parallax Effect */}
          <div
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{ backgroundImage: "url('/paralled.png')" }}
          >
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black opacity-75"></div> {/* Increased opacity for better contrast */}
          </div>

          {/* Content Container */}
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to Partner With Us?</h2>
              <p className="text-lg text-white/80 mb-10">
                Let's explore how ADWI can help your business thrive with innovative solutions and dedicated support.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.1, y: -2 }} // More pronounced hover lift
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block px-10 py-4 bg-accent text-accent-foreground rounded-full font-bold text-lg transition-all shadow-2xl hover:bg-accent/90" // Enhanced button styling
              >
                Get in Touch Now
              </motion.a>
            </motion.div>
          </div>
        </section>
  )
}

export default CTA