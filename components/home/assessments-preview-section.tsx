"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { ASSESSMENTS_CATALOG } from "@/data/pricing";

const CATEGORIES = [
  "All Frameworks",
  "Anxiety & Mood",
  "Clinical Diagnostics",
  "Personality & Projective",
] as const;

export function AssessmentsPreviewSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Frameworks");
  const [activeTestId, setActiveTestId] = React.useState<string>(ASSESSMENTS_CATALOG[0]?.id || "ham-a");

  const filtered = React.useMemo(() => {
    if (selectedCategory === "All Frameworks") {
      return ASSESSMENTS_CATALOG.slice(0, 5);
    }
    return ASSESSMENTS_CATALOG.filter((item) => item.category === selectedCategory).slice(0, 5);
  }, [selectedCategory]);

  const activeTest = React.useMemo(() => {
    return ASSESSMENTS_CATALOG.find((t) => t.id === activeTestId) || ASSESSMENTS_CATALOG[0];
  }, [activeTestId]);

  return (
    <section className="py-24 sm:py-32 bg-navy text-ivory relative overflow-hidden">
      {/* Editorial Grid Texture Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <Container>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-mono block mb-4">
              Catalogue — 177 Standardized Psychometrics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-ivory">
              The Psychometric Archive
            </h2>
            <p className="mt-4 text-base text-ivory/70 font-sans leading-relaxed">
              161 free self-screeners paired with 16 clinician-standard batteries across 15 domains. Complete with instant scoring, factor profiles, and structured conclusions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors font-medium group"
            >
              <span>Explore Complete 177 Catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-ivory/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const first = cat === "All Frameworks" 
                  ? ASSESSMENTS_CATALOG[0] 
                  : ASSESSMENTS_CATALOG.find((item) => item.category === cat);
                if (first) setActiveTestId(first.id);
              }}
              className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all cursor-pointer font-medium ${
                selectedCategory === cat
                  ? "bg-gold text-navy font-semibold shadow-xs"
                  : "bg-ivory/5 text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Interactive Ledger: Left = Index Rows, Right = Deep Specimen Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Index Ledger Rows */}
          <div className="lg:col-span-7 space-y-2">
            {filtered.map((test, index) => {
              const isSelected = test.id === activeTestId;
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
                  onClick={() => setActiveTestId(test.id)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer text-left flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-ivory/10 border-gold/60 shadow-lg translate-x-1"
                      : "bg-ivory/[0.03] border-ivory/10 hover:bg-ivory/[0.07] hover:border-ivory/20"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-gold font-medium">
                        [{test.code}]
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-ivory/50">
                        {test.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-ivory truncate">
                      {test.name}
                    </h3>
                    <p className="text-xs text-ivory/60 truncate font-sans">
                      {test.duration} · {test.targetAge} · {test.administration}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-sm font-semibold text-ivory">
                      {test.formattedInr}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-gold text-navy" : "bg-ivory/10 text-ivory/60"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Specimen Detail Inspection Sheet */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {activeTest && (
                <motion.div
                  key={activeTest.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-ivory/5 border border-ivory/15 rounded-xl p-7 text-ivory space-y-6 sticky top-28 backdrop-blur-xs"
                >
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-ivory/10">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-gold block mb-1">
                        Scale Specification
                      </span>
                      <h4 className="font-serif text-2xl font-normal text-ivory">
                        {activeTest.name}
                      </h4>
                      <p className="font-mono text-xs text-ivory/60 mt-1">
                        Code: {activeTest.code} · {activeTest.category}
                      </p>
                    </div>
                    <span className="font-mono text-lg font-bold text-gold shrink-0">
                      {activeTest.formattedInr}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-ivory/80 leading-relaxed font-sans">
                    <p className="italic border-l-2 border-gold/60 pl-3 text-ivory/90 text-xs">
                      {activeTest.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="bg-ivory/5 p-3 rounded-sm border border-ivory/10">
                      <span className="text-ivory/50 block font-mono text-[10px] uppercase">Duration</span>
                      <span className="font-medium text-ivory">{activeTest.duration}</span>
                    </div>
                    <div className="bg-ivory/5 p-3 rounded-sm border border-ivory/10">
                      <span className="text-ivory/50 block font-mono text-[10px] uppercase">Standard</span>
                      <span className="font-medium text-ivory">{activeTest.administration}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-ivory/10 text-xs text-ivory/70">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                      <span>Standardized scoring rubric & factor analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                      <span>Immediate confidential report generation</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/assessments#${activeTest.id}`}
                      className="block w-full text-center py-3 px-4 rounded-md bg-gold hover:bg-gold-light text-navy font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Begin Psychometric Screener
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Educational & Clinical Disclaimer Banner */}
        <div className="mt-14 p-5 rounded-lg bg-ivory/[0.04] border border-ivory/10 flex items-start sm:items-center gap-3.5 text-xs text-ivory/70 font-sans">
          <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-ivory font-medium">Diagnostic Notice:</strong> Psychometric scales are structured instruments for psychological reflection, screening, and educational insight. They complement, but do not replace, formal psychiatric diagnosis with practitioner oversight.
          </p>
        </div>
      </Container>
    </section>
  );
}
