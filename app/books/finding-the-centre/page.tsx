import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { FINDING_THE_CENTRE } from "@/data/books";
import { BOOKS_PRICING } from "@/data/pricing";
import { Feather, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Finding The Centre — PillowDreamWorks Foundation",
  description:
    "A handbook for grounded living, emotional poise, and quiet solitude in an overstimulated world. Available in eBook and Collector's Print Edition.",
};

export default function FindingTheCentrePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container>
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3.5 py-1.5 rounded-full border border-[#24483B]/10">
                Reflective & Philosophical Volume
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#202923] font-normal leading-[1.12] tracking-tight">
                {FINDING_THE_CENTRE.title}
              </h1>

              <p className="font-serif italic text-xl text-[#24483B]">
                "{FINDING_THE_CENTRE.tagline}"
              </p>

              <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans">
                {FINDING_THE_CENTRE.overview}
              </p>

              {/* Formats Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {/* eBook */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 space-y-4 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold block mb-1">
                      Digital Download
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#202923]">
                      eBook Edition
                    </h3>
                    <p className="text-xs text-[#202923]/70 mt-1 font-sans">
                      Instant PDF/ePub access for iPad, Kindle, tablets, and phones.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#24483B]/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-2xl font-bold text-[#202923]">
                        {BOOKS_PRICING.findingTheCentre.ebook.formattedInr}
                      </span>
                      <span className="text-xs text-[#202923]/60 font-sans">
                        ({BOOKS_PRICING.findingTheCentre.ebook.formattedUsd})
                      </span>
                    </div>
                    <LiquidGlassButton
                      href={`https://wa.me/919728355421?text=${encodeURIComponent(`Hello PillowDreamWorks, I would like to purchase Finding The Centre eBook (${BOOKS_PRICING.findingTheCentre.ebook.formattedInr} / ${BOOKS_PRICING.findingTheCentre.ebook.formattedUsd}).`)}`}
                      variant="primary"
                      size="md"
                      className="w-full"
                    >
                      <span>Claim eBook</span>
                    </LiquidGlassButton>
                  </div>
                </div>

                {/* Print */}
                <div className="p-6 rounded-2xl bg-[#24483B] text-[#FDFBF7] border border-white/10 space-y-4 flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#C6A46A] font-semibold block mb-1">
                      Physical Publication
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#FDFBF7]">
                      Paperback Print Edition
                    </h3>
                    <p className="text-xs text-[#FDFBF7]/75 mt-1 font-sans">
                      Tactile publication with calming illustrations for children, teens, and adults.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-2xl font-bold text-[#C6A46A]">
                        {BOOKS_PRICING.findingTheCentre.print.formattedInr}
                      </span>
                      <span className="text-xs text-[#FDFBF7]/70 font-sans">
                        ({BOOKS_PRICING.findingTheCentre.print.formattedUsd})
                      </span>
                    </div>
                    <LiquidGlassButton
                      href={`https://wa.me/919728355421?text=${encodeURIComponent(`Hello PillowDreamWorks, I would like to order Finding The Centre Paperback Print Edition (${BOOKS_PRICING.findingTheCentre.print.formattedInr} / ${BOOKS_PRICING.findingTheCentre.print.formattedUsd}).`)}`}
                      variant="gold"
                      size="md"
                      className="w-full"
                    >
                      <span>Order Paperback</span>
                    </LiquidGlassButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Tile */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5EFE6] rounded-2xl p-8 sm:p-10 border border-[#24483B]/10 shadow-sm space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#24483B] text-[#FDFBF7] flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
                  <Feather className="w-6 h-6 text-[#C6A46A]" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#202923]">
                  Core Philosophical Themes
                </h3>
                <ul className="space-y-3 text-sm text-[#202923]/80">
                  {FINDING_THE_CENTRE.keyThemes.map((theme, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#24483B] font-bold mt-0.5">•</span>
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[#24483B]/10">
                  <p className="text-xs text-[#202923]/60 italic font-sans">
                    <strong>Audience:</strong> {FINDING_THE_CENTRE.audience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Banner */}
        <section className="p-8 sm:p-12 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#24483B]">
              Recommended Companion Offer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#202923]">
              Pair with The Psychology Toolkit & Save 20%
            </h3>
            <p className="text-sm text-[#202923]/70 font-sans">
              Get the 80-page structured workbook alongside this eBook edition for just {BOOKS_PRICING.bundle.price.formattedInr} ({BOOKS_PRICING.bundle.price.formattedUsd}).
            </p>
          </div>
          <LiquidGlassButton href="/books/bundles" variant="primary" size="lg">
            <span>Explore Complete Bundle</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </LiquidGlassButton>
        </section>
      </Container>
    </main>
  );
}
