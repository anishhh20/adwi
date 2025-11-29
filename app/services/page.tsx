// --- SKELETON COMPONENTS ---

import ServicesPage from "@/components/pages/Services";
import { Suspense } from "react";

// Reusable animated div for skeleton effect
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}></div>
);

// Skeleton for the Why Choose Us cards (3 columns)
const WhyChooseUsCardSkeleton = () => (
  <div className="p-8 bg-background rounded-xl border border-border shadow-lg space-y-3">
    <Skeleton className="h-8 w-8 rounded-full" /> {/* Icon */}
    <Skeleton className="h-4 w-3/4" /> {/* Title */}
    <Skeleton className="h-3 w-full" /> {/* Description line 1 */}
    <Skeleton className="h-3 w-5/6" /> {/* Description line 2 */}
  </div>
);

// Skeleton for the sticky Service Card layout
const ServiceWithStickyTextSkeleton = () => (
  // Mimics the outer structure of ServiceWithStickyText's layout (e.g., grid on large screens)
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 relative">

    {/* Sticky Text Sidebar (lg:col-span-1) */}
    <div className="lg:sticky lg:top-20 lg:self-start space-y-4 lg:col-span-1 p-4">
      <Skeleton className="h-10 w-4/5" /> {/* Sticky Title */}
      <Skeleton className="h-4 w-full" /> {/* Sticky description line 1 */}
      <Skeleton className="h-4 w-3/4" /> {/* Sticky description line 2 */}
      <Skeleton className="h-4 w-1/2" /> {/* Sticky description line 3 */}
      <Skeleton className="h-10 w-24" /> {/* Link/Button */}
    </div>

    {/* Main Content Area (lg:col-span-2) */}
    <div className="lg:col-span-2 space-y-12 pt-8">

      {/* Image/Highlight Section */}
      <Skeleton className="w-full h-64 rounded-xl" />

      {/* Detailed Sub-section 1 */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" /> {/* Sub-section title */}
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Detailed Sub-section 2 (e.g., Features/Key aspects) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 border border-border rounded-lg space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="p-4 border border-border rounded-lg space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>

      {/* Another large content block */}
      <Skeleton className="h-40 w-full" />
    </div>
  </div>
);


// Combined Skeleton for the entire ServicesPage
const ServicesPageSkeleton = () => (
  <>
    {/* Placeholder for Header (not part of main content but good for visual flow) */}
    <div className="h-16 bg-card border-b border-border w-full flex items-center px-4">
      <Skeleton className="h-6 w-24 mr-auto" /> {/* Logo */}
      <Skeleton className="h-6 w-6 rounded-full" /> {/* Theme Toggle */}
      <div className="hidden sm:flex space-x-4 ml-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>

    <main className="w-full">

      {/* Hero Section Skeleton */}
      <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-3 mt-10">
            <Skeleton className="h-10 w-3/4 mx-auto" /> {/* Main Title */}
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6 max-w-2xl mx-auto" /> {/* Description line 2 */}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section Skeleton */}
      <section className="py-16 md:py-28 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 space-y-2">
            <Skeleton className="h-6 w-1/4 mx-auto" />
            <Skeleton className="h-3 w-1/6 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyChooseUsCardSkeleton />
            <WhyChooseUsCardSkeleton />
            <WhyChooseUsCardSkeleton />
          </div>
        </div>
      </section>

      {/* Services Section (Sticky Text Structure) Skeleton */}
      <section className="py-16 md:py-28 px-4 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 space-y-2">
            <Skeleton className="h-6 w-1/3 mx-auto" />
            <Skeleton className="h-3 w-2/3 mx-auto" />
          </div>

          <div className="space-y-20">
            {/* Render 3 instances of the complex service skeleton to represent the list */}
            <ServiceWithStickyTextSkeleton />
            <ServiceWithStickyTextSkeleton />
            <ServiceWithStickyTextSkeleton />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-10 md:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="p-8 bg-accent/10 border border-accent/30 rounded-lg text-center space-y-4">
            <Skeleton className="h-6 w-1/3 mx-auto" />
            <Skeleton className="h-3 w-3/4 mx-auto" />
            <Skeleton className="h-10 w-40 mx-auto" />
          </div>
        </div>
      </section>

    </main>
    {/* Placeholder for Footer */}
    <div className="w-full h-40 bg-card/50 border-t border-border flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-3 w-1/4" />
    </div>
  </>
);

// --- END SKELETON COMPONENTS ---

// Default export now handles Suspense
export default function ServicesLayout() {
  return (
    <Suspense fallback={<ServicesPageSkeleton />}>
      <ServicesPage />
    </Suspense>
  )
}