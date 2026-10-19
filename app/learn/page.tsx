"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { LEARN_CATALOG, LearnItem } from "@/data/learn";
import { Search, Clock, ArrowRight, X } from "lucide-react";

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedArticle, setSelectedArticle] = React.useState<LearnItem | null>(null);

  const categories = ["All", "PsychSnaps", "Articles", "Founder Notes", "Resources"];

  const filteredItems = LEARN_CATALOG.filter((item) => {
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#202923] py-14 sm:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#24483B] bg-[#DCE7DD]/60 px-3.5 py-1.5 rounded-full border border-[#24483B]/10">
            The Psychology Editorial & PsychSnaps
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#202923]">
            The Reading Room
          </h1>
          <p className="text-base sm:text-lg text-[#202923]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Clear, evidence-backed psychological insights, bite-sized visual frameworks, and founder notes on emotional poise.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F5EFE6] border border-[#24483B]/10 mb-12 shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#24483B] text-[#FDFBF7] font-semibold shadow-xs"
                    : "bg-[#FDFBF7] text-[#202923]/75 hover:bg-white border border-[#24483B]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#24483B]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays & psychsnaps..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-[#FDFBF7] border border-[#24483B]/15 text-[#202923] placeholder:text-[#202923]/40 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
            />
          </div>
        </div>

        {/* Learn Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-[#FDFBF7] rounded-2xl p-7 sm:p-8 border border-[#24483B]/12 shadow-xs hover:border-[#24483B]/30 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#202923]/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#24483B] bg-[#DCE7DD]/60 px-2.5 py-0.5 rounded-full border border-[#24483B]/10 font-semibold">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#24483B]" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#202923]/50 block">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#202923] group-hover:text-[#24483B] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#202923]/75 leading-relaxed font-sans">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#202923]/50">{item.date}</span>
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#24483B] hover:text-[#1A3529] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Modal */}
        {selectedArticle && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#202923]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
          >
            <div className="bg-[#FDFBF7] text-[#202923] max-w-2xl w-full rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#24483B]/15 my-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article modal"
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#24483B]/5 text-[#202923]/70 hover:text-[#202923] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold">
                  {selectedArticle.category}
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#202923] leading-tight">
                  {selectedArticle.title}
                </h2>
                <p className="text-xs font-mono text-[#202923]/60">
                  {selectedArticle.tagline} • {selectedArticle.readTime}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#202923]/85 leading-relaxed font-sans border-t border-[#24483B]/10 pt-6">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-8 mt-8 border-t border-[#24483B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/books/psychology-toolkit"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-semibold text-[#24483B] hover:underline"
                >
                  Explore in The Psychology Toolkit →
                </Link>
                <LiquidGlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedArticle(null)}
                >
                  <span>Close Essay</span>
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
