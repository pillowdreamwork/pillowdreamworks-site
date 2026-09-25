"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CAMPAIGN_METADATA, BOOKS_PRICING } from "@/data/pricing";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-ivory border-b border-navy/5">
      {/* Editorial Decorative Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-sage-light/50 blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-gold-light/60 blur-3xl -z-10" />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow & Diwali Campaign Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark">
                PillowDreamWorks Foundation
              </span>
              <span className="text-navy/30">•</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-navy text-xs font-medium">
                <Sparkles className="w-3 h-3 text-gold-dark" />
                <span>{CAMPAIGN_METADATA.badge}: ₹999 / $89</span>
              </div>
            </div>

            {/* Main Title — Libre Baskerville Serif */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-navy font-normal leading-[1.12] tracking-tight">
              Calm on the surface. <br />
              <span className="italic text-navy/90">Ambition underneath.</span>
            </h1>

            {/* Support Paragraph */}
            <p className="text-lg sm:text-xl text-navy/75 leading-relaxed font-sans max-w-2xl">
              An independent psychology foundation and publishing house. We build evidence-grounded workbooks, clinical-grade self-assessments, and structured counselling for sustained inner clarity.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/books/psychology-toolkit">
                <Button size="lg" className="w-full sm:w-auto bg-navy text-ivory hover:bg-navy-light text-base group">
                  <span>Explore The Psychology Toolkit</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/books">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                  View Publications Shelf
                </Button>
              </Link>
            </div>

            {/* Key Quality Indicators */}
            <div className="pt-6 border-t border-navy/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-2xl font-bold text-navy">80 Pages</span>
                <span className="text-xs text-navy/60">Master A4 PDF Toolkit</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-navy">16 Tests</span>
                <span className="text-xs text-navy/60">Clinical Assessment Centre</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-navy">1-on-1</span>
                <span className="text-xs text-navy/60">Licensed Counselling</span>
              </div>
            </div>
          </div>

          {/* Right Visual — Real Editorial Book Representation */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main Card (The Psychology Toolkit) */}
              <div className="relative z-20 bg-cream rounded-2xl p-6 sm:p-8 shadow-xl border border-navy/15 transform hover:-rotate-1 transition-transform duration-300">
                <div className="flex items-center justify-between pb-4 border-b border-navy/10 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark">
                    Flagship Publication
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-navy/5 text-navy/80">
                    A4 Edition
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-navy font-bold">
                    The Psychology Toolkit
                  </h3>
                  <p className="text-sm text-navy/70 leading-relaxed">
                    A master architecture for cognitive restructuring, emotional regulation, and deep self-inquiry across 5 chapters.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ivory border border-navy/10 space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs text-navy/60">
                    <span>Diwali Special Offer</span>
                    <span className="line-through">{BOOKS_PRICING.toolkit.regular.formattedInr}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl font-bold text-navy">
                      {BOOKS_PRICING.toolkit.diwali.formattedInr}
                    </span>
                    <span className="text-xs font-semibold text-gold-dark bg-gold/20 px-2 py-1 rounded">
                      {BOOKS_PRICING.toolkit.diwali.savingsInr}
                    </span>
                  </div>
                </div>

                <Link href="/books/psychology-toolkit" className="block">
                  <Button variant="gold" className="w-full">
                    Claim Diwali Copy
                  </Button>
                </Link>
              </div>

              {/* Offset Secondary Book Card (Finding The Centre) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 z-10 w-4/5 bg-navy text-ivory rounded-2xl p-5 shadow-2xl border border-navy-light/40 hidden sm:block">
                <div className="flex items-center justify-between text-[11px] text-gold mb-1">
                  <span>Companion Volume</span>
                  <span>{BOOKS_PRICING.findingTheCentre.ebook.formattedInr}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-ivory">
                  Finding The Centre
                </h4>
                <p className="text-xs text-ivory/70 mt-1 line-clamp-1">
                  Inner stillness and psychological poise in an accelerated world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
