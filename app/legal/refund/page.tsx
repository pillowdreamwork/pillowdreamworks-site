import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — PillowDreamWorks Foundation",
  description: "Refund and cancellation guidelines for digital workbooks and clinical counselling sessions.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Customer Transparency
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: September 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <h2 className="font-serif text-2xl font-bold text-navy">1. Digital Publications (Workbooks & eBooks)</h2>
          <p>
            Due to the instantaneous nature of digital downloads (PDF files and eBooks), digital workbook orders are generally non-refundable once downloaded. If you experience technical difficulties receiving or downloading your file, please contact <code>mgmanishgarg3@gmail.com</code> and our support team will provide replacement download links immediately.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Counselling & Assessment Consultations</h2>
          <p>
            Appointments for 1-on-1 Counselling or Clinician-Administered Assessments may be rescheduled or cancelled with full refund up to <strong>24 hours prior</strong> to the scheduled consultation time. Cancellations made within 24 hours of the scheduled time may be subject to a nominal rescheduling fee to account for reserved clinician time.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Contacting Support</h2>
          <p>
            For all billing and refund inquiries, email <code>mgmanishgarg3@gmail.com</code> with your order reference number.
          </p>
        </div>
      </Container>
    </main>
  );
}
