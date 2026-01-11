"use client"

import { Suspense } from 'react';
import dynamic from "next/dynamic";
const ContactPage = dynamic(() => import("@/components/pages/Contact"), { ssr: false });

// --- Skeleton Components ---

// Reusable animated div for skeleton effect
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}></div>
);

// Skeleton for the OfficeCard
const OfficeCardSkeleton = () => (
  <div className="p-5 space-y-3 border border-border rounded-lg shadow-sm">
    <Skeleton className="h-4 w-1/3" /> {/* City */}
    <Skeleton className="h-3 w-3/4" /> {/* Address */}
    <div className="flex justify-between mt-3">
      <Skeleton className="h-3 w-1/4" /> {/* Phone/Email */}
      <Skeleton className="h-3 w-1/5" /> {/* Country Flag */}
    </div>
  </div>
);

// Skeleton for the ContactCard (right sidebar)
const ContactCardSkeleton = () => (
  <div className="flex gap-3 p-3 rounded-lg border border-border">
    <Skeleton className="flex-shrink-0 h-8 w-8" /> {/* Icon area */}
    <div className="space-y-1 w-full">
      <Skeleton className="h-3 w-1/3" /> {/* Label */}
      <Skeleton className="h-3 w-2/3" /> {/* Value */}
    </div>
  </div>
);

// Skeleton for the main Form (either FL or General)
const FormSkeleton = () => (
  <div className="space-y-5 p-5 bg-card border border-border rounded-lg shadow-md">
    <Skeleton className="h-6 w-2/3 mb-4" /> {/* Form Title */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
    <Skeleton className="h-10" /> {/* Full width input */}
    <Skeleton className="h-20" /> {/* Textarea */}
    <Skeleton className="h-12 w-full mt-4" /> {/* Submit button */}
  </div>
);

// Combined Skeleton for the entire ContactPage
const ContactPageSkeleton = () => (
  <main className="w-full">
    {/* Header Section Skeleton */}
    <section className="py-12 md:py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-3">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-4 w-5/6 max-w-2xl mx-auto" />
        </div>
      </div>
    </section>

    {/* Office Locations Section Skeleton */}
    <section className="pt-0 pb-10 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <Skeleton className="h-6 w-1/4 mx-auto my-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <OfficeCardSkeleton />
          <OfficeCardSkeleton />
          <OfficeCardSkeleton />
          <OfficeCardSkeleton />
        </div>
      </div>
    </section>

    {/* Main Form & General Contact Section Skeleton */}
    <section className="py-10 md:py-16 pb-10 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Toggle Skeleton */}
        <div className="flex p-1 bg-card border border-border rounded-xl shadow-inner max-w-lg mx-auto md:mx-0 mb-8">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Area Skeleton (md:col-span-2) */}
          <div className="md:col-span-2">
            <FormSkeleton />
          </div>

          {/* General Contact Sidebar Skeleton (md:col-span-1) */}
          <div className="space-y-5 p-5 bg-card border border-border rounded-lg shadow-md md:col-span-1">
            <Skeleton className="h-6 w-3/4 mb-4" /> {/* General Contact Title */}
            <ContactCardSkeleton />
            <ContactCardSkeleton />
            <ContactCardSkeleton />
          </div>
        </div>
      </div>
    </section>

    {/* Map Section Skeleton */}
    <section className="py-8 md:py-12 px-4 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <Skeleton className="w-full h-48" />
      </div>
    </section>
  </main>
);
// --- End Skeleton Components ---

export default function ContactLayout() {
  return (
    <Suspense fallback={<ContactPageSkeleton />}>
      <ContactPage />
    </Suspense>
  );
}