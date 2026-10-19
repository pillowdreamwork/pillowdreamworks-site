"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import {
  BOOKS_PRICING,
  ASSESSMENTS_CATALOG,
  SERVICES_PRICING,
  CAMPAIGN_METADATA,
} from "@/data/pricing";
import { Sparkles, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = React.useState<"inr" | "usd">("inr");

  const isIndia = currency === "inr";

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container>
        {/* Header & Currency Selector */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DCE7DD]/60 border border-[#24483B]/10 text-[#24483B] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A46A]" />
            <span>{CAMPAIGN_METADATA.badge} · Active until {CAMPAIGN_METADATA.endDate}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#202923]">
            Clear, Transparent Pricing
          </h1>

          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Every publication, psychological screening scale, and clinical session is structured with complete, upfront price transparency.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-full bg-[#F5EFE6] border border-[#24483B]/15 shadow-inner">
              <button
                onClick={() => setCurrency("inr")}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isIndia
                    ? "bg-[#24483B] text-[#FDFBF7] shadow-xs"
                    : "text-[#202923]/70 hover:text-[#202923]"
                }`}
              >
                <span>🇮🇳 India Pricing (INR ₹)</span>
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  !isIndia
                    ? "bg-[#24483B] text-[#FDFBF7] shadow-xs"
                    : "text-[#202923]/70 hover:text-[#202923]"
                }`}
              >
                <span>🌐 International / Global (USD $)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. Books Pricing Cards */}
        <section className="mb-20 space-y-8">
          <SectionHeading
            eyebrow="Publications & Workbooks"
            title="Books & Ecosystem Bundles"
            description="High-resolution printable workbooks and reflective volumes."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Toolkit */}
            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/10 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#24483B] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#24483B]/10 font-semibold">Flagship</span>
                  <span className="text-xs font-mono text-[#202923]/60">80-Page PDF</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#202923]">
                  The Psychology Toolkit
                </h3>
                <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                  5 structured chapters, 15+ clinical worksheets, somatic grounding logs, and CentreLine access.
                </p>
                <div className="pt-4 border-t border-[#24483B]/10 space-y-1">
                  <span className="text-xs text-[#202923]/50 line-through block font-mono">
                    Regular {isIndia ? BOOKS_PRICING.toolkit.regular.formattedInr : BOOKS_PRICING.toolkit.regular.formattedUsd}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#202923]">
                      {isIndia ? BOOKS_PRICING.toolkit.diwali.formattedInr : BOOKS_PRICING.toolkit.diwali.formattedUsd}
                    </span>
                    <span className="text-xs font-semibold text-[#24483B] bg-[#DCE7DD]/80 px-2 py-0.5 rounded">
                      {isIndia ? BOOKS_PRICING.toolkit.diwali.savingsInr : BOOKS_PRICING.toolkit.diwali.savingsUsd}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <LiquidGlassButton href="/books/psychology-toolkit" variant="primary" size="md" className="w-full">
                  <span>Get Toolkit</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LiquidGlassButton>
              </div>
            </div>

            {/* Finding The Centre */}
            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/10 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#24483B] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#24483B]/10 font-semibold">Volume</span>
                  <span className="text-xs font-mono text-[#202923]/60">eBook / Print</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#202923]">
                  Finding The Centre
                </h3>
                <p className="text-xs text-[#202923]/70 leading-relaxed font-sans">
                  Reflective handbook on emotional poise, solitude, and quiet grounding.
                </p>
                <div className="pt-4 border-t border-[#24483B]/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#202923]/70">eBook Edition:</span>
                    <span className="font-bold text-[#202923]">
                      {isIndia ? BOOKS_PRICING.findingTheCentre.ebook.formattedInr : BOOKS_PRICING.findingTheCentre.ebook.formattedUsd}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-[#24483B]/5">
                    <span className="text-[#202923]/70">Paperback Print:</span>
                    <span className="font-bold text-[#202923]">
                      {isIndia ? BOOKS_PRICING.findingTheCentre.print.formattedInr : BOOKS_PRICING.findingTheCentre.print.formattedUsd}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <LiquidGlassButton href="/books/finding-the-centre" variant="secondary" size="md" className="w-full">
                  <span>Explore Formats</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LiquidGlassButton>
              </div>
            </div>

            {/* Complete Bundle */}
            <div className="bg-[#24483B] text-[#FDFBF7] rounded-2xl p-7 border border-white/10 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A46A] font-semibold">20% Bundle</span>
                  <span className="text-xs font-mono text-[#C6A46A]">Complete Set</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-[#FDFBF7]">
                  Psychology Bundle
                </h3>
                <p className="text-xs text-[#FDFBF7]/75 leading-relaxed font-sans">
                  The Psychology Toolkit + Finding The Centre eBook at 20% combined savings.
                </p>
                <div className="pt-4 border-t border-white/15 space-y-1">
                  <span className="text-xs text-[#FDFBF7]/50 line-through block font-mono">
                    Combined {isIndia ? BOOKS_PRICING.bundle.regularValue.formattedInr : BOOKS_PRICING.bundle.regularValue.formattedUsd}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#C6A46A]">
                      {isIndia ? BOOKS_PRICING.bundle.price.formattedInr : BOOKS_PRICING.bundle.price.formattedUsd}
                    </span>
                    <span className="text-xs text-[#A6B7A1] font-medium">
                      {isIndia ? BOOKS_PRICING.bundle.price.savingsInr : BOOKS_PRICING.bundle.price.savingsUsd}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <LiquidGlassButton href="/books/bundles" variant="gold" size="md" className="w-full">
                  <span>Claim Complete Bundle</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </section>

        {/* 2. All 16 Psychological Assessments Table */}
        <section className="mb-20 space-y-8">
          <SectionHeading
            eyebrow="Clinical Instruments"
            title="Psychological Assessments Registry"
            description="Complete price directory for standardized tests and clinician-evaluated projective protocols."
          />

          <div className="overflow-x-auto rounded-2xl border border-[#24483B]/15 bg-[#FDFBF7] shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#24483B] text-[#FDFBF7] text-xs font-mono uppercase tracking-wider">
                  <th className="p-4">Code</th>
                  <th className="p-4">Assessment Name</th>
                  <th className="p-4">Domain Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">
                    Fee ({isIndia ? "INR ₹" : "USD $"})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#24483B]/10 text-xs sm:text-sm font-sans">
                {ASSESSMENTS_CATALOG.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F5EFE6] transition-colors">
                    <td className="p-4 font-mono font-bold text-[#24483B]">{item.code}</td>
                    <td className="p-4 font-medium text-[#202923]">{item.name}</td>
                    <td className="p-4 text-[#202923]/70">{item.category}</td>
                    <td className="p-4 text-[#202923]/60">{item.duration}</td>
                    <td className="p-4 text-right font-serif font-bold text-[#202923]">
                      {isIndia ? item.formattedInr : item.formattedUsd}
                      {!isIndia && item.marketValueUsd && (
                        <span className="text-[10px] text-[#202923]/50 block line-through font-sans">
                          Val {item.marketValueUsd}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Counselling & Support Services Table */}
        <section className="mb-16 space-y-8">
          <SectionHeading
            eyebrow="Therapeutic Care"
            title="Counselling & Support Services"
            description="1-on-1 consultations, crisis stabilization, CentreLine, and graphotherapy."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Counselling */}
            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/15 space-y-4 shadow-xs">
              <h3 className="font-serif text-xl font-normal text-[#202923]">Counselling & Crisis</h3>
              <div className="space-y-3 text-xs sm:text-sm divide-y divide-[#24483B]/10">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">1-on-1 Session (50 Min)</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.counselling.singleSession.formattedInr : SERVICES_PRICING.counselling.singleSession.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Counselling Package (4 Sessions)</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.counselling.package4.formattedInr : SERVICES_PRICING.counselling.package4.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Counselling Package (8 Sessions)</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.counselling.package8.formattedInr : SERVICES_PRICING.counselling.package8.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-[#8B2626]">
                  <span className="font-semibold">Crisis Stabilization Call</span>
                  <span className="font-bold font-mono">{isIndia ? SERVICES_PRICING.crisis.call.formattedInr : SERVICES_PRICING.crisis.call.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">CentreLine Ongoing Support</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.crisis.centreLine.formattedInr : SERVICES_PRICING.crisis.centreLine.formattedUsd}</span>
                </div>
              </div>
            </div>

            {/* Graphology */}
            <div className="bg-[#F5EFE6] rounded-2xl p-7 border border-[#24483B]/15 space-y-4 shadow-xs">
              <h3 className="font-serif text-xl font-normal text-[#202923]">Graphotherapy & Courses</h3>
              <div className="space-y-3 text-xs sm:text-sm divide-y divide-[#24483B]/10">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Graphology Basic Reading</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.graphology.basic.formattedInr : SERVICES_PRICING.graphology.basic.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Graphology Standard Reading</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.graphology.standard.formattedInr : SERVICES_PRICING.graphology.standard.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Graphology Deep Analysis & Therapy</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.graphology.deep.formattedInr : SERVICES_PRICING.graphology.deep.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-[#202923]">Graphotherapy Master Package</span>
                  <span className="font-bold text-[#C6A46A] font-mono">{isIndia ? SERVICES_PRICING.graphology.masterPackage.formattedInr : SERVICES_PRICING.graphology.masterPackage.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#202923]/80">Complete Course Bundle</span>
                  <span className="font-bold text-[#202923] font-mono">{isIndia ? SERVICES_PRICING.courses.bundle.formattedInr : SERVICES_PRICING.courses.bundle.formattedUsd}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
