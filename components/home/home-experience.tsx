"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { ProblemSection } from "@/components/home/problem-section";
import { BooksPreviewSection } from "@/components/home/books-preview-section";
import { AssessmentsPreviewSection } from "@/components/home/assessments-preview-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { LearnPreviewSection } from "@/components/home/learn-preview-section";
import { ReflectionSection } from "@/components/home/reflection-section";
import { FounderSection } from "@/components/home/founder-section";
import { FinalCTASection } from "@/components/home/final-cta-section";
import { ScrollNavigator } from "@/components/home/scroll-navigator";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';export function HomeExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative selection:bg-[#A6B7A1] selection:text-[#FDFBF7] overflow-x-clip">
      {/* Scroll Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#24483B] via-[#C6A46A] to-[#E85D3F] z-50 origin-left pointer-events-none"
        style={{ scaleX }}
      />

      {/* Floating Editorial Folio Companion & Chapter Rail */}
      <ScrollNavigator />

      {/* 1. Hero Introduction */}
      <HeroSection />

      {/* 2. Core Mission & Values */}
      <MissionSection />

      {/* 3. The Problem & Continuum */}
      <ProblemSection />

      {/* 4. Publications & Guided Workbooks */}
      <BooksPreviewSection />

      {/* 5. Psychometric Archive (177 Scales) */}
      <AssessmentsPreviewSection />

      {/* 6. Consulting Rooms & Services */}
      <ServicesPreviewSection />

      {/* 7. Reading Room & PsychSnaps */}
      <LearnPreviewSection />

      {/* 8. Participatory Reflection Sheet */}
      <ReflectionSection />

      {/* 9. Founder Colophon */}
      <FounderSection />

      {/* 10. Final Invitation */}
      <FinalCTASection />
    </div>
  );
}

export default HomeExperience;
