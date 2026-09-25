"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PSYCHOLOGY_TOOLKIT } from "@/data/books";
import { BOOKS_PRICING, CAMPAIGN_METADATA } from "@/data/pricing";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  FileCheck,
  HelpCircle,
  Layers,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export default function PsychologyToolkitPage() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(0);
  const [completedExercises, setCompletedExercises] = React.useState<Record<string, boolean>>({
    "The Core Value Matrix": true,
  });

  const toggleExercise = (name: string) => {
    setCompletedExercises((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* 1. Hero & Product Identity */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="navy">Flagship Master Workbook</Badge>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-navy text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{CAMPAIGN_METADATA.badge}: ₹999 / $89</span>
                </div>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-navy font-normal leading-[1.12] tracking-tight">
                {PSYCHOLOGY_TOOLKIT.title}
              </h1>

              <p className="font-serif italic text-xl text-navy/80">
                "{PSYCHOLOGY_TOOLKIT.tagline}"
              </p>

              <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
                {PSYCHOLOGY_TOOLKIT.overview}
              </p>

              {/* Pricing Callout Box */}
              <div className="p-6 rounded-2xl bg-cream border border-navy/15 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-navy/60 block">Diwali Campaign Special (Valid until {CAMPAIGN_METADATA.endDate})</span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                        {BOOKS_PRICING.toolkit.diwali.formattedInr}
                      </span>
                      <span className="text-sm text-navy/60 font-sans">
                        / {BOOKS_PRICING.toolkit.diwali.formattedUsd} Global
                      </span>
                      <span className="text-xs text-navy/50 line-through">
                        {BOOKS_PRICING.toolkit.regular.formattedInr}
                      </span>
                    </div>
                  </div>
                  <Badge variant="gold">{BOOKS_PRICING.toolkit.diwali.savingsInr}</Badge>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">
                    <span>Instant Digital Access (A4 PDF)</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Link href="/books/bundles">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      View Bundle Savings (₹1,079)
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Product Overview Tile */}
            <div className="lg:col-span-5">
              <div className="bg-navy text-ivory rounded-2xl p-8 sm:p-10 shadow-2xl border border-navy-light/40 space-y-6">
                <div className="flex items-center justify-between text-xs text-gold">
                  <span>SPECIFICATIONS</span>
                  <span>DIGITAL MASTER</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  Included in Your Download
                </h3>
                <ul className="space-y-3.5 text-sm text-ivory/80">
                  <li className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-sage shrink-0" />
                    <span>80-Page High-Resolution Printable A4 PDF</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-sage shrink-0" />
                    <span>5 Structured Psychoeducational Chapters</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-sage shrink-0" />
                    <span>15+ Clinical Reflection & Reframing Exercises</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-sage shrink-0" />
                    <span>Direct Access to CentreLine Support Pathway</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-sage shrink-0" />
                    <span>Optimized for iPad / GoodNotes / Tablet Stylus</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The 5-Stage Core Journey */}
        <section className="mb-24 py-12 border-t border-b border-navy/10 bg-cream/50 rounded-2xl px-6 sm:px-10">
          <SectionHeading
            eyebrow="The Framework Progression"
            title="The 5-Stage Psychological Architecture"
            description="Designed to take you from unconscious reactive habits into conscious, grounded self-direction."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PSYCHOLOGY_TOOLKIT.journey.map((stage) => (
              <div key={stage.step} className="bg-ivory rounded-xl p-5 border border-navy/10 space-y-2">
                <span className="font-serif text-2xl font-bold text-sage-dark block">
                  {stage.step}
                </span>
                <h4 className="font-serif text-lg font-bold text-navy">{stage.label}</h4>
                <p className="text-xs text-navy/70 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Chapter Progression Timeline */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Curriculum & Chapters"
            title="What you will work through"
            description="Each chapter pairs deep psychological theory with actionable reflection frameworks."
          />

          <div className="space-y-6">
            {PSYCHOLOGY_TOOLKIT.chapters.map((ch) => (
              <div
                key={ch.number}
                className="bg-cream rounded-2xl p-7 sm:p-9 border border-navy/15 flex flex-col lg:flex-row justify-between gap-6"
              >
                <div className="space-y-3 lg:max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy text-ivory text-xs font-bold flex items-center justify-center font-mono">
                      {ch.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-sage-dark">
                      {ch.tagline}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                    {ch.title}
                  </h3>
                  <p className="text-sm text-navy/75 leading-relaxed">
                    {ch.description}
                  </p>
                  <div className="pt-2">
                    <p className="text-xs font-serif italic text-navy/90">
                      <strong>Core Anchor:</strong> {ch.keyTakeaway}
                    </p>
                  </div>
                </div>

                <div className="lg:w-72 bg-ivory rounded-xl p-5 border border-navy/10 space-y-2 shrink-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-navy/60 block mb-2">
                    Included Exercises:
                  </span>
                  {ch.exercises.map((ex, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-navy/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-dark" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Exercises Bento Grid */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Interactive Preview"
            title="Sample Clinical Reflection Exercises"
            description="Click to interact with sample exercises included inside the master workbook."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "The Core Value Matrix",
                tag: "Chapter 1",
                desc: "Evaluate 10 life domains across authentic internal conviction vs. borrowed social expectations.",
              },
              {
                name: "Cognitive Belief Disputation",
                tag: "Chapter 2",
                desc: "Challenge automatic negative catastrophizing with 5-column clinical evidence logging.",
              },
              {
                name: "Somatic Grounding Wheel",
                tag: "Chapter 3",
                desc: "Physiological de-escalation protocols for acute panic triggers and sympathetic arousal.",
              },
            ].map((exercise) => {
              const isDone = !!completedExercises[exercise.name];
              return (
                <div
                  key={exercise.name}
                  onClick={() => toggleExercise(exercise.name)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all select-none ${
                    isDone
                      ? "bg-sage-light/70 border-sage/60 shadow-xs"
                      : "bg-cream border-navy/15 hover:border-navy/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-navy/5 text-navy/70">
                      {exercise.tag}
                    </span>
                    <CheckCircle2
                      className={`w-6 h-6 transition-colors ${
                        isDone ? "text-sage-dark fill-sage/30" : "text-navy/20"
                      }`}
                    />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-navy mb-2">
                    {exercise.name}
                  </h4>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {exercise.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-navy/10 text-[11px] font-semibold text-navy/60">
                    {isDone ? "✓ Preview Completed" : "Click to test check-mark"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Who It Is For */}
        <section className="mb-24 py-12 bg-ivory border-t border-b border-navy/10">
          <SectionHeading
            eyebrow="Target Audience"
            title="Who will benefit most from this workbook"
            description="Crafted for curious, self-directed thinkers seeking deeper psychology without fluff."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PSYCHOLOGY_TOOLKIT.audiences.map((aud, idx) => (
              <div key={idx} className="bg-cream rounded-xl p-6 border border-navy/10 space-y-2">
                <h4 className="font-serif text-lg font-bold text-navy">{aud.title}</h4>
                <p className="text-xs text-navy/70 leading-relaxed">{aud.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Comparison Table (Us vs Pop-Help) */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Methodology Comparison"
            title="What makes The Psychology Toolkit different"
            description="A direct comparison between evidence-grounded psychology and generic pop-help."
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-navy/15 rounded-xl overflow-hidden bg-ivory">
              <thead>
                <tr className="bg-navy text-ivory text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-navy-light/40">Feature / Dimension</th>
                  <th className="p-4 border-b border-navy-light/40">The Psychology Toolkit</th>
                  <th className="p-4 border-b border-navy-light/40 opacity-70">Generic Wellness Books</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-navy/10">
                <tr>
                  <td className="p-4 font-semibold text-navy">Curriculum Structure</td>
                  <td className="p-4 text-sage-dark font-medium">5-Phase Clinical Progression (80 Pages)</td>
                  <td className="p-4 text-navy/60">Unstructured advice & random essays</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Practical Exercises</td>
                  <td className="p-4 text-sage-dark font-medium">15+ Guided Worksheets & Cognitive Logs</td>
                  <td className="p-4 text-navy/60">Passive reading with blank pages</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Somatic Integration</td>
                  <td className="p-4 text-sage-dark font-medium">Nervous system & vagal grounding protocols</td>
                  <td className="p-4 text-navy/60">Purely mental affirmations</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Ongoing Support</td>
                  <td className="p-4 text-sage-dark font-medium">Direct connection to CentreLine pathway</td>
                  <td className="p-4 text-navy/60">Zero post-purchase assistance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. FAQs */}
        <section className="mb-24 max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Clear answers before you begin"
            align="center"
          />

          <div className="space-y-4">
            {PSYCHOLOGY_TOOLKIT.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-cream rounded-xl border border-navy/10 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-serif text-lg font-bold text-navy flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-navy/50 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-navy/75 leading-relaxed border-t border-navy/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. Educational Disclaimer */}
        <section className="mb-16 p-6 rounded-xl bg-sage-light/40 border border-sage/30 text-xs text-navy/80 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-navy">
            <ShieldAlert className="w-4 h-4 text-sage-dark" />
            <span>Educational & Psychoeducational Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            The Psychology Toolkit is an educational workbook designed for personal growth, cognitive exploration, and structured reflection. It does not replace individualized clinical psychotherapy, psychiatric consultation, or medical diagnosis. If you are experiencing acute distress, please utilize our Crisis Stabilization pathway or emergency helplines.
          </p>
        </section>

        {/* 9. Final Purchase Callout */}
        <section className="p-8 sm:p-12 rounded-2xl bg-navy text-ivory text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ivory">
            Get your copy of The Psychology Toolkit today
          </h2>
          <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto font-sans">
            Instant digital download (Printable A4 PDF). Claim the Diwali discount price before {CAMPAIGN_METADATA.endDate}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="gold">
              <span>Claim for {BOOKS_PRICING.toolkit.diwali.formattedInr} ({BOOKS_PRICING.toolkit.diwali.formattedUsd})</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Link href="/books/bundles">
              <Button size="lg" variant="outline" className="text-ivory border-ivory/30 hover:bg-ivory/10">
                View Bundle (₹1,079 / $83)
              </Button>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
