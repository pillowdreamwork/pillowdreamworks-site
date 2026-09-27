import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AssessmentCentre } from "@/components/assessments/assessment-centre";
import { ShieldAlert, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Psychological Assessment Centre — PillowDreamWorks Foundation",
  description:
    "Explore 16 standardized clinical psychometrics, projective protocols, personality inventories (HAM-A, BDI-II, 16PF, Rorschach, TAT, MMPI, WAIS-IV) and free self-inventories.",
};

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Clinical Psychometrics & Structured Insight
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            The Psychological Assessment Centre
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            A comprehensive catalog of standardized screening instruments, personality scales, and practitioner-evaluated projective diagnostics.
          </p>
        </div>

        {/* Master Catalog Component */}
        <AssessmentCentre />

        {/* Global Assessment Safety Notice */}
        <div className="mt-20 p-6 rounded-2xl bg-cream border border-navy/15 text-xs text-navy/75 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-navy">
            <ShieldAlert className="w-4 h-4 text-sage-dark" />
            <span>Ethical Standards & Psychometric Boundaries</span>
          </div>
          <p>
            Standardized psychological instruments (such as WAIS-IV, MMPI, 16PF, and projective tests like Rorschach & TAT) require qualitative scoring and clinical interpretation by trained practitioners. These tools are provided for self-reflection, psychoeducational insight, and pre-consultation screening. They should not be utilized as autonomous psychiatric verdicts without professional consultation.
          </p>
        </div>
      </Container>
    </main>
  );
}
