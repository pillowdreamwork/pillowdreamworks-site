"use client";

import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AssessmentCentre } from "@/components/assessments/assessment-centre";
import { ShieldAlert, Sparkles } from "lucide-react";

import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
export const metadata: Metadata = {
  title: "Psychological Assessment Centre — PillowDreamWorks Foundation",
  description:
    "Explore 177 clinical psychometrics, 32 source-backed screeners, 112 educational scales, and 16 practitioner batteries across 15 psychological domains with 3D Mind Matrix.",
};

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink relative overflow-hidden">

      {/* ═══ Ambient Background Orbs — Atmospheric Depth ═══ */}
      <div className="ambient-orb ambient-orb-sage w-[650px] h-[650px] top-[-150px] left-[-250px] animate-orb-drift" />
      <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] top-[30%] right-[-220px] animate-orb-drift" style={{ animationDelay: "-6s" }} />
      <div className="ambient-orb ambient-orb-vermilion w-[380px] h-[380px] bottom-[8%] left-[10%] animate-orb-drift" style={{ animationDelay: "-10s" }} />
      <div className="ambient-orb ambient-orb-ivory w-[750px] h-[750px] top-[25%] left-[40%] animate-pulse-glow" />

      <div className="relative z-10 py-12 sm:py-20">
        <Container>

          {/* ═══════════════════════════════════════════════════════════════
               Editorial Hero — Glassmorphism Header
             ═══════════════════════════════════════════════════════════════ */}
          <div className="text-center max-w-4xl mx-auto space-y-6 mb-10">
            {/* Vermilion-accented editorial badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-hero-panel text-forest text-xs font-semibold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion shadow-[0_0_8px_rgba(232,93,63,0.7)]" />
              </span>
              <span>177 Clinical Psychometric Instruments</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              Psychological Assessment Centre
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl mx-auto">
              Source-backed screeners, validated clinical scales, and practitioner batteries across 15 psychological domains — explore via the interactive 3D Mind Matrix.
            </p>

            {/* Decorative sage rule with vermilion center dot */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-sage" />
              <div className="w-2 h-2 rounded-full bg-vermilion animate-pulse-glow" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-sage" />
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               Master Assessment Centre Component with Interactive 3D
             ═══════════════════════════════════════════════════════════════ */}
          <AssessmentCentre />


          {/* ═══════════════════════════════════════════════════════════════
               Global Assessment Safety Notice — Frosted Glass Bar
             ═══════════════════════════════════════════════════════════════ */}
          <div className="mt-20 p-6 rounded-3xl glass-section text-xs text-ink/75 leading-relaxed space-y-2 font-sans">
            <div className="flex items-center gap-2 font-semibold text-ink">
              <ShieldAlert className="w-4 h-4 text-forest" />
              <span>Ethical Standards & Psychometric Boundaries</span>
            </div>
            <p>
              Standardized psychological instruments (such as WAIS-IV, MMPI, 16PF, and projective tests like Rorschach & TAT) require qualitative scoring and clinical interpretation by trained practitioners. These tools are provided for self-reflection, psychoeducational insight, and pre-consultation screening. They should not be utilized as autonomous psychiatric verdicts without professional consultation.
            </p>
          </div>

        </Container>
      </div>
    </main>
  );
}