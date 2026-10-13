import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BOOKS_PRICING, CHECKOUT_NOTICE } from "@/data/pricing";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Psychology & Inner Work Bundle — PillowDreamWorks Foundation",
  description:
    "Get The Psychology Toolkit (80-page workbook) together with Finding The Centre (eBook edition) as one digital collection.",
};

export default function BundlesPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container size="narrow">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-navy text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
            <span>Complete Digital Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            {BOOKS_PRICING.bundle.title}
          </h1>

          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans max-w-xl mx-auto">
            {BOOKS_PRICING.bundle.subtitle}
          </p>
        </div>

        {/* Master Bundle Card */}
        <div className="bg-cream rounded-3xl p-8 sm:p-12 border border-navy/15 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Toolkit inclusion */}
            <div className="bg-ivory rounded-2xl p-6 border border-navy/10 space-y-3">
              <Badge variant="navy">Component 01</Badge>
              <h3 className="font-serif text-xl font-bold text-navy">The Psychology Toolkit</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                80-page printable workbook featuring 5 structured chapters, reflection worksheets, and grounding protocols.
              </p>
              <div className="text-xs text-navy/60 pt-2">
                Standalone price: {BOOKS_PRICING.toolkit.formattedInr} ({BOOKS_PRICING.toolkit.formattedUsd})
              </div>
            </div>

            {/* Finding The Centre inclusion */}
            <div className="bg-ivory rounded-2xl p-6 border border-navy/10 space-y-3">
              <Badge variant="sage">Component 02</Badge>
              <h3 className="font-serif text-xl font-bold text-navy">Finding The Centre (eBook)</h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                Complete digital edition exploring healthy solitude, cognitive poise, and returning to emotional stillness amid daily noise.
              </p>
              <div className="text-xs text-navy/60 pt-2">
                Standalone price: {BOOKS_PRICING.findingTheCentre.ebook.formattedInr} ({BOOKS_PRICING.findingTheCentre.ebook.formattedUsd})
              </div>
            </div>
          </div>

          {/* Bundle Price Panel */}
          <div className="p-6 rounded-2xl bg-navy text-ivory flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-ivory/70 block">Bundle price</span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="font-serif text-4xl font-bold text-gold">
                  {BOOKS_PRICING.bundle.formattedInr}
                </span>
                <span className="text-sm text-ivory/80 font-sans">
                  / {BOOKS_PRICING.bundle.formattedUsd} Global
                </span>
              </div>
              <span className="text-xs text-ivory/60 block">
                Both digital titles in one purchase.
              </span>
            </div>

            <Button asChild size="lg" variant="gold" className="w-full sm:w-auto">
              <Link href="/contact">
                <span>Enquire About This Bundle</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-ivory border border-navy/15 flex items-start gap-3 text-sm text-navy/80">
            <Info className="w-4 h-4 text-sage-dark shrink-0 mt-0.5" />
            <p>
              <strong className="text-navy">{CHECKOUT_NOTICE}</strong> The bundle price above is the
              published rate; online payment is not yet available.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-navy/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage-dark" />
              <span>Digital delivery when checkout opens</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage-dark" />
              <span>Both titles: Toolkit + Finding The Centre (eBook)</span>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
