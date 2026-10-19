import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { BOOKS_PRICING } from "@/data/pricing";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Psychology & Inner Work Bundle — PillowDreamWorks Foundation",
  description:
    "Get The Psychology Toolkit (80-page master workbook) + Finding The Centre (eBook edition) with a 20% combined savings.",
};

export default function BundlesPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container size="narrow">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCE7DD]/60 border border-[#24483B]/10 text-[#24483B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A46A]" />
            <span>20% Combined Ecosystem Bundle</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#202923]">
            {BOOKS_PRICING.bundle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-xl mx-auto">
            {BOOKS_PRICING.bundle.subtitle}
          </p>
        </div>

        {/* Master Bundle Card */}
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#24483B]/10 shadow-lg space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Toolkit inclusion */}
            <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#24483B]/10 space-y-3 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold block">Component 01</span>
              <h3 className="font-serif text-xl font-bold text-[#202923]">The Psychology Toolkit</h3>
              <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                80-page printable A4 PDF workbook featuring 5 structured chapters, 15+ reflection worksheets, and somatic nervous system protocols.
              </p>
              <div className="text-xs text-[#202923]/60 pt-2 font-mono">
                Individual Value: {BOOKS_PRICING.toolkit.diwali.formattedInr} ({BOOKS_PRICING.toolkit.diwali.formattedUsd})
              </div>
            </div>

            {/* Finding The Centre inclusion */}
            <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#24483B]/10 space-y-3 shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold block">Component 02</span>
              <h3 className="font-serif text-xl font-bold text-[#202923]">Finding The Centre (eBook)</h3>
              <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                Complete digital edition exploring healthy solitude, cognitive poise, and returning to emotional stillness amid daily noise.
              </p>
              <div className="text-xs text-[#202923]/60 pt-2 font-mono">
                Individual Value: {BOOKS_PRICING.findingTheCentre.ebook.formattedInr} ({BOOKS_PRICING.findingTheCentre.ebook.formattedUsd})
              </div>
            </div>
          </div>

          {/* Combined Value & Discount Summary */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#24483B] text-[#FDFBF7] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-[#FDFBF7]/60 line-through">
                Combined Value: {BOOKS_PRICING.bundle.regularValue.formattedInr} / {BOOKS_PRICING.bundle.regularValue.formattedUsd}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-[#C6A46A]">
                  {BOOKS_PRICING.bundle.price.formattedInr}
                </span>
                <span className="text-sm text-[#FDFBF7]/80 font-sans">
                  / {BOOKS_PRICING.bundle.price.formattedUsd} Global
                </span>
              </div>
              <span className="text-xs text-[#A6B7A1] font-medium block">
                {BOOKS_PRICING.bundle.price.savingsInr} • {BOOKS_PRICING.bundle.price.savingsUsd}
              </span>
            </div>

            <LiquidGlassButton
              href={`https://wa.me/919728355421?text=${encodeURIComponent(`Hello PillowDreamWorks, I would like to purchase the Complete Psychology & Inner Work Bundle for ${BOOKS_PRICING.bundle.price.formattedInr} (${BOOKS_PRICING.bundle.price.formattedUsd}).`)}`}
              size="lg"
              variant="gold"
              className="w-full sm:w-auto"
            >
              <span>Claim Bundle Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </LiquidGlassButton>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#202923]/60 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#24483B]" />
              <span>Instant Digital PDF Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#24483B]" />
              <span>Includes Lifetime Updates</span>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
