"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { BOOKS_PRICING } from "@/data/pricing";

const CHAPTER_DETAILS = [
  {
    num: "01",
    title: "Understanding Your Mind",
    subtitle: "Emotions, self-awareness & emotional regulation",
    tools: "Self-concept audit, Emotion taxonomy, Autonomic trigger mapper",
  },
  {
    num: "02",
    title: "Thoughts & Mindset",
    subtitle: "Recognising thinking patterns & building resilience",
    tools: "Cognitive distortion filter, ABCDE reframing protocol, Belief deconstruction",
  },
  {
    num: "03",
    title: "Anxiety & Stress",
    subtitle: "Practical tools for emotional regulation",
    tools: "Autonomic nervous system mapping, Somatic grounding drills, Worry postponement",
  },
  {
    num: "04",
    title: "Relationships & Boundaries",
    subtitle: "Communication, attachment & interpersonal dynamics",
    tools: "Boundary scripts, Attachment inventory, Non-defensive communication formula",
  },
  {
    num: "05",
    title: "Habits & Personal Growth",
    subtitle: "Sustainable change, mindfulness & self-compassion",
    tools: "Friction-reduction blueprint, Relapse prevention plans, Identity-based rituals",
  },
];

const FTC_CHAPTERS = [
  { num: "01", title: "The Safe Heart", theme: "Grounding & Emotional Safety" },
  { num: "02", title: "Home Inside Me", theme: "Belonging & Somatic Stillness" },
  { num: "03", title: "The Core and the Contour", theme: "Boundaries & Authentic Identity" },
];

const slides = [
  {
    id: "toolkit",
    label: "The Psychology Toolkit",
    eyebrow: "Flagship Publication · 80-page A4 PDF",
    description:
      "A structured clinical workbook across five master chapters — designed for self-inquiry, cognitive restructuring, and daily psychological poise.",
    priceInr: BOOKS_PRICING.toolkit.formattedInr,
    priceUsd: BOOKS_PRICING.toolkit.formattedUsd,
    href: "/books/psychology-toolkit",
    cta: "Acquire Master Workbook",
    bgClass: "bg-[#F5EFE6]/70",
    textClass: "text-[#202923]",
  },
  {
    id: "finding-the-centre",
    label: "Finding The Centre",
    eyebrow: "Philosophical · Reflective Volume",
    description:
      "A gentle guide for emotional stillness, mindful coloring, and grounded self-reflection across 10 core themes for children, teens, and adults.",
    priceLines: [
      { format: "eBook (Instant Download)", price: BOOKS_PRICING.findingTheCentre.ebook.formattedInr },
      { format: "Paperback Print Edition", price: BOOKS_PRICING.findingTheCentre.print.formattedInr },
    ],
    href: "/books/finding-the-centre",
    cta: "View Editions & Formats",
    bgClass: "bg-[#24483B]",
    textClass: "text-[#FDFBF7]",
  },
];

