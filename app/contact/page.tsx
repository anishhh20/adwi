import ContactPage from '@/components/pages/Contact';
import { Suspense } from 'react';

export default function ContactLayout() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <ContactPage />
    </Suspense>
  );
}