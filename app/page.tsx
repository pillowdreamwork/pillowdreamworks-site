import * as React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { ProblemSection } from "@/components/home/problem-section";
import { BooksPreviewSection } from "@/components/home/books-preview-section";
import { AssessmentsPreviewSection } from "@/components/home/assessments-preview-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { LearnPreviewSection } from "@/components/home/learn-preview-section";
import { FounderSection } from "@/components/home/founder-section";
import { FinalCTASection } from "@/components/home/final-cta-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ivory text-navy">
      {/* 1 & 2 are in layout.tsx: EmergencyBanner & Sticky Navbar */}
      {/* 3. Hero Section (Editorial Magazine Direction) */}
      <HeroSection />

      {/* 4. Foundation Mission & Ecosystem Pillars */}
      <MissionSection />

      {/* 5. Problem Statement & Reader Context */}
      <ProblemSection />

      {/* 6. Books Showcase */}
      <BooksPreviewSection />

      {/* 7. Psychological Assessments Preview */}
      <AssessmentsPreviewSection />

      {/* 8. Clinical & Crisis Services */}
      <ServicesPreviewSection />

      {/* 9. Learn Hub & PsychSnaps */}
      <LearnPreviewSection />

      {/* 10. Founder Story */}
      <FounderSection />

      {/* 11. Final CTA */}
      <FinalCTASection />
      {/* 12. Footer is in layout.tsx */}
    </main>
  );
}
