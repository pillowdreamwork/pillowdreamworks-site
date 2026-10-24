"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";
import { KnowledgeArchiveCanvas } from "@/components/3d/knowledge-archive-canvas";
import { LEARN_CATALOG, LearnItem } from "@/data/learn";
import { Search, Clock, ArrowRight, X, Sparkles, BookOpen, Compass, HelpCircle } from "lucide-react";

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedArticle, setSelectedArticle] = React.useState<LearnItem | null>(null);
  const [show3d, setShow3d] = React.useState<boolean>(true);

  const categories = ["All", "PsychSnaps", "Articles", "Founder Notes", "Resources"];

  // Escape key handler for article modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedArticle) {
        setSelectedArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArticle]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

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
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A2A4A] py-14 sm:py-24">
      <Container>
        {/* Header & Editorial Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8FA89E]/20 text-[#24483B] text-xs font-semibold tracking-wide border border-[#8FA89E]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#24483B]" />
            <span>The Psychology Editorial &amp; PsychSnaps</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1A2A4A]">
            The Reading Room
          </h1>
          <p className="text-base sm:text-lg text-[#1A2A4A]/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Clear, evidence-backed psychological insights, bite-sized visual frameworks, and founder notes on emotional poise.
          </p>
        </div>

        {/* 3D Knowledge Archive Console */}
        <div className="bg-[#F5F1E9]/80 backdrop-blur-2xl border border-[#24483B]/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#24483B]/10 pb-4">
            <div>
              <div className="text-xs font-semibold text-[#24483B] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#24483B]" />
                <span>Interactive 3D Knowledge Archive</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2A4A] mt-0.5">
                Parchment &amp; Mind Origami
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <LiquidGlassButton
                type="button"
                onClick={() => setShow3d(!show3d)}
                variant="subtle"
                size="sm"
              >
                <span>{show3d ? "Hide 3D Archive" : "Show 3D Archive"}</span>
              </LiquidGlassButton>
            </div>
          </div>

          {show3d && (
            <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#F5F1E9]/40 to-[#FAF9F5]/70 border border-[#24483B]/10">
              <KnowledgeArchiveCanvas
                onSelectTopic={(cat) => {
                  setSelectedCategory(cat);
                }}
              />
            </div>
          )}

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#24483B] text-[#FAF9F5] font-semibold shadow-xs"
                      : "bg-[#FAF9F5] text-[#1A2A4A]/75 hover:bg-white border border-[#24483B]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#24483B]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search essays & psychsnaps..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-[#FAF9F5] border border-[#24483B]/15 text-[#1A2A4A] placeholder:text-[#1A2A4A]/40 focus:outline-none focus:ring-2 focus:ring-[#C6A46A]"
              />
            </div>
          </div>
        </div>

        {/* Learn Articles Grid (3D Tilt Cards) */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F5F1E9]/60 rounded-3xl border border-[#24483B]/10 space-y-4">
            <HelpCircle className="w-8 h-8 text-[#24483B]/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#1A2A4A]">No essays found</h3>
            <p className="text-xs text-[#1A2A4A]/70 font-sans max-w-sm mx-auto">
              No articles match &ldquo;{searchQuery}&rdquo;. Try another topic or clear the filter.
            </p>
            <LiquidGlassButton
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              variant="secondary"
              size="sm"
            >
              <span>Reset Search</span>
            </LiquidGlassButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <TiltCard key={item.id} maxTilt={5}>
                <article className="h-full bg-[#FAF9F5] rounded-3xl p-7 sm:p-8 border border-[#24483B]/12 shadow-xs hover:border-[#24483B]/30 hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#1A2A4A]/60">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#24483B] bg-[#8FA89E]/20 px-3 py-1 rounded-full border border-[#24483B]/10 font-semibold">
                        {item.category}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-[#24483B]" />
                        <span>{item.readTime}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-[#1A2A4A]/50 block">
                        {item.tagline}
                      </span>
                      <h3 className="font-serif text-xl font-normal text-[#1A2A4A] group-hover:text-[#24483B] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1A2A4A]/75 leading-relaxed font-sans">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#24483B]/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#1A2A4A]/50">{item.date}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(item)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#24483B] hover:text-[#1A3529] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Read Article Modal */}
        {selectedArticle && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reading-article-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151C17]/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
          >
            <div className="bg-[#FAF9F5] text-[#1A2A4A] max-w-2xl w-full rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/40 my-8 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article modal"
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#1A2A4A]/70 hover:text-[#1A2A4A] cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#24483B] font-semibold bg-[#8FA89E]/20 px-3 py-1 rounded-full border border-[#24483B]/10">
                  {selectedArticle.category}
                </span>
                <h2 id="reading-article-title" className="font-serif text-3xl font-normal text-[#1A2A4A] leading-tight mt-2">
                  {selectedArticle.title}
                </h2>
                <p className="text-xs font-mono text-[#1A2A4A]/60">
                  {selectedArticle.tagline} • {selectedArticle.readTime}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#1A2A4A]/85 leading-relaxed font-sans border-t border-[#24483B]/10 pt-6">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-8 mt-8 border-t border-[#24483B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/books/psychology-toolkit"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs font-semibold text-[#24483B] hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore in The Psychology Toolkit →</span>
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
