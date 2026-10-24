import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LegalReviewNotice } from "@/components/legal/legal-review-notice";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';export const metadata: Metadata = {
  title: "Privacy Policy — PillowDreamWorks Foundation",
  description: "Privacy policy and data governance practices of PillowDreamWorks Foundation.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: October 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <LegalReviewNotice />

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <p>
            At PillowDreamWorks Foundation, we treat your privacy, emotional reflection notes, and
            consultation records with confidentiality and care.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">1. Information We Collect</h2>
          <p>We collect only the personal information we need:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact Details:</strong> Your name, email address, and optional phone/WhatsApp number when you reach out via our contact form or request a session.</li>
            <li><strong>Product Delivery:</strong> Transaction records needed to deliver printable PDFs and eBooks. When a checkout is live, payment details are processed by a third-party gateway; we do not store raw card numbers.</li>
            <li><strong>Interactive Screeners:</strong> Free self-administered inventory scores are computed locally in your web browser and are not transmitted to or stored by us.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Confidentiality</h2>
          <p>
            Notes gathered during counselling consultations or CentreLine check-ins are kept
            confidential between you and the practitioner, subject only to mandatory legal
            exceptions (such as an imminent threat of harm to self or others, or child-safety
            obligations).
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Assessment Consent</h2>
          <p>
            Free screeners run entirely in your browser and are not submitted to us. Paid,
            practitioner-administered assessments are carried out only with your informed consent,
            and the purpose, scope, and limits of the assessment are explained before it begins.
            Results are not shared with third parties without your consent, except where required
            by law.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">4. Data Retention &amp; Privacy Requests</h2>
          <p>
            Contact and enquiry records are retained only as long as needed to respond to your
            request. Consultation records are retained only for the period needed to support your
            ongoing care, or as otherwise required by law. You may request access to, correction
            of, or deletion of your records at any time by emailing{" "}
            <code>mgmanishgarg3@gmail.com</code> with the subject line &ldquo;Privacy Request&rdquo;.
            We aim to acknowledge privacy requests within 30 days.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">5. Children &amp; Guardian Consent</h2>
          <p>
            Several instruments and services are intended for adults or older adolescents. Where a
            service or assessment is provided to a minor, a parent or legal guardian must give
            consent before it proceeds. Please contact us to confirm suitability and the required
            consent before booking for anyone under 18.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, write to Manish Garg at{" "}
            <code>mgmanishgarg3@gmail.com</code>.
          </p>
        </div>
      </Container>
    </main>
  );
}
