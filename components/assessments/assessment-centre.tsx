"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENTS_CATALOG, AssessmentPricingItem } from "@/data/pricing";
import { INTERACTIVE_SCREENERS, InteractiveAssessment } from "@/data/assessments-interactive";
import {
  Search,
  Filter,
  Clock,
  User,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  X,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export function AssessmentCentre() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeScreener, setActiveScreener] = React.useState<InteractiveAssessment | null>(null);
  const [screenerAnswers, setScreenerAnswers] = React.useState<number[]>([]);
  const [screenerResult, setScreenerResult] = React.useState<any>(null);

  const categories = [
    "All",
    "Anxiety & Mood",
    "Personality & Projective",
    "Cognitive & Neuro",
    "Clinical Diagnostics",
  ];

  const filteredAssessments = ASSESSMENTS_CATALOG.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startScreener = (screener: InteractiveAssessment) => {
    setActiveScreener(screener);
    setScreenerAnswers(new Array(screener.questions.length).fill(0));
    setScreenerResult(null);
  };

  const handleAnswerChange = (questionIdx: number, val: number) => {
    const updated = [...screenerAnswers];
    updated[questionIdx] = val;
    setScreenerAnswers(updated);
  };

  const calculateResult = () => {
    if (!activeScreener) return;
    const res = activeScreener.scoring(screenerAnswers);
    setScreenerResult(res);
  };

  return (
    <div className="space-y-16">
      {/* Interactive Free Self-Screening Section */}
      <section className="bg-cream rounded-3xl p-8 sm:p-10 border border-navy/15 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="sage">Self-Administered Screening</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Instant Self-Inventories (Free)
            </h2>
            <p className="text-sm text-navy/70 max-w-xl">
              Take confidential, instant evidence-grounded screening inventories scored automatically in your browser.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {INTERACTIVE_SCREENERS.map((screener) => (
            <div
              key={screener.id}
              className="bg-ivory rounded-xl p-5 border border-navy/10 flex flex-col justify-between hover:border-navy/30 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-navy">
                    {screener.code}
                  </span>
                  <span className="text-navy/60">{screener.duration}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-navy group-hover:text-navy-light">
                  {screener.title}
                </h3>
                <p className="text-xs text-navy/70 line-clamp-2">
                  {screener.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-navy/5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startScreener(screener)}
                  className="w-full text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-sage-dark" />
                  <span>Start Free Screener</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16 Clinical Assessment Catalog */}
      <section className="space-y-8">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Practitioner & Diagnostic Inventory"
            title="Complete 16 Clinical & Projective Assessment Catalog"
            description="Filter through standardized psychometrics, projective protocols, intelligence tests, and clinical diagnostics."
          />

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-cream border border-navy/10">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-navy text-ivory shadow-xs"
                      : "bg-ivory text-navy/75 hover:bg-navy/5 border border-navy/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assessments (e.g. HAM-A, MMPI)..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-ivory border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-gold"
              />
            </div>
          </div>
        </div>

        {/* Assessment Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="bg-ivory rounded-2xl p-7 border border-navy/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group scroll-mt-28"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="navy" className="text-[11px] font-mono">
                    {item.code}
                  </Badge>
                  <span className="text-xs text-navy/60 font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-navy-light leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-navy/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-navy/80 border-t border-navy/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                    <span>Duration: {item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                    <span>Target: {item.targetAge}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-navy/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-navy/50 block">Assessment Fee</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-xl font-bold text-navy">
                      {item.formattedInr}
                    </span>
                    <span className="text-xs text-navy/60 font-sans">
                      ({item.formattedUsd})
                    </span>
                  </div>
                </div>

                <Button size="sm" variant="secondary" className="text-xs">
                  Request Session
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-16 bg-cream rounded-2xl border border-navy/10">
            <p className="text-base text-navy/70 font-serif">
              No psychological assessments matched your query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Interactive Screener Modal */}
      {activeScreener && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-ivory text-navy max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-navy/15 my-8 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveScreener(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-navy/5 text-navy/60 hover:text-navy cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <Badge variant="sage">{activeScreener.code}</Badge>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                {activeScreener.title}
              </h3>
              <p className="text-xs text-navy/70 leading-relaxed">
                {activeScreener.description}
              </p>
            </div>

            {!screenerResult ? (
              <div className="space-y-6">
                {activeScreener.questions.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 rounded-xl bg-cream border border-navy/10 space-y-3">
                    <p className="text-sm font-semibold text-navy">
                      {qIdx + 1}. {q}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeScreener.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                            screenerAnswers[qIdx] === optIdx
                              ? "bg-navy text-ivory border-navy"
                              : "bg-ivory text-navy/80 border-navy/10 hover:bg-navy/5"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${qIdx}`}
                            value={optIdx}
                            checked={screenerAnswers[qIdx] === optIdx}
                            onChange={() => handleAnswerChange(qIdx, optIdx)}
                            className="hidden"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="secondary" onClick={() => setActiveScreener(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={calculateResult}>
                    Calculate Clinical Score
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-sage-light mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-sage-dark" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-navy/60 font-semibold">
                    Calculated Result Level
                  </span>
                  <h4 className="font-serif text-3xl font-bold text-navy">
                    {screenerResult.level}
                  </h4>
                  <p className="font-mono text-sm text-navy/80">
                    Total Score: {screenerResult.score} / {screenerResult.maxScore}
                  </p>
                </div>

                <p className="text-sm text-navy/75 max-w-lg mx-auto leading-relaxed bg-cream p-4 rounded-xl border border-navy/10">
                  {screenerResult.description}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/books/psychology-toolkit" onClick={() => setActiveScreener(null)}>
                    <Button variant="primary" className="w-full sm:w-auto">
                      Explore Psychology Toolkit
                    </Button>
                  </Link>
                  <Link href="/services#counselling" onClick={() => setActiveScreener(null)}>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Consult a Psychologist
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={() => startScreener(activeScreener)}>
                    Retake Inventory
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
