import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy — PillowDreamWorks Foundation",
  description: "Privacy policy and data governance practices of PillowDreamWorks Foundation.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: September 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <p>
            At PillowDreamWorks Foundation, we treat your privacy, emotional reflection notes, and clinical consultation records with utmost confidentiality and ethical rigor.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">1. Information We Collect</h2>
          <p>
            We collect minimal necessary personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact Details:</strong> Your name, email address, and optional phone/WhatsApp number when you reach out via our contact forms or book counselling sessions.</li>
            <li><strong>Digital Product Delivery:</strong> Transaction records needed to deliver printable PDFs and eBooks. (Payment details are processed securely by compliant third-party gateways; we never store raw credit card numbers).</li>
            <li><strong>Interactive Screeners:</strong> Self-administered inventory scores (e.g. GAD-7, OASIS) are computed locally in your web browser and are not sold or monetized.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Counselling Confidentiality</h2>
          <p>
            Notes and assessments gathered during 1-on-1 counselling consultations or CentreLine check-ins are strictly confidential between you and the practitioner, subject only to mandatory legal exceptions (such as imminent threat of harm to self or others, or child safety mandates).
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Data Retention & Deletion</h2>
          <p>
            You may request complete deletion of your customer record or contact history at any time by emailing <code>mgmanishgarg3@gmail.com</code>.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">4. Contact Us</h2>
          <p>
            If you have questions regarding this Privacy Policy, please write directly to Manish Garg at <code>mgmanishgarg3@gmail.com</code>.
          </p>
        </div>
      </Container>
    </main>
  );
}
