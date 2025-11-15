"use client"

import CTA from "@/components/CTA"
import Footer from "@/components/footer"
import ServiceHeroSection from "@/components/services/service-hero-section"
import ServiceGridSection from "@/components/services/service-grid-section"
import FeatureListSection from "@/components/services/feature-list-section"
import RelatedServicesSection from "@/components/services/related-services-section"

export default function RecruitmentStaffingPage() {
  const services = [
    {
      title: "C-Suite & Executive Search",
      description: "Identifying and placing visionary leaders (CEO, CTO, CFO, etc.) for immediate and long-term transformation.",
      icon: "👑",
    },
    {
      title: "Strategic Leadership Placements",
      description: "Full-time recruitment of proven senior management who drive fundamental business growth.",
      icon: "📈",
    },
    {
      title: "High-Impact Project Staffing",
      description: "Flexible, senior staffing solutions for critical, project-based requirements and interim leadership roles.",
      icon: "⚡",
    },
    {
      title: "Culture & Competency Matching",
      description: "Precision talent matching focusing on leadership competencies, cultural fit, and proven track records.",
      icon: "🎯",
    },
    {
      title: "Leadership Assessment",
      description: "Thorough, data-driven evaluation ensuring cultural, strategic, and skill alignment for high-stakes roles.",
      icon: "📊",
    },
    {
      title: "Leadership Retention",
      description: "Consultative services supporting long-term satisfaction and strategic retention of key executive talent.",
      icon: "🛡️",
    },
  ]

  const partnershipPoints = [
    "Your business goals and strategic direction",
    "The leadership competencies essential for success",
    "Your market position, business life-cycle, and competitive landscape",
    "Your unique organizational culture",
  ]

  const benefits = [
    "Access to experienced and proven C-Suite and Senior Management talent",
    "Reduced time-to-hire for critical, high-impact leadership roles",
    "India and Global-wide network of executive talent",
    "Customized executive recruitment strategies",
    "Continuous support and strategic relationship management",
    "Transparent and fair engagement models",
  ]

  const relatedServices = [
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs",
      link: "/services/software-development",
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
          badge="Executive Recruitment & Staffing"
          title="Empowering Organizations with"
          titleHighlight="Proven Leadership"
          description="At our core, we specialize in identifying and placing experienced, high-impact leaders who drive immediate results and long-term transformation. Our candidates are not just qualified—they're proven performers ready to elevate your organization."
          ctaText="Start Your Strategic Search"
          ctaHref="/contact"
        />

        {/* Strategic Partnership Section */}
        <FeatureListSection
          title="Strategic Partnership for Long-Term Success"
          subtitle="We believe in building enduring relationships. That means taking the time to deeply understand your organization's context and future needs. Our collaborative process ensures clear alignment and long-term satisfaction."
          features={[
            ...partnershipPoints,
            "<strong>Transparent, Collaborative Process:</strong> We maintain open and honest communication throughout every assignment, ensuring clear alignment of expectations and a seamless transition from selection to onboarding for long-term satisfaction.",
          ]}
          backgroundColor="background"
        />

        {/* Strategic Solutions Grid */}
        <ServiceGridSection
          title="Our Strategic Solutions"
          subtitle="Targeted executive and senior staffing solutions built for high-level impact."
          items={services}
          variant="3-col"
        />

        {/* Key Benefits */}
        <FeatureListSection
          title="The ADWI Advantage"
          subtitle="Experience seamless, strategic executive recruitment with proven results and dedicated support."
          features={benefits}
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
