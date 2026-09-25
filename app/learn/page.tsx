"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LEARN_CATALOG, LearnItem } from "@/data/learn";
import { Search, BookOpen, Clock, ArrowRight, Sparkles, X } from "lucide-react";

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
    <main className="min-h-screen bg-ivory text-navy py-12 sm:py-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-sage-dark block">
            The Psychology Editorial & PsychSnaps
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-navy">
            The Learn Hub
          </h1>
          <p className="text-base sm:text-lg text-navy/75 leading-relaxed font-sans">
            Clear, evidence-backed psychological insights, bite-sized visual frameworks, and founder notes on emotional poise.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-cream border border-navy/10 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
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
              placeholder="Search essays & psychsnaps..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-ivory border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-gold"
            />
          </div>
        </div>

        {/* Learn Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-cream/60 rounded-2xl p-7 sm:p-8 border border-navy/15 shadow-xs hover:border-navy/30 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-navy/60">
                  <Badge variant="sage" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sage-dark" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-navy/50 block">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-navy-light leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-navy/75 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-navy/10 flex items-center justify-between">
                <span className="text-xs font-mono text-navy/50">{item.date}</span>
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-semibold uppercase tracking-wider text-navy hover:text-sage-dark flex items-center gap-1 cursor-pointer"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm overflow-y-auto"
          >
            <div className="bg-ivory text-navy max-w-2xl w-full rounded-2xl p-6 sm:p-10 shadow-2xl border border-navy/15 my-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-navy/5 text-navy/60 hover:text-navy cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 mb-6">
                <Badge variant="sage">{selectedArticle.category}</Badge>
                <h2 className="font-serif text-3xl font-bold text-navy leading-tight">
                  {selectedArticle.title}
                </h2>
                <p className="text-xs font-mono text-navy/60">
                  {selectedArticle.tagline} • {selectedArticle.readTime}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-navy/85 leading-relaxed font-sans border-t border-navy/10 pt-6">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-8 mt-8 border-t border-navy/10 flex items-center justify-between">
                <Link
                  href="/books/psychology-toolkit"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-semibold text-sage-dark hover:underline"
                >
                  Explore in The Psychology Toolkit →
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedArticle(null)}
                >
                  Close Essay
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
