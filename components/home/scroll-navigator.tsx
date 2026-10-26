"use client";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";


import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ChevronUp, BookOpen } from "lucide-react";

export interface Chapter {
  id: string;
  num: string;
  title: string;
  tagline: string;
}

export const CHAPTERS: Chapter[] = [
  { id: "prelude", num: "01", title: "Prelude", tagline: "The Work of Becoming" },
  { id: "mission", num: "02", title: "Foundation", tagline: "Mission & Core Values" },
  { id: "continuum", num: "03", title: "The Continuum", tagline: "From Noise to Architecture" },
  { id: "publications", num: "04", title: "Publications", tagline: "The Psychology Toolkit" },
  { id: "archive", num: "05", title: "Archive", tagline: "177 Psychometric Scales" },
  { id: "services", num: "06", title: "Consulting", tagline: "Clinical Rooms & Care" },
  { id: "reading-room", num: "07", title: "Reading Room", tagline: "PsychSnaps & Articles" },
  { id: "reflection", num: "08", title: "Reflection", tagline: "Participatory Specimen" },
  { id: "founder", num: "09", title: "Colophon", tagline: "Manish Garg · Founder" },
  { id: "invitation", num: "10", title: "Invitation", tagline: "Enter the Foundation" },
];

export function ScrollNavigator() {
  const [activeId, setActiveId] = React.useState<string>("prelude");
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = React.useState<boolean>(false);

  // Track active section via IntersectionObserver for 60fps performance without unthrottled scroll listeners
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeChapter = CHAPTERS.find((ch) => ch.id === activeId) || CHAPTERS[0];

  return (
    <>
      {/* ── DESKTOP FLOATING CHAPTER RAIL (xl+ screens) ── */}
      <aside
        aria-label="Story chapter progression"
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none"
      >
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className={`transition-all duration-300 rounded-2xl p-3.5 border backdrop-blur-md shadow-md bg-[#FDFBF7]/95 border-[#24483B]/20 ${
            isExpanded ? "w-64" : "w-56"
          }`}
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#24483B]/15 mb-2">
            <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wide text-[#24483B]">
              <Compass className="w-4 h-4 text-[#C6A46A] shrink-0" />
              <span className="whitespace-nowrap">Charting Our Work</span>
            </div>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#24483B]/10 text-[#24483B]">
              {activeChapter.num}/{CHAPTERS.length}
            </span>
          </div>

          {/* Chapter Links */}
          <nav className="space-y-1.5" role="navigation">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === activeId;
              return (
                <LiquidGlassButton
                  key={ch.id}
                  onClick={() => scrollTo(ch.id)}
                  aria-current={isActive ? "step" : undefined}
                  className={`w-full group flex items-center justify-between gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#24483B] text-[#FDFBF7] shadow-xs"
                      : "text-[#202923]/70 hover:bg-[#F5EFE6] hover:text-[#202923]"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[10px] font-mono font-semibold transition-colors ${
                        isActive ? "text-[#C6A46A]" : "text-[#24483B]/60 group-hover:text-[#24483B]"
                      }`}
                    >
                      {ch.num}
                    </span>
                    {isExpanded && (
                      <span className="text-xs font-serif truncate font-normal">
                        {ch.title}
                      </span>
                    )}
                  </div>

                  {/* Bullet Dot indicator */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform ${
                      isActive
                        ? "bg-[#C6A46A] scale-125"
                        : "bg-[#24483B]/25 group-hover:bg-[#24483B]/60"
                    }`}
                  />
                </LiquidGlassButton>
              );
            })}
          </nav>

          {/* Active Chapter Tagline (when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 mt-2 border-t border-[#24483B]/10 text-[11px] font-sans text-[#202923]/70 leading-snug"
              >
                <span className="font-semibold text-[#24483B] block">Current Focus:</span>
                {activeChapter.tagline}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Back to Top */}
          {hasScrolled && (
            <LiquidGlassButton
              onClick={scrollToTop}
              title="Return to folio beginning"
              aria-label="Scroll back to top"
              className="mt-2 pt-2 border-t border-[#24483B]/10 w-full flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#24483B] hover:text-[#C6A46A] transition-colors py-1 cursor-pointer"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </LiquidGlassButton>
          )}
        </div>
      </aside>

      {/* ── MOBILE / TABLET DISCREET READING PILL (bottom-right) ── */}
      <aside
        aria-label="Current chapter indicator"
        className={`xl:hidden fixed bottom-16 right-4 z-40 transition-opacity duration-300 ${hasScrolled ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <LiquidGlassButton
          onClick={() => {
            const nextIdx = (CHAPTERS.findIndex((c) => c.id === activeId) + 1) % CHAPTERS.length;
            scrollTo(CHAPTERS[nextIdx].id);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24483B]/90 text-[#FDFBF7] backdrop-blur-md shadow-md border border-[#C6A46A]/30 text-xs font-sans transition-transform active:scale-95 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#C6A46A]" />
          <span className="font-mono text-[10px] text-[#C6A46A]">{activeChapter.num}</span>
          <span className="font-serif max-w-[120px] truncate">{activeChapter.title}</span>
        </LiquidGlassButton>
      </aside>
    </>
  );
}
