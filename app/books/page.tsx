import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookCarousel } from "@/components/books/book-carousel";
import { BOOKS_PRICING, CAMPAIGN_METADATA } from "@/data/pricing";
import { ArrowRight, BookOpen, Check, Download, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Books & Workbooks — PillowDreamWorks Foundation",
  description:
    "Discover guided psychological workbooks and reflective volumes designed for structured self-inquiry, cognitive restructuring, and emotional poise.",
};

export default function BooksHubPage() {
  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-navy text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>{CAMPAIGN_METADATA.badge} Active</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            The Books Ecosystem
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            Two distinct, complementary publications crafted to bridge evidence-based clinical psychology with daily reflective practice.
          </p>
        </div>

        {/* Interactive Book Showcase Carousel */}
        <div className="mb-24">
          <BookCarousel />
        </div>

        {/* Detailed Catalog Grid */}
        <div className="space-y-16">
          <SectionHeading
            eyebrow="Publication Library"
            title="Explore Individual Works & Bundles"
            description="Detailed overviews of our flagship 80-page workbook and companion philosophy volume."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Psychology Toolkit Card */}
            <div className="bg-cream rounded-2xl p-8 sm:p-10 border border-navy/15 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="navy">Flagship Workbook</Badge>
                  <span className="text-xs font-mono text-navy/60">80 Pages A4 PDF</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">
                    The Psychology Toolkit
                  </h2>
                  <p className="text-sm text-navy/75 leading-relaxed">
                    A comprehensive 5-chapter master workbook covering self-knowledge, cognitive reframing, somatic anxiety de-escalation, boundary architecture, and habit formation.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    "15+ Step-by-step clinical reflection exercises",
                    "Printable master PDF + tablet note taking compatible",
                    "Includes direct access to CentreLine support",
                    "Lifetime updates and revised chapter additions",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy/80">
                      <Check className="w-4 h-4 text-sage-dark shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-navy/50 block">Diwali Special Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-navy">
                      {BOOKS_PRICING.toolkit.diwali.formattedInr}
                    </span>
                    <span className="text-xs text-navy/60">/ {BOOKS_PRICING.toolkit.diwali.formattedUsd}</span>
                  </div>
                </div>

                <Link href="/books/psychology-toolkit">
                  <Button variant="primary">
                    <span>View Chapter Roadmap</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Finding The Centre Card */}
            <div className="bg-ivory rounded-2xl p-8 sm:p-10 border border-navy/15 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="sage">Reflective Volume</Badge>
                  <span className="text-xs font-mono text-navy/60">eBook & Print</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl font-bold text-navy">
                    Finding The Centre
                  </h2>
                  <p className="text-sm text-navy/75 leading-relaxed">
                    A philosophical and psychological handbook designed to help readers achieve emotional poise, quiet overstimulated minds, and cultivate healthy solitude.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cream border border-navy/10 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-navy">eBook Edition</span>
                    <span className="font-bold text-navy">{BOOKS_PRICING.findingTheCentre.ebook.formattedInr} ({BOOKS_PRICING.findingTheCentre.ebook.formattedUsd})</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-navy/10">
                    <span className="font-medium text-navy">Collector Hardcover Print</span>
                    <span className="font-bold text-navy">{BOOKS_PRICING.findingTheCentre.print.formattedInr} ({BOOKS_PRICING.findingTheCentre.print.formattedUsd})</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link href="/books/finding-the-centre" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">
                    <span>Explore Formats</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bundle Banner */}
          <div className="bg-navy text-ivory rounded-2xl p-8 sm:p-12 border border-navy-light/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Complete Psychology Bundle (20% Combined Discount)</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-ivory">
                The Psychology Toolkit + Finding The Centre
              </h3>
              <p className="text-sm text-ivory/80 leading-relaxed font-sans">
                Experience the full dual-ecosystem: The 80-page structured workbook paired with the philosophical eBook edition.
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
              <div className="text-center sm:text-right">
                <span className="text-xs text-ivory/60 line-through block">
                  Total Value {BOOKS_PRICING.bundle.regularValue.formattedInr} / {BOOKS_PRICING.bundle.regularValue.formattedUsd}
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-gold">
                  {BOOKS_PRICING.bundle.price.formattedInr}
                </span>
                <span className="text-xs text-ivory/70 block">
                  / {BOOKS_PRICING.bundle.price.formattedUsd} Global ({BOOKS_PRICING.bundle.price.savingsInr})
                </span>
              </div>
              <Link href="/books/bundles">
                <Button variant="gold" size="lg">
                  Claim Complete Bundle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
