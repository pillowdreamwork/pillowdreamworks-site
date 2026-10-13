import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LegalReviewNotice } from "@/components/legal/legal-review-notice";

export const metadata: Metadata = {
  title: "Terms of Service — PillowDreamWorks Foundation",
  description: "Terms and conditions governing the use of PillowDreamWorks Foundation websites, publications, and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: September 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <LegalReviewNotice />

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <h2 className="font-serif text-2xl font-bold text-navy">1. Acceptance of Terms</h2>
          <p>
            By accessing or purchasing publications from PillowDreamWorks Foundation, you agree to abide by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Intellectual Property</h2>
          <p>
            All content, including <em>The Psychology Toolkit</em>, <em>Finding The Centre</em>, PsychSnaps, articles, and assessment frameworks, are the intellectual property of PillowDreamWorks Foundation and Manish Garg. You are granted a personal, non-exclusive, non-transferable license to print and use digital workbooks for individual self-reflection. Reselling, modifying, or redistributing digital PDFs is strictly prohibited.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Non-Emergency Statement</h2>
          <p>
            PillowDreamWorks Foundation digital tools, workbooks, and messaging channels (including CentreLine) are educational resources and are NOT equipped to handle active acute psychiatric emergencies. In emergency situations, users must utilize dedicated national crisis helplines.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">4. Payments &amp; Checkout Status</h2>
          <p>
            Online checkout is still being prepared and is not yet available. Until a verified
            checkout is live, all prices shown on this site are published rates only, and no
            payment can be taken through this website. Any purchase buttons that are not yet
            connected to a checkout will state that plainly.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">5. Age &amp; Guardian Consent</h2>
          <p>
            Where a service, course, or assessment is provided to a person under 18, a parent or
            legal guardian must give consent before it proceeds. Some instruments are intended
            only for adults; please confirm suitability with us before booking.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">6. Governing Jurisdiction</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India.
          </p>
        </div>
      </Container>
    </main>
  );
}
