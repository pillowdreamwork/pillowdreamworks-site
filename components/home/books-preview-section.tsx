import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BOOKS_PRICING } from "@/data/pricing";
import { ArrowRight, BookOpen, Check, Sparkles } from "lucide-react";

export function BooksPreviewSection() {
  return (
    <section className="py-24 bg-cream/70 border-b border-navy/10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="The Books Ecosystem"
            title="Two complementary works for structured inner growth"
            description="Designed as companion volumes to be read, annotated, and practiced throughout your life."
            className="mb-0"
          />
          <Link href="/books" className="mt-4 md:mt-0">
            <Button variant="outline" className="text-sm">
              View All Books & Bundles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Book: Psychology Toolkit */}
          <div className="lg:col-span-7 bg-ivory rounded-2xl p-8 sm:p-10 border border-navy/15 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold/30 text-navy font-semibold text-xs px-4 py-1.5 rounded-bl-xl border-l border-b border-gold/50 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Diwali Campaign Active</span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block mb-1">
                  80-Page Master Workbook (A4 PDF)
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-navy font-bold">
                  The Psychology Toolkit
                </h3>
                <p className="text-base text-navy/75 leading-relaxed mt-3">
                  A structured psychological workbook featuring 5 progressive chapters: Self-Knowledge, Cognitive Reframing, Somatic Anxiety De-escalation, Boundary Architecture, and Behavioral Habit Loops.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  "5 In-depth chapters with 15+ clinical exercises",
                  "Printable A4 format + compatible with iPad / Tablet note apps",
                  "Direct access to CentreLine ongoing emotional support",
                  "Evidence-backed cognitive behavioral & psychodynamic prompts",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-navy/85">
                    <Check className="w-4 h-4 text-sage-dark shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-navy/60 block">Diwali Price (Regular {BOOKS_PRICING.toolkit.regular.formattedInr})</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-navy">
                    {BOOKS_PRICING.toolkit.diwali.formattedInr}
                  </span>
                  <span className="text-xs text-navy/60 font-sans">
                    / {BOOKS_PRICING.toolkit.diwali.formattedUsd} Global
                  </span>
                </div>
              </div>

              <Link href="/books/psychology-toolkit">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <span>Explore Workbook</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Secondary Book: Finding The Centre */}
          <div className="lg:col-span-5 bg-navy text-ivory rounded-2xl p-8 sm:p-10 border border-navy-light/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-1">
                  Philosophical & Reflective Volume
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-bold">
                  Finding The Centre
                </h3>
                <p className="text-sm text-ivory/80 leading-relaxed mt-3">
                  A handbook for grounded living, emotional stillness, and poise when the world around you is accelerating.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-light/40 border border-gold/20 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gold font-medium">eBook Edition (Instant Download)</span>
                  <span className="font-bold text-ivory">{BOOKS_PRICING.findingTheCentre.ebook.formattedInr}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-navy-light/30">
                  <span className="text-gold font-medium">Collector's Hardcover Print</span>
                  <span className="font-bold text-ivory">{BOOKS_PRICING.findingTheCentre.print.formattedInr}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-ivory/15">
              <Link href="/books/finding-the-centre">
                <Button variant="gold" className="w-full">
                  <span>View Formats & Details</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
