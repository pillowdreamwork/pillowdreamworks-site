// src/components/ui/section-heading.tsx
import React from 'react';

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold text-center mb-6">
      {children}
    </h2>
  );
}
