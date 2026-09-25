"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BOOKS_PRICING,
  ASSESSMENTS_CATALOG,
  SERVICES_PRICING,
  CAMPAIGN_METADATA,
} from "@/data/pricing";
import { Sparkles, Check, ArrowRight, ShieldCheck, Globe, MapPin } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = React.useState<"inr" | "usd">("inr");

  const isIndia = currency === "inr";

  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header & Currency Selector */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/20 border border-gold/40 text-navy text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>{CAMPAIGN_METADATA.badge} Active until {CAMPAIGN_METADATA.endDate}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            Clear, Transparent Ecosystem Pricing
          </h1>

          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            Every publication, psychological screening scale, and clinical session is structured with complete price transparency.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-xl bg-cream border border-navy/15 shadow-inner">
              <button
                onClick={() => setCurrency("inr")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isIndia
                    ? "bg-navy text-ivory shadow-xs"
                    : "text-navy/70 hover:text-navy"
                }`}
              >
                <span>🇮🇳 India Pricing (INR ₹)</span>
              </button>
              <button
                onClick={() => setCurrency("usd")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !isIndia
                    ? "bg-navy text-ivory shadow-xs"
                    : "text-navy/70 hover:text-navy"
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
            <div className="bg-cream rounded-2xl p-7 border border-navy/15 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="navy">Flagship</Badge>
                  <span className="text-xs font-mono text-navy/60">80-Page PDF</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  The Psychology Toolkit
                </h3>
                <p className="text-xs text-navy/70 leading-relaxed">
                  5 structured chapters, 15+ clinical worksheets, somatic grounding logs, and CentreLine access.
                </p>
                <div className="pt-4 border-t border-navy/10 space-y-1">
                  <span className="text-xs text-navy/50 line-through block">
                    Regular {isIndia ? BOOKS_PRICING.toolkit.regular.formattedInr : BOOKS_PRICING.toolkit.regular.formattedUsd}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-navy">
                      {isIndia ? BOOKS_PRICING.toolkit.diwali.formattedInr : BOOKS_PRICING.toolkit.diwali.formattedUsd}
                    </span>
                    <span className="text-xs font-semibold text-gold-dark bg-gold/20 px-2 py-0.5 rounded">
                      {isIndia ? BOOKS_PRICING.toolkit.diwali.savingsInr : BOOKS_PRICING.toolkit.diwali.savingsUsd}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/books/psychology-toolkit" className="pt-6">
                <Button variant="primary" className="w-full">
                  Get Toolkit
                </Button>
              </Link>
            </div>

            {/* Finding The Centre */}
            <div className="bg-cream rounded-2xl p-7 border border-navy/15 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="sage">Volume</Badge>
                  <span className="text-xs font-mono text-navy/60">eBook / Print</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy">
                  Finding The Centre
                </h3>
                <p className="text-xs text-navy/70 leading-relaxed">
                  Reflective handbook on emotional poise, solitude, and quiet grounding.
                </p>
                <div className="pt-4 border-t border-navy/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-navy/70">eBook Edition:</span>
                    <span className="font-bold text-navy">
                      {isIndia ? BOOKS_PRICING.findingTheCentre.ebook.formattedInr : BOOKS_PRICING.findingTheCentre.ebook.formattedUsd}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-navy/5">
                    <span className="text-navy/70">Collector Print:</span>
                    <span className="font-bold text-navy">
                      {isIndia ? BOOKS_PRICING.findingTheCentre.print.formattedInr : BOOKS_PRICING.findingTheCentre.print.formattedUsd}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/books/finding-the-centre" className="pt-6">
                <Button variant="secondary" className="w-full">
                  Explore Formats
                </Button>
              </Link>
            </div>

            {/* Complete Bundle */}
            <div className="bg-navy text-ivory rounded-2xl p-7 border border-navy-light/40 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="gold">20% Bundle</Badge>
                  <span className="text-xs font-mono text-gold">Complete Set</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  Psychology Bundle
                </h3>
                <p className="text-xs text-ivory/75 leading-relaxed">
                  The Psychology Toolkit + Finding The Centre eBook at 20% combined savings.
                </p>
                <div className="pt-4 border-t border-ivory/15 space-y-1">
                  <span className="text-xs text-ivory/50 line-through block">
                    Combined {isIndia ? BOOKS_PRICING.bundle.regularValue.formattedInr : BOOKS_PRICING.bundle.regularValue.formattedUsd}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-gold">
                      {isIndia ? BOOKS_PRICING.bundle.price.formattedInr : BOOKS_PRICING.bundle.price.formattedUsd}
                    </span>
                    <span className="text-xs text-sage font-medium">
                      {isIndia ? BOOKS_PRICING.bundle.price.savingsInr : BOOKS_PRICING.bundle.price.savingsUsd}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/books/bundles" className="pt-6">
                <Button variant="gold" className="w-full">
                  Claim Complete Bundle
                </Button>
              </Link>
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

          <div className="overflow-x-auto rounded-2xl border border-navy/15 bg-ivory shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy text-ivory text-xs uppercase tracking-wider">
                  <th className="p-4">Code</th>
                  <th className="p-4">Assessment Name</th>
                  <th className="p-4">Domain Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4 text-right">
                    Fee ({isIndia ? "INR ₹" : "USD $"})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 text-xs sm:text-sm">
                {ASSESSMENTS_CATALOG.map((item) => (
                  <tr key={item.id} className="hover:bg-cream/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-navy">{item.code}</td>
                    <td className="p-4 font-medium text-navy">{item.name}</td>
                    <td className="p-4 text-navy/70">{item.category}</td>
                    <td className="p-4 text-navy/60">{item.duration}</td>
                    <td className="p-4 text-right font-serif font-bold text-navy">
                      {isIndia ? item.formattedInr : item.formattedUsd}
                      {!isIndia && item.marketValueUsd && (
                        <span className="text-[10px] text-navy/50 block line-through font-sans">
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
            <div className="bg-cream rounded-2xl p-6 border border-navy/15 space-y-4">
              <h3 className="font-serif text-xl font-bold text-navy">Counselling & Crisis</h3>
              <div className="space-y-3 text-xs sm:text-sm divide-y divide-navy/10">
                <div className="flex justify-between items-center pt-2">
                  <span>1-on-1 Session (50 Min)</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.counselling.singleSession.formattedInr : SERVICES_PRICING.counselling.singleSession.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Counselling Package (4 Sessions)</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.counselling.package4.formattedInr : SERVICES_PRICING.counselling.package4.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Counselling Package (8 Sessions)</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.counselling.package8.formattedInr : SERVICES_PRICING.counselling.package8.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-red-900">
                  <span className="font-semibold">Crisis Stabilization Call</span>
                  <span className="font-bold">{isIndia ? SERVICES_PRICING.crisis.call.formattedInr : SERVICES_PRICING.crisis.call.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>CentreLine Ongoing Support</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.crisis.centreLine.formattedInr : SERVICES_PRICING.crisis.centreLine.formattedUsd}</span>
                </div>
              </div>
            </div>

            {/* Graphology */}
            <div className="bg-cream rounded-2xl p-6 border border-navy/15 space-y-4">
              <h3 className="font-serif text-xl font-bold text-navy">Graphotherapy & Courses</h3>
              <div className="space-y-3 text-xs sm:text-sm divide-y divide-navy/10">
                <div className="flex justify-between items-center pt-2">
                  <span>Graphology Basic Reading</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.graphology.basic.formattedInr : SERVICES_PRICING.graphology.basic.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Graphology Standard Reading</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.graphology.standard.formattedInr : SERVICES_PRICING.graphology.standard.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Graphology Deep Analysis & Therapy</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.graphology.deep.formattedInr : SERVICES_PRICING.graphology.deep.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-navy">Graphotherapy Master Package (Launch)</span>
                  <span className="font-bold text-gold-dark">{isIndia ? SERVICES_PRICING.graphology.masterPackage.formattedInr : SERVICES_PRICING.graphology.masterPackage.formattedUsd}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span>Complete Course Bundle</span>
                  <span className="font-bold text-navy">{isIndia ? SERVICES_PRICING.courses.bundle.formattedInr : SERVICES_PRICING.courses.bundle.formattedUsd}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
