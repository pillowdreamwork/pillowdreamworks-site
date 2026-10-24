import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AssessmentCentre } from "@/components/assessments/assessment-centre";
import { ShieldAlert, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Psychological Assessment Centre — PillowDreamWorks Foundation",
  description:
    "Explore 177 clinical psychometrics, 32 source-backed screeners, 112 educational scales, and 16 practitioner batteries across 15 psychological domains with 3D Mind Matrix.",
};

export default function AssessmentsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A2A4A] py-12 sm:py-20">
      <Container>
        {/* Master Assessment Centre Component with Interactive 3D Mind Matrix */}
        <AssessmentCentre />

        {/* Global Assessment Safety Notice */}
        <div className="mt-20 p-6 rounded-3xl bg-[#F5F1E9] border border-[#24483B]/15 text-xs text-[#1A2A4A]/75 leading-relaxed space-y-2 font-sans shadow-xs">
          <div className="flex items-center gap-2 font-semibold text-[#1A2A4A]">
            <ShieldAlert className="w-4 h-4 text-[#24483B]" />
            <span>Ethical Standards &amp; Psychometric Boundaries</span>
          </div>
          <p>
            Standardized psychological instruments (such as WAIS-IV, MMPI, 16PF, and projective tests like Rorschach &amp; TAT) require qualitative scoring and clinical interpretation by trained practitioners. These tools are provided for self-reflection, psychoeducational insight, and pre-consultation screening. They should not be utilized as autonomous psychiatric verdicts without professional consultation.
          </p>
        </div>
      </Container>
    </main>
  );
}