export function BooksPreviewSection() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [activeChapter, setActiveChapter] = React.useState(0);

  const slide = slides[activeSlide];
  const isNavy = slide.id === "finding-the-centre";

  return (
    <section
      id="publications"
      className="py-24 sm:py-32 bg-[#FDFBF7] border-b border-[#24483B]/10 relative overflow-hidden scroll-mt-16"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#24483B] font-mono block mb-4 font-semibold">
              The Publications Library
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#202923] leading-tight">
              Guided Workbooks & Volumes
            </h2>
            <p className="mt-4 text-base text-[#202923]/75 font-sans leading-relaxed">
              Tactile, beautifully engineered print and digital editions designed to translate clinical theory into personal clarity.
            </p>
          </div>

          {/* Carousel Controls (Liquid Glass) */}
          <div className="flex items-center gap-3">
            <LiquidGlassButton
              type="button"
              onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              variant="subtle"
              size="icon"
              signalDot={false}
              aria-label="Previous publication"
            >
              <ChevronLeft className="w-5 h-5 text-[#202923]" />
            </LiquidGlassButton>
            <span className="font-mono text-xs text-[#202923]/60 px-1">
              0{activeSlide + 1} / 0{slides.length}
            </span>
            <LiquidGlassButton
              type="button"
              onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
              variant="subtle"
              size="icon"
              signalDot={false}
              aria-label="Next publication"
            >
              <ChevronRight className="w-5 h-5 text-[#202923]" />
            </LiquidGlassButton>
          </div>
        </div>

        {/* Carousel Card Presentation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`rounded-2xl border ${
                isNavy
                  ? "bg-[#24483B] text-[#FDFBF7] border-white/10"
                  : "bg-[#F5EFE6] text-[#202923] border-[#24483B]/10"
              } p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 shadow-lg`}
            >
              {/* Left Column: Interactive Spine or Table of Contents (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <span
                    className={`block text-[10px] font-mono uppercase tracking-[0.2em] mb-3 font-semibold ${
                      isNavy ? "text-[#C6A46A]" : "text-[#24483B]"
                    }`}
                  >
                    {slide.eyebrow}
                  </span>
                  <h3
                    className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight mb-6 ${
                      isNavy ? "text-[#FDFBF7]" : "text-[#202923]"
                    }`}
                  >
                    {slide.label}
                  </h3>

                  {/* Interactive Chapter Spine — Toolkit */}
                  {slide.id === "toolkit" ? (
                    <div className="space-y-3 pt-4 border-t border-[#24483B]/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#202923]/60 block font-medium">
                        Interactive Chapter Spine (Select to inspect)
                      </span>
                      <div className="space-y-1.5">
                        {CHAPTER_DETAILS.map((ch, idx) => {
                          const isSelected = activeChapter === idx;
                          return (
                            <LiquidGlassButton
                              key={ch.num}
                              onClick={() => setActiveChapter(idx)}
                              className={`w-full text-left p-3 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-[#24483B] text-[#FDFBF7] font-semibold shadow-xs"
                                  : "hover:bg-[#FDFBF7] text-[#202923]/75"
                              }`}
                            >
                              <span>{ch.num} {ch.title}</span>
                              <span className={`text-[10px] ${isSelected ? "text-[#C6A46A]" : "text-[#202923]/40"}`}>
                                Ch. {ch.num}
                              </span>
                            </LiquidGlassButton>
                          );
                        })}
                      </div>

                      {/* Chapter Exercise Preview Drawer */}
                      <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#24483B]/10 text-xs font-sans text-[#202923]/80 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#24483B] block font-semibold">
                          Inside Ch. {CHAPTER_DETAILS[activeChapter].num}: {CHAPTER_DETAILS[activeChapter].subtitle}
                        </span>
                        <p className="leading-relaxed text-[#202923]/70">
                          {CHAPTER_DETAILS[activeChapter].tools}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-4 border-t border-white/15 text-xs text-[#FDFBF7]/80 font-sans leading-relaxed">
                      <p className="italic text-[#C6A46A] text-sm font-serif">
                        "for Children, Teens & Adults — 10 Themes for Mindfulness, Emotional Wellbeing & Self-Reflection"
                      </p>
                      <div className="space-y-2 pt-2">
                        {FTC_CHAPTERS.map((ch) => (
                          <div
                            key={ch.num}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-[#FDFBF7]/90"
                          >
                            <span>{ch.num} {ch.title}</span>
                            <span className="text-[#C6A46A]">{ch.theme}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Description + Transparent Pricing + Acquisition Button */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <h4
                    className={`font-serif text-xl sm:text-2xl font-normal leading-snug ${
                      isNavy ? "text-[#FDFBF7]" : "text-[#202923]"
                    }`}
                  >
                    Publication Description
                  </h4>
                  <p
                    className={`text-base leading-relaxed font-sans ${
                      isNavy ? "text-[#FDFBF7]/80" : "text-[#202923]/75"
                    }`}
                  >
                    {slide.description}
                  </p>
                </div>

                {/* Price Display */}
                <div>
                  {"priceInr" in slide && (
                    <div className={`pt-6 border-t ${isNavy ? "border-white/10" : "border-[#24483B]/10"}`}>
                      <span className={`block text-xs font-mono mb-1 font-semibold ${isNavy ? "text-[#C6A46A]" : "text-[#24483B]"}`}>
                        Published price
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className={`font-serif text-3xl font-normal ${isNavy ? "text-[#FDFBF7]" : "text-[#202923]"}`}>
                          {slide.priceInr}
                        </span>
                        {slide.priceUsd && (
                          <span className={`text-sm font-sans ${isNavy ? "text-[#FDFBF7]/60" : "text-[#202923]/60"}`}>
                            ({slide.priceUsd})
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {"priceLines" in slide && slide.priceLines && (
                    <div className={`pt-6 border-t space-y-2.5 ${isNavy ? "border-white/10" : "border-[#24483B]/10"}`}>
                      {slide.priceLines.map((line) => (
                        <div key={line.format} className="flex items-center justify-between text-sm">
                          <span className={isNavy ? "text-[#FDFBF7]/80 font-sans" : "text-[#202923]/75 font-sans"}>
                            {line.format}
                          </span>
                          <span className={`font-serif text-lg font-medium ${isNavy ? "text-[#C6A46A]" : "text-[#202923]"}`}>
                            {line.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-8">
                    <LiquidGlassButton
                      href={slide.href}
                      variant={isNavy ? "gold" : "primary"}
                      size="lg"
                      showArrow
                    >
                      <span>{slide.cta}</span>
                    </LiquidGlassButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
