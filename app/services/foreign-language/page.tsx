"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import ServiceHeroSection from "@/components/services/service-hero-section"
import ServiceGridSection from "@/components/services/service-grid-section"
import FeatureListSection from "@/components/services/feature-list-section"
import RelatedServicesSection from "@/components/services/related-services-section"

export default function ForeignLanguagePage() {
  const languages = [
    { name: "English", level: "All Levels", icon: "🇬🇧" },
    { name: "German", level: "A1 to C2", icon: "🇩🇪" },
    { name: "French", level: "A1 to C2", icon: "🇫🇷" },
    { name: "Japanese", level: "N5 to N1", icon: "🇯🇵" },
    { name: "Spanish", level: "A1 to C2", icon: "🇪🇸" },
    { name: "Mandarin Chinese", level: "Basic to Advanced", icon: "🇨🇳" },
  ]

  const learningStructurePoints = [
    "Expert instructors certified in foreign language pedagogy",
    "Small class sizes for personalized attention and better interaction",
    "Globally recognized curriculum focused on practical communication",
    "Flexible schedules: weekend, weekday, and custom corporate batches",
  ]

  const benefits = [
    "<strong>Career Advancement:</strong> Access global job markets and multinational roles",
    "<strong>Cultural Immersion:</strong> Understand different perspectives and customs",
    "<strong>Cognitive Boost:</strong> Enhance memory, problem-solving, and multitasking skills",
    "<strong>Study Abroad Preparation:</strong> Fulfill language requirements for international universities",
    "<strong>Networking Opportunities:</strong> Connect with a wider community of global professionals",
    "<strong>Personal Growth:</strong> Boost confidence and expand personal horizons",
  ]

  const relatedServices = [
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs",
      link: "/services/software-development",
    },
    {
      title: "Recruitment & Staffing",
      description: "Access top-tier talent with our expert recruitment solutions",
      link: "/services/recruitment-staffing",
    },
    {
      title: "IT Training and Certification",
      description: "Industry-recognized training and certification programs to upskill your team.",
      link: "/services/training-certification",
    },
  ]

  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <ServiceHeroSection
          badge="Foreign Language Training"
          title="Unlock"
          titleHighlight="Global Opportunities"
          description="Language is the bridge between thought and expression. At ADWI Technologies, we offer comprehensive training in key foreign languages—a gateway to personal and professional growth in today's interconnected world."
          ctaText="Enroll Today"
          ctaHref="/contact?flQuery=true"
        />

        {/* Core Language Programs */}
        <ServiceGridSection
          title="Our Core Language Programs"
          subtitle="Comprehensive training in the languages most in demand for global business and academia."
          items={languages}
          variant="3-col"
        />

        {/* Why Learn Section */}
        <FeatureListSection
          title="Why Master a Foreign Language"
          subtitle="Learning a foreign language is more than a skill—it's an investment in your future. It expands your horizons, connects cultures, and unlocks a new potential within yourself."
          features={benefits}
          backgroundColor="background"
        />

        {/* Learning Structure */}
        <FeatureListSection
          title="The ADWI Learning Structure"
          subtitle="We focus on a comprehensive, practical approach that ensures conversational fluency and cultural competence."
          features={[
            ...learningStructurePoints,
            "<strong>Goal-Oriented Learning:</strong> Whether it's clearing an international exam or achieving workplace fluency, our courses are structured to meet your specific linguistic goals effectively.",
          ]}
          backgroundColor="card"
        />

        {/* CTA */}
        <CTA />

        {/* Related Services */}
        <RelatedServicesSection services={relatedServices} />
      </main>
      <Footer />
    </>
  )
}
