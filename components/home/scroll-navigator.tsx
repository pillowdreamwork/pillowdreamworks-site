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
          className="transition-all duration-300 rounded-2xl p-3.5 border backdrop-blur-md shadow-lg bg-[#FDFBF7]/98 border-[#24483B]/20 w-[268px]"
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#24483B]/15 mb-2">
            <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-wide text-[#24483B]">
              <Compass className="w-4 h-4 text-[#C6A46A] shrink-0" />
              <span className="whitespace-nowrap font-medium">Charting Our Work</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#24483B]/10 text-[#24483B]">
              {activeChapter.num}/{CHAPTERS.length}
            </span>
          </div>

          {/* Chapter Links */}
          <nav className="space-y-1.5" role="navigation" aria-label="Folio chapters">
            {CHAPTERS.map((ch) => {
              const isActive = ch.id === activeId;
              return (
                <RailItemButton
                  key={ch.id}
                  ch={ch}
                  isActive={isActive}
                  onClick={() => scrollTo(ch.id)}
                />
              );
            })}
          </nav>

          {/* Active Chapter Tagline */}
          <div className="pt-2 mt-2 border-t border-[#24483B]/10 text-[11px] font-sans text-[#202923]/80 leading-snug">
            <span className="font-semibold text-[#24483B] block">Current Focus:</span>
            <span className="italic">{activeChapter.tagline}</span>
          </div>

          {/* Quick Back to Top */}
          {hasScrolled && (
            <RailTopButton onClick={scrollToTop} />
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

interface RailItemButtonProps {
  ch: Chapter;
  isActive: boolean;
  onClick: () => void;
}

function RailItemButton({ ch, isActive, onClick }: RailItemButtonProps) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsHovered(true);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxOffset = 6;
    setOffset({
      x: Math.max(-maxOffset, Math.min(maxOffset, (x - centerX) * 0.18)),
      y: Math.max(-maxOffset, Math.min(maxOffset, (y - centerY) * 0.18)),
    });
    setTilt({
      x: -((y - centerY) / Math.max(centerY, 1)) * 3.5,
      y: ((x - centerX) / Math.max(centerX, 1)) * 3.5,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
    setTilt({ x: 0, y: 0 });
  };

  const glowBackground = isHovered
    ? isActive
      ? `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.45) 0%, rgba(198, 164, 106, 0.25) 45%, transparent 75%)`
      : `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(198, 164, 106, 0.60) 0%, rgba(36, 72, 59, 0.15) 45%, transparent 75%)`
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-current={isActive ? "step" : undefined}
      style={{
        transform: isHovered
          ? `perspective(400px) translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 2px) rotateX(${tilt.x.toFixed(1)}deg) rotateY(${tilt.y.toFixed(1)}deg)`
          : undefined,
        transition: isHovered
          ? "transform 75ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 200ms ease, box-shadow 200ms ease"
          : "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms ease, box-shadow 250ms ease",
      }}
      className={`relative w-full group flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer overflow-hidden ${
        isActive
          ? "bg-[#24483B] text-[#FDFBF7] shadow-sm font-medium"
          : "text-[#1C2620] hover:bg-[#F2ECE1] hover:text-[#24483B]"
      }`}
    >
      {/* Light glow sheen inside button */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-lg overflow-hidden transition-opacity duration-150"
        style={{
          opacity: isHovered ? 1 : 0,
          background: glowBackground,
        }}
      />

      <div className="relative z-10 flex items-center gap-2 min-w-0">
        <span
          className={`text-[10px] font-mono font-bold transition-colors ${
            isActive ? "text-[#C6A46A]" : "text-[#24483B]/70 group-hover:text-[#24483B]"
          }`}
        >
          {ch.num}
        </span>
        <span
          className={`text-xs font-serif font-medium truncate ${
            isActive ? "text-[#FDFBF7]" : "text-[#1C2620] group-hover:text-[#24483B]"
          }`}
        >
          {ch.title}
        </span>
      </div>

      {/* Bullet Dot indicator */}
      <div
        className={`relative z-10 w-1.5 h-1.5 rounded-full shrink-0 transition-transform ${
          isActive
            ? "bg-[#C6A46A] scale-125 shadow-[0_0_6px_#C6A46A]"
            : "bg-[#24483B]/30 group-hover:bg-[#24483B]/70"
        }`}
      />
    </button>
  );
}

function RailTopButton({ onClick }: { onClick: () => void }) {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsHovered(true);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setOffset({
      x: Math.max(-4, Math.min(4, (x - centerX) * 0.15)),
      y: Math.max(-4, Math.min(4, (y - centerY) * 0.15)),
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      title="Return to folio beginning"
      aria-label="Scroll back to top"
      style={{
        transform: isHovered
          ? `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`
          : undefined,
        transition: isHovered
          ? "transform 75ms ease, color 150ms ease"
          : "transform 250ms ease, color 200ms ease",
      }}
      className="relative mt-2 pt-2 border-t border-[#24483B]/10 w-full flex items-center justify-center gap-1.5 text-[11px] font-mono font-medium text-[#24483B] hover:text-[#C6A46A] py-1 cursor-pointer overflow-hidden rounded-md"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md overflow-hidden transition-opacity duration-150"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(100px circle at ${mousePos.x}px ${mousePos.y}px, rgba(198, 164, 106, 0.40), transparent 70%)`,
        }}
      />
      <ChevronUp className="w-3.5 h-3.5 relative z-10" />
      <span className="relative z-10">Back to Top</span>
    </button>
  );
}
