import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Disclaimer — PillowDreamWorks Foundation",
  description: "Educational and medical disclaimer for psychological tools and resources.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Clinical & Professional Boundaries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Educational & Medical Disclaimer
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: September 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <h2 className="font-serif text-2xl font-bold text-navy">1. Psychoeducational Nature of Resources</h2>
          <p>
            The content on this website, including <em>The Psychology Toolkit</em>, <em>Finding The Centre</em>, PsychSnaps, articles, and self-screening questionnaires (GAD-7, OASIS, SIAS-6, etc.), is published solely for educational, self-reflection, and personal development purposes.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Not a Replacement for Clinical Diagnosis</h2>
          <p>
            Self-screening tools and educational workbooks do not constitute formal psychiatric evaluations, medical diagnoses, or individual clinical treatment plans. Completing an online screening scale does not establish a formal doctor-patient relationship without an active clinical engagement.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Acute Emergency Situations</h2>
          <p>
            If you are experiencing severe psychological distress, self-harm impulses, suicidal ideation, or an acute psychiatric crisis, do not rely on digital publications. Contact local emergency medical services or national helplines immediately (India: 14416 / 1800-891-4416; US: 988; UK: 111 / 999).
          </p>
        </div>
      </Container>
    </main>
  );
}
