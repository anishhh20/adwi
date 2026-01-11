"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import ServiceHeroSection from "@/components/services/service-hero-section"
import ServiceGridSection from "@/components/services/service-grid-section"
import FeatureListSection from "@/components/services/feature-list-section"
import StepMethodologySection from "@/components/services/step-methodology-section"
import RelatedServicesSection from "@/components/services/related-services-section"

export default function ITTrainingCertificationPage() {
  const certificationDomains = [
    {
      title: "Project Management",
      description: "PMP, PRINCE2. Master the methodologies required to successfully lead and deliver complex projects on time and budget.",
      icon: "📊",
    },
    {
      title: "Information Security",
      description: "CISA, CISM, CRISC. Validate your expertise in audit, security management, and risk governance for critical systems.",
      icon: "🛡️",
    },
    {
      title: "Cloud & Infrastructure",
      description: "AWS, Microsoft Azure, VMware. Gain hands-on skills in architecting, deploying, and managing scalable cloud solutions.",
      icon: "☁️",
    },
    {
      title: "Networking & Systems",
      description: "Cisco (CCNA, CCNP), Oracle. Build foundational and advanced competence in network design, operation, and administration.",
      icon: "🌐",
    },
    {
      title: "IT Service Management",
      description: "ITIL. Learn the globally recognized best practices for delivering and supporting quality IT services to meet business needs.",
      icon: "⚙️",
    },
    {
      title: "Enterprise Architecture & Quality",
      description: "TOGAF, ISTQB. Certify your ability to design and govern enterprise architecture, and ensure software quality assurance.",
      icon: "📐",
    },
  ]

  const whyCertifyPoints = [
    "Secure high-demand Technical and strategic Management roles.",
    "Validate your expertise with universally recognized industry credentials.",
    "Improve job stability and increase your earning potential significantly.",
    "Stay current with the latest technology standards and best practices.",
  ]

  const trainingBenefits = [
    "Expert-led, engaging instruction from certified professionals.",
    "Flexible learning options: In-class, virtual, and self-paced programs.",
    "Comprehensive, updated materials aligned with the latest exam objectives.",
    "Proven high pass rates through focused practice exams and labs.",
    "Dedicated post-course support for seamless certification completion.",
    "Curriculum designed for immediate, real-world application of skills.",
  ]

  const learningExperience = [
    "Interactive Labs & Simulations: Practice in a zero-risk, real-world environment.",
    "Version New Curriculum: Continuously updated to address the latest industry standards.",
    "One-on-One Mentorship: Personalized guidance ensuring proper handling of complex topics.",
    "Enhanced Platform Features: A consistent, modern learning structure with optimized UX/UI.",
  ]

  const relatedServices = [
    {
      title: "Recruitment & Staffing",
      description: "Access top-tier talent with our expert recruitment solutions",
      link: "/services/recruitment-staffing",
    },
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs",
      link: "/services/software-development",
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
          badge="IT Training & Certification"
          title="Fast-Track Your"
          titleHighlight="Career in the IT Industry"
          description="Whether you're aiming for a technical role or a leadership position, certification is your gateway to success. Don't let a lack of credentials hold you back—invest in your future today with our industry-recognized certification programs."
          ctaText="Enroll Now and Get Certified"
          ctaHref="/contact"
        />

        {/* Why Certify Section */}
        <FeatureListSection
          title="Why Certification is Your Next Step"
          subtitle="Our programs are designed to help you stand out in a competitive job market, focusing on both Technical and Management domains."
          features={[
            ...whyCertifyPoints,
            "<strong>Stand Out:</strong> Showcase your proficiency to potential employers and gain a competitive edge whether you're starting out or aiming for executive management.",
          ]}
          backgroundColor="background"
        />

        {/* Certification Domains */}
        <ServiceGridSection
          title="Our Certification Domains"
          subtitle="Industry-recognized certifications covering the most in-demand technical and management skillsets."
          items={certificationDomains}
          variant="3-col"
        />

        {/* Enhanced Learning Edge */}
        <FeatureListSection
          title="The Enhanced Learning Edge"
          subtitle="A modern and enhanced experience with consistency, properly handled standards, and continuous updates."
          features={learningExperience}
          backgroundColor="card"
        />

        {/* Training Benefits */}
        <FeatureListSection
          title="Your Training Advantage"
          subtitle="Maximize your potential with world-class instruction and dedicated career support."
          features={trainingBenefits}
          backgroundColor="background"
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
