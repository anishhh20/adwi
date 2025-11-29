// --- START SKELETON COMPONENTS ---

import AboutPage from "@/components/pages/About";
import { Suspense } from "react";

// Reusable animated div for skeleton effect
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}></div>
);

// Skeleton for the Core Identity Cards (3 columns)
const CoreIdentityCardSkeleton = () => (
  <div className="p-4 bg-card rounded-lg border border-border space-y-3 shadow-lg">
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" /> {/* Icon */}
      <Skeleton className="h-4 w-2/3" /> {/* Title */}
    </div>
    <div className="space-y-2 pt-2">
      <div className="flex gap-2 items-start">
        <Skeleton className="h-3 w-3 mt-1 flex-shrink-0" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex gap-2 items-start">
        <Skeleton className="h-3 w-3 mt-1 flex-shrink-0" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex gap-2 items-start">
        <Skeleton className="h-3 w-3 mt-1 flex-shrink-0" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  </div>
);

// Skeleton for the Guiding Principles (3 columns)
const PrincipleCardSkeleton = () => (
  <div className="flex-1 p-6 bg-background rounded-lg border border-border shadow-md text-center space-y-3">
    <Skeleton className="h-8 w-8 mx-auto" /> {/* Icon */}
    <Skeleton className="h-4 w-2/3 mx-auto" /> {/* Title */}
    <Skeleton className="h-3 w-full" /> {/* Content line 1 */}
    <Skeleton className="h-3 w-5/6 mx-auto" /> {/* Content line 2 */}
  </div>
);

// Skeleton for the Impact Stats (4 columns)
const StatCardSkeleton = () => (
  <div className="text-center p-4 bg-card/40 rounded-lg border border-border shadow-md space-y-2">
    <Skeleton className="h-6 w-1/3 mx-auto" /> {/* Number */}
    <Skeleton className="h-3 w-1/2 mx-auto" /> {/* Label */}
  </div>
);

// Skeleton for the Services (4 columns)
const ServiceCardSkeleton = () => (
  <div className="p-4 bg-background border border-border rounded-lg text-center space-y-2 shadow-md">
    <Skeleton className="h-8 w-8 mx-auto" /> {/* Icon */}
    <Skeleton className="h-4 w-3/4 mx-auto" /> {/* Title */}
  </div>
);

// Combined Skeleton for the entire AboutPage
const AboutPageSkeleton = () => (
  <main className="w-full">
    {/* Header Section Skeleton */}
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-3 mt-10">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-4 w-5/6 max-w-2xl mx-auto" />
        </div>
      </div>
    </section>

    {/* Core Identity Section Skeleton */}
    <section className="py-10 md:py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image/3D Card Skeleton */}
          <Skeleton className="h-80 w-full rounded-2xl" />

          {/* Text Content Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* 3 x Core Identity Cards Skeleton (matches section structure) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CoreIdentityCardSkeleton />
          <CoreIdentityCardSkeleton />
          <CoreIdentityCardSkeleton />
        </div>
      </div>
    </section>

    {/* Guiding Principles Section Skeleton */}
    <section className="py-10 md:py-16 px-4 bg-card/30">
      <div className="container mx-auto space-y-8 max-w-6xl">
        <Skeleton className="h-6 w-1/4 mx-auto mb-8" />
        <div className="flex flex-col md:flex-row gap-5">
          <PrincipleCardSkeleton />
          <PrincipleCardSkeleton />
          <PrincipleCardSkeleton />
        </div>
      </div>
    </section>

    {/* Impact Section Skeleton */}
    <section className="py-10 md:py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <Skeleton className="h-6 w-1/4 mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    </section>

    {/* Services Section Skeleton */}
    <section className="py-10 md:py-16 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 space-y-2">
          <Skeleton className="h-6 w-1/4 mx-auto" />
          <Skeleton className="h-3 w-1/6 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      </div>
    </section>

    {/* CTA Section Skeleton (Mimic CTA's structure) */}
    <section className="py-10 md:py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="p-8 bg-accent/10 border border-accent/30 rounded-lg text-center space-y-4">
          <Skeleton className="h-6 w-1/3 mx-auto" />
          <Skeleton className="h-3 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-40 mx-auto" />
        </div>
      </div>
    </section>

    {/* Footer is handled outside the main content flow, but a placeholder can be added if needed */}
  </main>
);

// --- END SKELETON COMPONENTS ---

export default function ContactLayout() {
  return (
    <Suspense fallback={<AboutPageSkeleton />}>
      <AboutPage />
    </Suspense>
  );
}