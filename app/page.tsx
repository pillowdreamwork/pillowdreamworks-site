import * as React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { ProblemSection } from "@/components/home/problem-section";
import { BooksPreviewSection } from "@/components/home/books-preview-section";
import { ReflectionSection } from "@/components/home/reflection-section";
import { AssessmentsPreviewSection } from "@/components/home/assessments-preview-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { LearnPreviewSection } from "@/components/home/learn-preview-section";
import { FounderSection } from "@/components/home/founder-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory text-navy">
      {/* 1. Enter the Library: Hero with Proximity Depth */}
      <HeroSection />

      {/* 2. The Table of Contents: Living Foundation Index */}
      <MissionSection />

      {/* 3. The Noise to Continuum: Understand, Reflect, Practice */}
      <ProblemSection />

      {/* 4. The Shelf: Physical Publications & Master Toolkit */}
      <BooksPreviewSection />

      {/* 5. The Blank Page: Participatory Psychological Reflection */}
      <ReflectionSection />

      {/* 6. The Psychometric Archive: 177 Standardized Scales Ledger */}
      <AssessmentsPreviewSection />

      {/* 7. The Consulting Rooms: Clinical Guidance & Protocols */}
      <ServicesPreviewSection />

      {/* 8. The Reading Room: Publication Folio & PsychSnaps */}
      <LearnPreviewSection />

      {/* 9. Behind the Library: The Founder's Colophon */}
      <FounderSection />

      {/* 10. The Inscription: Closing Page */}
      <FinalCTASection />
    </main>
  );
}
