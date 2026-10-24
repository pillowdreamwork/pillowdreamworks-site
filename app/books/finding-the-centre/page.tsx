import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FINDING_THE_CENTRE, BOOK_BUYING_FAQS } from "@/data/books";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { BOOKS_PRICING, CHECKOUT_NOTICE } from "@/data/pricing";
import { Feather } from "lucide-react";


import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';export const metadata: Metadata = {
  title: "Finding The Centre — PillowDreamWorks Foundation",
  description:
    "A handbook for grounded living, emotional poise, and quiet solitude in an overstimulated world. Available in eBook and Collector's Print Edition.",
};

export default function FindingTheCentrePage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="sage">Reflective & Philosophical Volume</Badge>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-navy font-normal leading-[1.12] tracking-tight">
                {FINDING_THE_CENTRE.title}
              </h1>

              <p className="font-serif italic text-xl text-navy/80">
                "{FINDING_THE_CENTRE.tagline}"
              </p>

              <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
                {FINDING_THE_CENTRE.overview}
              </p>

              {/* Formats Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {/* eBook */}
                <div className="p-6 rounded-2xl bg-cream border border-navy/15 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark block mb-1">
                      Digital Download
                    </span>
                    <h3 className="font-serif text-xl font-bold text-navy">
                      eBook Edition
                    </h3>
                    <p className="text-xs text-navy/70 mt-1">
                      Instant PDF/ePub access for iPad, Kindle, tablets, and phones.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-navy/10 flex items-baseline justify-between">
                    <span className="font-serif text-2xl font-bold text-navy">
                      {BOOKS_PRICING.findingTheCentre.ebook.formattedInr}
                    </span>
                    <span className="text-xs text-navy/60 font-sans">
                      ({BOOKS_PRICING.findingTheCentre.ebook.formattedUsd})
                    </span>
                  </div>
                  <Button
                    href="/contact"
                    variant="primary"
                    className="w-full"
                    showArrow
                  >
                    Enquire About eBook
                  </Button>
                </div>

                {/* Print */}
                <div className="p-6 rounded-2xl bg-navy text-ivory border border-navy-light/40 space-y-3 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold block mb-1">
                      Physical Publication
                    </span>
                    <h3 className="font-serif text-xl font-bold text-ivory">
                      Collector's Print
                    </h3>
                    <p className="text-xs text-ivory/70 mt-1">
                      Tactile hardcover publication with archival paper and ribbon bookmark.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-ivory/15 flex items-baseline justify-between">
                    <span className="font-serif text-2xl font-bold text-gold">
                      {BOOKS_PRICING.findingTheCentre.print.formattedInr}
                    </span>
                    <span className="text-xs text-ivory/70 font-sans">
                      ({BOOKS_PRICING.findingTheCentre.print.formattedUsd})
                    </span>
                  </div>
                  <Button
                    href="/contact"
                    variant="gold"
                    className="w-full"
                    showArrow
                  >
                    Enquire About Paperback
                  </Button>
                </div>
              </div>

              <p className="text-xs text-navy/70 leading-relaxed pt-4 border-t border-navy/10">
                <strong className="text-navy">{CHECKOUT_NOTICE}</strong> Editions and prices above are
                published rates; online payment is not yet available.
              </p>
            </div>

            {/* Right Visual Tile */}
            <div className="lg:col-span-5">
              <div className="bg-cream rounded-2xl p-8 sm:p-10 border border-navy/15 shadow-xl space-y-6">
                <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center font-serif text-2xl font-bold">
                  <Feather className="w-6 h-6 text-sage-dark" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Core Philosophical Themes
                </h3>
                <ul className="space-y-3 text-sm text-navy/80">
                  {FINDING_THE_CENTRE.keyThemes.map((theme, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-sage-dark font-bold mt-0.5">•</span>
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-navy/10">
                  <p className="text-xs text-navy/60 italic">
                    <strong>Audience:</strong> {FINDING_THE_CENTRE.audience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Banner */}
        <section className="p-8 sm:p-12 rounded-2xl bg-cream border border-navy/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark">
              Recommended Companion Offer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Pair with The Psychology Toolkit
            </h3>
            <p className="text-sm text-navy/70">
              Get the 80-page structured workbook alongside this eBook edition as one digital collection for {BOOKS_PRICING.bundle.formattedInr} ({BOOKS_PRICING.bundle.formattedUsd}).
            </p>
          </div>
          <Button
            href="/books/bundles"
            variant="primary"
            size="lg"
            showArrow
          >
            Explore Complete Bundle
          </Button>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mt-20 max-w-3xl mx-auto" aria-labelledby="ftc-faq-heading">
          <div className="text-center space-y-3 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
              Questions
            </span>
            <h2 id="ftc-faq-heading" className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-navy">
              Before you order
            </h2>
          </div>

          <FaqAccordion
            groups={[
              { items: FINDING_THE_CENTRE.faqs },
              { title: "Choosing a book, buying, and delivery", items: BOOK_BUYING_FAQS },
            ]}
          />
        </section>
      </Container>
    </main>
  );
}
