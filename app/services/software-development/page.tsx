"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import ServiceHeroSection from "@/components/services/service-hero-section"
import ServiceGridSection from "@/components/services/service-grid-section"
import FeatureListSection from "@/components/services/feature-list-section"
import StepMethodologySection from "@/components/services/step-methodology-section"
import RelatedServicesSection from "@/components/services/related-services-section"
import AnimatedVectorPattern from "@/components/services/animated-vector-pattern"

export default function SoftwareDevelopmentPage() {
  const services = [
    {
      title: "Custom Software Development",
      description: "Tailored applications built for your unique business requirements and complex workflows.",
      icon: "⚙️",
    },
    {
      title: "Web Design & Development",
      description: "Modern, responsive web applications using cutting-edge technologies and frameworks.",
      icon: "🌐",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile apps delivering exceptional user experiences.",
      icon: "📱",
    },
    {
      title: "Automation Solutions",
      description: "Niche, essential, and easy-to-integrate automation solutions to empower your business.",
      icon: "💡",
    },
    {
      title: "2D & 3D Animation",
      description: "Professional 2D and 3D animation services for compelling and engaging visual content.",
      icon: "🎬",
    },
    {
      title: "CMS Solutions",
      description: "Easy-to-manage CMS platforms for dynamic content and continuous updates.",
      icon: "📚",
    },
  ]

  const features = [
    "We are your <strong>strategic partners</strong>",
    "Niche, essential, and easy-to-integrate services",
    "24/7 support & maintenance and ongoing support",
    "We treat your project as if it were our own",
    "Focus on <strong>Automation-Driven</strong> solutions",
    "Listen & understand your vision before developing",
  ]

  const methodologies = [
    {
      title: "Listen & Understand",
      description: "Initial scoping, goal definition, and vision alignment.",
      icon: "👂",
    },
    {
      title: "Agile Design & Development",
      description: "Iterative sprints, continuous feedback, and rapid prototyping.",
      icon: "🚀",
    },
    {
      title: "Quality & Security First",
      description: "Rigorous testing, compliance checks, and secure architecture design.",
      icon: "🛡️",
    },
    {
      title: "Deployment & Integration",
      description: "Seamless launch, continuous integration, and scalable deployment.",
      icon: "🔗",
    },
  ]

  const relatedServices = [
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
    {
      title: "Foreign Language",
      description: "Professional courses in various foreign languages for business and personal growth.",
      link: "/services/foreign-language",
    },
  ]

  return (
    <>
      <main className="w-full">
        {/* Hero Section */}
        <ServiceHeroSection
          badge="Software Development"
          title="Collaborative"
          titleHighlight="Innovation"
          description="At our core, we deliver niche, essential, and easy-to-integrate services that empower businesses to thrive in the digital age. We're not just service providers—we're your strategic partners. We believe in listening first—understanding your goals, challenges, and vision before we design, develop, and deploy. Your Business Is Our Business."
          ctaText="Start Your Project"
          ctaHref="/contact"
        />

        {/* Core Expertise Grid */}
        <ServiceGridSection
          title="Our Core Expertise"
          subtitle="Niche, essential, and easy-to-integrate services to empower your business."
          items={services}
          variant="3-col"
        />

        {/* Why Partner With Us */}
        <FeatureListSection
          title="Why Partner With Us"
          subtitle="We treat every project with the same care and commitment as if it were our own."
          features={features}
          backgroundColor="card"
        />

        {/* Development Approach */}
        <StepMethodologySection
          title="Our Development Approach"
          subtitle="We stay connected every step of the way, from initial scoping to final implementation."
          steps={methodologies}
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
