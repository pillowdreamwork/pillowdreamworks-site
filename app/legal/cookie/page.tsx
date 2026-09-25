import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Cookie Policy — PillowDreamWorks Foundation",
  description: "Cookie and tracking transparency policy of PillowDreamWorks Foundation.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            Technical Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Cookie Policy
          </h1>
          <p className="text-xs font-mono text-navy/60">
            Last Updated: September 2026 • PillowDreamWorks Foundation
          </p>
        </div>

        <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-navy/80 leading-relaxed font-sans">
          <h2 className="font-serif text-2xl font-bold text-navy">1. Use of Cookies</h2>
          <p>
            PillowDreamWorks Foundation uses essential functional cookies solely to maintain website performance, ensure navigation state persistence, and process secure checkout transactions.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">2. Zero Invasive Tracking</h2>
          <p>
            We do not sell personal data, maintain invasive behavioral advertising trackers, or share confidential assessment interactions with third-party advertising brokers.
          </p>

          <h2 className="font-serif text-2xl font-bold text-navy pt-4">3. Managing Preferences</h2>
          <p>
            You can configure your browser to block or delete cookies at any time through standard browser settings. Essential website functions will continue to operate.
          </p>
        </div>
      </Container>
    </main>
  );
}
