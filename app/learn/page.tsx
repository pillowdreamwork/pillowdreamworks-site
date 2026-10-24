"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";

import { TiltCard } from "@/components/ui/tilt-card";
import { KnowledgeArchiveCanvas } from "@/components/3d/knowledge-archive-canvas";
import { LEARN_CATALOG, LearnItem } from "@/data/learn";
import { Search, Clock, X, Compass, HelpCircle } from "lucide-react";

/* ─── Scroll-reveal hook ─── */
function useScrollReveal(threshold = 0.12) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedArticle, setSelectedArticle] = React.useState<LearnItem | null>(null);
  const [show3d, setShow3d] = React.useState<boolean>(true);

  const hero = useScrollReveal(0.1);
  const grid = useScrollReveal(0.08);

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
    <main className="min-h-screen bg-ivory text-ink relative overflow-hidden">

      {/* ═══ Ambient Background Orbs — Premium Glass Depth ═══ */}
      <div className="ambient-orb ambient-orb-sage w-[550px] h-[550px] top-[-100px] left-[-200px] animate-orb-drift" />
      <div className="ambient-orb ambient-orb-gold w-[450px] h-[450px] top-[35%] right-[-200px] animate-orb-drift" style={{ animationDelay: "-5s" }} />
      <div className="ambient-orb ambient-orb-vermilion w-[350px] h-[350px] bottom-[15%] left-[-100px] animate-orb-drift" style={{ animationDelay: "-9s" }} />
      <div className="ambient-orb ambient-orb-ivory w-[600px] h-[600px] top-[15%] right-[25%] animate-pulse-glow" />

      <div className="relative z-10 py-14 sm:py-24">
        <Container>

          {/* ═══════════════════════════════════════════════════════════════
               Hero — The Reading Room Editorial Header
             ══════════════════════════════════════════════════════════════ */}
          <div
            ref={hero.ref}
            className={`text-center max-w-4xl mx-auto space-y-6 mb-16 transition-all duration-1000 ease-out ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Vermilion-accented editorial badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-hero-panel text-forest text-xs font-semibold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-vermilion shadow-[0_0_8px_rgba(232,93,63,0.7)]" />
              </span>
              <span>The Psychology Editorial & PsychSnaps</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              The Reading Room
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-2xl mx-auto">
              Clear, evidence-backed psychological insights, bite-sized visual frameworks, and founder notes on emotional poise.
            </p>

            {/* Decorative sage rule with vermilion center */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-sage" />
              <div className="w-2 h-2 rounded-full bg-vermilion animate-pulse-glow" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-sage" />
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               3D Knowledge Archive — Premium Glass Console
             ═══════════════════════════════════════════════════════════════ */}
          <div className="glass-3d-console rounded-3xl p-6 sm:p-8 space-y-6 mb-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forest/10 pb-4">
              <div>
                <div className="text-xs font-semibold text-forest uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-forest" />
                  <span>Interactive 3D Knowledge Archive</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-0.5">
                  Parchment & Mind Origami
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
              <div className="rounded-2xl overflow-hidden border border-forest/8" style={{ background: "linear-gradient(to bottom, rgba(245,239,230,0.4), rgba(253,251,247,0.7))" }}>
                <KnowledgeArchiveCanvas
                  onSelectTopic={(cat) => {
                    setSelectedCategory(cat);
                  }}
                />
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
              {/* Category Tabs — premium glassmorphism pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <LiquidGlassButton
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    variant={selectedCategory === cat ? "secondary" : "subtle"}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-forest text-ivory font-semibold shadow-sm"
                        : "glass-content-card text-ink/75 hover:text-forest hover:border-sage/40"
                    }`}
                  >
                    {cat}
                  </LiquidGlassButton>
                ))}
              </div>

              {/* Search Input — glass frosted */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search essays & psychsnaps..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-gold min-h-[44px] transition-all shadow-xs"
                  style={{
                    background: "linear-gradient(140deg, rgba(253,251,247,0.85), rgba(245,239,230,0.8))",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(36, 72, 59, 0.12)",
                  }}
                />
              </div>
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               Article Grid — 3D Tilt Glassmorphism Cards
             ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={grid.ref}
            className={`transition-all duration-1000 ease-out ${grid.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 glass-section rounded-3xl space-y-4">
                <HelpCircle className="w-8 h-8 text-forest/40 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-ink">No essays found</h3>
                <p className="text-xs text-ink-muted font-sans max-w-sm mx-auto">
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
                {filteredItems.map((item, index) => (
                  <TiltCard key={item.id} maxTilt={5}>
                    <article
                      className="h-full glass-hero-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between group"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-ink-muted">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-forest px-3 py-1 rounded-full font-semibold" style={{
                            background: "rgba(166, 183, 161, 0.2)",
                            border: "1px solid rgba(36, 72, 59, 0.1)",
                          }}>
                            {item.category}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Clock className="w-3 h-3 text-forest" />
                            <span>{item.readTime}</span>
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-ink/50 block">
                            {item.tagline}
                          </span>
                          <h3 className="font-serif text-xl font-normal text-ink group-hover:text-forest transition-colors duration-300 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-forest/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-ink/50">{item.date}</span>
                        <LiquidGlassButton
                          type="button"
                          onClick={() => setSelectedArticle(item)}
                          variant="secondary"
                          size="sm"
                          showArrow
                        >
                          <span>Read Essay</span>
                        </LiquidGlassButton>
                      </div>

                      {/* Vermilion accent indicator on hover */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r from-vermilion/60 to-vermilion rounded-full transition-all duration-500" />
                    </article>
                  </TiltCard>
                ))}
              </div>
            )}
          </div>


          {/* ═══════════════════════════════════════════════════════════════
               Read Article Modal — Deep Glassmorphism Overlay
             ═══════════════════════════════════════════════════════════════ */}
          {selectedArticle && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="reading-article-title"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
              style={{
                background: "rgba(21, 28, 23, 0.75)",
                backdropFilter: "blur(16px) saturate(1.2)",
              }}
            >
              <div className="glass-modal max-w-2xl w-full rounded-3xl p-6 sm:p-10 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
                <div className="absolute top-5 right-5 p-2 rounded-full glass-card border border-forest/20 text-ink/70 hover:bg-ink/5 hover:text-ink cursor-pointer transition-all shadow-lg">
                  <LiquidGlassButton
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    aria-label="Close article modal"
                    className="p-0 h-full w-full bg-transparent border-none shadow-none hover:bg-transparent hover:border-none"
                  >
                    <X className="w-5 h-5" />
                  </LiquidGlassButton>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-forest font-semibold px-3 py-1 rounded-full" style={{
                    background: "rgba(166, 183, 161, 0.2)",
                    border: "1px solid rgba(36, 72, 59, 0.1)",
                  }}>
                    {selectedArticle.category}
                  </span>
                  <h2 id="reading-article-title" className="font-serif text-3xl font-normal text-ink leading-tight mt-2">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-xs font-mono text-ink-muted">
                    {selectedArticle.tagline} • {selectedArticle.readTime}
                  </p>
                  {/* Vermilion accent rule */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-8 h-0.5 bg-sage rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-vermilion" />
                    <div className="w-8 h-0.5 bg-sage rounded-full" />
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-ink/85 leading-relaxed font-sans border-t border-forest/10 pt-6">
                  {selectedArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="pt-8 mt-8 border-t border-forest/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <LiquidGlassButton
                    href="/books/psychology-toolkit"
                    onClick={() => setSelectedArticle(null)}
                    variant="primary"
                    size="sm"
                    showArrow
                  >
                    <span>Explore in The Psychology Toolkit</span>
                  </LiquidGlassButton>
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
      </div>
    </main>
  );
}